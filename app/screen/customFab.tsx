// react native
import React, { useState } from "react";
// expo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// gluestack
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

interface FabProps {
    onFabPress: () => void;
}

export function CustomFleetFab({ onFabPress }: FabProps) {
    const [ expanded, setExpanded ] = useState(false);
    const toggleSubFab = () => setExpanded(!expanded);

    return (
        <Box className="absolute right-0 p-3">
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
            className="bg-white w-fit h-fit items-center rounded-full mb-8 p-3"
            onPress={onPress}
        >
            <MaterialCommunityIcons name={iconName} size={30} color="#0038A8" />
        </Button>
    )
}