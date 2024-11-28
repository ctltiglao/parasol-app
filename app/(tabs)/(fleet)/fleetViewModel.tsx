// react native
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import * as Location from "expo-location";
// gluestack

import { getDistance } from "geolib";

export const startFleetTracking = async ({prevLocation}: any) => {
    const [distance, setDistance] = useState(0);
    // const [prevLocation, setPrevLocation] = useState<any|null>(null);

    // setPrevLocation(await Location.getCurrentPositionAsync({}));
    console.log(prevLocation);

    try {
        await Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1
        }, (newLocation) => {
            const { latitude, longitude } = newLocation.coords;

            if (prevLocation) {
                const dist = getDistance(
                    {latitude: prevLocation.coords.latitude, longitude: prevLocation.coords.longitude},
                    {latitude, longitude}
                );

                setDistance((prevDistance) => prevDistance + dist);
                console.warn(distance);
            }

            // setPrevLocation({latitude, longitude});
            console.log(distance);
            return distance;
        })
    } catch(e) {
        alert(`Failed to start tracking: ${e}`);
    }
}

export const formatTravelTime = (totalSeconds : any) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${minutes}:${seconds}`;
}

export const getAveSpeed = (distance: any, time: any) => {
    const distanceKm = distance / 1000;
    const timeHour = time / 3600;

    return (distanceKm / timeHour).toFixed(2);
}

export const getFleetDetails = async () => {
    try {
        const json = await AsyncStorage.getItem('FleetVehicle');
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        alert(`Failed to fetch fleet details ${error}`);
    }
}

export const setFleetRecord = async() => {
    const currentDate = new Date().toISOString();

    try {
        await AsyncStorage.removeItem('FleetVehicle');
        return true;
    } catch (error) {
        alert(`Failed to stop commute tracking ${error}`);
        return false;
    }
}