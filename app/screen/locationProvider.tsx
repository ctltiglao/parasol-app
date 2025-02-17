// react native
import React, { createContext, useContext, useEffect, useState } from "react";
// expo
import * as Location from 'expo-location';
// gluestack

interface LocationContextType {
    location: Location.LocationObject | null;
    errorMsg: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, []);

    return (
        <LocationContext.Provider value={{location, errorMsg}}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }

    return context;
}