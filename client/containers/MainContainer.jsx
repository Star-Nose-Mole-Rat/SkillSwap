import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
                <label>Username : 
                    <input type='text'  />
                </label>
                <br/>
                <label>Password : 
                    <input type='password'  />
                </label>
                
                <Button type='submit' variant='light'>Login</Button>
            </div>
          </form>
          <div>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </div>
        </div>
    )
};


export default MainContainer;