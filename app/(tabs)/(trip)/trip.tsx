import { useEffect, useRef, useState } from 'react';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Heading } from '@/components/ui/heading';

import CustomDrawer from '@/components/_drawer/customDrawer';
import TripHeader from '@/components/_drawer/_headers/tripHeader';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import { SubFab } from '@/components/customFab';
import TripInfo from './(info)/info';
import TripAlert from './(alert)/alert';
import TripRate from './(rate)/rate';
import TripFeed from './(feed)/feed';
import TripHistoryScreen from './(history)/history';
import QuickTourScreen from './(tour)/tour';
import TripSettingsScreen from './(settings)/settings';

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
                drawerContent={props => <CustomDrawer {...props} />}

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

    const [showModalSelect, setShowModalSelect] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [showModalSwitch, setShowModalSwitch] = useState(false);
    const [selectedModeSwitch, setSelectedModeSwitch] = useState<string | null>(null);

    const [ isOverlayInfoVisible, setOverlayInfoVisible ] = useState(false);
    const [ isOverlayAlertVisible, setOverlayAlertVisible ] = useState(false);
    const [ isOverlayRateVisible, setOverlayRateVisible ] = useState(false);
    const [ isOverlayFeedVisible, setOverlayFeedVisible ] = useState(false);

    const toggleOverlayInfo = () => setOverlayInfoVisible(!isOverlayInfoVisible);
    const toggleOverlayAlert = () => setOverlayAlertVisible(!isOverlayAlertVisible);
    const toggleOverlayRate = () => setOverlayRateVisible(!isOverlayRateVisible);
    const toggleOverlayFeed = () => setOverlayFeedVisible(!isOverlayFeedVisible);

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

    const modeSelectChange = (value: any) => {
        setSelectedMode(value);
        setShowModalSelect(false)
        console.warn(value)
    }

    const modeSelectSwitchChange = (value: any) => {
        setSelectedModeSwitch(value);
        setShowModalSwitch(false)
        console.warn(value)
    }

    const handleInfoAction = () => {
        toggleOverlayInfo();
    }

    const handleAlertAction = () => {
        toggleOverlayAlert();
    }

    const handleRateAction = () => {
        toggleOverlayRate();
    }

    const handleFeedAction = () => {
        toggleOverlayFeed();
    }

    const modeOptions = [
        { id: 1, label: 'Car', value: '1' },
        { id: 2, label: 'Truck', value: '2' },
        { id: 3, label: 'Boat', value: '3' },
        { id: 4, label: 'PUB', value: '4' },
        { id: 5, label: 'Modern PUJ', value: '5' },
        { id: 6, label: 'Traditional PUJ', value: '6' },
        { id: 7, label: 'UV Express', value: '7' },
        { id: 8, label: 'Ride Hailed Car Taxi', value: '8' },
        { id: 9, label: 'Ordinary Taxi', value: '9' },
        { id: 10, label: 'Tricycle', value: '10' },
        { id: 11, label: 'Ride Hailed Motor Taxi', value: '11' },
        { id: 12, label: 'P2P', value: '12' },
        { id: 13, label: 'Tourist Transport Service', value: '13' },
        { id: 14, label: 'Filcab', value: '14' },
        { id: 15, label: 'Minibus', value: '15' },
        { id: 16, label: 'Walk', value: '16' },
        { id: 17, label: 'Bike', value: '17' },
        { id: 18, label: 'Company Service', value: '18' },
        { id: 19, label: 'Others', value: '19' }
    ]

    const CustomTripFab = () => {
        const [ expanded, setExpanded ] = useState(false);
        const toggleSubFab = () => setExpanded(!expanded);
    
        return (
            <Box className="absolute p-3 items-center">
                { expanded &&(
                    <>
                        <SubFab iconName='directions' onPress={() => handleInfoAction()} />
                        <SubFab iconName='notifications' onPress={() => handleAlertAction()} />
                        <SubFab iconName='tag-faces' onPress={() => handleRateAction()} />
                        <SubFab iconName='comment' onPress={() => handleFeedAction()} />
                    </>
                )}
    
                <Button
                    className="p-3 bg-custom-secondary shadow-soft-4 border-1 rounded-full"
                    onPress={toggleSubFab}
                >
                    <MaterialIcons name={ expanded ? "close" : "add" } size={25} color="white" />
                </Button>
            </Box>
        )
    }

    const SwitchMode = () => {
        return (
            <Box className="absolute p-3 right-0">
                <Button
                    onPress={() => setShowModalSwitch(true)}
                    className="p-2 bg-custom-secondary shadow-soft-4 border-1 rounded-full"
                >
                    <MaterialIcons name="swap-horiz" size={30} color="white" />
                </Button>

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
                            <ModalBackdrop />
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
                        onPress={() => {
                            modeSelectChange(null);
                            modeSelectSwitchChange(null);
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            STOP TRIP TRACKING
                        </ButtonText>
                    </Button>
                ) : (
                    <Button className='p-4 bg-custom-secondary'
                        onPress={() => setShowModalSelect(true)}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            START TRIP TRACKING
                        </ButtonText>
                    </Button>
                )
            }

            <Box className='flex-1 w-full h-full'>
                {(() => {
                    if (isOverlayInfoVisible) {
                        return <TripInfo handleAction={handleInfoAction} />
                    } else if (isOverlayAlertVisible) {
                        return <TripAlert handleAction={handleAlertAction} />
                    } else if (isOverlayRateVisible) {
                        return <TripRate handleAction={handleRateAction} />
                    } else if (isOverlayFeedVisible) {
                        return <TripFeed handleAction={handleFeedAction} />
                    } else {
                        return (
                            <Box className='flex-1 w-full h-full'>
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

                                <Box className='z-5 justify-between bottom-1/2'>
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
                            </Box>
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
                        <ModalBackdrop />
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