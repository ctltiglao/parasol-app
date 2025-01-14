import '@/global.css';
// react native
import { useEffect, useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { MapMarker, Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';

import * as geolib from 'geolib';

import { CustomFleetFab } from '@/app/screen/customFab';
import DrawerScreen from '@/app/(drawer)/drawer';
import FleetHeader from '@/app/screen/header/fleetHeader';

import FleetInfo from './(info)/info';
import DashboardMonitorScreen from './(dashboard)/dashboard';
import FleetHistoryScreen from './(history)/history';
import FleetSettingsScreen from './(settings)/settings';
import { getLocationName, getLocationPermission, getUserState } from '../tabViewModel';
import { formatTravelTime, getAveSpeed, getFleetDetails, mqttBroker, publishBA, setFleetRecord } from './fleetViewModel';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@/components/ui/modal';


interface Coordinate {
    latitude: number;
    longitude: number;
}

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
    const deviceId = Device.osBuildId ?? Device.osInternalBuildId ?? '';
    // const mMapRef = useRef<MapView>(null);
    const mapRef = useRef<MapView>(null);
    const [ location, setLocation ] = useState<any|null>(null);
    const [ isFleetStart, setFleetStart ] = useState(false);
    const [ isFleetStop, setFleetStop ] = useState(false);
    const [ isFleetPause, setFleetPause ] = useState(false);

    const [ route, setRoute ] = useState('');
    const [ vehicleId, setVehicleId ] = useState('');
    const [ vehicleDetails, setVehicleDetails ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ capacity, setCapacity ] = useState('');

    const [ paxModalVisible, setPaxModalVisible ] = useState(false);
    const [ alight, setAlight ] = useState(0);
    const [ board, setBoard ] = useState(0);
    const [ paxOnBoard, setPaxOnBoard ] = useState(0);
    const [ inputPax, setInputPax ] = useState('');
    const [ maxOnBoard, setMaxOnBoard ] = useState(0);

    const [ speed, setSpeed ] = useState<number | 0>(0);
    const [ distance, setDistance ] = useState(0);
    const [ trackingTime, setTrackingTime ] = useState(0);
    const [ aveSpeed, setAveSpeed ] = useState<any|0>(0);
    const [ maxSpeed, setMaxSpeed ] = useState(0);
    const [ travelTime, setTravelTime ] = useState<any|0>(0);

    // let locationSubscription = useRef<Location.LocationSubscription|null>(null);
    const [ locationSubscription, setLocationSubscription ] = useState<Location.LocationSubscription|null>(null);
    const [ routeCoordinates, setRouteCoordinates ] = useState<Coordinate[]>([]);
    const [ speedStartTime, setSpeedStartTime ] = useState<any|null>(null);
    const [ originTime, setOriginTime ] = useState<string|null>(null);

    const openModal = () => setPaxModalVisible(true);
    const closeModal = () => setPaxModalVisible(false);

    const [ isOverlayInfoVisible, setIsOverlayInfoVisible ] = useState(false);
    const toggleOverlayInfo = () => {
        setIsOverlayInfoVisible(!isOverlayInfoVisible);

        getFleetDetails().then((response) => {
            setRoute(response.route);
            setVehicleId(response.vehicleId);
            setVehicleDetails(response.vehicleDetails);
            setCapacity(response.capacity);

            // console.log(capacity);
        })
    }

    const getLocation = async () => {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        // console.log(loc);
    }

    useEffect(() => {
        getUserState().then((response) => {
            setUsername(response.username);
        })

        getLocationPermission();
    }, []);

    // refresh tab
    useFocusEffect(
        useCallback(() => {
            getLocation();

            setFleetStart(false);
            setFleetStop(false);
            setFleetPause(false);
            setRoute('');
            setVehicleId('');
            setVehicleDetails('');
            setCapacity('');
            setAlight(0);
            setBoard(0);
            setPaxOnBoard(0);
            setMaxOnBoard(0);
            setSpeed(0);
            setDistance(0);
            setTrackingTime(0);
            setAveSpeed(0);
            setMaxSpeed(0);
            setTravelTime(0);
            locationSubscription?.remove();
            setLocationSubscription(null);
            setRouteCoordinates([]);
            setSpeedStartTime(null);
            setOriginTime(null);

            closeModal();
            setIsOverlayInfoVisible(false);

            (async () => {
                await AsyncStorage.removeItem('FleetVehicle');
            })
        }, [])
    );

    const startFleetTracking = async () => {
        const prevLocation = await Location.getCurrentPositionAsync({});
        if (!locationSubscription) {
            const locSubscription = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1
            }, (newLocation) => {
                if (prevLocation) {
                    mapRef.current?.animateToRegion(
                        {
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        },
                        1000
                    );
    
                    // distance
                    const inMeter = geolib.getDistance(
                        {latitude: prevLocation.coords.latitude, longitude: prevLocation.coords.longitude},
                        {latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude}
                    );
                    const inKilometer = (inMeter / 1000).toFixed(2);
                    setDistance(parseFloat(inKilometer));
    
                    // travel time
                    const timeDelta = 2;
                    const speedInMeterPerSecond = inMeter / timeDelta;
                    // start time
                    setOriginTime(new Date().toISOString());
                    setSpeedStartTime(new Date().getTime());
    
                    if (speedInMeterPerSecond > 0) {
                        setTrackingTime((prevTravelTime) => prevTravelTime + timeDelta);
                    }
    
                    // max speed
                    const speedKph = newLocation.coords.speed ? newLocation.coords.speed * 3.6 : 0;
                    setSpeed(speedKph);
                }
    
                setRouteCoordinates((prevCoords) => [
                    ...prevCoords,
                    { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude }
                ])
                
                const message = {
                    deviceId: deviceId,
                    lat: newLocation.coords.latitude,
                    lng: newLocation.coords.longitude,
                    timestamp: new Date().toISOString(),
                    userId: username,
                    vehicleId: vehicleId,
                    vehicleDetails: vehicleDetails,
                    passengerId: '',
                    passengerDetails: '',
                    altitude: newLocation.coords.altitude,
                    accuracy: newLocation.coords.accuracy
                }
                mqttBroker(message);

                setLocation(newLocation);
            })

            setLocationSubscription(locSubscription);
        }
    }

    const stopFleetTracking = () => {
        // locationSubscription.current?.remove();
        // locationSubscription.current = null;
        locationSubscription?.remove();
        setLocationSubscription(null);

        mqttBroker('#');

        setRoute('');
        setVehicleId('');

        let aveSpeed = getAveSpeed(distance, speedStartTime);
        setAveSpeed(aveSpeed);

        setTravelTime(formatTravelTime(trackingTime));

        if (paxOnBoard > maxOnBoard) {
            setMaxOnBoard(paxOnBoard);
        }

        if (Number(speed) > maxSpeed) {
            setMaxSpeed(Number(speed));
        }
    }

    const handleFleetStart = (i: boolean) => {
        setFleetStart(i)
    };

    const handleFleetStop = (i: boolean) => setFleetStop(i);
    const handleFleetPause = (i: boolean) => setFleetPause(i);

    return (
        <GluestackUIProvider mode='light'>
            {
                isFleetStart ? (
                    <Box>
                        <Button onPress={async () => {
                            handleFleetStart(false);
                            handleFleetStop(true);
                            handleFleetPause(false);

                            console.log(paxOnBoard);

                            setFleetRecord({
                                route: route,
                                origin: await getLocationName(routeCoordinates[0]),
                                origin_lat: routeCoordinates[0].latitude,
                                origin_lng: routeCoordinates[0].longitude,
                                destination: await getLocationName(routeCoordinates[routeCoordinates.length - 1]),
                                destination_lat: routeCoordinates[routeCoordinates.length - 1].latitude,
                                destination_lng: routeCoordinates[routeCoordinates.length - 1].longitude,
                                travel_distance: distance,
                                start_time: originTime,
                                end_time: new Date().toISOString,
                                travel_time: travelTime,
                                type: '',
                                capacity: capacity, 
                                vehicle_id: vehicleId,
                                vehicle_details: vehicleDetails,
                                trip_date: new Date().toISOString,
                                consumption: '0.0',
                                consumption_unit: 'L',
                                start_odometer: '0.0',
                                end_odometer: '0.0'
                            });
                            
                            closeModal();
                            stopFleetTracking();
                        }} className='h-fit p-4 bg-custom-customRed'>
                            <ButtonText className='text-white text-lg font-bold'>
                                STOP FLEET TRACKING
                            </ButtonText>
                        </Button>

                        {
                            isFleetPause ? (
                                <Button  className='h-fit p-4 bg-warning-500'
                                    onPress={() => handleFleetPause(false)}
                                >
                                    <ButtonText className='text-white text-lg font-bold'>
                                        CONTINUE TRACKING
                                    </ButtonText>
                                </Button>
                            ) : (
                                <Button className='h-fit p-4 bg-warning-500'
                                    onPress={() => {
                                        handleFleetPause(true);

                                        let aveSpeed = getAveSpeed(distance, speedStartTime);
                                        setAveSpeed(aveSpeed);

                                        setTravelTime(formatTravelTime(trackingTime));

                                        if (paxOnBoard > maxOnBoard) {
                                            setMaxOnBoard(paxOnBoard);
                                        }

                                        if (Number(speed) > maxSpeed) {
                                            setMaxSpeed(Number(speed));
                                        }
                                    }}
                                >
                                    <ButtonText className='text-white text-lg font-bold'>
                                        PAUSE TRACKING
                                    </ButtonText>
                                </Button>
                            )
                        }
                    </Box>
                ) : (
                    <Button className='h-fit p-4 bg-custom-secondary'
                        onPress={async () => {
                            handleFleetStart(true);
                            isFleetStop === true && handleFleetStop(false);

                            await startFleetTracking();
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
                        <VStack className='z-10 bg-white w-fit absolute p-1'>
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
                                    isFleetStart === false || isFleetPause === true ? (
                                        <MapView
                                            ref={mapRef}
                                            style={StyleSheet.absoluteFillObject}
                                            showsUserLocation={true}
                                            initialRegion={{
                                                latitude: location.coords.latitude,
                                                longitude: location.coords.longitude,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01
                                            }}
                                        >
                                            {
                                                isFleetStop && (
                                                    <Polyline
                                                        coordinates={routeCoordinates}
                                                        strokeColor='blue'
                                                        strokeWidth={5}
                                                    />
                                                )
                                            }
                                        </MapView>
                                    ) : (
                                        <MapView
                                            ref={mapRef}
                                            style={StyleSheet.absoluteFillObject}
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
                                                flat={true}
                                                anchor={{ x: 0.5, y: 0.5 }}
                                            />
                                        </MapView>
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
                        <Box className='p-2'>
                            <Text bold={true} size='6xl' className={
                                speed > 60 ? 'text-custom-customRed' : 'text-custom-primary'
                            }>
                                {speed.toFixed(0)} kph
                            </Text>
                            <Text size='3xl' className='text-black'>{distance} km</Text>
                            <Box className='flex-row justify-between'>
                                <Text size='3xl' className='text-black'>{formatTravelTime(trackingTime)}</Text>
                                <Text bold={true} size='3xl' className={
                                    speed > 60 ? 'text-custom-customRed' : 'text-custom-primary'
                                }>
                                    { speed > 60 ? 'Overspeeding' : 'Normal'}
                                </Text>
                            </Box>
                        </Box>

                        <Box className='bg-white flex-row justify-between'>
                            <Box className='bg-white flex-col justify-center items-center p-4'>
                                <Text className='text-custom-customGreen text-xl font-medium'>Boarding</Text>
                                <Button className='bg-custom-customGreen w-16 h-16 p-3 boarder-1 rounded-full m-2'
                                    onPress={() => {
                                        const curBoard = board;
                                        setBoard(curBoard + 1);

                                        const curPax = paxOnBoard + 1;
                                        setPaxOnBoard(curPax);

                                        const message = {
                                            deviceId: deviceId,
                                            lat: location.coords.latitude,
                                            lng: location.coords.longitude,
                                            timestamp: new Date().toISOString(),
                                            userId: username,
                                            vehicleId: vehicleId,
                                            vehicleDetails: vehicleDetails,
                                            passengerId: '',
                                            passengerDetails: '',
                                            altitude: location.coords.altitude,
                                            accuracy: location.coords.accuracy
                                        }
                                        publishBA('boardings', message);
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name='plus'
                                        size={35}
                                        color='white'
                                    />
                                </Button>
                            </Box>

                            <Box className='justify-center'>
                                <Text className='text-custom-customGreen text-3xl'>{board}</Text>
                            </Box>

                            <Box className='bg-white flex-col justify-center items-center p-4'>
                                <Text
                                    className='text-black text-xl font-medium'
                                    onPress={() => openModal()}
                                >
                                    Pax Onboard
                                </Text>
                                <Text
                                    className='text-black text-6xl m-2'
                                    onPress={() => openModal()}    
                                >
                                    {paxOnBoard}
                                </Text>
                            </Box>

                            <Box className='justify-center'>
                                <Text className='text-custom-customRed text-3xl'>{alight}</Text>
                            </Box>

                            <Box className='bg-white flex-col justify-center items-center p-4'>
                                <Text className='text-custom-customRed text-xl font-medium'>Alighting</Text>
                                <Button className='bg-custom-customRed w-16 h-16 p-3 boarder-1 rounded-full m-2'
                                    onPress={() => {
                                        const curAlight = alight;
                                        setAlight(curAlight + 1);

                                        const curPax = paxOnBoard - 1;
                                        setPaxOnBoard(curPax);

                                        const message = {
                                            deviceId: deviceId,
                                            lat: location.coords.latitude,
                                            lng: location.coords.longitude,
                                            timestamp: new Date().toISOString(),
                                            userId: username,
                                            vehicleId: vehicleId,
                                            vehicleDetails: vehicleDetails,
                                            passengerId: '',
                                            passengerDetails: '',
                                            altitude: location.coords.altitude,
                                            accuracy: location.coords.accuracy
                                        }
                                        publishBA('alightings', message);
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name='close'
                                        size={35}
                                        color='white'
                                    />
                                </Button>
                            </Box>
                        </Box>

                        {
                            isFleetPause && (
                                <Box className='bg-white pb-4 ps-4 pe-4 w-full'>
                                    <Box className='bg-gray-700 p-4 w-full border-0 rounded-lg'>
                                        <Text className='text-white'>Summary of Previous PUV Tracking:</Text>
                                        <Box className='flex-row justify-between'>
                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>Ave. Speed (kph):</Text>
                                                <Text className='text-white text-sm'>Max. Speed (kph):</Text>
                                                <Text className='text-white text-sm'>Travel Time (hrd):</Text>
                                            </Box>
                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>{aveSpeed}</Text>
                                                <Text className='text-white text-sm'>{maxSpeed.toFixed(2)}</Text>
                                                <Text className='text-white text-sm'>{travelTime}</Text>
                                            </Box>

                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>Max Pax Onboard:</Text>
                                                <Text className='text-white text-sm'>Total Trip Ridership:</Text>
                                                <Text className='text-white text-sm'>Trip Start Time (hrd):</Text>
                                            </Box>
                                            <Box className='flex-col'>
                                                <Text className='text-white text-sm'>{maxOnBoard}</Text>
                                                <Text className='text-white text-sm'>0</Text>
                                                <Text className='text-white text-sm'>0</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                )
            }
            
            <Modal
                className='p-4'
                isOpen={paxModalVisible}
                onClose={closeModal}
            >
                <ModalContent className='w-full h-fit'>
                    <ModalBody>
                        <Text bold={true} size='lg'>Set Passenger Number</Text>
                        <Input
                            className='w-full bg-white border-2'
                            variant='underlined'
                        >
                            <InputField
                                onChangeText={setInputPax}
                                value={inputPax}
                            />
                        </Input>
                    </ModalBody>

                    <ModalFooter className='p-2'>
                        <Button className='bg-transparent me-4'
                            onPress={() => {
                                setInputPax('');
                                closeModal();
                            }}
                        >
                            <ButtonText className='text-custom-secondary'>CANCEL</ButtonText>
                        </Button>

                        <Button className='bg-transparent'
                            onPress={() => {
                                setPaxOnBoard(Number(inputPax));
                                setInputPax('');
                                closeModal();
                            }}
                        >
                            <ButtonText className='text-custom-secondary'>OK</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {
                isFleetStop && (
                    <Box className='bg-white p-4 w-full'>
                        <Box className='bg-gray-700 p-4 w-full border-0 rounded-lg'>
                            <Text className='text-white'>Summary of Previous PUV Tracking:</Text>
                            
                            <Box className='flex-row justify-between'>
                                <Box className='flex-col'>
                                    <Text className='text-white text-sm'>Ave. Speed (kph):</Text>
                                    <Text className='text-white text-sm'>Max. Speed (kph):</Text>
                                    <Text className='text-white text-sm'>Travel Time (hrd):</Text>
                                </Box>
                                <Box className='flex-col'>
                                    <Text className='text-white text-sm'>{aveSpeed}</Text>
                                    <Text className='text-white text-sm'>{maxSpeed.toFixed(2)}</Text>
                                    <Text className='text-white text-sm'>{travelTime}</Text>
                                </Box>

                                <Box className='flex-col'>
                                    <Text className='text-white text-sm'>Max Pax Onboard:</Text>
                                    <Text className='text-white text-sm'>Total Trip Ridership:</Text>
                                    <Text className='text-white text-sm'>Trip Start Time (hrd):</Text>
                                </Box>
                                <Box className='flex-col'>
                                    <Text className='text-white text-sm'>{maxOnBoard}</Text>
                                    <Text className='text-white text-sm'>0</Text>
                                    <Text className='text-white text-sm'>0</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </GluestackUIProvider>
    );
}