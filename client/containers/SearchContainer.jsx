import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import NavBar from "../components/Nav.jsx";
// import YoutubeEmbed from "../components/YoutubeEmbed.jsx";
// import { addVideos } from "../userSlice.js";
import SearchResults from "../components/SearchResults.jsx";

const SearchContainer = () => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  // const videos = useSelector((state) => state.users.videos);
  // const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
 
  const handleVideoAccessed = e => {
    console.log('video was clicked');
  
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching for: ", search);
    fetch("/searchKeyword?searchword=" + search, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        // if data is null, how can we render a message informing the user?
        setVideos(data);
      })
      .catch((err) => {
        console.log("invalid search request", err);
      });
  };

  return (
    <div>
      <NavBar />
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "10px" }}
      >
        <input
          type="text"
          id="input_search"
          onChange={handleSearchChange}
          placeholder="Search subject..."
          style={{ marginRight: "10px" }}
        />
        <Button onClick={handleSearch} className="btn btn-info">
          Search
        </Button>
      </div>
      <div>
        <SearchResults videos={videos} />

        {/* {videos.map((video, i) =>
          video.url ? (
            <div key={i}>
              <YoutubeEmbed embedId={video.url} />
              <p>{video.title}</p>
            </div>
          ) : (
            <p>Video not found</p>
          )
        )} */}
      </div>
    </div>
  );
};

export default SearchContainer;
