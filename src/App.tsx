import React from "react";

import Menu from "./components/menu/Menu";
import MapContainer from "./components/map/MapContainer";

import { Button, Container } from "@material-ui/core";
import { useAppState, useAppDispatch } from "./context/context";

export default function App() {
  const AppState = useAppState();
  const dispatch = useAppDispatch();

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
}
