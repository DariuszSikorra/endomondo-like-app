import React from "react";

import Menu from "./components/menu/Menu";
import MapContainer from "./components/map/MapContainer";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";
import { AppState, useAppState, useAppDispatch } from "./context/context";
import useStateInLocalStorage from "./localStorage/localStorage";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
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
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.root}>
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
          <Typography variant="h6" className={classes.title}>
            endomondo-like app
          </Typography>
          <Link href="https://github.com/DariuszSikorra/endomondo-like-app">
            <IconButton edge="end">
              <GitHubIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <MapContainer />
      <Menu />
    </div>
  );
};
export default App;
