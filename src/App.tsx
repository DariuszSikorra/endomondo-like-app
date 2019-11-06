import React from "react";

import Menu from "./components/menu/Menu";
import MapContainer from "./components/map/MapContainer";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu />
      <MapContainer />
    </div>
  );
};

export default App;
