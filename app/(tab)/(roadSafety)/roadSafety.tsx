import '@/global.css';
// react native
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { MapMarker, MapPressEvent, PROVIDER_GOOGLE} from 'react-native-maps';
import { NavigationProp, useNavigation } from '@react-navigation/native';
// expo
import * as Location from 'expo-location';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';

import DrawerScreen from '@/app/(drawer)/drawer';
import CustomHeader from '@/app/screen/header/customHeader';
import { getLocationPermission } from '../tabViewModel';
import RoadModuleScreen from './(module)/module';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function RoadSafetyScreen() {
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<any|null>(null);
    const [locationPress, setLocationPress] = useState<any|null>(null);
    
    useEffect(() => {
        getLocationPermission();
    
        const getLocation = async () => {
            const loc = await Location.getCurrentPositionAsync({});
            setLocationPress(loc);
    
            mapRef.current?.animateToRegion(
                {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                },
                1000
            );
    
            setLocation(loc);
        }

        getLocation();
    }, []);
    
    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setLocationPress({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
        console.log(coordinate);
    }

    const Screen = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
        return (
            <GluestackUIProvider mode='light'>
                <Box className='flex-1 w-full h-full items justify-center'>
                    <Box className='flex-1 h-full'>
                        {
                            location && (
                                <MapView
                                    ref={mapRef}
                                    // provider={PROVIDER_GOOGLE}
                                    style={StyleSheet.absoluteFillObject}
                                    showsUserLocation={true}
                                    initialRegion={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}
                                    onPress={(e) => {
                                        console.log(e.nativeEvent.coordinate);
                                        navigation.navigate('RoadModule');
    
                                        if (Platform.OS === 'ios') {
                                            console.warn('ios');
                                        } else if (Platform.OS === 'android') {
                                            console.warn('android');
                                        }
                                    }}
                                />
                            )
                        }
                    </Box>
                </Box>
            </GluestackUIProvider>
        );
    }

    return (
        <GluestackUIProvider mode='light'>
            <Drawer.Navigator
                initialRouteName='Main'
                drawerContent={props => <DrawerScreen {...props} />}

                screenOptions={{
                    header: (props) => <CustomHeader {...props} />
                }}
            >
                <Drawer.Screen name='Main' component={Screen} />

                <Stack.Screen
                    name='RoadModule'
                    component={RoadModuleScreen}
                    options={{ headerShown: false }}
                />
            </Drawer.Navigator>
        </GluestackUIProvider>
    );
}

// function DrawerNavigator() {
//     const navigation = useNavigation();

//     return (
        
//     );
// }

// function Screen() {
//     const nav: any = useNavigation();

//     const mapRef = useRef<MapView>(null);
//     const [location, setLocation] = useState<any|null>(null);
//     const [locationPress, setLocationPress] = useState<any|null>(null);

//     useEffect(() => {
//         getLocationPermission();

//         const getLocation = async () => {
//             const loc = await Location.getCurrentPositionAsync({});
//             setLocationPress(loc);

//             mapRef.current?.animateToRegion(
//                 {
//                     latitude: loc.coords.latitude,
//                     longitude: loc.coords.longitude,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01
//                 },
//                 1000
//             );

//             setLocation(loc);
//         }

//         getLocation();
//     }, []);

//     const handleMapPress = (event: MapPressEvent) => {
//         const { coordinate } = event.nativeEvent;
//         setLocationPress({
//             latitude: coordinate.latitude,
//             longitude: coordinate.longitude
//         });
//         console.log(coordinate);
//     }

//     return (
//         <GluestackUIProvider mode='light'>
//             <Box className='flex-1 w-full h-full items justify-center'>
//                 <Box className='flex-1 h-full'>
//                     {
//                         location && (
//                             <MapView
//                                 ref={mapRef}
//                                 // provider={PROVIDER_GOOGLE}
//                                 style={StyleSheet.absoluteFillObject}
//                                 showsUserLocation={true}
//                                 initialRegion={{
//                                     latitude: location.coords.latitude,
//                                     longitude: location.coords.longitude,
//                                     latitudeDelta: 0.0922,
//                                     longitudeDelta: 0.0421
//                                 }}
//                                 onPress={(e) => {
//                                     console.log(e.nativeEvent.coordinate);
//                                     // nav.navigate('DriverModule');

//                                     if (Platform.OS === 'ios') {
//                                         console.warn('ios');
//                                     } else if (Platform.OS === 'android') {
//                                         console.warn('android');
//                                     }
//                                 }}
//                             />
//                         )
//                     }
//                 </Box>
//             </Box>
//         </GluestackUIProvider>
//     );
// }