// Main landing page

import React from 'react';
import { useSelector } from 'react-redux';

const MainContainer = () => {

  const handleLogin = () => {

  }  
    return (
        <div>
          <form>
            <div>
                <label>Username: 
                    <input type='text' value={username} />
                </label>
                <label>Password:
                    <input type='password' value={password} />
                </label>
            </div>
            <button type='submit' onClick={handleLogin}>Login</button>
          </form>
        </div>
    )
};


export default MainContainer;