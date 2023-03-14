import "./App.css";

import { useState } from "react";

//components
import Header from "./components/header/Header";
import List from "./components/list/List";
import Footer from "./components/footer/Footer";

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="App">
      <div className="container">
        <Header setData={setData} />
        <List data={data} />
        {data && <Footer />}
      </div>
    </div>
  );
}

export default App;
