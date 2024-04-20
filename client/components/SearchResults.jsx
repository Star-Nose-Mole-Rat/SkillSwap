import React from "react";
import YoutubeEmbed from "./YoutubeEmbed.jsx";

const SearchResults = ({ videos }) => {
  // check to see if videos have elements in them
  if (videos.length <= 0) return <span>No results found!</span>;
  // loop through the videos
  const videosArray = videos.map((video, i) =>
    video.url ? (
      <div key={i}>
        <YoutubeEmbed embedId={video.url} />
        <p>{video.title}</p>
      </div>
    ) : null
  );
  // check to see if the videos are valid
  // return that array of videos as a compnent
  return <div className="searchResults"> {videosArray} </div>;

  //   return {
  //     videos.length > 0 ? (
  //       videos.map((video, i) => (
  //         <div key={i}>
  //           <YoutubeEmbed embedId={video.url} />
  //           <p>{video.title}</p>
  //         </div>
  //       ))
  //     ) : (
  //       <span>No results found!</span>
  //     );
  //   }
};

export default SearchResults;
