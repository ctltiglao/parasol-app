// react native
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import * as Device from 'expo-device';
import * as Location from 'expo-location';
// gluestack

// open privacy policy
export const useViewModel = () => {
    const openPolicy = () => {
        Linking.openURL('https://www.safetravelph.org/privacy')
        .catch((err) => console.error('An error occurred', err));
    }

    return {
        openPolicy
    }
}

// location permission
export const getPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const serviceEnabled = await Location.hasServicesEnabledAsync();

    await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
    });

    if (!serviceEnabled) {
        return;
    }

    if (status !== 'granted') {
        alert('Permmission to access location was denied');
        return;
    } else {
        await Location.requestBackgroundPermissionsAsync();
    }
}

// =====> GUEST USER
// get random index
const random = ({array} : any) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

// generate guest username
const generateGuestUsername = () => {
    let ADJECTIVES = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white'];
    let NOUNS = ['turtle', 'rabbit', 'lion', 'tiger', 'bear', 'fox', 'wolf', 'eagle'];

    let adjective = random({array: ADJECTIVES});
    let noun = random({array: NOUNS});
    let number = Math.floor(Math.random() * 1000);

    return `guest_${adjective}_${noun}_${number}`;
}

// login as guest
export const continueAsGuest = async() => {
    let firstName = "Guest";
    let lastName = "User";
    let realm_roles = "stph-resident";
    let app_roles = "Operator";
    let username = generateGuestUsername();
    let email = "";
    let androidId = Device.osBuildId ?? Device.osInternalBuildId ?? '';

    // user state object
    const UserState = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        realmRoles: realm_roles,
        appRoles: app_roles,
        androidId: androidId,
        isGuest: true
    }

    // return user state object
    try {
        AsyncStorage.setItem('UserState', JSON.stringify(UserState));
        // console.warn(UserState);
        return true;
    } catch (e) {
        return false;
    }    
}
// =====> GUEST USER