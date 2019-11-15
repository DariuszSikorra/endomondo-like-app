import React from "react";
import { reducer } from "../reducer/reducer";
import { Dispatch } from "../reducer/reducer";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

export type AppProviderProps = {
  children: React.ReactNode;
};

export type AppState = {
  currentPosition: Coords;
  zoom: number;
  countingStarted: boolean;
  runningTime: number;
  mappedPositions: Array<Coords>;
  distance: number;
  openTab: boolean;
};
export type Coords = {
  accuracy: number;
  latitude: number;
  longitude: number;
  speed: number;
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6eb63c"
    }
  }
});

const AppStateContext = React.createContext<AppState | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const AppProvider: React.SFC<AppProviderProps> = ({
  children
}: AppProviderProps) => {
  const [AppState, dispatch] = React.useReducer(reducer, {
    currentPosition: { lat: 52.834357, lng: 18.688854},
    zoom: 5,
    countingStarted: false,
    runningTime: 0,
    mappedPositions: [],
    distance: 0,
    openTab: false
  });
  return (
    <ThemeProvider theme={theme}>
      <AppStateContext.Provider value={AppState}>
        <AppDispatchContext.Provider value={dispatch}>
          {children}
        </AppDispatchContext.Provider>
      </AppStateContext.Provider>
    </ThemeProvider>
  );
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
};

const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useDispatchState must be used within AppProvider");
  }
  return context;
};

export { AppProvider, useAppState, useAppDispatch };
