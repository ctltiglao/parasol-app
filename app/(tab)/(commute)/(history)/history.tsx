import '@/global.css';
// react native
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { StorageAccessFramework } from 'expo-file-system';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Button } from '@/components/ui/button';

import { jsonToCSV } from 'react-native-csv';

import { getUserState } from '../../tabViewModel';
import { allCommuteRecords, onCreate } from '@/app/service/sql/tripHistoryDBHelper';
import { createAndroidCSV, createiOSCSV } from './historyViewModel';

const Drawer = createDrawerNavigator();

export default function TripHistoryScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerHistorybotNavigator />
        </GluestackUIProvider>
    );
}

function DrawerHistorybotNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='HistoryMain'

            screenOptions={{
                header: (props) => <Header {...props} />
            }}
        >
            <Drawer.Screen name='HistoryMain' component={Screen} />
        </Drawer.Navigator>
    );
}

function Screen() {
    const [commuteRecord, setCommuteRecord] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommute = async () => {
            await onCreate().then(async () => {
                const result = await allCommuteRecords();
                setCommuteRecord(result ?? []);
            });
        }

        fetchCommute();
    })

    return (
        <GluestackUIProvider mode='light'>
            <ScrollView className='bg-white flex-1 w-full h-full p-4'>
                <Text size='md'>Commute History:</Text>

                {
                    commuteRecord.map((res, index) => (
                        <Box key={index} className='w-full flex-col mb-2'>
                            <Text size='md'>Plate No.</Text>
                            <Text size='md'>{res.origin}</Text>
                            <Text size='md'>{res.destination}</Text>
                            <Text size='md'>{res.commute_date}</Text>
                        </Box>
                    ))
                }
            </ScrollView>
        </GluestackUIProvider>
    );
}

function Header({ navigation } : any) {
    const [menuVisible, setMenuVisible] = useState(false);
    const nav: any = useNavigation();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleMenuItemClick = () => {
        closeMenu();
    };

    const exportCommuteCSV = async () => {
        await onCreate().then(async () => {
            const data : any[] = [];

            try {
                const res = await allCommuteRecords();

                res?.forEach((record: any, index: any) => {
                    data.push({
                        id: record.id,
                        origin: record.origin,
                        originLat: record.origin_lat,
                        originLng: record.origin_lng,
                        destination: record.destination,
                        destinationLat: record.destination_lat,
                        destinationLng: record.destination_lng,
                        mode: record.mode,
                        purpose: record.purpose,
                        vehicleId: record.vehicle_id,
                        commuteDate: record.commute_date
                    });
                })
                
                const csv = jsonToCSV(data);

                if (Platform.OS === 'ios') {
                    await createiOSCSV(csv);
                } else {
                    await createAndroidCSV(csv);
                }
            } catch (error) {
                alert(`Failed to export commute records ${error}`);
            }
        });
    }

    return (
        <Box 
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 10, paddingHorizontal: 10 }}
            className='items-center bg-custom-primary p-5'>
            <MaterialCommunityIcons
                name='arrow-left'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Text
                style={{ fontSize: 18, color: '#0038A8' }}
                className='font-bold'
            >
                Trip History
            </Text>

            <Menu
                isOpen={menuVisible}
                onClose={closeMenu}
                className='bg-custom-primary'
                offset={5}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} onPress={openMenu} className='bg-transparent'>
                            <MaterialCommunityIcons name='dots-vertical' size={25} color='#0038A8' />
                        </Button>
                    )
                }}
            >
                <MenuItem
                    key='1'
                    textValue='Export To CSV'
                    onPress={() => {
                        getUserState().then((res) => {
                            if (res.username.includes('guest')) {
                                exportCommuteCSV();
                            } else {
                                alert('You are not authorized to export commute records');
                            }
                        })
                    }}
                >
                    <MenuItemLabel>Export To CSV</MenuItemLabel>
                </MenuItem>
            </Menu>
        </Box>
    )
}