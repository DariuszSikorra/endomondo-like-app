import React from "react";

import MapWrapper from "./MapWrapper"

export type MapContainerProps = {};

const MapContainer: React.SFC<MapContainerProps> = props => {
  

  return (
    <div className="mapContainer">
      <h1>Jestem mapą</h1>
      <MapWrapper />
    </div>
  );
};

export default MapContainer;
