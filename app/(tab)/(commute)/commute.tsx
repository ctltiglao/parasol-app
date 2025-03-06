import '@/global.css';
// react native
import React from 'react';
import { useCallback, useEffect, useRef, useState, createContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { MapMarker, Polyline, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Camera} from 'react-native-maps';
import { Alert, AppState, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
// expo
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Device from 'expo-device';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Heading } from '@/components/ui/heading';
import { Checkbox, CheckboxLabel } from '@/components/ui/checkbox';
import { VStack } from '@/components/ui/vstack';

import DrawerScreen from '@/app/(drawer)/drawer';
import CommuteHeader from '@/app/screen/header/commuteHeader';
import { CustomCommuteFab } from '@/app/screen/customFab';

import TripInfo from './(info)/info';
import TripAlert from './(alert)/alert';
import TripRate from './(rate)/rate';
import TripFeed from './(feed)/feed';
import CommuteHistoryScreen from './(history)/history';
import CommuteSettingsScreen from './(settings)/settings';

import { mqttBroker, getCommuteDetails, getQuickTourPref, setCommuteRecord } from './commuteViewModel';
import { modeOptions } from '@/assets/values/strings';
import { generateGPX, getLocationName, getUserState } from '../tabViewModel';
import { onMqttClose, onMqttConnect } from '@/app/service/mqtt/mqtt';
import { getCommuteSetting } from './(settings)/settingsViewModel';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
// const LocationContext = createContext({});

interface Coordinate {
    latitude: number;
    longitude: number;
    timestamp: string
}

export default function CommuteScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = async () => {
        if (selectedCheckboxes === true) {
            try {
                await AsyncStorage.setItem('quickTour', '1');
            } catch (e) {
                console.log(e);
            }
        } else if (selectedCheckboxes === false) {
            try {
                await AsyncStorage.setItem('quickTour', '0');
            } catch (e) {
                console.log(e);
            }
        }

        setModalVisible(false);
    }

    const toggleCheckbox = () => setSelectedCheckboxes(!selectedCheckboxes);
    const checkQuickTour = () => {
        getQuickTourPref().then((res) => {
            if (res === '0') {
                openModal();
                setSelectedCheckboxes(false);
            } else {
                setSelectedCheckboxes(true);
            }
        })
    }

    useFocusEffect(
        useCallback(() => {
            // onMqttConnect();

            checkQuickTour();
        }, [])
    );

    return (
        <GluestackUIProvider mode='light'>
            <Drawer.Navigator
                initialRouteName='Main'
                drawerContent={props => <DrawerScreen {...props} />}

                screenOptions={{
                    header: (props) => <CommuteHeader {...props} openModal={openModal}/>
                }}
            >
                <Drawer.Screen name='Main' component={Screen} />

                <Stack.Screen
                    name='History'
                    component={CommuteHistoryScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Settings'
                    component={CommuteSettingsScreen}
                    options={{ headerShown: false }}
                />
            </Drawer.Navigator>

            {/* ========== QUICK TOUR ========== */}
            <Modal
                className={ Platform.OS === 'ios' ? 'h-screen pt-32 pe-8 pb-32 ps-8' : 'h-screen pt-32 pe-8 pb-14 ps-8' }
                isOpen={modalVisible}
                onClose={closeModal}
            >
                <ModalContent className='w-full h-full rounded-sm p-0'>
                    <WebView
                        source={{ uri: 'https://form.jotform.com/233414239585056' }}
                    />
                    <ModalFooter className='p-4'>
                        <Checkbox size='md'
                            className='absolute left-0'
                            value='Do not show again'
                            onChange={() => toggleCheckbox()}
                        >
                            {
                                selectedCheckboxes ? (
                                    <MaterialIcons size={24}
                                        color='#0038A8'
                                        name='check-box'
                                    />
                                ) : (
                                    <MaterialIcons size={24}
                                        color='gray'
                                        name='check-box-outline-blank'
                                    />
                                )
                            }
                            <CheckboxLabel size='md' className='text-black font-medium'>
                                Do not show again
                            </CheckboxLabel>
                        </Checkbox>

                        <Button className='bg-zinc-300 rounded-md p-2'
                            onPress={() => {
                                closeModal();
                            }}
                        >
                            <ButtonText className='text-black'>CANCEL</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </GluestackUIProvider>
    );
}

function Screen() {
    const LOCATION_TRACKING = 'background-location-task';
    // const [appState, setAppState] = useState(AppState.currentState);

    const [isGpxOn, setGpxOn] = useState(true);
    const mapRef = useRef<MapView>(null);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [showModalSelect, setShowModalSelect] = useState(false);

    const [location, setLocation] = useState<Location.LocationObject|null>(null);
    const [isCommuteStart, setCommuteStart] = useState(false);
    const [isCommuteStop, setCommuteStop] = useState(false);

    // let locationSubscription = useRef<Location.LocationSubscription|null>(null);
    const [ locationSubscription, setLocationSubscription ] = useState<Location.LocationSubscription|null>(null);
    const [ routeCoordinates, setRouteCoordinates ] = useState<Coordinate[]>([]);
    const [ startTime, setStartTime ] = useState<any|null>(null);
    const [ vehicleId, setVehicleId ] = useState('');
    const [ vehicleDescription, setVehicleDescription ] = useState('');
    const [ username, setUsername ] = useState('');

    const [ isOverlayInfoVisible, setOverlayInfoVisible ] = useState(false);
    const [ isOverlayAlertVisible, setOverlayAlertVisible ] = useState(false);
    const [ isOverlayRateVisible, setOverlayRateVisible ] = useState(false);
    const [ isOverlayFeedVisible, setOverlayFeedVisible ] = useState(false);

    const toggleOverlayInfo = () => {
        setOverlayInfoVisible(!isOverlayInfoVisible);
        // locationSubscription?.remove();
        // setLocationSubscription(null);

        getCommuteDetails().then((response) => {
            setVehicleId(response.vehicleId);
            setVehicleDescription(response.vehicleDescription);
        });
    };
    const toggleOverlayAlert = () => setOverlayAlertVisible(!isOverlayAlertVisible);
    const toggleOverlayRate = () => setOverlayRateVisible(!isOverlayRateVisible);
    const toggleOverlayFeed = () => setOverlayFeedVisible(!isOverlayFeedVisible);

    const getLocation = async () => {
        const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced
        });
        setLocation(loc);

        if (location && mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                },
                1000
            );
        }
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (state) => {
            console.log('AppState changed: ', state);
        })

        getLocation();

        return () => subscription.remove();
    }, []);
    // }, [location]);

    // refresh tab
    useFocusEffect(
        useCallback(() => {
            getCommuteSetting().then((setting) => {
                console.log('Commute ', setting);
                setGpxOn(setting.gps_tracks);
            })

            setSelectedMode(null);
            setShowModalSelect(false);
            // locationSubscription.current?.remove();
            // locationSubscription.current = null;
            locationSubscription?.remove();
            setLocationSubscription(null);
            setRouteCoordinates([]);
            setStartTime(null);
            setVehicleId('');
            setVehicleDescription('');

            setCommuteStart(false);
            setCommuteStop(false);

            setOverlayInfoVisible(false);
            setOverlayAlertVisible(false);
            setOverlayRateVisible(false);
            setOverlayFeedVisible(false);

            // removeItem();
        }, [isGpxOn])
    );

    const startCommuteTracking = async () => {
        const time = new Date().toISOString();
        setStartTime(time);

        if (locationSubscription) {
            console.log('Removing previous location subscription...');
            locationSubscription.remove();
            setLocationSubscription(null);
            return;
        }

        const subscription = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1000, // 10 seconds interval
            distanceInterval: 1, // 10 meters interval
            mayShowUserSettingsDialog: true
        }, (newLocation) => {
            updateCamera(
                newLocation.coords.latitude,
                newLocation.coords.longitude,
                newLocation.coords.heading || 0
            )

            setRouteCoordinates((prevCoords) => [
                ...prevCoords,
                { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude, timestamp: new Date().toString() }
            ])

            const message = {
                deviceId: Device.osBuildId ?? Device.osInternalBuildId ?? '',
                lat: newLocation.coords.latitude,
                lng: newLocation.coords.longitude,
                timestamp: new Date().toISOString(),
                userId: username,
                vehicleId: vehicleId,
                vehicleDetails: vehicleDescription,
                passengerId: '',
                passengerDetails: '',
                altitude: newLocation.coords.altitude,
                accuracy: newLocation.coords.accuracy
            }
            
            mqttBroker(message);
            
            setLocation(newLocation);

            // console.log('4')
        })

        // console.log('1')

        setLocationSubscription(subscription);
    }

    const updateCamera = (latitude: number, longitude: number, heading: number) => {
        if (mapRef.current) {
            const camera: Camera = {
                center: {
                    latitude: latitude,
                    longitude: longitude
                },
                pitch: 60,
                heading,
                altitude: 500,
                zoom: 18
            };
    
            mapRef.current.animateCamera(camera, {duration: 1000});
        }
    }

    // background tracking
    TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
        if (error) {
            console.error(error);
            return;
        }

        if (isCommuteStart && data) {
            const {locations} = data as any;
            const newLocation = locations[0];

            if (newLocation) {
                console.log('Background location: ', newLocation);

                setRouteCoordinates((prevCoords) => [
                    ...prevCoords,
                    { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude, timestamp: new Date().toString() }
                ])
    
                const message = {
                    deviceId: Device.osBuildId ?? Device.osInternalBuildId ?? '',
                    lat: newLocation.coords.latitude,
                    lng: newLocation.coords.longitude,
                    timestamp: new Date().toISOString(),
                    userId: username,
                    vehicleId: vehicleId,
                    vehicleDetails: vehicleDescription,
                    passengerId: '',
                    passengerDetails: '',
                    altitude: newLocation.coords.altitude,
                    accuracy: newLocation.coords.accuracy
                }
                
                mqttBroker(message);
            }
        }
    })

    const stopCommuteTracking = () => {
        locationSubscription?.remove();
        setLocationSubscription(null);

        handleCommuteStart(false);
        handleCommuteStop(true);

        modeSelectChange(null);
    }

    const modeSelectChange = async (value: string | null): Promise<boolean> => {
        setSelectedMode(value);
        setShowModalSelect(false);

        handleCommuteStart(true);
        isCommuteStop === true && handleCommuteStop(false);

        // await startCommuteTracking()
        return Promise.resolve(true);
    }

    const handleCommuteStart = (i: boolean) => setCommuteStart(i);
    const handleCommuteStop = (i: boolean) => setCommuteStop(i);

    const CustomTripFab = () => {
        return (
            <VStack space='md' className="absolute p-3 items-start">
                <CustomCommuteFab iconName='qrcode-scan' onPress={() => toggleOverlayInfo()} />
                <CustomCommuteFab
                    iconName='emoticon'
                    onPress={() => {
                        // toggleOverlayRate();
                        vehicleId !== '' ? toggleOverlayRate() : alert('Please scan QR code first');
                    }}
                />
                <CustomCommuteFab
                    iconName='bell'
                    onPress={() => {
                        vehicleId !== '' ? toggleOverlayAlert() : alert('Please scan QR code first');
                    }}
                />
                <CustomCommuteFab iconName='comment-text' onPress={() => toggleOverlayFeed()}/>
                {
                    selectedMode && (
                        <Button
                            onPress={() => setShowModalSelect(true)}
                            className="h-fit p-2 bg-custom-secondary shadow-soft-4 border-1 rounded-full"
                        >
                            <MaterialIcons name="swap-horiz" size={30} color="white" />
                        </Button>
                    )
                }
            </VStack>
        )
    }

    return (
        <GluestackUIProvider mode='light'>
            {
                selectedMode ? (
                    <Button className='h-fit p-4 bg-custom-customRed rounded-none'
                        onPress={async () => {
                            onMqttClose();

                            stopCommuteTracking();

                            setCommuteRecord({
                                origin: await getLocationName(routeCoordinates[0]),
                                originLat: routeCoordinates[0].latitude,
                                originLng: routeCoordinates[0].longitude,
                                destination: await getLocationName(routeCoordinates[routeCoordinates.length - 1]),
                                destinationLat: routeCoordinates[routeCoordinates.length - 1].latitude,
                                destinationLng: routeCoordinates[routeCoordinates.length - 1].longitude,
                                mode: selectedMode,
                                purpose: '',
                                vehicle_id: vehicleId,
                                vehicle_details: vehicleDescription,
                                commute_date: startTime
                            }).then((response) => {
                                console.log(response)

                                if (response === true) {
                                    Alert.alert(
                                        'Confirm',
                                        'Earn tokens by rating your trip.',
                                        [
                                            {text: 'Close', onPress: () => {
                                                toggleOverlayRate();

                                                if (isGpxOn) {
                                                    generateGPX(routeCoordinates);
                                                }
                                            }},
                                        ]
                                    )
                                }
                            })
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            STOP COMMUTE TRACKING
                        </ButtonText>
                    </Button>
                ) : (
                    <Button className='bg-custom-secondary h-fit rounded-none p-4'
                        onPress={() => {
                            // setShowModalSelect(true)
                            getUserState().then((response) => {
                                if (response.username !== undefined) {
                                    setUsername(response.username);
                                }

                                if (response.preferred_username !== undefined)  {
                                    setUsername(response.preferred_username);
                                }

                                // onMqttConnect().then((response) => {
                                //     console.log(response)
                                //     setShowModalSelect(true)
                                // })
                                setShowModalSelect(true)
                            })
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            START COMMUTE TRACKING
                        </ButtonText>
                    </Button>
                )
            }

            {(() => {
                if (isOverlayInfoVisible) {
                    return <TripInfo handleAction={toggleOverlayInfo} />
                } else if (isOverlayAlertVisible) {
                    return <TripAlert handleAction={toggleOverlayAlert} location={location} />
                } else if (isOverlayRateVisible) {
                    return <TripRate handleAction={toggleOverlayRate} location={location} />
                } else if (isOverlayFeedVisible) {
                    return <TripFeed handleAction={toggleOverlayFeed} />
                } else {
                    return (
                        <Box className='flex-1 w-full h-full'>
                            <Box className='flex-1'>
                                {
                                    location && (
                                        <MapView
                                            ref={mapRef}
                                            // provider={PROVIDER_GOOGLE}
                                            style={StyleSheet.absoluteFillObject}
                                            showsUserLocation={!isCommuteStart}
                                            initialRegion={{
                                                latitude: location.coords.latitude,
                                                longitude: location.coords.longitude,
                                                latitudeDelta: isCommuteStart ? 0.0922 : 0.01,
                                                longitudeDelta: isCommuteStart ? 0.0421 : 0.01
                                            }}
                                            showsTraffic
                                            showsCompass
                                            mapType='standard'
                                        >
                                            { isCommuteStart && (
                                                <MapMarker
                                                    coordinate={{
                                                        latitude: location.coords.latitude,
                                                        longitude: location.coords.longitude
                                                    }}
                                                    anchor={{ x: 0.5, y: 0.5 }}
                                                />
                                            )}
                                            {( isCommuteStop || isCommuteStart ) && (
                                                <Polyline
                                                    coordinates={routeCoordinates}
                                                    strokeColor='blue'
                                                    strokeWidth={5}
                                                />
                                            )}
                                        </MapView>
                                    )
                                }
                            </Box>

                            {
                                showModalSelect === false && (
                                    <Box className='absolute justify-between bottom-1/2'>
                                        <Box className='justify-center'>
                                            <CustomTripFab />
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>
                    )
                }
            })()}

            <Modal
                className='p-6'
                isOpen={showModalSelect}
                onClose={() => setShowModalSelect(false)}
            >
                <Box className='flex-1 w-full h-full mb-40'>
                    <ModalContent className='w-full'>
                        <ModalHeader>
                            <Heading>
                                Select Vehicle Type
                            </Heading>
                        </ModalHeader>
                        <ModalBody className='h-full w-full'>
                            <Select>
                                {modeOptions.map((option) => (
                                    <SelectItem
                                        className='text-black text-xl font-medium'
                                        key={option.id}
                                        label={option.label}
                                        value={option.value}
                                        onPress={() => {
                                            modeSelectChange(option.label).then(async () => {
                                                onMqttConnect();
                                                await startCommuteTracking();
                                                // if (isCommuteStart !== true) {
                                                //     console.log('not started');
                                                    
                                                // } else {
                                                //     console.log('already started');
                                                // }
                                            })
                                        }}
                                    />
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter className='pb-4'>
                            <Button
                                className='bg-transparent'
                                onPress={() => setShowModalSelect(false)}
                            >
                                <ButtonText className='text-custom-secondary text-lg font-medium'>
                                    CANCEL
                                </ButtonText>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Box>
            </Modal>
        </GluestackUIProvider>
    );
}