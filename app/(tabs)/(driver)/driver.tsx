import { useEffect, useState } from 'react';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';

import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import CustomDrawer from '@/components/_drawer/customDrawer';
import CustomHeader from '@/components/_drawer/_headers/customHeader';

const Drawer = createDrawerNavigator();

export default function DriverScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerNavigator />
        </GluestackUIProvider>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='Main'
            drawerContent={props => <CustomDrawer {...props} />}

            screenOptions={{
                header: (props) => <CustomHeader {...props} />
            }}
        >
            <Drawer.Screen name='Main' component={Screen} />
        </Drawer.Navigator>
    );
}

type LocationType = {
    latitude: number;
    longitude: number;
} | null;

type RegionType = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
} | null;

function Screen() {
    const [location, setLocation] = useState<LocationType>(null);
    const [region, setRegion] = useState<RegionType>(null);

    const [coordinate, setCoordinate] = useState<LocationType>(null);

    useEffect(() => {
        (async () => {
            let userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = userLocation.coords;

            console.warn(userLocation.coords);

            setLocation({ latitude, longitude });
            setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });

            console.warn(region);
            console.warn(location);
        });
    }, [location, region]);

    const handleMapPress = (event: any) => {
        const { lat, lng } = event.nativeEvent.coordinate;
        setCoordinate({ latitude: lat, longitude: lng });

        console.warn(coordinate);
    }

    return (
        <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full items justify-center'>
                <Box className='flex-1 h-full'>
                    <MapView
                        style={{ flex: 1 }}
                        // provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        onRegionChangeComplete={(region) => setRegion(region)}
                        onPress={handleMapPress}
                    >
                        {
                            location && (
                                <Marker
                                    coordinate={location}
                                    image={{ uri: 'custom_pin' }}
                                />
                            )
                        }
                    </MapView>
                </Box>
            </Box>
        </GluestackUIProvider>
    );
}