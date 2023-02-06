import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SignupError(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Error!</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Unable to create account. </div>
        <div>Please try again with another email or username.</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupError;