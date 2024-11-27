// react native
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import * as Location from "expo-location";
// gluestack

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

    console.log(CommuteRecord);

    try {
        await AsyncStorage.removeItem('CommuteDetails');
        return CommuteRecord;
    } catch (error) {
        alert(`Failed to stop commute tracking ${error}`);
        return false;
    }
}