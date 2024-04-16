import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MainContainer = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/search');
  }  

    return (
        <div> <h2>SkiLL SwAP</h2>
          <form onSubmit={handleLogin}>
            <div>
                <label>Username: 
                    <input type='text'  />
                </label>
                <label>Password:
                    <input type='password'  />
                </label>
                <button type='submit' >Login</button>
            </div>
          </form>
          <div>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </div>
        </div>
    )
};


export default MainContainer;