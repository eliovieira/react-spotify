import React from "react";

const Song = ({ result, playlist, setPlaylist }) => {
  function checkIfItsOnLikedSongs(track) {
    const x = playlist.filter((element) => {
      return element.data.id === track.data.id;
    });

    if (x.length === 1) {
      return true;
    }
  }

  function addPlaylist(track) {
    const x = playlist.filter((element) => {
      return element.data.id === track.data.id;
    });

    if (x.length === 0) {
      const arr = [...playlist];
      arr.push(track);
      setPlaylist(arr);
    } else {
      const removeValue = playlist.filter((element) => {
        return element.data.id !== track.data.id;
      });
      setPlaylist(removeValue);
    }
  }

  return (
    <div className="result" key={result.data.id}>
      <img
        src={result.data.albumOfTrack.coverArt.sources[0].url}
        width="150px"
        alt={result.data.name}
      />
      <div className="trackInfo">
        <span className="trackName">{result.data.name}</span>
        <span className="artistName">
          {result.data.artists.items[0].profile.name}
        </span>
        <button
          className={
            checkIfItsOnLikedSongs(result)
              ? "favoriteBtn disabled"
              : "favoriteBtn"
          }
          onClick={(e) => {
            addPlaylist(result);
          }}
          // disabled={checkPlaylist(result.data.id)}
        >
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
    </div>
  );
};

export default Song;
