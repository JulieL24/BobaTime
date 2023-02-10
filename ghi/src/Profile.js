import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Profile(){
    const [currentUser, setCurrentUser] = useState({});
    const [location, setLocation] = useState("");
    const [stores, setStores] = useState([]);
    const [randomStore, setRandomStore] = useState({});
    const [searchError, setSearchError]= useState(false);
    const [showStore, setShowStore] = useState(false);
    

    useEffect(() => {
        async function getUser() {
            const url = `${process.env.REACT_APP_USERS_API_HOST}/token`
            const fetchConfig = {
                credentials: "include",
            }
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setCurrentUser(data);
                // console.log(currentUser);
            }
        };
        getUser(); 
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const data = {location: location}
        try {
            const response = await axios.get(`${process.env.REACT_APP_STORES_FAVORITES_DRINKS_API_HOST}/yelp-api/bobastores?location=${data.location}&rating=4`);
            setStores(response["data"]);
            console.log(stores);
            // there are 18 possible results
            const randomVal = Math.floor(Math.random() * 19);
            const newStore = stores[randomVal];
            setRandomStore(newStore);
            console.log(randomStore);
            setShowStore(true);
            console.log(showStore);
        }catch (error){
            setSearchError(true);
        }
    }


    function SearchError(props){
        return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <h3>Search not found!</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>Please try again with another city or state.</div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
    }


    return (
        <div className="container">
            <div className="page-top">
                <h3 className="welcome-tag">
                    Welcome, {currentUser?.user?.first_name}!
                </h3>
                <div className="offset-3 col-6">
                    <div className="search-card shadow p-4 mt-4">
                        <h3 style={{ color: "rgb(68, 188, 368)" }}>Search for Recommended store</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input value={location} onChange={e => setLocation(e.target.value)}required type="text" className="form-control" id="location" placeholder="Please enter city and state (can also include neighborhood)" />
                            </div>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>
                <SearchError
                    show={searchError}
                    onHide={() => setSearchError(false)}
                />
                 <div style={{ display: showStore ? "" : "none" }} className="recommend-store-card offset-3 col-5 shadow p-4">
                    <div className="row" style={{ display: showStore ? "" : "none" }}>
                        <h2 className="text-center mt-4 mb-4" style={{ color: "rgb(29, 168, 209)" }}>Recommended Store</h2>
                        <div key={randomStore?.id} id="card-spacing" className="card col-lg-6 mb-4" style={{width: "22rem"}}>
                            <a className="yelp-link" href={randomStore?.url} target="_blank" rel="noopener noreferrer">
                                <img src={randomStore?.image_url} className="card-img-top"  width="auto"
                        height="338" alt="loading store" />
                            </a>
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: "rgb(29, 134, 209)" }}>{randomStore?.name}</h5>
                                <div className="card-text" >
                                    <div style={{ color: "rgb(180, 81, 185)" }}>{randomStore?.rating}</div>
                                    <div style={{color: "rgb(46, 41, 172)"}}>{randomStore?.location?.address1}. {randomStore?.location?.city}, {randomStore?.location?.state} {randomStore?.location?.zip_code} </div>
                                    <div style={{ color: "rgb(81, 86, 185)" }}>{randomStore?.display_phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile

