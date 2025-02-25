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
// gluestack

import { create } from 'xmlbuilder2';

interface Coordinate {
    latitude: number;
    longitude: number;
    timestamp: Date;
}

// check if with commute and fleet setting
export const checkSetting = () => {
    
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