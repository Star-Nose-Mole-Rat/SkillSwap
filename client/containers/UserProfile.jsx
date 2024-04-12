import react from 'react';

const userProfile = () => {

    return (
        <div className='user-profile'>
            <h2>User Profile</h2>
            <div className='profile-picture'>
                <img src={pictureUrl} />
            </div>
            <div className='general-info'>
                <div className='name'>
                    <p>name</p>
                </div>
                <div className='email'>
                    <p>email</p>
                </div>
                <div className='points'>
                    <p>points</p>
                </div>
                <div className='uploadVideo'>
                    <p>upload video button here</p>
                </div>
                <div className='uploadedVideos'>
                    <p>uploaded videos shown here</p>
                </div>
            </div>
        </div>
    )
}

export default userProfile;