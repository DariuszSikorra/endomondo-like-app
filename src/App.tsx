import React from "react";

import Menu from "./components/menu/Menu";
import MapContainer from "./components/map/MapContainer";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles
} from "@material-ui/core";
import { AppState, useAppState, useAppDispatch } from "./context/context";
import useStateInLocalStorage from "./localStorage/localStorage";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  useStateInLocalStorage({
    state: useAppState(),
    name: "data",
    initializeFn: (state: AppState) =>
      dispatch({ type: "RESET", payload: state })
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() =>
              dispatch({ type: "TOGGLE_TAB", payload: !AppState.openTab })
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">endomondo-like app</Typography>
        </Toolbar>
      </AppBar>
      <Menu />
      <MapContainer />
    </>
  );
};
export default App;
