import { Fragment } from "react";

const LikedSongs = ({ playlist, setPlaylist, getArtists }) => {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function removeSong(trackId) {
    const arr = playlist.filter((e) => {
      return e.data.id !== trackId;
    });
    setPlaylist(arr);
  }

  return (
    <>
      {playlist.length !== 0 && (
        <div className="playlist">
          <h1>Liked Songs</h1>
          <div className="likedSongsMenu">
            <span className="column">#</span>
            <span className="column">Title</span>
            <span className="column">Album</span>
            <span className="column">Duration</span>
            <span className="column"></span>
          </div>
          {playlist?.map((result, index) => {
            return (
              <div key={result.data.id} className="playlistItem">
                <span className="column">{index + 1}</span>
                <span className="column">
                  <img
                    src={result.data.albumOfTrack.coverArt.sources[1].url}
                    alt={result.data.name}
                  />
                  <span className="likedSongsTitleArtist">
                    <span className="trackName">{result.data.name}</span>
                    <span className="artistName">
                      {result.data.artists.items[0].profile.name}
                    </span>
                  </span>
                </span>
                <span className="column"> {result.data.albumOfTrack.name}</span>
                <span className="column">
                  {millisToMinutesAndSeconds(
                    result.data.duration.totalMilliseconds
                  )}
                </span>
                <span className="column">
                  <button
                    className="removeBtn"
                    onClick={() => removeSong(result.data.id)}
                    alt="Remove this song"
                  >
                    <span className="material-symbols-outlined">
                      heart_minus
                    </span>
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LikedSongs;
