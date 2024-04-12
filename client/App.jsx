import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainContainer from './containers/MainContainer';

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<MainContainer />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/profile' element={<UserProfile />} />
            </Routes>
        </div>
    )
};

export default App;