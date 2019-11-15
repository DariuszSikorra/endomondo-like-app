import { AppState } from "../context/context";

type Action =
  | { type: "RESET"; payload: AppState }
  | { type: "CURRENT_POSITION"; payload: any }
  | { type: "MAP_POSITIONS"; payload: any }
  | { type: "COUNTING_STARTED"; payload: any }
  | { type: "COUNT"; payload: number }
  | { type: "MAP_DISTANCE"; payload: number }
  | { type: "RESET_BUTTON" }
  | { type: "TOGGLE_TAB"; payload: boolean };

export type Dispatch = (action: Action) => void;

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "RESET":
      return action.payload;
    case "CURRENT_POSITION":
      return { ...state, currentPosition: action.payload, zoom: 14 };
    case "MAP_POSITIONS":
      const newMappedPositions = state.mappedPositions.concat(action.payload);
      return { ...state, mappedPositions: newMappedPositions };
    case "COUNTING_STARTED":
      return { ...state, countingStarted: action.payload };
    case "COUNT":
      return { ...state, runningTime: action.payload };
    case "MAP_DISTANCE":
      return { ...state, distance: state.distance + action.payload };
    case "RESET_BUTTON":
      return {
        ...state,
        countingStarted: false,
        runningTime: 0,
        mappedPositions: [],
        distance: 0
      };
    case "TOGGLE_TAB":
      return {
        ...state,
        openTab: action.payload
      };
    default:
      return state;
  }
};
