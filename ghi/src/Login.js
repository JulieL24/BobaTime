import { useState } from 'react';
import { useToken, useAuthContext } from './LoginToken';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


function LoginError(props) {
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
        <div>Invalid email or password. Please try again. </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function LoginForm(){
    const login = useToken()[1];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
    const {token} = useAuthContext(); 
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        if(token){
          console.log("logged in");
        }else {
          console.log("invalid password or email");
          setShowLoginError(true);
        }
    }

    useEffect(() => {
      if (token) {
        navigate("/profile");
      }
    }, [navigate, token]);


    const toggleBtn = (e) => {
        e.preventDefault();
        setHidePassword(prevState => !prevState);
    }
    

    return (
        <div className="container">
            <div className="page-top">
              <div className="row">
                <div className="offset-3 col-6">
                  <div className="shadow p-4 mt-4">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="form-control" id="email" placeholder="email@email.com" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} required type={hidePassword ? "text" : "password"} className="form-control" id="password" placeholder="password" />
                      </div>
                      <button className="btn btn-primary me-4" onClick={(e) => toggleBtn(e)}>
                        {hidePassword ? "Hide password" : "View password"
                        }
                      </button>
                      <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                  </div>
                </div>
              </div>
              <LoginError
                show={showLoginError}
                onHide={() => setShowLoginError(false)}
            />
            </div> 
        </div>
    );
}

export default LoginForm