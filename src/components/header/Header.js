import "./Header.css";
import axios from "axios";
import logo from "./spotify-logo.png";
import { useState } from "react";

const Header = ({ setData }) => {
  const [query, setQuery] = useState(null);
  async function handleSearch(e) {
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
      await axios
        .request(options)
        .then(function (response) {
          //console.log(response.data);
          setData(response.data);
          setQuery("");
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  return (
    <>
      <a href="/">
        <img className="logo" src={logo} height="80px" alt="logo" />
      </a>
      <form className="formSearch" onSubmit={handleSearch}>
        <input
          value={query || ""}
          className="searchInput"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="insert artist/track name"
          required
        ></input>

        <button className="searchBtn">Search</button>
      </form>
    </>
  );
};

export default Header;
