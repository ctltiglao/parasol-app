// react native
import React, { useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import * as Location from "expo-location";
// gluestack

export const startTracking = async () => {
    try {
        await Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1
        }, (newLocation) => {
            const newCoord = {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude
            };
    
            console.warn(newCoord);
            return newCoord;
        })
    } catch(e) {
        alert(`Failed to start tracking: ${e}`);
    }
}

export const getCommuteDetails = async () => {
    try {
        const json = await AsyncStorage.getItem('CommuteVehicle');
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        alert(`Failed to fetch commute details ${error}`);
    }
}

export const setCommuteRecord = async ({
    id,
    origin,
    originLat,
    originLng,
    destination,
    destinationLat,
    destinationLng,
    selectMode,
    selectPurpose,
    vehicleId,
    vehicleDescription
}: any) => {
    const currentDate = new Date().toISOString();

    const CommuteRecord = {
        id: id,
        origin: origin,
        originLat: originLat,
        originLng: originLng,
        destination: destination,
        destinationLat: destinationLat,
        destinationLng: destinationLng,
        mode: selectMode,
        purpose: selectPurpose,
        vehicleId: vehicleId,
        vehicleDetails: vehicleDescription,
        commuteDate: currentDate,
    }

    // console.log(CommuteRecord);

    try {
        await AsyncStorage.removeItem('CommuteDetails');
        return CommuteRecord;
    } catch (error) {
        alert(`Failed to stop commute tracking ${error}`);
        return false;
    }
}