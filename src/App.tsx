import React from "react";

import Menu from "./components/menu/Menu";

import MapContainer from "./components/map/MapContainer";
import { Drawer, Button, Container } from "@material-ui/core";

export default function App() {
  // const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: true
  });

  const toggleDrawer = (side: any, open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  return (
    <>
      <Container style={{ textAlign: "center", background: "gray" }}>
        <Button
          onClick={toggleDrawer("bottom", true)}
          variant="contained"
          color="primary"
        >
          OPEN TAB
        </Button>
      </Container>
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        <Menu />
      </Drawer>
      <MapContainer />
    </>
  );
}
