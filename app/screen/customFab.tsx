// react native
import React, { useState } from "react";
// expo
import { MaterialCommunityIcons } from "@expo/vector-icons";
// gluestack
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

interface FabProps {
    onFabPress: () => void;
}

export function CustomFleetFab({ onFabPress }: FabProps) {
    return (
        <Box className="absolute p-3 items-center">
            <SubFab iconName='directions' onPress={() => onFabPress()} />
        </Box>
    )
}

export function CustomAddFab({ onFabPress }: FabProps) {
    return (
        <Box className="p-3">
            <SubFab iconName='plus' onPress={() => onFabPress()} />
        </Box>
    )
}

interface SubFabProps {
    iconName: any;
    onPress: () => void;
}


export const SubFab: React.FC<SubFabProps> = ({ iconName, onPress }) => {
    return (
        <Button
            className="bg-white w-fit h-fit items-center rounded-full mb-8 p-3 shadow-gray-400 shadow-md"
            onPress={onPress}
        >
            <MaterialCommunityIcons name={iconName} size={30} color="#0038A8" />
        </Button>
    )
}