import { useState } from 'react';
import { useToken } from './LoginToken';

function LoginForm(){
    const login = useToken()[1];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.log("invalid email or password")
        }
    }


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
            </div> 
        </div>
    );

}

export default LoginForm