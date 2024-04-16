import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDisplayName, addUser } from '../userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister= (e) => {
        e.preventDefault();

        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
          })
          .then(data => data.json())
          .then(data => console.log(data))
          .catch(err => { console.log('invalid fetch request', err)});
      


        // navigate('/search');
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <label>Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <br/>
                <label>Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
};


export default Signup;