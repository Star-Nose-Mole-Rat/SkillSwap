import React from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addVideo } from "../userSlice";
import { useState } from "react";
import NavBar from "../components/Nav.jsx";
import YoutubeEmbed from "../components/YoutubeEmbed.jsx";

const userProfile = () => {
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [points, setPoints] = useState(useSelector((state) => state.users.points))

  const dispatch = useDispatch();
  const listOfVideos = useSelector((state) => state.users.videos);
  const username = useSelector((state) => state.users.username);
  // const points = useSelector((state) => state.users.points);
  const displayName = useSelector((state) => state.users.displayName);
  const userID = useSelector((state) => state.users.userId);

  const handleAddVideo = (e) => {
    e.preventDefault();

    // change to POST request with the body of username, uri, keywords
    fetch(`/addSkill`, {
      //localhost:8080/profile/profile
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userID,
        url: video,
        title: title,
        subject: subject,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
        return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        console.log('data.points', data.points);
        setPoints(data.points);
        dispatch(addVideo(video));
      }) 
      .catch((err) => console.log("Error in handleAddVideo", err));
  };
  return (
    <div>
      <NavBar />
      <Row className="justify-content-center">
        <div className="text-center">
          <h2>User Profile</h2>
        </div>
      </Row>
      <div className="user_profile">
        <div className="profile-picture">{/* <img href='#' /> */}</div>
        <div className="general-info">
          <div className="name">
            <p>Username: {username}</p>
          </div>
          <div>
            <p>Display Name: {displayName}</p>
          </div>
          <div className="points">
            <p>Points: {points}</p>
          </div>
          <div className='line_between'></div>
          <div className="uploadVideo">
            <p>Upload Video:</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            ></input>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            ></input>
            <input
              type="text"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              style={{ marginRight: "10px" }}
              placeholder="Enter video ID"
            ></input>
            <Button className="btn btn-info" onClick={handleAddVideo}>
              Upload Video
            </Button>
          </div>
          <div className='line_between'></div>
          <div className="uploadedVideos">
            <p>Your Videos:</p>
            <div className="videoDisplay">
              {listOfVideos.map((video, i) => (
                <div key={i}>
                <YoutubeEmbed embedId={video.url} />
                <p>{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
