import { useState } from "react";
import LikedSongs from "../likedSongs/LikedSongs";
import Song from "../song/Song";

const List = ({ data }) => {
  const [playlist, setPlaylist] = useState([]);

  function getArtists(trackId) {
    let artists = [];
    for (const track of playlist) {
      if (track.id === trackId) {
        for (const artist of track.artists.items) {
          artists.push(artist.profile.name);
        }
      }
    }
    return artists.join(" x ");
  }

  return (
    <>
      <div className="results">
        {data &&
          data.tracks.items.map((result) => {
            return (
              <Song
                key={result.data.id}
                result={result}
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
            );
          })}
      </div>
      <LikedSongs
        playlist={playlist}
        setPlaylist={setPlaylist}
        getArtists={getArtists}
      />
    </>
  );
};

export default List;
