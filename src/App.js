import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

//components
import Header from "./components/header/Header";
import List from "./components/list/List";
import Footer from "./components/footer/Footer";

function App() {
  const [data, setData] = useState(null);
  const [genre, setGenre] = useState("r&b");
  const genreList = [
    { name: "Hip Hop", value: "hip hop" },
    { name: "R&B", value: "r&b" },
    { name: "Rock", value: "rock" },
    { name: "Pop", value: "pop" },
  ];

  useEffect(() => {
    if (genre !== "") {
      const options = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/search/",
        params: {
          q: `genre:${genre}`,
          type: "multi",
          offset: "0",
          limit: "10",
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key":
            "730d60cdc4mshd1038ddc2977edfp184505jsn8bdb7d7b9875",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [genre]);

  return (
    <div className="App">
      <div className="container">
        <Header
          setData={setData}
          genreList={genreList}
          setGenre={setGenre}
          genre={genre}
        />
        <List data={data} genre={genre} />
        {data && <Footer />}
      </div>
    </div>
  );
}

export default App;
