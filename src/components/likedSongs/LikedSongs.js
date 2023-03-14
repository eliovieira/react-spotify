import { Fragment } from "react";

const LikedSongs = ({ playlist, getArtists }) => {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <>
      {playlist.length !== 0 && (
        <Fragment>
          <h1>Liked Songs</h1>
          <div className="likedSongsMenu">
            <span className=" column">#</span>
            <span className=" column">Title</span>
            <span className="column">Album</span>
            <span className=" column">Duration</span>
          </div>
        </Fragment>
      )}
      <div className="playlist">
        {playlist &&
          playlist.map((result, index) => {
            return (
              <div key={result.data.id} className="playlistItem">
                <span className="column">{index + 1}</span>
                <span className="column">
                  {" "}
                  <div className="playlistTrackNameImage">
                    <span className="playlistTrackArt">
                      <img
                        src={result.data.albumOfTrack.coverArt.sources[1].url}
                        alt={result.data.name}
                      />
                    </span>
                    <span className="playlistTrackDetails">
                      <span className="playlistTrackTitle">
                        {result.data.name}
                      </span>
                      <span className="playlistTrackArtists">
                        {getArtists(result.data.id)}
                      </span>
                    </span>
                  </div>
                </span>
                <span className="column"> {result.data.albumOfTrack.name}</span>
                <span className="column">
                  {millisToMinutesAndSeconds(
                    result.data.duration.totalMilliseconds
                  )}
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default LikedSongs;
