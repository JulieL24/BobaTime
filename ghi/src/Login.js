import { useState } from 'react';
import { useToken } from './LoginToken';

function LoginComponent(){
    const [token, login] = useToken();


    return (
        <div className="container">
            <div className="page-top">
                <div>Hello, please login</div>
            </div> 
        </div>
    );

}

export default LoginComponent