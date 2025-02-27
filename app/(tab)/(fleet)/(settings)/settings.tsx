import '@/global.css';
// react native
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native';
// expo
import { Ionicons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { Divider } from '@/components/ui/divider';

import { getFleetSetting, updateFleetSetting } from './settingsViewModel';

const Drawer = createDrawerNavigator();

export default function FleetSettingsScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerHistorybotNavigator />
        </GluestackUIProvider>
    );
}

function DrawerHistorybotNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='SettingsMain'

            screenOptions={{
                header: (props) => <Header {...props} />
            }}
        >
            <Drawer.Screen name='SettingsMain' component={Screen} />
        </Drawer.Navigator>
    );
}

function Screen() {
    const [telematics, setTelematics] = useState<boolean|null>(true);
    const [gpsTracks, setGpsTracks] = useState<boolean|null>(true);
    const [cleanGps, setCleanGps] = useState<boolean|null>(true);
    const [feed, setFeed] = useState<boolean|null>(true);
    const [cleanFeed, setCleanFeed] = useState<boolean|null>(true);
    const [vehicle, setVehicle] = useState<boolean|null>(true);
    const [passenger, setPassenger] = useState<boolean|null>(true);
    
    useEffect(() => {
        getFleetSetting().then((setting) => {
            console.log(setting);
            setTelematics(setting.telematics);
            setGpsTracks(setting.gps_tracks);
            setCleanGps(setting.clean_gps);
            setFeed(setting.feed);
            setCleanFeed(setting.clean_feed);
            setVehicle(setting.vehicle);
            setPassenger(setting.passenger);
        })
    }, []);

    useFocusEffect(
        useCallback(() => {
            updateFleetSetting({
                telematics: telematics ?? true,
                gps_tracks: gpsTracks ?? true,
                clean_gps: cleanGps ?? true,
                feed: feed ?? true,
                clean_feed: cleanFeed ?? true,
                vehicle: vehicle ?? true,
                passenger: passenger ?? true
            }).then((res) => {
                console.log(res);
            })
        }, [telematics, gpsTracks, cleanGps, feed, cleanFeed, vehicle, passenger])
    )

    return (
        <GluestackUIProvider mode='light'>
            <Box className='bg-white flex-1 w-full h-full'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <VStack space='xl' className='pt-4 pe-4 pb-4 ps-20'>
                        <Heading className='text-custom-secondary'>GPS Source</Heading>

                        <HStack className='justify-between items-center'>
                            <VStack className='w-3/4'>
                                <Text size='xl'>Use Telematics</Text>
                                <Text>Use telematics device. This requires a configuration of your device</Text>
                            </VStack>
                            <Switch
                                size='sm'
                                value={telematics ?? true}
                                onValueChange={(value) => setTelematics(value)}
                                trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                            />
                        </HStack>
                    </VStack>

                    <Divider />
                    <VStack space='xl' className='pt-4 pe-4 pb-4 ps-20'>
                        <Heading className='text-custom-secondary'>GPS Tracks</Heading>

                        <HStack className='justify-between items-center'>
                            <VStack className='w-3/4'>
                                <Text size='xl'>Save GPS tracks</Text>
                                <Text>Save tracks locally in GPX format</Text>
                            </VStack>
                            <Switch
                                size='sm'
                                value={gpsTracks ?? true}
                                onValueChange={(value) => setGpsTracks(value)}
                                trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                            />
                        </HStack>

                        <HStack className='justify-between'>
                            <VStack className='w-3/4'>
                                <Text size='xl'>Clean GPS tracks</Text>
                                <Text>Automatically delete tracks older than 30 days</Text>
                            </VStack>
                            <Switch
                                size='sm'
                                value={cleanGps ?? true}
                                onValueChange={(value) => setCleanGps(value)}
                                trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                            />
                        </HStack>
                    </VStack>

                    <Divider />
                    <VStack space='xl' className='pt-4 pe-4 pb-4 ps-20'>
                        <Heading className='text-custom-secondary'>Real-Time Feeds</Heading>

                        <HStack className='justify-between items-center'>
                            <VStack className='w-3/4'>
                                <Text size='xl'>Receive real-time feeds</Text>
                                <Text>Receive real-time feeds</Text>
                            </VStack>
                            <Switch
                                size='sm'
                                value={feed ?? true}
                                onValueChange={(value) => setFeed(value)}
                                trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                            />
                        </HStack>

                        <HStack className='justify-between'>
                            <VStack className='w-3/4'>
                                <Text size='xl'>Clean real-time feeds</Text>
                                <Text>Automatically delete feeds older than 30 days</Text>
                            </VStack>
                            <Switch
                                size='sm'
                                value={cleanFeed ?? true}
                                onValueChange={(value) => setCleanFeed(value)}
                                trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                            />
                        </HStack>
                    </VStack>

                    <Divider />
                    <VStack space='xl' className='pt-4 pe-4 pb-4 ps-20'>
                        <Heading className='text-custom-secondary'>Image Processing</Heading>

                        <HStack className='justify-between items-center'>
                            <VStack className='w-3/4'>
                                <Text size='xl'>Vehicle condition</Text>
                                <Text>Extract speed, RPM and fuel level from dashboard</Text>
                            </VStack>
                            <Switch
                                size='sm'
                                value={vehicle ?? true}
                                onValueChange={(value) => setVehicle(value)}
                                trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                            />
                        </HStack>

                        <HStack className='justify-between items-center'>
                            <VStack className='w-3/4'>
                                <Text size='xl'>Passenger condition</Text>
                                <Text>Extract passenger occupancy and seating configuration</Text>
                            </VStack>
                            <Switch
                                size='sm'
                                value={passenger ?? true}
                                onValueChange={(value) => setPassenger(value)}
                                trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                            />
                        </HStack>
                    </VStack>
                </ScrollView>
            </Box>
        </GluestackUIProvider>
    );
}

function Header({ navigation } : any) {
    const nav: any = useNavigation();

    return (
        <Box className='flex-row bg-custom-primary justify-between items-center pt-14 ps-4 pb-4'>
            <Ionicons
                name='arrow-back'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Heading className='text-custom-secondary'>
                Fleet Settings
            </Heading>

            <Box />
        </Box>
    )
}