import { useEffect, useRef, useState } from 'react';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import { CustomFleetFab } from '@/components/customFab';
import CustomDrawer from '@/components/_drawer/customDrawer';
import FleetHeader from '@/components/_drawer/_headers/fleetHeader';

import FleetInfo from './(info)/info';
import DashboardMonitorScreen from './(dashboard)/dashboard';
import FleetHistoryScreen from './(history)/history';
import FleetSettingsScreen from './(settings)/settings';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function FleetScreen() {
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
                header: (props) => <FleetHeader {...props} />
            }}
        >
            <Drawer.Screen name='Main' component={Screen} />
            
            <Stack.Screen
                name='Dashboard'
                component={DashboardMonitorScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='History'
                component={FleetHistoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Settings'
                component={FleetSettingsScreen}
                options={{ headerShown: false }}
            />
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
    const mapRef = useRef<MapView | null>(null);

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isFleetStart, setFleetStart] = useState(false);
    const [isFleetStop, setFleetStop] = useState(false);
    const [isFleetPause, setFleetPause] = useState(false);

    const toggleOverlay = () => setOverlayVisible(!isOverlayVisible);

    const handleFabAction = () => {
        toggleOverlay();
    }

    useEffect(() => {
        (async () => {
            let userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = userLocation.coords;

            console.warn(userLocation.coords);

            setLocation({ latitude, longitude });
            setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });

            if (mapRef.current) {
                mapRef.current.animateToRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 1000);
            }
        });
    }, [location, region]);

    const handleFleetStart = (i : boolean) => {
        setFleetStart(i);
    }

    const handleFleetStop = (i : boolean) => {
        setFleetStop(i);
    }

    const handleFleetPause = (i : boolean) => {
        setFleetPause(i);
    }

    return (
        <GluestackUIProvider mode='light'>
            {
                isFleetStart ? (
                    <Box>
                        <Button onPress={() => {
                            handleFleetStart(false);
                            handleFleetStop(true);
                            handleFleetPause(false);
                        }} className='p-4 bg-custom-customRed'>
                            <ButtonText className='text-white text-lg font-bold'>
                                STOP FLEET TRACKING
                            </ButtonText>
                        </Button>

                        {
                            isFleetPause ? (
                                <Button onPress={() => handleFleetPause(false)} className='p-4 bg-warning-500'>
                                    <ButtonText className='text-white text-lg font-bold'>
                                        CONTINUE TRACKING
                                    </ButtonText>
                                </Button>
                            ) : (
                                <Button onPress={() => handleFleetPause(true)} className='p-4 bg-warning-500'>
                                    <ButtonText className='text-white text-lg font-bold'>
                                        PAUSE TRACKING
                                    </ButtonText>
                                </Button>
                            )
                        }
                    </Box>
                ) : (
                    <Button onPress={() => {
                        handleFleetStart(true);
                        isFleetStop === true && handleFleetStop(false);
                    }} className='p-4 bg-custom-secondary'>
                        <ButtonText className='text-white text-lg font-bold'>
                            START NEW FLEET TRACKING
                        </ButtonText>
                    </Button>
                )
            }

            <Box className='flex-1 w-full h-full'>
                {isOverlayVisible ? (
                    <FleetInfo handleFabAction={handleFabAction} />
                ) : (
                    <Box className='flex-1 w-full h-full'>
                        <Box className='absolute z-10 p-2'>
                            <Text className='bg-white w-fit'>Route info:</Text>
                            <Text className='bg-white w-fit'>Vehicle info:</Text>
                        </Box>

                        <Box className='flex-1 h-full'>
                            <MapView
                                style={{ flex: 1 }}
                                // provider={PROVIDER_GOOGLE}
                                showsUserLocation={true}
                                onRegionChangeComplete={(region) => setRegion(region)}
                            >
                                {
                                    location && (
                                        <Marker coordinate={location} />
                                    )
                                }
                            </MapView>
                        </Box>

                        {
                            isFleetStart === false && (
                                <Box className='justify-center bottom-1/2'>
                                    <CustomFleetFab onFabPress={() => {
                                        handleFabAction();
                                        handleFleetStop(false);
                                    }} />
                                </Box>
                            )
                        }
                    </Box>
                )}
            </Box>

            {
                isFleetStart && (
                    <Box className='flex-col absolute bottom-0 h-fit w-full'>
                        <Box className='ps-4 pb-4'>
                            <Text className='text-custom-primary text-6xl font-bold'>0 kph</Text>
                            <Text className='text-black text-4xl'>0.00 km</Text>
                            <Text className='text-black text-4xl'>00:00:00</Text>
                        </Box>

                        <Box className='bg-white flex-row justify-between'>
                            <Box className='bg-white flex-col justify-center items-center p-4'>
                                <Text className='text-custom-customGreen text-xl font-medium'>Boarding</Text>
                                <Button
                                    className='bg-custom-customGreen w-16 h-16 p-3 boarder-1 rounded-full m-2'
                                >
                                    <MaterialIcons name='add' size={35} color='white'/>
                                </Button>
                            </Box>

                            <Box className='justify-center'>
                                <Text className='text-custom-customGreen text-3xl'>0</Text>
                            </Box>

                            <Box className='bg-white flex-col justify-center items-center p-4'>
                                <Text className='text-black text-xl font-medium'>Pax Onboard</Text>
                                <Text className='text-black text-6xl m-2'>0</Text>
                            </Box>

                            <Box className='justify-center'>
                                <Text className='text-custom-customRed text-3xl'>0</Text>
                            </Box>

                            <Box className='bg-white flex-col justify-center items-center p-4'>
                                <Text className='text-custom-customRed text-xl font-medium'>Alighting</Text>
                                <Button
                                    className='bg-custom-customRed w-16 h-16 p-3 boarder-1 rounded-full m-2'
                                >
                                    <MaterialIcons name='remove' size={35} color='white'/>
                                </Button>
                            </Box>
                        </Box>

                        {
                            isFleetPause && (
                                <Box className='bg-white pb-4 ps-4 pe-4 w-full'>
                                    <Box className='bg-gray-700 p-4 w-full border-0 rounded-lg'>
                                        <Text className='text-white'>Summary of Previous Fleet:</Text>
                                        <Box className='flex-row justify-between'>
                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>Ave. Speed (kph):</Text>
                                                <Text className='text-white text-sm'>Max. Speed (kph):</Text>
                                            </Box>
                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>0.26</Text>
                                                <Text className='text-white text-sm'>0.26</Text>
                                            </Box>

                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>Travel Time (hrd):</Text>
                                                <Text className='text-white text-sm'>Max Pax Onboard:</Text>
                                            </Box>
                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>00:00:00</Text>
                                                <Text className='text-white text-sm'>2</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                )
            }

                {
                    isFleetStop && (
                        <Box className='bg-white p-4 w-full'>
                            <Box className='bg-gray-700 p-4 w-full border-0 rounded-lg'>
                                <Text className='text-white'>Summary of Previous Fleet:</Text>
                                <Box className='flex-row justify-between'>
                                    <Box className='flex-col'>
                                        <Text className='text-white text-sm'>Ave. Speed (kph):</Text>
                                        <Text className='text-white text-sm'>Max. Speed (kph):</Text>
                                    </Box>
                                    <Box className='flex-col'>
                                        <Text className='text-white text-sm'>0.26</Text>
                                        <Text className='text-white text-sm'>0.26</Text>
                                    </Box>

                                    <Box className='flex-col'>
                                        <Text className='text-white text-sm'>Travel Time (hrd):</Text>
                                        <Text className='text-white text-sm'>Max Pax Onboard:</Text>
                                    </Box>
                                    <Box className='flex-col'>
                                        <Text className='text-white text-sm'>00:00:00</Text>
                                        <Text className='text-white text-sm'>2</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )
                }
        </GluestackUIProvider>
    );
}