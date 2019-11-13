import React from "react";
import { GoogleApiWrapper } from "google-maps-react";

import MapWrapper from "./MapWrapper"


const MapContainer = () => {
  return (
    <div className="mapContainer">
      <MapWrapper />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAGnzKbqsq9u1BjIswxPr6p5SveDtx7H20"
}) (MapContainer);
