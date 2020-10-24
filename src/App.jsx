import React from "react";
import "./App.css";
import Locations from "./components/normal-react-no-hooks/Locations";
import LocationsWithHooks from "./components/with-hooks/LocationsWithHooks";

function App() {
  return (
    <div className="App">
      {/* uncomment next line if you want default react without hooks */}
      {/* <Locations /> */}
      <LocationsWithHooks />
    </div>
  );
}

export default App;
