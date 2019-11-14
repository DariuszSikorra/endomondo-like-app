import React, { useEffect } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import { useInterval } from "./setInterval";
import Button from "@material-ui/core/Button";
import {
  Typography,
  ButtonGroup,
  SwipeableDrawer,
  Grid,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  verticalPadding: {
    padding: theme.spacing(1, 0)
  }
}));

export interface MenuProps {}
const Menu: React.SFC<MenuProps> = () => {
  const classes = useStyles();
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  const startTime = Date.now() - AppState.runningTime;

  const onLocationRead = () => {
    //Time counter
    dispatch({ type: "COUNT", payload: Date.now() - startTime });
    //Pushing new coords to positions array
    const transformedPosition = {
      lat: AppState.currentPosition.latitude,
      lng: AppState.currentPosition.longitude
    };
    dispatch({ type: "MAP_POSITIONS", payload: transformedPosition });
    //Continuously assigning last two coords from positions array to distance equation
    if (AppState.mappedPositions.length > 1) {
      const positionOne =
        AppState.mappedPositions[AppState.mappedPositions.length - 2];
      const positionTwo =
        AppState.mappedPositions[AppState.mappedPositions.length - 1];
      return distanceCounter(positionOne, positionTwo);
    } else {
      const positionOne = { lat: 0, lng: 0 };
      const positionTwo = { lat: 0, lng: 0 };
      return distanceCounter(positionOne, positionTwo);
    }
  };
  useInterval(onLocationRead, 1000, AppState.countingStarted);

  //Distance equation
  const distanceCounter = (positionOne: any, positionTwo: any) => {
    const lat1 = positionOne.lat;
    const lon1 = positionOne.lng;
    const lat2 = positionTwo.lat;
    const lon2 = positionTwo.lng;
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);
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

    return dispatch({ type: "MAP_DISTANCE", payload: d });
  };

  //Watching for changing position.
  useEffect(() => {
    let watchId = 0;
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
      watchId = navigator.geolocation.watchPosition(success, error, options);
    } else {
      console.log(
        "Something get wrong, geolocation is disabled, or your browser is not supporting it"
      );
    }
    return () => navigator.geolocation.clearWatch(watchId);
  }, [dispatch]);

  //Toggle time counter button
  const handleToggle = () => {
    dispatch({ type: "COUNTING_STARTED", payload: !AppState.countingStarted });
  };

  //Simple timer transformations
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
    <SwipeableDrawer
      anchor="bottom"
      open={AppState.openTab}
      onClose={() =>
        dispatch({ type: "TOGGLE_TAB", payload: !AppState.openTab })
      }
      onOpen={() =>
        dispatch({ type: "TOGGLE_TAB", payload: !AppState.openTab })
      }
    >
      <Grid container justify="center" className={classes.verticalPadding}>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              Accuracy: ~{Math.floor(AppState.currentPosition.accuracy)}m
            </Grid>
            <Grid item>
              Current speed:{" "}
              {AppState.currentPosition.speed
                ? Math.floor((AppState.currentPosition.speed * 1000) / 60) +
                  "km/h"
                : "-"}
            </Grid>
            <Grid item>
              Current distance: {Math.floor(AppState.distance * 1000)}m
            </Grid>
            <Grid item>
              <Typography
                color="primary"
                variant="h5"
                component="h3"
                align="center"
              >
                {timerValue}
              </Typography>
            </Grid>
            <Grid container item justify="center">
              <ButtonGroup color="primary" variant="contained">
                <Button onClick={handleToggle}>
                  {AppState.countingStarted ? "Pause" : "Start"}
                </Button>
                {!AppState.countingStarted && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => dispatch({ type: "RESET_BUTTON" })}
                  >
                    Reset
                  </Button>
                )}
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SwipeableDrawer>
  );
};

export default Menu;
