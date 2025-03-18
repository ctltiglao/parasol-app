// react native
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
// gluestack

import { addCommuteRecord, onCreate } from "@/app/service/sql/tripHistoryDBHelper";
import { Tracking } from "@/app/service/mqtt/proto/Tracking.proto.js";
import { onMqttConnect, onMqttPublish } from "@/app/service/mqtt/mqtt";
import { Commuter, Passenger } from "@/app/service/mqtt/proto/safetravelph.proto.js";

// remove previous commute vehicle
// export const removeItem = async () => {
//     try {
//         await AsyncStorage.removeItem('CommuteDetails');
//         // console.log('removed');
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getQuickTourPref = async () => {
    try {
        const data = await AsyncStorage.getItem('quickTour');
        // return json != null ? JSON.parse(json) : null;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getCommuteDetails = async () => {
    try {
        const json = await AsyncStorage.getItem('CommuteDetails');
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        alert(`Failed to fetch commute details ${error}`);
    }
}

// add commute record to local database
export const setCommuteRecord = async ({
    origin,
    originLat,
    originLng,
    destination,
    destinationLat,
    destinationLng,
    mode,
    purpose,
    vehicle_id,
    vehicle_details,
    commute_date
}: any) => {
    try {
        // await AsyncStorage.removeItem('CommuteDetails');
        // return CommuteRecord;

        console.log(commute_date);

        await onCreate().then(async () => {
            addCommuteRecord({
                origin: origin,
                origin_lat: originLat,
                origin_lng: originLng,
                destination: destination,
                destination_lat: destinationLat,
                destination_lng: destinationLng,
                mode: mode,
                purpose: purpose,
                vehicle_id: vehicle_id,
                vehicle_details: vehicle_details,
                commute_date: commute_date
            })
        })

        return true;
    } catch (error) {
        alert(`Failed to stop commute tracking ${error}`);
        return false;
    }
}

// send data to mqtt
export const mqttPassenger = async(message: any) => {
    try {
        const data = {
            deviceId: message.deviceId,
            lat: message.lat,
            lng: message.lng,
            timestamp: message.timestamp,
            userId: message.userId,
            orig: message.orig,
            dest: message.dest,
            purpose: message.purpose,
            mode: message.mode,
            vehicleId: message.vehicleId,
            vehicleDetails: message.vehicleDetails,
            tripId: message.tripId
        }

        const buffer = Passenger.encode(data).finish();

        onMqttPublish('passenger_app_feeds', buffer);
    } catch (error) {
        console.error('Error in mqttBroker', error);
    }
}

export const mqttCommuter = async(message: any) => {
    // console.log('MQTT COMMUTER ', message);

    try {
        const data = {
            deviceId: message.deviceId,
            lat: message.lat,
            lng: message.lng,
            timestamp: message.timestamp,
            userId: message.userId,
            preferred_vehicles: message.preferred_vehicles
        }

        const buffer = Commuter.encode(data).finish();

        onMqttPublish('commuters', buffer);
    } catch (error) {
        console.error('Error in mqttBroker', error);
    }
}

// export const mqttBroker = async(message: any) => {
//     // console.log(message);
//     const MQTT_OPTIONS = {
//         clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
//         clean: true
//     }

//     try {
//         const trackingData = {
//             deviceId: message.deviceId,
//             lat: message.lat,
//             lng: message.lng,
//             timestamp: message.timestamp,
//             userId: message.userId,
//             vehicleId: message.vehicleId,
//             vehicleDetails: message.vehicleDetails,
//             passengerId: message.passengerId,
//             passengerDetails: message.passengerDetails,
//             altitude: message.altitude,
//             accuracy: message.accuracy
//         }

//         // console.log('Tracking data', trackingData)

//         const buffer = Tracking.encode(trackingData).finish();
        
//         onMqttPublish('route_puv_vehicle_app_feeds', buffer);
//     } catch (error) {
//         console.error('Error in mqttBroker', error);
//     }
// }