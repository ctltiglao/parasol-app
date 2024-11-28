import '@/global.css';
// react native
import { useEffect, useRef, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { MapMarker, MapPolyline, Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet } from 'react-native';
// expo
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Heading } from '@/components/ui/heading';

import DrawerScreen from '@/app/(drawer)/drawer';
import TripHeader from '@/components/_drawer/_headers/tripHeader';
import { SubFab } from '@/components/customFab';

import TripInfo from './(info)/info';
import TripAlert from './(alert)/alert';
import TripRate from './(rate)/rate';
import TripFeed from './(feed)/feed';
import TripHistoryScreen from './(history)/history';
import QuickTourScreen from './(tour)/tour';
import TripSettingsScreen from './(settings)/settings';

import { getCommuteDetails, setCommuteRecord } from './tripViewModel';
import { modeOptions } from '@/assets/values/strings';
import { getLocation, getLocationName, getLocationPermission } from '../tabViewModel';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function TripScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerNavigator />
        </GluestackUIProvider>
    );
}

function DrawerNavigator() {
    return (
        <>
            <Drawer.Navigator
                initialRouteName='Main'
                drawerContent={props => <DrawerScreen {...props} />}

                screenOptions={{
                    header: (props) => <TripHeader {...props} />
                }}
            >
                <Drawer.Screen name='Main' component={Screen} />

                <Stack.Screen
                    name='History'
                    component={TripHistoryScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Tour'
                    component={QuickTourScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Settings'
                    component={TripSettingsScreen}
                    options={{ headerShown: false }}
                />
            </Drawer.Navigator>
        </>
    );
}


function Screen() {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [showModalSelect, setShowModalSelect] = useState(false);
    const [showModalSwitch, setShowModalSwitch] = useState(false);

    const [location, setLocation] = useState<any|null>(null);
    const [route, setRoute] = useState<{latitude: number, longitude: number}[]>([]);
    const [originName, setOriginName] = useState<string|null>('');
    const [originLat, setOriginLat] = useState(0);
    const [originLng, setOriginLng] = useState(0);
    const [destinationName, setDestinationName] = useState<string|null>('');
    const [destinationLat, setDestinationLat] = useState(0);
    const [destinationLng, setDestinationLng] = useState(0);
    const [isCommuteStart, setCommuteStart] = useState(false);

    const [vehicleId, setVehicleId] = useState('');
    const [vehicleDescription, setVehicleDescription] = useState('');

    const mapRef = useRef<MapView>(null);
    let locationSubscription = useRef<Location.LocationSubscription | null>(null);

    useEffect(() => {
        getLocationPermission();

        getLocation().then((loc) => {
            setLocation(loc);
        });
    }, []);

    const startTracking = async () => {
        locationSubscription.current = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1
        }, (newLocation) => {
            const newCoord = {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude
            };
            
            console.warn(newCoord);
            return newCoord;
        })
    }

    const stopTracking = async () => {
        if (locationSubscription.current) {
            locationSubscription.current.remove();
            locationSubscription.current = null;
        }
    }

    const modeSelectChange = (value: any) => {
        setSelectedMode(value);
        setShowModalSelect(false);

        setCommuteStart(true);

        getLocationName({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }).then((response) => {
            setOriginName(response);
        });

        setOriginLat(location.coords.latitude);
        setOriginLng(location.coords.longitude);
        console.log(`ORIGIN: ${location.coords.latitude}, ${location.coords.longitude}; ${originName}`);

        getCommuteDetails().then((response) => {
            setVehicleId(response.vehicleId);
            setVehicleDescription(response.vehicleDescription);
        });

        startTracking().then(({response}: any) => {
            setLocation(response);
            setRoute(prevRoute => [...prevRoute, response]);
        })
    }

    const modeSelectSwitchChange = (value: any) => {
        setSelectedMode(value);
        setShowModalSwitch(false);
    }

    const [ isOverlayInfoVisible, setOverlayInfoVisible ] = useState(false);
    const [ isOverlayAlertVisible, setOverlayAlertVisible ] = useState(false);
    const [ isOverlayRateVisible, setOverlayRateVisible ] = useState(false);
    const [ isOverlayFeedVisible, setOverlayFeedVisible ] = useState(false);

    const toggleOverlayInfo = () => setOverlayInfoVisible(!isOverlayInfoVisible);
    const toggleOverlayAlert = () => setOverlayAlertVisible(!isOverlayAlertVisible);
    const toggleOverlayRate = () => setOverlayRateVisible(!isOverlayRateVisible);
    const toggleOverlayFeed = () => setOverlayFeedVisible(!isOverlayFeedVisible);

    const CustomTripFab = () => {
        return (
            <Box className="absolute p-3 items-center">
                {
                    vehicleId ? (
                        <>
                            <SubFab iconName='emoticon' onPress={() => toggleOverlayRate()}/>
                            {
                                selectedMode && (
                                    <Button
                                        onPress={() => setShowModalSwitch(true)}
                                        className="p-2 bg-custom-secondary shadow-soft-4 border-1 rounded-full"
                                    >
                                        <MaterialIcons name="swap-horiz" size={30} color="white" />
                                    </Button>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <SubFab iconName='directions' onPress={() => toggleOverlayInfo()} />
                            <SubFab iconName='bell' onPress={() => toggleOverlayAlert()} />
                            <SubFab iconName='comment-text' onPress={() => toggleOverlayFeed()} />
                            {
                                selectedMode && (
                                    <Button
                                        onPress={() => setShowModalSwitch(true)}
                                        className="p-2 bg-custom-secondary shadow-soft-4 border-1 rounded-full"
                                    >
                                        <MaterialIcons name="swap-horiz" size={30} color="white" />
                                    </Button>
                                )
                            }
                        </>
                    )
                }
            </Box>
        )
    }

    const SwitchMode = () => {
        return (
            <Box className="absolute left-0 p-3">
                <Modal
                    className='p-6'
                    isOpen={showModalSwitch}
                    onClose={() => setShowModalSwitch(false)}
                >
                    <Box className='flex-1 w-full h-full mb-40'>
                        <ModalContent className='w-full pt-0 pb-0'>
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
                                            onPress={
                                                () => modeSelectSwitchChange(option.label)
                                            }
                                        />
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter className='pb-4'>
                                <Button
                                    className='bg-transparent'
                                    onPress={() => setShowModalSwitch(false)}
                                >
                                    <ButtonText className='text-custom-secondary text-lg font-medium'>
                                        CANCEL
                                    </ButtonText>
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Box>
                </Modal>
            </Box>
        )
    }

    return (
        <GluestackUIProvider mode='light'>
            {
                selectedMode ? (
                    <Button className='p-4 bg-custom-customRed'
                        onPress={async () => {
                            setCommuteStart(false);
                            modeSelectChange(null);
                            modeSelectSwitchChange(null);

                            const destination = async () => await getLocationName({
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude
                            })
                            setDestinationName(await destination());
                            setDestinationLat(location.coords.latitude);
                            setDestinationLng(location.coords.longitude);

                            console.log(`DESTINATION: ${destinationName} ${location.coords.latitude} ${location.coords.longitude}`);
                        
                            setVehicleId('');
                            setVehicleDescription('');

                            const CommuteRecord = setCommuteRecord({
                                id: 1,
                                origin: originName,
                                originLat: originLat,
                                originLng: originLng,
                                destination: destinationName,
                                destinationLat: destinationLat,
                                destinationLng: destinationLng,
                                selectMode: selectedMode,
                                selectPurpose: '',
                                vehicleId: vehicleId,
                                vehicleDescription: vehicleDescription
                            })

                            await stopTracking();
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            STOP TRIP TRACKING
                        </ButtonText>
                    </Button>
                ) : (
                    <Button className='bg-custom-secondary h-fit rounded-none p-4'
                        onPress={() => {
                            setShowModalSelect(true)
                            // setCommuteStart(true);

                            // getLocationName({
                            //     latitude: location.coords.latitude,
                            //     longitude: location.coords.longitude
                            // }).then((response) => {
                            //     setOriginName(response);
                            // })
                            // setOriginLat(location.coords.latitude);
                            // setOriginLng(location.coords.longitude);

                            // console.log(`ORIGIN: ${location.coords.latitude}, ${location.coords.longitude}; ${originName}`);

                            // getCommuteDetails().then((response) => {
                            //     setVehicleId(response.vehicleId);
                            //     setVehicleDescription(response.vehicleDescription);
                            // })

                            // startTracking().then(({response}: any) => {
                            //     setLocation(response);
                            //     setRoute(prevRoute => [...prevRoute, response]);
                            // })
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            START COMMUTE TRACKING
                        </ButtonText>
                    </Button>
                )
            }

            <Box className='flex-1 w-full h-full'>
                {(() => {
                    if (isOverlayInfoVisible) {
                        return <TripInfo handleAction={toggleOverlayInfo} />
                    } else if (isOverlayAlertVisible) {
                        return <TripAlert handleAction={toggleOverlayAlert} />
                    } else if (isOverlayRateVisible) {
                        return <TripRate handleAction={toggleOverlayRate} />
                    } else if (isOverlayFeedVisible) {
                        return <TripFeed handleAction={toggleOverlayFeed} />
                    } else {
                        return (
                            <>
                                <Box className='flex-1 h-full'>
                                    {
                                        location && (
                                            isCommuteStart ? (
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

                                <Box className='z-3 justify-between bottom-1/2 bg-red'>
                                    <Box className='justify-center'>
                                        <CustomTripFab />
                                    </Box>

                                    {
                                        selectedMode && (
                                            <Box className='justify-center bottom-1/2'>
                                                <SwitchMode />
                                            </Box>
                                        )
                                    }
                                </Box>
                            </>
                        )
                    }
                })()}
            </Box>

            <Modal
                className='p-6'
                isOpen={showModalSelect}
                onClose={() => setShowModalSelect(false)}
            >
                <Box className='flex-1 w-full h-full mb-40'>
                    <ModalContent className='w-full pt-0 pb-0'>
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
                                        onPress={
                                            () => modeSelectChange(option.label)
                                        }
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