import React, { useState } from "react";
import { Button, ButtonIcon } from "./ui/button";
import { Box } from "./ui/box";
import { MaterialIcons } from "@expo/vector-icons";

interface FabProps {
    onFabPress: () => void;
}

export function CustomFleetFab({ onFabPress }: FabProps) {
    const [ expanded, setExpanded ] = useState(false);
    const toggleSubFab = () => setExpanded(!expanded);

    return (
        <Box className="absolute p-3 items-center">
            { expanded &&(
                <>
                    <SubFab iconName='directions' onPress={() => onFabPress()} />
                </>
            )}

            <Button
                style={{ borderRadius: 50 }}
                className="p-3 bg-custom-secondary shadow-soft-4"
                onPress={toggleSubFab}
            >
                <MaterialIcons name={ expanded ? "close" : "add" } size={24} color="white" />
            </Button>
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
            style={{ borderRadius: 50, marginBottom: 10 }}
            className="flex-row items-center p-4 bg-white"
            onPress={onPress}
        >
            <Box className="shadow-soft-4">
                <MaterialIcons name={iconName} size={30} color="#0038A8" />
            </Box>
        </Button>
    )
}