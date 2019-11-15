import { useAppState, useAppDispatch } from "../../context/context";
import { useInterval } from "./setInterval";

export function useLocationReadInterval() {
    const AppState = useAppState();
    const dispatch = useAppDispatch();

    const startTime = Date.now() - AppState.runningTime;
    const onLocationRead = () => {
        //Time counter
        dispatch({ type: "COUNT", payload: Date.now() - startTime });
        //Pushing new coords to positions array
        const transformedPosition = {
            lat: AppState.currentPosition.latitude,
            lng: AppState.currentPosition.longitude
        };
        dispatch({ type: "MAP_POSITIONS", payload: transformedPosition });
        //Continuously assigning last two coords from positions array to distance equation
        if (AppState.mappedPositions.length > 1) {
            const positionOne =
                AppState.mappedPositions[AppState.mappedPositions.length - 2];
            const positionTwo =
                AppState.mappedPositions[AppState.mappedPositions.length - 1];
            return distanceCounter(positionOne, positionTwo);
        } else {
            const positionOne = { lat: 0, lng: 0 };
            const positionTwo = { lat: 0, lng: 0 };
            return distanceCounter(positionOne, positionTwo);
        }
    };

    useInterval(onLocationRead, 1000, AppState.countingStarted);

    //Distance equation
    const distanceCounter = (positionOne: any, positionTwo: any) => {
        const lat1 = positionOne.lat;
        const lon1 = positionOne.lng;
        const lat2 = positionTwo.lat;
        const lon2 = positionTwo.lng;
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);
        let dLon = deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km

        function deg2rad(deg: number) {
            return deg * (Math.PI / 180);
        }

        return dispatch({ type: "MAP_DISTANCE", payload: d });
    };
}