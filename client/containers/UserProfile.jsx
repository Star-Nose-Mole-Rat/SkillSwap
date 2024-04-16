import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVideo } from '../userSlice';
import { useState } from 'react';

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
        <div className='user-profile'>
            <h2>User Profile</h2>
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
                    <button onClick={handleAddVideo}>Upload Video</button>
                </div>
                <div className='uploadedVideos'>
                    <p>uploaded videos shown here</p>
                    {listOfVideos.map((video, i) => <p key={i}>{video}</p>)}
                </div>
            </div>
        </div>
    )
}

export default userProfile;