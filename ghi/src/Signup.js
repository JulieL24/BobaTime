import { useState } from 'react';
import { useToken } from './LoginToken';
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

function SignupForm(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const signup = useToken()[3]; 
    const [showError, setShowError] = useState(false);
    const [hidePassword, setHidePassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await signup(firstName, lastName, email, username, password);
        } catch (error) {   
            setShowError(true);
            console.log("There was an error creating your account")
        }
    }

    const toggleBtn = (e) => {
        e.preventDefault();
        setHidePassword(prevState => !prevState);
    }
    

    return (
        <div className="row page-top">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input value={firstName} onChange={e => setFirstName(e.target.value)}required type="text" className="form-control" id="firstName" placeholder="first name" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input value={lastName} onChange={e => setLastName(e.target.value)}required type="text" className="form-control" id="lastName" placeholder="last name" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="form-control" id="email" placeholder="email@email.com" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input value={username} onChange={e => setUsername(e.target.value)} required type="text" className="form-control" id="username" placeholder="username" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} required type={hidePassword ? "text" : "password"} className="form-control" id="password" placeholder='password' />
                        </div>
                        <button className="btn btn-primary me-4" onClick={(e) => toggleBtn(e)}>
                        {hidePassword ? "Hide password" : "View password"
                        }
                      </button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <SignupError
                show={showError}
                onHide={() => setShowError(false)}
            />
      </div>
    );
}

export default SignupForm