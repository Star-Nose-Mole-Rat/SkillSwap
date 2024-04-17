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
            <div>
              <h2>User Profile</h2>
            </div>
            <div className='profile-picture'>
                {/* <img href='#' /> */}
            </div>
            <div className='general-info'>
              <div className='name'>
                <p>name</p>
                  {username}
                </div>
                <div className='points'>
                    <p>points</p>
                    {points}
                </div>
                <div className='uploadVideo'>
                    <p>upload video button here</p>
                    <input type = 'text' value={video} onChange={(e) => setVideo(e.target.value)}></input>
                    <Button className='btn btn-info' onClick={handleAddVideo}>Upload Video</Button>
                </div>
                <div className='uploadedVideos'>
                    <p>uploaded videos shown here</p>
                    <div className='videoDisplay'>
                    {listOfVideos.map((video, i) => <YoutubeEmbed key={i} embedId={video} />)}
                    </div>
                    <div>
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default userProfile;