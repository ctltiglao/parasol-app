// react native
// expo
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
// gluestack

// export const getLocation = async () => {
//     return await Location.getCurrentPositionAsync({})
// }

// location permission
export const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const serviceEnabled = await Location.hasServicesEnabledAsync();

    await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});

    if (!serviceEnabled) {
        return;
    }

    if (status !== 'granted') {
        alert(`Permission to access location was denied`);
        return;
    } else {
        await Location.requestBackgroundPermissionsAsync();
        return location;
    }
}

export const getLocationName = async ({latitude, longitude}: any) => {
    const [place] = await Location.reverseGeocodeAsync({
        latitude, longitude
    })
    console.log(place);

    return `${place.name}, ${place.city}`;
}

export const getUserState = async () => {
    try {
        const json = await AsyncStorage.getItem('UserState');
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        console.error(error);
    }
}