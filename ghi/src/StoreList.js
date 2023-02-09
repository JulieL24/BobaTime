import { useState } from 'react';
import { useEffect } from 'react';
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


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const data = {location: location, rating: rating}
        try {
        const storesData = await axios.get(`${process.env.REACT_APP_STORES_FAVORITES_DRINKS_API_HOST}/yelp-api/bobastores?location=${data.location}&rating=${data.rating}`);
            setStores(storesData);
            console.log(stores);
        }catch (error){
            setSearchError(true);
        }
    }


    return (
        <div className="container">
            <div className="page-top">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h3>Search Stores</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input value={location} onChange={e => setLocation(e.target.value)}required type="text" className="form-control" id="location" placeholder="Please enter city and state" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">Rating scale(1 to 5)</label>
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
            </div>
        </div>
    );
}

export default StoresList