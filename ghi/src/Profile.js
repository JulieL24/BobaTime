import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthContext, useToken } from './LoginToken';

function Profile(){
    // const token = useToken()[0];
    const [currentUser, setCurrentUser] = useState([]);
    const {token} = useAuthContext(); 


}

export default Profile