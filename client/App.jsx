import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainContainer from './containers/MainContainer.jsx';
import SearchContainer from './containers/SearchContainer.jsx';
import UserProfile from './containers/UserProfile.jsx';
import Signup from './containers/Signup.jsx';

const App = () => {
    return (
        <Router>
        <div>
            <Routes>
                <Route exact path='/' element={<MainContainer />} />
                <Route path='/search' element={<SearchContainer />} />
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
        </Router>
    )
};

export default App;