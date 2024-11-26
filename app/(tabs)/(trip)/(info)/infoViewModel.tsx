import React, { useState, useEffect } from "react";

import { Camera } from "expo-camera";
import { purposeOptions, modeOptions } from "@/assets/values/strings";

export const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === "granted";
}

export const clearSelection = ({
    setInputOrigin,
    setInputDestination,
    setSelectedPurpose,
    setSelectedMode,
    setScanned,
    setInputId,
    setInputDescription
} : any) => {
    setInputOrigin('');
    setInputDestination('');
    setSelectedPurpose(undefined);
    setSelectedMode(undefined);
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