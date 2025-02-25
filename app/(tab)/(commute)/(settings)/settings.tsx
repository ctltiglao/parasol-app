import '@/global.css';
// react native
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
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

import { getCommuteSetting, updateCommuteSetting } from './settingsViewModel';

const Drawer = createDrawerNavigator();

export default function CommuteSettingsScreen() {
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
    const [gpsTracks, setGpsTracks] = useState<boolean|null>(true);
    const [cleanGps, setCleanGps] = useState<boolean|null>(true);
    const [feed, setFeed] = useState<boolean|null>(true);
    const [cleanFeed, setCleanFeed] = useState<boolean|null>(true);

    useEffect(() => {
        getCommuteSetting().then((setting) => {
            console.log(setting);
            setGpsTracks(setting.gps_tracks);
            setCleanGps(setting.clean_gps);
            setFeed(setting.feed);
            setCleanFeed(setting.clean_feed);
        })
    }, []);

    useFocusEffect(
        useCallback(() => {
            updateCommuteSetting({
                gps_tracks: gpsTracks?? true,
                clean_gps: cleanGps?? true,
                feed: feed?? true,
                clean_feed: cleanFeed?? true
            }).then((res) => {
                console.log(res);
            })

            // return() => {
            //     console.log('GPS TRACKS IS ON ', gpsTracks);
            // }
            
        }, [gpsTracks, cleanGps, feed, cleanFeed])
    )
    
    return (
        <GluestackUIProvider mode='light'>
            <Box className='bg-white flex-1 w-full h-full'>
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
            </Box>
        </GluestackUIProvider>
    );
}

function Header({ navigation } : any) {
    const nav: any = useNavigation();

    return (
        <Box 
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 10, paddingHorizontal: 10 }}
            className='items-center bg-custom-primary p-5'>
            <Ionicons
                name='arrow-back'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Heading className='text-custom-secondary'>
                Commute Settings
            </Heading>

            <Box />
        </Box>
    )
}