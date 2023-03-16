import "./Header.css";
import axios from "axios";
import logo from "./spotify-logo.png";
import { useState, useEffect, useRef } from "react";

const Header = ({ setData, genreList, setGenre, genre }) => {
  const [query, setQuery] = useState(null);
  const wrapperRef = useRef(null);
  const genreBtnRef = useRef(null);

  function handleSearch(e) {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/search/",
      params: {
        q: query,
        type: "multi",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
      headers: {
        "X-RapidAPI-Key": "4813ee6010mshf254a98ee454b41p12fe94jsnf0bb9b611826",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };
    if (query) {
      axios
        .request(options)
        .then(function (response) {
          wrapperRef.current.classList.remove("active");
          setData(response.data);
          setQuery("");
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          ref.current.classList.remove("active");
        } else {
          ref.current.classList.add("active");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      <a href="/">
        <img className="logo" src={logo} height="80px" alt="logo" />
      </a>
      <form className="formSearch" onSubmit={handleSearch}>
        <div
          ref={wrapperRef}
          className="search"
          onClick={useOutsideAlerter(wrapperRef)}
        >
          <input
            value={query || ""}
            className="searchInput"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            required
          ></input>

          <button className="searchBtn">
            {" "}
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </form>
      {genreList &&
        genreList.map((gnr) => {
          return (
            <button
              className="genreBtn"
              onClick={() => {
                genre !== gnr.value && setGenre(gnr.value);
              }}
              key={gnr.name}
              disabled={genre === gnr.value}
              ref={genreBtnRef}
            >
              {gnr.name}
            </button>
          );
        })}
    </>
  );
};

export default Header;
