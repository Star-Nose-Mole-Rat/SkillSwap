import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainContainer = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/search');
  }  

    return (
        <div> <h3>hi, test</h3>
          <form onSubmit={handleLogin}>
            <div>
                <label>Username: 
                    <input type='text'  />
                </label>
                <label>Password:
                    <input type='password'  />
                </label>
            </div>
            <button type='submit' >Login</button>
          </form>
        </div>
    )
};


export default MainContainer;