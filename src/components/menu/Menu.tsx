import React, { useEffect } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import Button from "@material-ui/core/Button";
import {
  Typography,
  ButtonGroup,
  SwipeableDrawer,
  Grid,
  makeStyles
} from "@material-ui/core";
import { useLocationReadInterval } from "./useLocationReadInterval";

const useStyles = makeStyles(theme => ({
  verticalPadding: {
    padding: theme.spacing(1, 0)
  }
}));

const Menu: React.FC = () => {
  const classes = useStyles();
  const AppState = useAppState();
  const dispatch = useAppDispatch();
  useLocationReadInterval();

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

  const toggleMenu = () =>
    dispatch({ type: "TOGGLE_TAB", payload: !AppState.openTab });

  return (
    <SwipeableDrawer
      variant="persistent"
      anchor="bottom"
      open={AppState.openTab}
      onClose={toggleMenu}
      onOpen={toggleMenu}
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
                <Button
                  onClick={() => {
                    dispatch({
                      type: "COUNTING_STARTED",
                      payload: !AppState.countingStarted
                    });
                  }}
                >
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
