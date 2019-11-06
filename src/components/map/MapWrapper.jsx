import * as React from "react";
import { Map, Polyline, Marker, GoogleApiWrapper } from "google-maps-react";

import { useAppState } from "../../context/context";


export const MapWrapper = () => {
  const AppState = useAppState();

  // const myPolyline = [
  //   { lat: 54.6082249, lng: 18.2469871 },
  //   { lat: 54.600505, lng: 18.257425 },
  //   { lat: 54.602127,  lng: 18.245686 },
  //   { lat: 54.6082249, lng: 18.2469871 },
  // ];
  return (
    <div className="mapWrapper">
      <Map
        google={window.google}
        style={{ width: "40vw", height: "70vh" }}
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
          position={{ lat: AppState.currentPosition.latitude, lng: AppState.currentPosition.longitude }}
        />
        <Polyline
          // path={myPolyline}
          path={AppState.mappedPositions}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapWrapper);
