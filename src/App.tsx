import React from "react";

import Menu from "./components/menu/Menu";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MapContainer from "./components/map/MapContainer";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

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
      <Container maxWidth="sm">
        <Button
          // style={{ position: "absolute", zIndex: 4 }}
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
