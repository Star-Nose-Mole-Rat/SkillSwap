import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const handleRegister= (e) => {
        e.preventDefault();
        navigate('/search');
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <label>Full Name:
                    <input type='text'/>
                </label>
                <br/>
                <label>E-mail:
                    <input type='email'/>
                </label>
                <br/>
                <label>Username:
                    <input type='text'/>
                </label>
                <br/>
                <label>Password:
                    <input type='password'/>
                </label>
                <br/>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
};


export default Signup;