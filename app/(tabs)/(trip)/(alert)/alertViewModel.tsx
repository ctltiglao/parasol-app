// react native
// expo
// gluestack

import { Alert } from '@/app/service/mqtt/proto/Trip.proto.js';
import { onMqttConnect } from "@/app/service/mqtt/mqtt";

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
    if (selectedCheckboxes.line) {
        alertString.push('Out-of-line operation');
    }
    if (selectedCheckboxes.crash) {
        alertString.push('Road crash');
    }
    if (selectedCheckboxes.crime) {
        alertString.push('Crime event');
    }

    const description = alertString.join(',');

    return description;
}

export const publishAlert = async(message: any) => {
    try {
        const alertData = {
            deviceId: message.deviceId,
            lat: message.lat,
            lng: message.lng,
            timestamp: message.timestamp,
            userId: message.userId,
            description: message.description,
            vehicleId: message.vehicleId,
            vehicleDetails: message.vehicleDetails
        }

        const buffer = Alert.encode(alertData).finish();

        onMqttConnect('alerts', buffer);

        return true;
    } catch (error) {
        console.error(error);
    }
}