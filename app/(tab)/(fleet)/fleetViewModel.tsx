// react native
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
// gluestack

import { Double } from "react-native/Libraries/Types/CodegenTypes";
// import moment from "moment";

// import { addFleetRecord, onCreate } from "@/app/service/sql/fleetHistoryDBHelper";
// import { Tracking } from '@/app/service/mqtt/proto/Tracking.proto.js';
// import { Alighting, Boarding } from '@/app/service/mqtt/proto/Fleet.proto.js';
// import { onMqttConnect } from "@/app/service/mqtt/mqtt";

export const getFleetDetails = async () => {
    try {
        const json = await AsyncStorage.getItem('FleetVehicle');
        console.log(json);
        console.log(JSON.parse(json!));
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        alert(`Failed to fetch fleet details ${error}`);
    }
}

// export const setFleetRecord = async({
//     route,
//     origin,
//     origin_lat,
//     origin_lng,
//     destination,
//     destination_lat,
//     destination_lng,
//     travel_distance,
//     start_time,
//     travel_time,
//     type,
//     capacity,
//     vehicle_id,
//     vehicle_details,
//     trip_date,
//     consumption,
//     consumption_unit,
//     start_odometer,
//     end_odometer
// }: any) => {
//     const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

//     try {
//         await AsyncStorage.removeItem('FleetVehicle');

//         await onCreate().then(async () => {
//             addFleetRecord({
//                 route: route,
//                 origin: origin,
//                 origin_lat: origin_lat,
//                 origin_lng: origin_lng,
//                 destination: destination,
//                 destination_lat: destination_lat,
//                 destination_lng: destination_lng,
//                 travel_distance: travel_distance,
//                 start_time: start_time,
//                 end_time: currentDate,
//                 travel_time: travel_time,
//                 type: type,
//                 capacity: capacity, 
//                 vehicle_id: vehicle_id,
//                 vehicle_details: vehicle_details,
//                 trip_date: trip_date,
//                 consumption: consumption,
//                 consumption_unit: consumption_unit,
//                 start_odometer: start_odometer,
//                 end_odometer: end_odometer
//             })
//         })

//         return true;
//     } catch (error) {
//         alert(`Failed to stop fleet tracking ${error}`);
//         return false;
//     }
// }

// export const mqttBroker = async(message: any) => {
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

//         const trackingBuffer = Tracking.encode(trackingData).finish();

//         onMqttConnect('route_puv_vehicle_app_feeds', trackingBuffer);
//     } catch (error) {
//         console.error(error);
//     }
// }

// export const publishBA = async(topic: any, message: any) => {
//     try {
//         const data = {
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

//         const buffer = Boarding.encode(data).finish();

//         onMqttConnect(topic, buffer);
//     } catch (error) {
//         console.error(error);
//     }
// }