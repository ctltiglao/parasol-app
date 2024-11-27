// react native
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
import { Camera } from "expo-camera";

import { purposeOptions, modeOptions } from "@/assets/values/strings";

export const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === "granted";
}

export const clearSelection = ({
    // setInputOrigin,
    // setInputDestination,
    // setSelectedPurpose,
    // setSelectedMode,
    setScanned,
    setInputId,
    setInputDescription
} : any) => {
    // setInputOrigin('');
    // setInputDestination('');
    // setSelectedPurpose(undefined);
    // setSelectedMode(undefined);
    setScanned(false);
    setInputId('');
    setInputDescription('');
};

export const purposeSelectChange = ({value, setSelectedPurpose}: any) => {
    const res = purposeOptions.find((option) => option.value === value);
    const selected = res?.label

    setSelectedPurpose(selected!);
}

export const modeSelectChange = ({value, setSelectedMode}: any) => {
    const res = modeOptions.find((option) => option.value === value);
    const selected = res?.label

    setSelectedMode(selected!);
}

export const saveCommuteDetails = async ({vehicleId, vehicleDescription}: any) => {
    const commuteDetails = {
        vehicleId: vehicleId,
        vehicleDescription: vehicleDescription
    }

    console.log(commuteDetails);

    try {
        await AsyncStorage.setItem('CommuteVehicle', JSON.stringify(commuteDetails));
        return true;
    } catch (e) {
        alert(`Failed to save commute details: ${e}`);
        return false;
    }
}