import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContainer = () => {
    const navigate = useNavigate();

  const redirectToProfile = (e) => {
    e.preventDefault();
    navigate('/profile');

  }
    return (
        <div>
            <nav>
                <button onClick={redirectToProfile}>Profile</button>
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