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
  apiKey: "AIzaSyCemKeklp6hKhbSOQk6YJpOhCwNKPeIVsc"
}) (MapContainer);
