import React, { useEffect, useRef, RefAttributes } from "react";
import { useAppDispatch, useAppState } from "../../context/context";

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
        dispatch({ type: "COUNT", payload: Date.now() - startTime })
        const transformedPosition = { lat: AppState.currentPosition.latitude, lng: AppState.currentPosition.longitude }
        dispatch({ type: "MAP_POSITIONS", payload: transformedPosition })
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

  return (
    <div className="mapContainer">
      <h1>Menu</h1>
      Coords:
      <ul>
        <li>Latitude: {AppState.currentPosition.latitude}</li>
        <li>Longitude: {AppState.currentPosition.longitude}</li>
        <li>Accuracy: {AppState.currentPosition.accuracy}</li>
      </ul>{" "}
      <button onClick={handleToggle}>
        {AppState.countingStarted ? "Stop" : "Start"}
      </button>
      {timerValue}
      <button onClick={() =>console.log(AppState.mappedPositions)} >Wyświetl positions array</button>
    </div>
  );
};

export default Menu;
