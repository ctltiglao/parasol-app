// react native
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
// gluestack

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