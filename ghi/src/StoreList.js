import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


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


function StoresList(){
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");
    const [stores, setStores] = useState([]);
    const ratingValue = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const [searchError, setSearchError]= useState(false);
    const [showStore, setShowStore] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const data = {location: location, rating: rating}
        try {
            const storesData = await axios.get(`${process.env.REACT_APP_STORES_FAVORITES_DRINKS_API_HOST}/yelp-api/bobastores?location=${data.location}&rating=${data.rating}`);
            setStores(storesData["data"]);
            setShowStore(true);
            console.log(stores);
        }catch (error){
            setSearchError(true);
        }
    }


    return (
        <div className="container">
            <div className="page-top">
                <div className="offset-3 col-6">
                    <div className="search-card shadow p-4 mt-4">
                        <h3 style={{ color: "rgb(68, 188, 368)" }}>Search Stores</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input value={location} onChange={e => setLocation(e.target.value)}required type="text" className="form-control" id="location" placeholder="Please enter city and state (can also include neighborhood)" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">Rating scale (1 to 5)</label>
                                <select required className="form-select" aria-label="Rating scale(1 to 5)">
                                    <option value="">Select Rating</option>
                                    {ratingValue.map( (val, idx) => <option key={idx} value={val} onChange={e => setRating(e.target.value)}>{val}</option>)}
                                </select>
                            </div>
                            <button disabled={ratingValue.length=== 0} type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>
                <SearchError
                    show={searchError}
                    onHide={() => setSearchError(false)}
                />
                <div style={{ display: showStore ? "" : "none" }} className="store-list-cards offset-1 col-10 shadow p-4 mt-4">
                    <div className="row">
                        <h2 className="text-center mt-4 mb-4" style={{ color: "rgb(29, 168, 209)" }}>List of Stores</h2>
                        {stores.map((store, idx) => 
                        <div key={idx} className="card col-lg-6 mb-4" style={{width: "20rem"}}>
                            <a className="yelp-link" href={store.url} target="_blank" rel="noopener noreferrer">
                                <img src={store.image_url} className="card-img-top"  width="auto"
                        height="338" alt="store" />
                            </a>
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: "rgb(29, 134, 209)" }}>{store.name}</h5>
                                <div className="card-text">
                                    <div style={{ color: "rgb(180, 81, 185)" }}>{store.rating}</div>
                                    <div style={{color: "rgb(46, 41, 172)"}}>{store?.location?.address1}. {store?.location?.city}, {store?.location?.state} {store?.location?.zip_code} </div>
                                    <div style={{ color: "rgb(81, 86, 185)" }}>{store.display_phone}</div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoresList