// react native
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
// gluestack

export const clearSelection = ({
    setScanned,
    setInputRoute,
    setInputId,
    setInputDescription
} : any) => {
    setScanned(false);
    setInputRoute('');
    setInputId('');
    setInputDescription('');
}

export const saveFleetDetails = async ({route, vehicleId, vehicleDetails, capacity}: any) => {
    const fleetDetails = {
        route: route,
        vehicleId: vehicleId,
        vehicleDetails: vehicleDetails,
        capacity: capacity
    }

    try {
        await AsyncStorage.setItem('FleetVehicle', JSON.stringify(fleetDetails));
        return true;
    } catch (error) {
        alert(`Failed to save fleet details ${error}`);
        return false;
    }
}