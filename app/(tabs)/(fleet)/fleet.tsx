import '@/global.css';
// react native
import { useEffect, useState, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet } from 'react-native';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';

import { CustomFleetFab } from '@/components/customFab';
import DrawerScreen from '@/app/(drawer)/drawer';
import FleetHeader from '@/components/_drawer/_headers/fleetHeader';

import FleetInfo from './(info)/info';
import DashboardMonitorScreen from './(dashboard)/dashboard';
import FleetHistoryScreen from './(history)/history';
import FleetSettingsScreen from './(settings)/settings';
import { getLocationPermission } from '../tabViewModel';
import { getFleetDetails, setFleetRecord } from './fleetViewModel';

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
            drawerContent={props => <DrawerScreen {...props} />}

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

function Screen() {
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<any|null>(null);
    const [isFleetStart, setFleetStart] = useState(false);
    const [isFleetStop, setFleetStop] = useState(false);
    const [isFleetPause, setFleetPause] = useState(false);

    const [route, setRoute] = useState('');
    const [vehicleId, setVehicleId] = useState('');

    const [isOverlayInfoVisible, setIsOverlayInfoVisible] = useState(false);
    const toggleOverlayInfo = () => {
        setIsOverlayInfoVisible(!isOverlayInfoVisible);

        getFleetDetails().then((response) => {
            setRoute(response.route);
            setVehicleId(response.vehicleId);
            console.warn(response)
        })
    }

    useEffect(() => {
        getLocationPermission();

        const getLocation = async () => {
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        }

        getLocation();

        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });
        }
    }, [location]);

    const handleFleetStart = (i: boolean) => setFleetStart(i);
    const handleFleetStop = (i: boolean) => setFleetStop(i);
    const handleFleetPause = (i: boolean) => setFleetPause(i);

    return (
        <GluestackUIProvider mode='light'>
            {
                isFleetStart ? (
                    <Box>
                        <Button onPress={() => {
                            handleFleetStart(false);
                            handleFleetStop(true);
                            handleFleetPause(false);

                            setFleetRecord();

                            setRoute('');
                            setVehicleId('');
                        }} className='p-4 bg-custom-customRed'>
                            <ButtonText className='text-white text-lg font-bold'>
                                STOP FLEET TRACKING
                            </ButtonText>
                        </Button>

                        {
                            isFleetPause ? (
                                <Button  className='p-4 bg-warning-500'
                                    onPress={() => handleFleetPause(false)}
                                >
                                    <ButtonText className='text-white text-lg font-bold'>
                                        CONTINUE TRACKING
                                    </ButtonText>
                                </Button>
                            ) : (
                                <Button className='p-4 bg-warning-500'
                                    onPress={() => handleFleetPause(true)}
                                >
                                    <ButtonText className='text-white text-lg font-bold'>
                                        PAUSE TRACKING
                                    </ButtonText>
                                </Button>
                            )
                        }
                    </Box>
                ) : (
                    <Button className='p-4 bg-custom-secondary'
                        onPress={() => {
                            handleFleetStart(true);
                            isFleetStop === true && handleFleetStop(false);
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            START NEW FLEET TRACKING
                        </ButtonText>
                    </Button>
                )
            }

            <Box className='flex-1 w-full h-full'>
                {isOverlayInfoVisible ? (
                    <FleetInfo handleAction={toggleOverlayInfo} />
                ) : (
                    <Box className='flex-1 w-full h-full'>
                        <VStack className='z-10 bg-white w-fit absolute p-2'>
                            <HStack>
                                <Text>Route Info:</Text>
                                <Text>{route}</Text>
                            </HStack>
                            <HStack>
                                <Text>Vehicle Info:</Text>
                                <Text>{vehicleId}</Text>
                            </HStack>
                        </VStack>

                        <Box className='flex-1 h-full'>
                            {
                                location && (
                                    isFleetStart ? (
                                        <MapView
                                            ref={mapRef}
                                            style={StyleSheet.absoluteFillObject}
                                            showsUserLocation={true}
                                            initialRegion={{
                                                latitude: location.coords.latitude,
                                                longitude: location.coords.longitude,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421
                                            }}
                                        >
                                            <MapMarker
                                                coordinate={{
                                                    latitude: location.coords.latitude,
                                                    longitude: location.coords.longitude
                                                }}
                                            />
                                        </MapView>
                                    ) : (
                                        <MapView
                                            style={StyleSheet.absoluteFillObject}
                                            showsUserLocation={true}
                                            initialRegion={{
                                                latitude: location.coords.latitude,
                                                longitude: location.coords.longitude,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01
                                            }}
                                        />
                                    )
                                )
                            }
                        </Box>

                        {
                            isFleetStart === false && (
                                <Box className='justify-center bottom-1/2'>
                                    <CustomFleetFab onFabPress={() => {
                                        toggleOverlayInfo();
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
                                    <MaterialCommunityIcons name='plus' size={35} color='white'/>
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
                                    <MaterialCommunityIcons name='close' size={35} color='white'/>
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