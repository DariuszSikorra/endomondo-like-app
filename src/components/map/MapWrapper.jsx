import React from "react";
import { Map, Polyline, Marker } from "google-maps-react";

import { useAppState } from "../../context/context";

export const MapWrapper = () => {
  const AppState = useAppState();

  return (
    <div className="mapWrapper">
      <Map
        google={window.google}
        style={{ width: "100%", height: "100%" }}
        className={"map"}
        zoom={14}
        initialCenter={{
          lat: AppState.currentPosition.latitude,
          lng: AppState.currentPosition.longitude
        }}
      >
        <Marker
          title={"The marker`s title will appear as a tooltip."}
          name={"SOMA"}
          position={{
            lat: AppState.currentPosition.latitude,
            lng: AppState.currentPosition.longitude
          }}
        />
        <Polyline
          path={AppState.mappedPositions}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={3}
        />
      </Map>
    </div>
  );
};

export default MapWrapper;
