import * as Device from 'expo-device';

// import mqtt, { MqttProtocol } from "mqtt/dist/mqtt";

import { MQTT_HOST, MQTT_PASSWORD, MQTT_PORT, MQTT_USERNAME } from "@/assets/values/strings";
// import { TripAlert } from '@/src/(proto)/AlertTripProto';

const deviceId = Device.osBuildId ?? Device.osInternalBuildId ?? '';
// console.warn(clientId)

export const handleAlert = ({
    selectedCheckboxes
} : any) => {
    // const timestamp = moment(Date()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    // console.warn(timestamp);

    let alertString : string[] = [];

    if (selectedCheckboxes.lack) {
        alertString.push('Lack of public transport');
    }
    if (selectedCheckboxes.violation) {
        alertString.push('Violation of traffic rules');
    }
    if (selectedCheckboxes.fare) {
        alertString.push('Fare overpricing');
    }
    if (selectedCheckboxes.smoke) {
        alertString.push('Smoke belching');
    }
    if (selectedCheckboxes.overspeed) {
        alertString.push('Overspeeding');
    }
    if (selectedCheckboxes.quality) {
        alertString.push('Poor vehicle quality');
    }
    if (selectedCheckboxes.unpro) {
        alertString.push('Unprofessional driver');
    }
    if (selectedCheckboxes.overload) {
        alertString.push('Overloading');
    }
    if (selectedCheckboxes.crash) {
        alertString.push('Road crash');
    }
    if (selectedCheckboxes.crime) {
        alertString.push('Crime event');
    }

    const description = alertString.join(',');

    // const proto = TripAlert.create({
    //     deviceID: deviceId,
    //     lat: 14.6631671,
    //     lng: 121.0719874,
    //     timestamp: timestamp,
    //     userID: 'guest_turtle',
    //     descriptionP: description,
    //     vehicleID: 'vehicleId',
    //     vehicleDetails: 'vehicleDetails'
    // });
    // const buffer = TripAlert.encode(proto).finish();
    // console.warn(buffer);

    return description;
}

// export const AlertMqttClient = ({ message } : any) => {
//     const clientId = Device.osBuildId ?? Device.osInternalBuildId ?? '';
//     console.warn(clientId);

//     const options = {
//         clientId: clientId,
//         username: MQTT_USERNAME,
//         password: MQTT_PASSWORD,
//     }

//     console.warn(message);

//     const client = mqtt.connect(`${MQTT_HOST}:${MQTT_PORT}`, options);

//     client.on('connect', () => {
//         console.warn('Connected to MQTT broker');
//         client.subscribe('alert');
//     });

//     client.on('message', (topic, message) => {
//         console.warn(`Received message on topic ${topic}: ${message}`);    
//     });

//     client.on('error', (error) => {
//         console.warn(`MQTT error: ${error}`);
//     });
// }

// export const handleAlertMqttPublish = ({ message } : any) => {
//     const client = mqtt.connect(`mqtts://${MQTT_HOST}:${MQTT_PORT}`);
//     client.publish('alert', message);
//     console.warn(`Published message on topic alert: ${message}`);
// }