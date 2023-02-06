import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useToken } from './LoginToken';


function LogoutModal(props) {
    const logout = useToken()[2];

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await logout();
            props.onHide(); 
        } catch (error) {
            console.log("There was an error logging out.")
        }
    }


    return (
        
            <Modal 
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Are you sure you want to logout?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Logout
                </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default LogoutModal;