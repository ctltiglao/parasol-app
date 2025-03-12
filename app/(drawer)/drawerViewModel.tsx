// react native
import { CLIENT_ID, DISCOVERY, REALM, REDIRECT_URI, SECRET } from "@/assets/values/strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
// gluestack
// ========== ==========
// variables

export async function keycloakLogout() {
    try {
        const result = await AsyncStorage.getItem('UserState');
        const res = result != null ? JSON.parse(result) : null;

        const token = JSON.stringify(res.refresh_token);

        if (token !== undefined) {
            // console.log('token ', token)

            const url = `${DISCOVERY.revocationEndpoint}?refresh_token=${token}&client_secret=${SECRET}&client_id=${CLIENT_ID}&post_logout_redirect_uri=${REDIRECT_URI}`;
            // console.log(url);

            const isLogout = await WebBrowser.openAuthSessionAsync(url, REDIRECT_URI);

            return isLogout.type === 'success'; // return true if logout is success
        } else {
            console.log('no token');
            return true; // for guest
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}