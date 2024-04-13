import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import { addVideo } from '../userSlice';

const SearchContainer = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const videos = useSelector(state => state.users.videos);

  // const handleAddVideo = (e) => {
  //   e.preventDefault();
  //   // dispatch(addVideo('Three phase power'))
  //   console.log(e.target.id);
  // }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearch = () => {
    console.log('searching for: ', search);
    fetch('/search?searchword=' + search, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => { console.log('invalid fetch request', err)});
  }

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
                
                    <input type='text' id='input_search' onChange={handleSearchChange} placeholder='Search...' />
                    <button onClick={handleSearch}>Search</button>
                
            </div>
            <div className='searchResults'>
              {videos.map(video => <p>{video}</p>)}
            </div>
        </div>
    )
};

export default SearchContainer;