import React from "react";

import Menu from "./components/menu/Menu";
import MapContainer from "./components/map/MapContainer";

import { Button, Container } from "@material-ui/core";
import { AppState, useAppState, useAppDispatch } from "./context/context";
import useStateInLocalStorage from "./localStorage/localStorage";

const App: React.FC = () => {
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
      <Container style={{ textAlign: "center", background: "gray" }}>
        <Button
          onClick={() =>
            dispatch({ type: "TOGGLE_TAB", payload: !AppState.openTab })
          }
          variant="contained"
          color="primary"
        >
          OPEN TAB
        </Button>
      </Container>
      <Menu />
      <MapContainer />
    </>
  );
};
export default App;
