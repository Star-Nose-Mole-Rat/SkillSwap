import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContainer = () => {
    const navigate = useNavigate();

  const redirectToProfile = (e) => {
    e.preventDefault();
    navigate('/profile');
  }

  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/');
  }

    return (
        <div>
            <nav>
                <button id='nav_profile' onClick={redirectToProfile}>Profile</button>
                <button id='nav_logout' onClick={handleLogout}>Logout</button>
            </nav>
            <div>
                <form>
                    <input type='text' placeholder='Search...' />
                    <button type='submit'>Search</button>
                </form>
            </div>
            <div className='searchResults'>

            </div>
        </div>
    )
};

export default SearchContainer;