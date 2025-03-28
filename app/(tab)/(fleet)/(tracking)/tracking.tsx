import '@/global.css';
// react native
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapView, { MapMarker } from 'react-native-maps';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Device from 'expo-device';
import { Accelerometer } from 'expo-sensors';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@/components/ui/modal';
import { Input, InputField } from '@/components/ui/input';

import * as geolib from 'geolib';
import moment from 'moment';

import { generateGPX, getLocationName, getUserState } from '../../tabViewModel';
import { getFleetDetails } from '../fleetViewModel';
import { getAveSpeed, formatTravelTime, removeItem, mqttBroker, publishBA, setFleetRecord, getTravelSpeed } from './trackingViewModel';
import { onMqttClose } from '@/app/service/mqtt/mqtt';
import { onMqttConnect } from '@/app/service/mqtt/mqtt';
import { getFleetSetting } from '../(settings)/settingsViewModel';

const Drawer = createDrawerNavigator();

interface Coordinate {
    latitude: number;
    longitude: number;
    timestamp: Date
}

export default function TrackingScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <TrackingNavigator />
        </GluestackUIProvider>
    );
}

function TrackingNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='TrackingMain'
            screenOptions={{
                header: (props) => <Header />
            }}
        >
            <Drawer.Screen
                name='TrackingMain'
                component={Screen}
                options={{ unmountOnBlur: true }}
            />
            
        </Drawer.Navigator>
    );
}

function Screen() {
    const nav: NavigationProp<any, any> = useNavigation();
    const LOCATION_TRACKING = 'background-location-task';

    const deviceId = Device.osBuildId ?? Device.osInternalBuildId ?? '';
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<any|null>(null);
    const [isFleetPause, setFleetPause] = useState(false);
    const [isFleetStop, setFleetStop] = useState(false);

    const [isGpxOn, setGpxOn] = useState(true);

    const [route, setRoute] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleDetails, setVehicleDetails] = useState('');
    const [username, setUsername] = useState('');
    const [capacity, setCapacity] = useState('');
    
    const [speed, setSpeed] = useState<number|0>(0);
    const [distance, setDistance] = useState(0);
    const [trackingTime, setTrackingTime] = useState(0);
    const [acceleration, setAcceleration] = useState(0);
    // const [aveTravelSpeed, setAveTravelSpeed] = useState(0);

    const [paxModalVisible, setPaxModalVisible] = useState(false);
    const [alight, setAlight] = useState(0);
    const [board, setBoard] = useState(0);
    const [paxOnBoard, setPaxOnBoard] = useState(0);
    const [inputPax, setInputPax] = useState('');
    const [maxOnBoard, setMaxOnBoard] = useState(0);

    const [aveSpeed, setAveSpeed] = useState<any|0>(0);
    const [maxSpeed, setMaxSpeed] = useState(0);
    const [travelTime, setTravelTime] = useState<any|0>(0);
    const [originTime, setOriginTime] = useState<Date|null>(null);

    // for tracking
    const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription|null>(null);
    // for route polyline
    const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
    // const [speedStartTime, setSpeedStartTime] = useState<any|null>(null);

    const openModal = () => setPaxModalVisible(true);
    const closeModal = () => setPaxModalVisible(false);

    const getLocation = async() => {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    }

    useEffect(() => {
        const subs = AppState.addEventListener('change', (state) => {
            console.log('AppState changed: ', state);
        })

        getLocation();

        // get user info
        getUserState().then((response) => {
            setUsername(response.username);
        })

        // get fleet details
        getFleetDetails().then((response) => {
            setRoute(response.route);
            setVehicleId(response.vehicleId);
            setVehicleDetails(response.vehicleDetails);
            setCapacity(response.capacity);

            console.log(response.capacity);
        })

        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const accelerometer = Math.sqrt(x * x + y * y + z * z);
            // console.log(accelerometer);
            setAcceleration(accelerometer);
        })

        Accelerometer.setUpdateInterval(500);

        onMqttConnect().then((response) => {
            console.log(response);
            startFleetTracking();
        });

        return () => {
            subs.remove();
            subscription.remove()
        }; // cleanup on unamount
    }, []);

    // refresh tab
    useFocusEffect(
        useCallback(() => {
            getFleetSetting().then((setting) => {
                console.log('Fleet ', setting);
                setGpxOn(setting.gps_tracks);
            })

            setFleetPause(false);
            setFleetStop(false);
            setRoute('');
            setVehicleId('');
            setVehicleDetails('');
            setUsername('');
            setCapacity('');
            setSpeed(0);
            setDistance(0);
            setTrackingTime(0);
            setAcceleration(0);
            setPaxModalVisible(false);
            setAlight(0);
            setBoard(0);
            setPaxOnBoard(0);
            setInputPax('');
            setMaxOnBoard(0);
            setAveSpeed(0);
            setMaxSpeed(0);
            setTravelTime(0);
            setOriginTime(null);
            setRouteCoordinates([]);

            locationSubscription?.remove();
            setLocationSubscription(null);

            closeModal();

            removeItem();
        }, [])
    );

    const startFleetTracking = async() => {
        const prevLoc = await Location.getCurrentPositionAsync({});
        setOriginTime(new Date());

        if (locationSubscription) {
            return;
        }

        const subscription = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1
        }, (newLocation) => {
            if (prevLoc) {
                mapRef.current?.animateToRegion(
                    {
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }, 1000
                );

                // distance
                const inMeter = geolib.getDistance(
                    {latitude: prevLoc.coords.latitude, longitude: prevLoc.coords.longitude},
                    {latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude}
                );
                const inKilometer = (inMeter / 1000).toFixed(2);
                setDistance(parseFloat(inKilometer));

                // travel time
                const timeDelta = 2;
                const speedInMeterPerSecond = inMeter / timeDelta;
                // setSpeedStartTime(new Date().getTime());

                if (speedInMeterPerSecond > 0) {
                    setTrackingTime((prevTimeTravel) => prevTimeTravel + timeDelta);
                }

                // speed
                const speedKph = newLocation.coords.speed ? newLocation.coords.speed * 3.6 : 0;
                setSpeed(speedKph);
            }

            setRouteCoordinates((prevCoords) => [
                ...prevCoords,
                {
                    latitude: newLocation.coords.latitude,
                    longitude: newLocation.coords.longitude,
                    timestamp: new Date()
                }
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

        setLocationSubscription(subscription);
    }

    TaskManager.defineTask(LOCATION_TRACKING, async({ data, error }) => {
        const prevLoc = await Location.getCurrentPositionAsync({});

        if (error) {
            console.error(error);
            return;
        }

        if (data) {
            const {location} = data as any;
            const newLocation = location[0];

            if (newLocation) {
                if (prevLoc) {
                    const inMeter = geolib.getDistance(
                        {latitude: prevLoc.coords.latitude, longitude: prevLoc.coords.longitude},
                        {latitude: newLocation.latitude, longitude: newLocation.longitude}
                    );
                    const inKilometer = (inMeter / 1000).toFixed(2);
                    setDistance(parseFloat(inKilometer));
    
                    const timeDelta = 2;
                    const speedInMeterPerSecond = inMeter / timeDelta;
    
                    if (speedInMeterPerSecond > 0) {
                        setTrackingTime((prevTimeTravel) => prevTimeTravel + timeDelta);
                    }
    
                    const speedKph = newLocation.speed ? newLocation.speed * 3.6 : 0;
                    setSpeed(speedKph);
                }

                setRouteCoordinates((prevCoords) => [
                    ...prevCoords,
                    {
                        latitude: newLocation.latitude,
                        longitude: newLocation.longitude,
                        timestamp: new Date()
                    }
                ])

                const message = {
                    deviceId: deviceId,
                    lat: newLocation.latitude,
                    lng: newLocation.longitude,
                    timestamp: new Date().toISOString(),
                    userId: username,
                    vehicleId: vehicleId,
                    vehicleDetails: vehicleDetails,
                    passengerId: '',
                    passengerDetails: '',
                    altitude: newLocation.altitude,
                    accuracy: newLocation.accuracy
                }

                mqttBroker(message);
            }
        }
    })

    useEffect(() => {
        if (isFleetStop) {
            locationSubscription?.remove();
            setLocationSubscription(null);

            // stop sending location
            // mqttBroker('#');

            setRoute('');
            setVehicleId('');

            onMqttClose().then((response) => {
                console.log(response);
                if (isGpxOn) {
                    generateGPX(routeCoordinates);

                    nav.navigate('Main', {
                        route_coordinates: routeCoordinates,
                        ave_speed: aveSpeed,
                        max_speed: maxSpeed.toFixed(2),
                        travel_time: travelTime,
                        max_pax: `${ paxOnBoard > maxOnBoard ? paxOnBoard : maxOnBoard }`,
                        total_trip: board,
                        trip_start: moment(originTime).format('hh:mm:ss')
                    })
                }
                // nav.goBack();
            });
        }
    }, [isFleetStop, aveSpeed, maxSpeed, travelTime, routeCoordinates])
    
    const handleFleetPause = (i: boolean) => setFleetPause(i);
    
    return (
        <GluestackUIProvider mode='light'>
            <VStack>
                <Button
                    className='h-fit p-4 bg-custom-customRed rounded-none'
                    onPress={async() => {
                        let aveSpeed = getAveSpeed(speed, trackingTime);
                        setAveSpeed(aveSpeed);

                        setTravelTime(formatTravelTime(trackingTime));
                                
                        if (paxOnBoard > maxOnBoard) {
                            setMaxOnBoard(paxOnBoard);
                        }

                        if (Number(speed) > maxSpeed) {
                            setMaxSpeed(Number(speed));
                        }

                        setFleetRecord({
                            route: route,
                            origin: await getLocationName(routeCoordinates[0]),
                            origin_lat: routeCoordinates[0].latitude,
                            origin_lng: routeCoordinates[0].longitude,
                            destination: await getLocationName(routeCoordinates[routeCoordinates.length - 1]),
                            destination_lat: routeCoordinates[routeCoordinates.length - 1].latitude,
                            destination_lng: routeCoordinates[routeCoordinates.length - 1].longitude,
                            travel_distance: distance,
                            start_time: moment(originTime).format('YYYY-MM-DD HH:mm:ss'),
                            travel_time: travelTime,
                            type: '',
                            capacity: capacity,
                            vehicle_id: vehicleId,
                            vehicle_details: vehicleDetails,
                            trip_date: moment(new Date()).format('YYYY-MM-DD'),
                            consumption: '0.0',
                            consumption_unit: 'liters',
                            start_odometer: '0.0',
                            end_odometer: '0.0'
                        });

                        closeModal();
                        // stopFleetTracking();
                        setFleetStop(true);
                    }}
                >
                    <ButtonText className='text-white text-lg font-bold'>
                        STOP FLEET TRACKING
                    </ButtonText>
                </Button>

                {
                    isFleetPause ? (
                        <Button
                            className='h-fit p-4 bg-warning-500 rounded-none'
                            onPress={() => {
                                handleFleetPause(false);
                            }}
                        >
                            <ButtonText className='text-white text-lg font-bold'>
                                CONTINUE TRACKING
                            </ButtonText>
                        </Button>
                    ) : (
                        <Button
                            className='h-fit p-4 bg-warning-500 rounded-none'
                            onPress={() => {
                                handleFleetPause(true);

                                let aveSpeed = getAveSpeed(speed, trackingTime);
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
            </VStack>

            <Box className='flex-1 w-full h-full'>
                <Box className='flex-1'>
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

                    {
                        location && (
                            <MapView
                                ref={mapRef}
                                style={StyleSheet.absoluteFillObject}
                                showsUserLocation={false}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                            >
                                <MapMarker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude
                                    }}
                                    flat={true}
                                    anchor={{x: 0.5, y: 0.5}}
                                />
                            </MapView>
                        )
                    }
                </Box>

                <Box className='bg-white h-fit'>
                    <Box className='h-fit bg-blue-500 p-2'>
                        <HStack className='justify-between'>
                            <VStack space='md'>
                                <Text
                                    bold={true}
                                    size='5xl'
                                    className={
                                        speed > 60 ? 'text-custom-customRed' : 'text-custom-primary'
                                    }
                                >
                                    {speed.toFixed(0)} kph
                                </Text>
                                <Text
                                    size='5xl'
                                    className='text-white'
                                >
                                    {distance} km
                                </Text>
                                <Text
                                    size='4xl'
                                    className='text-white'
                                >
                                    {formatTravelTime(trackingTime)}
                                </Text>
                            </VStack>

                            <VStack space='md' className='items-end'>
                                <Box className='justify-center items-center'>
                                    <MaterialCommunityIcons
                                        className='w-[115px] h-[115px] border-2 border-custom-customRed rounded-full'
                                        size={115}
                                        color='#FF5722'
                                    />
                                    <MaterialCommunityIcons
                                        className='absolute w-[75px] h-[75px] border-2 border-custom-customRed rounded-full'
                                        size={115}
                                        color='#FF5722'
                                    />
                                    <MaterialCommunityIcons
                                        className='absolute'
                                        name='circle'
                                        size={35}
                                        color={
                                            acceleration < 2.5 ? '#40C057' :
                                            acceleration < 3.5 ? '#FFA500' :
                                            '#E0321C'
                                        }
                                    />
                                </Box>

                                <Box>
                                    <Text
                                        size='3xl'
                                        bold={true}
                                        className='text-custom-primary'
                                    >
                                        {
                                            'Ave. Speed: ' + getTravelSpeed(distance, trackingTime)
                                        }
                                    </Text>
                                </Box>

                                <Box>
                                    <Text
                                        bold={true}
                                        size='3xl'
                                        className={
                                            acceleration > 5.5 ? 'text-custom-customRed' : 
                                            speed > 60 ? 'text-custom-customRed' : 'text-custom-primary'
                                        }
                                    >
                                        { acceleration > 5.5 ? (
                                            'Aggressive'
                                        ) : ( speed > 60 ? (
                                            'Overspeeding'
                                        ) : (
                                            'Normal'
                                        ))}
                                    </Text>
                                </Box>
                            </VStack>
                        </HStack>
                    </Box>
                    <HStack className='bg-white items-center justify-between p-4'>
                        <VStack className='justify-center items-center'>
                            <Text bold={true} size='xl' className='text-custom-customGreen font-medium'>
                                Boarding
                            </Text>
                            <Button
                                className='bg-custom-customGreen w-20 h-20 rounded-full m-2'
                                onPress={() => {
                                    const curBoard = board;
                                    setBoard(curBoard + 1);

                                    const curPax = paxOnBoard + 1;
                                    setPaxOnBoard(curPax);

                                    const message = {
                                        deviceId: deviceId,
                                        lat: location.coords.latitude,
                                        lng: location.coords.longitude,
                                        timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
                        </VStack>

                        <Text size='5xl' className='text-custom-customGreen'>
                            {board}
                        </Text>

                        <VStack className='justify-center items-center'>
                            <Text
                                bold={true}
                                size='lg'
                                className='text-black font-medium'
                                onPress={() => openModal()}
                            >
                                Pax Onboard
                            </Text>
                            <Text
                                bold={true}
                                size='6xl'
                                className='text-black m-2'
                                onPress={() => openModal()}
                            >
                                {paxOnBoard}
                            </Text>
                        </VStack>

                        <Text size='5xl' className='text-custom-customRed'>
                            {alight}
                        </Text>

                        <VStack className='justify-center items-center'>
                            <Text bold={true} size='xl' className='text-custom-customRed font-medium'>
                                Alight
                            </Text>
                            <Button
                                className='bg-custom-customRed w-20 h-20 rounded-full m-2'
                                onPress={() => {
                                    const curAlight = alight;
                                    setAlight(curAlight + 1);

                                    const curPax = paxOnBoard - 1;
                                    setPaxOnBoard(curPax);

                                    const message = {
                                        deviceId: deviceId,
                                        lat: location.coords.latitude,
                                        lng: location.coords.longitude,
                                        timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
                                    name='minus'
                                    size={35}
                                    color='white'
                                />
                            </Button>
                        </VStack>
                    </HStack>

                    {
                        isFleetPause && (
                            <Box className='bg-gray-700 ms-2 me-2 mb-4 p-2 rounded-lg'>
                                <Text size='md' className='text-white'>Summary of Previous PUV Tracking:</Text>
                                <HStack space='sm' className='justify-between'>
                                    <VStack>
                                        <Text size='sm' className='text-white'>Ave. Speed (kph):</Text>
                                        <Text size='sm' className='text-white'>Max. Speed (kph):</Text>
                                        <Text size='sm' className='text-white'>Travel Time (hrs):</Text>
                                    </VStack>
                                    <VStack>
                                        <Text size='sm' className='text-white'>{aveSpeed}</Text>
                                        <Text size='sm' className='text-white'>{maxSpeed.toFixed(2)}</Text>
                                        <Text size='sm' className='text-white'>{travelTime}</Text>
                                    </VStack>
                                    <VStack>
                                        <Text size='sm' className='text-white'>Max Pax Onboard:</Text>
                                        <Text size='sm' className='text-white'>Total Trip Ridership:</Text>
                                        <Text size='sm' className='text-white'>Trip Start Time (hrs):</Text>
                                    </VStack>
                                    <VStack>
                                        <Text size='sm' className='text-white'>{maxOnBoard}</Text>
                                        <Text size='sm' className='text-white'>{board}</Text>
                                        <Text size='sm' className='text-white'>{moment(originTime).format('hh:mm:ss')}</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        )
                    }
                </Box>
            </Box>

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
        </GluestackUIProvider>
    );
}

function Header() {
    return (
        <Box className='flex-row bg-custom-primary justify-between items-center pt-14' />
    )
}