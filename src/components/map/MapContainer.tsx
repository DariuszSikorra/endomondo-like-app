import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { Map, Polyline, Marker } from "google-maps-react";
import { useAppState } from "../../context/context";
import { makeStyles } from "@material-ui/styles";
import LoadingContainer from "./LoadingContainer";

const AnyMap = Map as any;

//@ts-ignore
const useStyles = makeStyles(theme => ({
  fullScreen: {
    position: "relative",
    height: "calc(100vh - 64px)"
  }
}));

const MapContainer = () => {
  const classes = useStyles();
  const AppState = useAppState();
  
  return (
    <div className={classes.fullScreen}>
      <AnyMap
        //@ts-ignore
        google={window.google}
        zoom={14}
        initialCenter={{
          lat: AppState.currentPosition.latitude,
          lng: AppState.currentPosition.longitude
        }}
      >
        <Marker
          title={"The marker`s title will appear as a tooltip."}
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
      </AnyMap>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB84hoVHMpUlp32uEzPI7KzWW4hvekodFE",
  LoadingContainer: LoadingContainer
})(MapContainer);
