import { AppState } from "../context/context";

type Action =
  | { type: "CURRENT_POSITION"; payload: any }
  | { type: "MAP_POSITIONS"; payload: any }
  | { type: "COUNTING_STARTED"; payload: any }
  | { type: "COUNT"; payload: number }
  | { type: "MAP_DISTANCE"; payload: number }
  | { type: "RESET" };

export type Dispatch = (action: Action) => void;

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "CURRENT_POSITION":
      return { ...state, currentPosition: action.payload };
    case "MAP_POSITIONS":
      const newMappedPositions = state.mappedPositions.concat(action.payload);
      return { ...state, mappedPositions: newMappedPositions };
    case "COUNTING_STARTED":
      return { ...state, countingStarted: action.payload };
    case "COUNT":
      return { ...state, runningTime: action.payload };
    case "MAP_DISTANCE":
      return { ...state, distance: state.distance + action.payload };
    case "RESET":
      return {
        ...state,
        countingStarted: false,
        runningTime: 0,
        mappedPositions: [],
        distance: 0
      };
    default:
      return state;
  }
};