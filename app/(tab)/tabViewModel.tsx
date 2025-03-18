// react native
import { Platform } from "react-native";
import moment from "moment";
// expo
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { StorageAccessFramework } from 'expo-file-system';
import * as AuthSession from 'expo-auth-session';
// gluestack

import { create } from 'xmlbuilder2';
import { jwtDecode } from "jwt-decode";

import { CLIENT_ID, DISCOVERY, REALM, SECRET } from "@/assets/values/strings";

interface Coordinate {
    latitude: number;
    longitude: number;
    timestamp: string;
}

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
    console.log('location ', latitude, longitude);

    const [place] = await Location.reverseGeocodeAsync({
        latitude, longitude
    })
    console.log(place);

    return `${place.name}, ${place.city}`;
}

// =====> KEYCLOAK
export const getUserState = async () => {
    let res = null;

    const userState = await AsyncStorage.getItem('UserState');
    const json = userState != null ? JSON.parse(userState) : null;
    // console.log(json);

    try {
        if (json.access_token !== undefined) {
            // console.log('keycloak ',json);
            // check if token is expired
            const decoded: any = jwtDecode(json.access_token);
            const current = Math.floor(Date.now() / 1000);

            if (decoded && decoded.exp < current && json.refresh_token) {
                const refresh = await refreshToken(json.refresh_token);
                res = refresh;
            } else {
                res = await keycloakUserInfo(json.access_token);
                // console.log(res);
            }
        }

        if (json.username !== undefined) {
            // console.log('guest ',json);
            res = json;
        }

        return res;
    } catch (error) {
        // console.error(error);
    }
}

async function keycloakUserInfo(token: string) {
    // console.log('token ', token);

    try {
        const response = await fetch(DISCOVERY.userInfoEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await response.json();
        
        return json;
    } catch (error) {
        // console.log(error);
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
        console.log('new access token ', data.access_token);

        if (response.ok) {
            await AsyncStorage.setItem('UserState', JSON.stringify(data));
            return data.access_token;
        } else {
            console.log('refresh token failed');
            await AsyncStorage.removeItem('UserState');
            return null;
        }
    } catch (error) {
        // console.log(error);
    }
}
// =====> KEYCLOAK

export const generateTripCode = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';

    const getRandomChar = (str: string) => str[Math.floor(Math.random() * str.length)];

    let char = Array.from({ length: 3 }, () => getRandomChar(alphabets)).join('');
    let num =  Array.from({ length: 3 }, () => getRandomChar(digits)).join('');

    return `${char}${num}`;
}

export async function generateGPX(coord: Coordinate[]) {
    try {
        if (Platform.OS === 'ios') {
            console.log('generateGpx');
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (!permission.granted) {
                return
            }

            const gpx = create({version: '1.0'})
                .ele('gpx', {version: '1.1', creator: 'MapSource 6.15.5'})
                .ele('trk')
                .ele('name').txt('My GPX Tracks').up()
                .ele('trkseg')

            coord.forEach(({latitude, longitude, timestamp}) => {
                gpx.ele('trkpt', {lat: latitude, lon: longitude})
                .ele('timestamp').txt(new Date(timestamp).toISOString())
                .up()
            })
                        
            const gpxData = gpx.end({prettyPrint: true});

            console.log(gpxData);

            const uri = `${FileSystem.documentDirectory}track.gpx`;

            await FileSystem.writeAsStringAsync(
                uri, gpxData, {
                    encoding: FileSystem.EncodingType.UTF8
                }
            )

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);

                saveGPXDetails(uri);
            } else {
                alert('Sharing is not available on this device');
            }
        }

        if (Platform.OS === 'android') {
            const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permission.granted) {
                return;
            }

            const gpx = create({version: '1.0'})
                .ele('gpx', {version: '1.1', creator: 'MapSource 6.15.5'})
                .ele('trk')
                .ele('name').txt('My GPX Tracks').up()
                .ele('trkseg')

                coord.forEach(({latitude, longitude, timestamp}) => {
                    gpx.ele('trkpt', {lat: latitude, lon: longitude})
                    .ele('timestamp').txt(new Date(timestamp).toISOString())
                    .up()
                })
                    
            const gpxData = gpx.end({prettyPrint: true});

            console.log(gpxData);

            await StorageAccessFramework.createFileAsync(
                permission.directoryUri,
                'track.gpx',
                'application/gpx+xml'
            ).then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, gpxData, {
                    encoding: FileSystem.EncodingType.UTF8
                });

                console.log(uri);
                saveGPXDetails(uri);
            }).catch((error) => {
                alert(`Failed to save GPS tracks ${error}`);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const saveGPXDetails = async(uri: string) => {
    try {
        const data = {
            uri: uri,
            date: moment(new Date()).format('YYYY-MM-DD')
        }

        const check = await AsyncStorage.getItem('GPXFile');
        let set = JSON.parse(check ?? '{}');

        if (check === null) {
            await AsyncStorage.setItem('GPXFile', JSON.stringify(data));
        } else {
            // console.log('checked json: ', json);
            console.log(check);
            const merged = { ...set, ...data };
            console.log(merged);

            // await AsyncStorage.setItem('GPXFile', JSON.stringify(merged));
        }
    } catch (error) {
        console.log(error);
    }
}

export function is30Days(date1: Date, date2: Date) {
    const _date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const _date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const diffInMs = Math.abs(_date2.getTime() - _date1.getTime());

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays === 30;
}

// csv file
export async function generateCSV(csv: any, title: string) {
    try {
        if (Platform.OS === 'ios') {
            console.log('generateCSV new iOS');
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (!permission.granted) {
                return;
            }

            await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${title}.csv`, csv, {
                encoding: FileSystem.EncodingType.UTF8
            });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(`${FileSystem.documentDirectory}${title}.csv`);
            } else {
                alert('Sharing is not available on this device');
            }
        }

        if (Platform.OS === 'android') {
            console.log('generateCSV new Android');
            const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permission.granted) {
                return;
            }

            await StorageAccessFramework.createFileAsync(
                permission.directoryUri,
                `${title}.csv`,
                'application/csv'
            ).then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, csv, {
                    encoding: FileSystem.EncodingType.UTF8
                });

                console.log(uri);
            }).catch((error) => {
                alert(`Failed to save records ${error}`);
            });
        }
    } catch (error) {
        console.log(error);
        alert(`Failed to save records ${error}`);
    }
}