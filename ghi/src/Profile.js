import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthContext, useToken } from './LoginToken';

function Profile(){
    const [currentUser, setCurrentUser] = useState({});

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
  

    return (
        <div className="container">
            <div className="page-top">
                <h3 className="welcome-tag">
                    Welcome, {currentUser?.user?.first_name}!
                </h3>
            </div>
        </div>
    );
}

export default Profile