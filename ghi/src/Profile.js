import { useState } from 'react';
import { useEffect } from 'react';
import { useToken } from './LoginToken';

function Profile(){
    const token = useToken()[0];
  


    return (
        <div className="container">
            <div className="page-top">
            hi
                
            </div>
        </div>
    );

}

export default Profile