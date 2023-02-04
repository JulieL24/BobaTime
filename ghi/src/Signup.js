import { useState } from 'react';
import { useToken } from './LoginToken';

function SignupForm(props){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const signup = useToken()[2]; 

    return (
        <div className="row page-top">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Signup</h2>
                    <form>
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
                            <input value={password} onChange={e => setPassword(e.target.value)} required type="password" className="form-control" id="password" placeholder='password' />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
      </div>
    );

}

export default SignupForm