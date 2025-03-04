// react native
import { Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as AuthSession from 'expo-auth-session';
// gluestack

import { CLIENT_ID, REALM, SECRET } from '@/assets/values/strings';

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
    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    const serviceEnabled = await Location.hasServicesEnabledAsync();

    if (!serviceEnabled) {
        return;
    }

    if (status !== 'granted') {
        Alert.alert(
            'Permission to access location was denied',
            'Location permission is required to use the app',
        )
        return;
    }

    if (bgStatus !== 'granted') {
        Alert.alert(
            'Permission to access background location was denied',
            'Background location permission is required to use the app',
        )
        return;
    }

    await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
    });
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
// =====> GUEST 
const REDIRECT_URI = AuthSession.makeRedirectUri();
const DISCOVERY = {
  authorizationEndpoint: `${REALM}/protocol/openid-connect/auth`,
  tokenEndpoint: `${REALM}/protocol/openid-connect/token`,
  revocationEndpoint: `${REALM}/protocol/openid-connect/logout`
}

// =====> KEYCLOAK
// get token
export async function fetchToken(code: string, code_verifier: string) {
    // console.log(code_verifier);
  
    const response = await fetch(DISCOVERY.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: SECRET,
        grant_type: 'authorization_code',
        code: code,
        code_verifier: code_verifier,
        redirect_uri: REDIRECT_URI
      }).toString()
    });
  
    const data = await response.json();
  
    return data;
}

// =====> KEYCLOAK