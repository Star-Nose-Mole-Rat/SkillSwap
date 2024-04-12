import React from 'react';

const SearchContainer = () => {
  const handleInputChange = () => {

  }
    return (
        <div>
            <nav>
                <button>Profile</button>
            </nav>
            <div>
                <form>
                    <input type='text' value={searchQuery} onChange={handleInputChange} placeholder='Search...' />
                    <button type='submit'>Search</button>
                </form>
            </div>
            <div className='searchResults'>

            </div>
        </div>
    )
};

export default SearchContainer;