import React from "react";
import { reducer } from "../reducer/reducer";
import { Dispatch} from "../reducer/reducer";


export type AppProviderProps = {
  children: React.ReactNode;
};

export type AppState = {
  currentPosition: Coords;
  countingStarted: boolean;
  runningTime: number;
  mappedPositions: Array<Coords>;
  distance: number;
};
export type Coords = {
  accuracy: number;
  latitude: number;
  longitude: number;
  speed: number;
};

const AppStateContext = React.createContext<AppState | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const AppProvider: React.SFC<AppProviderProps> = ({
  children
}: AppProviderProps) => {
  const [AppState, dispatch] = React.useReducer(reducer, {
    currentPosition: {},
    countingStarted: false,
    runningTime: 0,
    mappedPositions: [],
    distance: 0,
  });
  return (
    <AppStateContext.Provider value={AppState}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
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
