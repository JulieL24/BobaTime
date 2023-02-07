import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteNav from './Nav';
import { AuthProvider, useToken } from './LoginToken';
import LoginForm from './Login';
import SignupForm from './Signup';
import Profile from './Profile';
import Home from './Homepage';
import PrivateRoute from './PrivateRoute';


const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, '');

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null
}


function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <SiteNav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route>
                <Route path="/profile"  element={<PrivateRoute>
                  <Profile />
                </PrivateRoute>} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/signup" element={<SignupForm/>} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
