// react native
import { Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as AuthSession from 'expo-auth-session';
import * as Notifications from 'expo-notifications';
// gluestack

import jwtDecoder, { jwtDecode } from 'jwt-decode';

import { CLIENT_ID, DISCOVERY, REALM, REDIRECT_URI, SECRET } from '@/assets/values/strings';

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
export const getLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    // const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    const serviceEnabled = await Location.hasServicesEnabledAsync();

    if (!serviceEnabled) {
        Alert.alert(
            'Location services are disabled',
            'Location services are required to use the app'
        )
        return;
    }

    if (status !== 'granted') {
        Alert.alert(
            'Permission to access location was denied',
            'Location permission is required to use the app',
        )
        return;
    }

    // if (bgStatus !== 'granted') {
    //     Alert.alert(
    //         'Permission to access background location was denied',
    //         'Background location permission is required to use the app',
    //     )
    //     return;
    // }
}

export const getNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
        Alert.alert(
            "Permission Denied",
            "You need to enable notifications in settings."
        )

        return false;
    }

    AsyncStorage.removeItem('NotifToken');
    return true;
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
    // console.log(data);
    AsyncStorage.setItem('UserState', JSON.stringify(data));
}

export async function checkUser() {
    try {
        const state = await AsyncStorage.getItem('UserState');
        const json = state != null ? JSON.parse(state) : null;
        // console.log(json);

        if (json !== null) {
            if (json.access_token !== undefined) {
                // console.log('keycloak ',json);

                const decoded: any = jwtDecode(json.access_token);
                const current = Math.floor(Date.now() / 1000);

                if (decoded && decoded.exp < current && json.refresh_token) {
                    const result = await refreshToken(json.refresh_token);
                    console.log('refresh');
                } else {
                    console.log('not expired');
                }
            }

            return true
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function refreshToken(refreshToken: string) {
    try {
        const response = await fetch(DISCOVERY.tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: SECRET,
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }).toString()
        });

        const data = await response.json();

        if (response.ok) {
            await AsyncStorage.setItem('UserState', JSON.stringify(data));
            return true;
        } else {
            console.log('refresh token failed');
            await AsyncStorage.removeItem('UserState');
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}
// =====> KEYCLOAK