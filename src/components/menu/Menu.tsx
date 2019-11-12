import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";

import Container from "@material-ui/core/Container";

export interface MenuProps {}
const Menu: React.SFC<MenuProps> = () => {
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  //Watching for changing position.
  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      };
      const success = (pos: any) => {
        const crd = pos.coords;
        dispatch({ type: "CURRENT_POSITION", payload: crd });
      };
      const error = (err: any) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
      navigator.geolocation.watchPosition(success, error, options);
    } else {
      console.log(
        "Something get wrong, geolocation is disabled, or your browser is not supporting it"
      );
    }
  }, [dispatch]);

  const timerIdRef: any = useRef(null);

  const handleToggle = () => {
    clearInterval(timerIdRef.current);
    if (AppState.countingStarted) {
      dispatch({ type: "COUNTING_STARTED", payload: false });
    } else {
      const startTime = Date.now() - AppState.runningTime;
      timerIdRef.current = setInterval(() => {
        dispatch({ type: "COUNT", payload: Date.now() - startTime });
        const transformedPosition = {
          lat: AppState.currentPosition.latitude,
          lng: AppState.currentPosition.longitude
        };
        dispatch({ type: "MAP_POSITIONS", payload: transformedPosition });

        if (AppState.mappedPositions.length > 1) {
          const positionOne =
            AppState.mappedPositions[AppState.mappedPositions.length - 2];
          const positionTwo =
            AppState.mappedPositions[AppState.mappedPositions.length - 1];
          return distanceCounter(positionOne, positionTwo);
        } else {
          const positionOne = { latitude: 0, longitude: 0 };
          const positionTwo = { latitude: 0, longitude: 0 };
          return distanceCounter(positionOne, positionTwo);
        }
      }, 1000);
      dispatch({ type: "COUNTING_STARTED", payload: true });
    }
  };

  const timerValue = (
    <div>
      <span>{Math.floor((AppState.runningTime / 1000 / 60) << 0)}</span>:
      <span>
        {Math.floor((AppState.runningTime / 1000) % 60) < 10 && 0}
        {Math.floor((AppState.runningTime / 1000) % 60)}
      </span>
    </div>
  );

  const distanceCounter = (positionOne: any, positionTwo: any) => {
    const lat1 = positionOne.latitude;
    const lon1 = positionOne.longitude;
    const lat2 = positionTwo.latitude;
    const lon2 = positionTwo.longitude;
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km

    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }

    console.log(d);
    return dispatch({ type: "MAP_DISTANCE", payload: d });
  };

  return (
    <div className="mapContainer">
      <Container maxWidth="sm">
        <h1>Menu</h1>
        Coords:
        <ul>
          <li>Latitude: {AppState.currentPosition.latitude}</li>
          <li>Longitude: {AppState.currentPosition.longitude}</li>
          <li>Accuracy: {Math.floor(AppState.currentPosition.accuracy)}m</li>
          <li>Current speed: {AppState.currentPosition.speed}</li>
          <li>Current distance: {AppState.distance}</li>
        </ul>{" "}
        <button onClick={handleToggle}>
          {AppState.countingStarted ? "Stop" : "Start"}
        </button>
        {timerValue}
        <button onClick={() => console.log(AppState.mappedPositions)}>
          PUP!
        </button>
      </Container>
    </div>
  );
};

export default Menu;
