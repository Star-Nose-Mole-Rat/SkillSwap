import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addVideo } from '../userSlice';
import { useState } from 'react';
import NavBar from '../components/Nav.jsx';
import YoutubeEmbed from '../components/YoutubeEmbed.jsx';

const userProfile = () => {
    const [video, setVideo] = useState('');

    const dispatch = useDispatch();
    const listOfVideos = useSelector(state => state.users.videos);
    const username = useSelector(state => state.users.username);
    const points = useSelector(state => state.users.points);
    const displayName = useSelector(state => state.users.displayName);
    

    const handleAddVideo = e => {
        e.preventDefault();
        
        fetch(`/addvideo?username=${username}&videouri=${video}`)
        .then(data => {
            if (data.ok) {
                dispatch(addVideo(video));
            }
        })
        .catch(err => console.log('Error in handleAddVideo', err))
    }
    return (
        <div>
          <NavBar />
          <Row className='justify-content-center'>
            <div className='text-center'>
              <h2>User Profile</h2>
            </div>
          </Row>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='profile-picture'>
                {/* <img href='#' /> */}
            </div>
            <div className='general-info'>
              <div className='name'>
                <p>Username: {username}</p>
                </div>
                <div>
                    <p>Display Name: {displayName}</p>
                </div>
                <div className='points'>
                    <p>Points: {points}</p>                    
                </div>
                
                <div className='uploadVideo'>
                    <p>upload video button here</p>
                    <input type = 'text' value={video} onChange={(e) => setVideo(e.target.value)} style={{ marginRight: '10px' }}></input>
                    <Button className='btn btn-info' onClick={handleAddVideo}>Upload Video</Button>
                </div>
                <div className='uploadedVideos'>
                    <p>uploaded videos shown here</p>
                    <div className='videoDisplay'>
                    {listOfVideos.map((video, i) => <YoutubeEmbed key={i} embedId={video} />)}
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default userProfile;