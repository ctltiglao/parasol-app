import '@/global.css';
// react native
import { useEffect, useState, useRef, useCallback } from 'react';
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';
// expo
import * as Location from 'expo-location';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';

import { ApolloProvider, useMutation } from '@apollo/client';
import moment from 'moment';

import { CustomFleetFab } from '@/app/screen/customFab';
import DrawerScreen from '@/app/(drawer)/drawer';
import FleetHeader from '@/app/screen/header/fleetHeader';

import FleetInfo from './(info)/info';
import FleetHistoryScreen from './(history)/history';
import FuelLogsScreen from './(fuel)/fuel';
import FleetSettingsScreen from './(settings)/settings';
import { generateTripCode, getLocationPermission, getUserState } from '../tabViewModel';
import { getFleetDetails } from './fleetViewModel';
// import TrackingScreen from './(tracking)/tracking';
import { TrackingScreen } from './(tracking)/tracking';
import { onMqttConnect } from '@/app/service/mqtt/mqtt';
import { APOLLO_CLIENT, SEND_START_FLEET } from '@/app/service/graphql';

interface Coordinate {
    latitude: number;
    longitude: number;
}

type TrackingParams = {
    route_coordinates: Coordinate[];
    ave_speed: number;
    max_speed: number;
    travel_time: number;
    max_pax: number;
    total_trip: number;
    trip_start: any;
}

type TrackingParamsProp = RouteProp<{Main: TrackingParams}, 'Main'>;

export type RootStackParamList = {
    Main: TrackingParams;
    History: undefined;
    Fuel: undefined;
    Settings: undefined;
    Tracking: {tripCode: string};
};

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function FleetScreen() {
    return (
        <ApolloProvider client={APOLLO_CLIENT}>
            <GluestackUIProvider mode='light'>
                <DrawerNavigator />
            </GluestackUIProvider>
        </ApolloProvider>
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
                name='History'
                component={FleetHistoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Fuel'
                component={FuelLogsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Settings'
                component={FleetSettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Tracking'
                component={TrackingScreen}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    );
}

function Screen() {
    const nav : NavigationProp<any, any> = useNavigation<MainScreenNavigationProp>();
    const navTracking = useRoute<TrackingParamsProp>();

    const mapRef = useRef<MapView>(null);
    const [ location, setLocation ] = useState<any|null>(null);

    const [username, setUsername] = useState('');
    const [ route, setRoute ] = useState('');
    const [ vehicleId, setVehicleId ] = useState('');
    const [ vehicleDetails, setVehicleDetails ] = useState('');

    // start fleet graphql
    const [startTrip, { data: tripStartData, error: tripStartError }] = useMutation(SEND_START_FLEET);
    
    const [ routeCoordinates, setRouteCoordinates ] = useState<Coordinate[]>([]);
    // const [ speedStartTime, setSpeedStartTime ] = useState<any|null>(null);
    const [aveSpeed, setAveSpeed] = useState(0);
    const [maxSpeed, setMaxSpeed] = useState(0);
    const [travelTime, setTravelTime] = useState(0);
    const [maxOnBoard, setMaxOnBoard] = useState(0);
    const [totalTrip, setTotalTrip] = useState(0);
    const [tripStart, setTripStart] = useState(null);

    const [ isOverlayInfoVisible, setIsOverlayInfoVisible ] = useState(false);

    const toggleOverlayInfo = () => {
        setIsOverlayInfoVisible(!isOverlayInfoVisible);

        getFleetDetails().then((response) => {
            setRoute(response.route);
            setVehicleId(response.vehicleId);
            setVehicleDetails(response.vehicleDetails);

            console.log(response.capacity);
        })
    }

    const getLocation = async () => {
        const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
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
        // getLocationPermission();
        // get user info
        getUserState().then((response) => {
            if (response.username !== undefined) {
                console.log('guest ', response.username);
                setUsername(response.username);
            } else {
                console.log('keycloak ', response.preferred_username);
                setUsername(response.preferred_username);
            }
        })

        if (navTracking.params) {
            setRouteCoordinates(navTracking.params.route_coordinates);
            setAveSpeed(navTracking.params.ave_speed);
            setMaxSpeed(navTracking.params.max_speed);
            setTravelTime(navTracking.params.travel_time);
            setMaxOnBoard(navTracking.params.max_pax);
            setTotalTrip(navTracking.params.total_trip);
            setTripStart(navTracking.params.trip_start);
        }
    }, [navTracking.params]);
    // }, [navRoute.params, location]);

    // refresh tab
    useEffect(() => {
        const unsubscribe = nav.addListener('state', (e) => {
            const routes = e.data.state.routes;
            const prevIndex = e.data.state.index;
            const prevScreen = prevIndex >= 0 ? routes[prevIndex].name : null;

            console.log('PREV SCREEN ', prevScreen);
        })

        return unsubscribe;
    }, [nav])

    useFocusEffect(
        useCallback(() => {
            getLocation();
            setIsOverlayInfoVisible(false);
        }, [])
    )

    return (
        <GluestackUIProvider mode='light'>
            <Button className='h-fit p-4 bg-custom-secondary rounded-none'
                onPress={async () => {
                    var tripCode = generateTripCode();
                    console.log(tripCode)

                    // await startTrip({
                    //     variables: {
                    //         altitude: location?.coords.altitude,
                    //         deviceCode: vehicleId,
                    //         latitude: location.coords.latitude,
                    //         longitude: location.coords.longitude,
                    //         qrCode: vehicleDetails,
                    //         timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    //         tripCode: tripCode,
                    //         userCode: username
                    //     }
                    // })

                    // handleFleetStart(true);
                    // isFleetStop === true && handleFleetStop(false);

                    // await startFleetTracking();
                    onMqttConnect()
                    nav.navigate('Tracking', {
                        tripCode: tripCode
                    });
                    
                    // onMqttConnect().then((response) => {
                    //     console.log('here ', response);
                    //     nav.navigate('Tracking');
                    //     // startFleetTracking();
                    // });
                }}
            >
                <ButtonText className='text-white text-lg font-bold'>
                    START NEW FLEET TRACKING
                </ButtonText>
            </Button>
            
            { isOverlayInfoVisible ? (
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
                                    showsTraffic
                                    showsCompass
                                >
                                    {
                                        routeCoordinates.length > 0 && (
                                            <Polyline
                                                coordinates={routeCoordinates}
                                                strokeWidth={5}
                                                strokeColor='blue'
                                            />
                                        )
                                    }
                                </MapView>
                            )
                        }
                    </Box>

                    {
                        routeCoordinates.length > 0 && (
                            <Box className='h-fit'>
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
                                            <Text size='sm' className='text-white'>{maxSpeed}</Text>
                                            <Text size='sm' className='text-white'>{travelTime}</Text>
                                        </VStack>
                                        <VStack>
                                            <Text size='sm' className='text-white'>Max Pax Onboard:</Text>
                                            <Text size='sm' className='text-white'>Total Trip Ridership:</Text>
                                            <Text size='sm' className='text-white'>Trip Start Time (hrs):</Text>
                                        </VStack>
                                        <VStack>
                                            <Text size='sm' className='text-white'>{maxOnBoard}</Text>
                                            <Text size='sm' className='text-white'>{totalTrip}</Text>
                                            <Text size='sm' className='text-white'>{tripStart}</Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            </Box>
                        )
                    }

                    <Box className='justify-center bottom-1/2'>
                        <CustomFleetFab onFabPress={() => {
                            toggleOverlayInfo();
                        }} />
                    </Box>
                </Box>
            )}
        </GluestackUIProvider>
    );
}