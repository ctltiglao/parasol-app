// react native
// expo
// gluestack

import { onMqttConnect } from "@/app/service/mqtt/mqtt";
import { Rating } from "@/app/service/mqtt/proto/Trip.proto.js";

export const handleRating = ({
    isSelectedCondition,
    isSelectedComfort,
    isSelectedAdequacy,
    isSelectedStop,
    isSelectedInfo,
    isSelectedAvailable,
    isSelectedRoute,
    isSelectedOverall,
    inputComment
} : any) => {

    let rateString : string[] = [];

    if (isSelectedCondition) {
        rateString.push(isSelectedCondition);
    } else {
        rateString.push('0');
    }

    if (isSelectedComfort) {
        rateString.push(isSelectedComfort);
    } else {
        rateString.push('0');
    }

    if (isSelectedAdequacy) {
        rateString.push(isSelectedAdequacy);
    } else {
        rateString.push('0');
    }

    if (isSelectedStop) {
        rateString.push(isSelectedStop);
    } else {
        rateString.push('0');
    }

    if (isSelectedInfo) {
        rateString.push(isSelectedInfo);
    } else {
        rateString.push('0');
    }

    if (isSelectedAvailable) {
        rateString.push(isSelectedAvailable);
    } else {
        rateString.push('0');
    }

    if (isSelectedRoute) {
        rateString.push(isSelectedRoute);
    } else {
        rateString.push('0');
    }

    if (isSelectedOverall) {
        rateString.push(isSelectedOverall);
    } else {
        rateString.push('0');
    }

    if (inputComment !== '') {
        rateString.push(inputComment);
    } else {
        rateString.push('');
    }

    return rateString.join(',');
}

export const publishRating = async(message: any) => {
    try {
            const ratingData = {
                deviceId: message.deviceId,
                lat: message.lat,
                lng: message.lng,
                timestamp: message.timestamp,
                userId: message.userId,
                description: message.description,
                vehicleId: message.vehicleId,
                vehicleDetails: message.vehicleDetails
            }

            const buffer = Rating.encode(ratingData).finish();

            onMqttConnect('ratings', buffer);
    
            // return true;
        } catch (error) {
            console.error(error);
        }
}