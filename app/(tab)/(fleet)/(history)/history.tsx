import '@/global.css';
// react native
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Button, ButtonText } from '@/components/ui/button';
import { Modal, ModalContent, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectContent, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';

import { jsonToCSV } from 'react-native-csv';

import { allFleetRecords, deleteFleetRecord, onCreate, updateFleetRecord } from '@/app/service/sql/fleetHistoryDBHelper';
import { getUserState } from '../../tabViewModel';

const Drawer = createDrawerNavigator();

export default function FleetHistoryScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerHistoryNavigator />
        </GluestackUIProvider>
    );
}

function DrawerHistoryNavigator() {
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
    const [fleetRecord, setFleetRecord] = useState<any[]>([]);

    // const [consumption, setConsumption] = useState('');
    // const [consumption_unit, setConsumptionUnit] = useState('');
    // const [start_odometer, setStartOdometer] = useState('');
    // const [end_odometer, setEndOdometer] = useState('');

    useEffect(() => {
        const fetchFleet = async () => {
            await onCreate().then(async () => {
                const result = await allFleetRecords();
                setFleetRecord(result ?? []);
            });
        }

        fetchFleet();
    })

    return (
        <GluestackUIProvider mode='light'>
            <ScrollView className='bg-gray-200 flex-1 w-screen h-full p-4'>
                {
                    fleetRecord.map((res, index) => (
                        <Box key={index} className='bg-white flex-col rounded-md mb-4 p-4'>
                            <Box className='flex-row justify-between mb-2'>
                                <Image size='sm' alt='logo'
                                    className='bg-gray-200 w-16 h-16 rounded-full'
                                    source={require('@/assets/icons/jeepney.png')}
                                />

                                <Box className='flex-row w-1/2'>
                                    <Box className='flex-col justify-between pe-1'>
                                        <MaterialCommunityIcons name='circle' size={10} color='gray' />
                                        <Box/><Box/>
                                        <MaterialCommunityIcons name='circle' size={10} color='red' />
                                        <Box/><Box/>
                                    </Box>

                                    <Box className='flex-col'>
                                        <Text bold={true}>Start of Trip</Text>
                                        <Text size='sm'>{res.start_time}</Text>
                                        <Text size='sm'>{res.origin}</Text>
                                        <Text bold={true}>End of Trip</Text>
                                        <Text size='sm'>{res.end_time}</Text>
                                        <Text size='sm'>{res.destination}</Text>
                                    </Box>
                                </Box>
                                
                                <Box className='w-fit'>
                                    <SqlMenu
                                        id={res.id}
                                        consumption={res.consumption}
                                        consumption_unit={res.consumption_unit}
                                        start_odometer={res.start_odometer}
                                        end_odometer={res.end_odometer}
                                    />
                                </Box>
                            </Box>

                            <Box className='flex-row w-fit justify-between'>
                                <Box className='flex-col items-center'>
                                    <MaterialCommunityIcons name='circle' size={35} color='gray' />
                                    <Text size='sm'>Duration</Text>
                                    <Text bold={true} size='sm'>{res.travel_time}</Text>
                                </Box>

                                <Box className='flex-col items-center'>
                                    <MaterialCommunityIcons name='circle' size={35} color='gray' />
                                    <Text size='sm'>Distance</Text>
                                    <Text bold={true} size='sm'>{res.travel_distance} km</Text>
                                </Box>

                                <Box className='flex-col items-center'>
                                    <MaterialCommunityIcons name='circle' size={35} color='gray' />
                                    <Text size='sm'>Consumption</Text>
                                    <Text bold={true} size='sm'>
                                        {
                                            res.consumption
                                            ? `${res.consumption} ${ res.consumption_unit === 'liters' ? 'L' : 'kWh' }`
                                            : 'Not Set'
                                        }</Text>
                                </Box>

                                <Box className='flex-col items-center'>
                                    <MaterialCommunityIcons name='circle' size={35} color='gray' />
                                    <Text size='sm'>Odometer</Text>
                                    <Text bold={true} size='sm'>{res.end_odometer ? `${res.end_odometer} km` : 'Not Set'}</Text>
                                </Box>
                            </Box>
                        </Box>
                    ))
                }
            </ScrollView>
        </GluestackUIProvider>
    );
}

function SqlMenu({
    id,
    consumption,
    consumption_unit,
    start_odometer,
    end_odometer
}: any) {
    const [inputConsumption, setInputConsumption] = useState(0);
    const [inputConsumptionUnit, setInputConsumptionUnit] = useState('');
    const [inputStartOdometer, setInputStartOdometer] = useState(0);
    const [inputEndOdometer, setInputEndOdometer] = useState(0);

    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openModal = () => {
        console.log(id, inputConsumption, inputConsumptionUnit, inputStartOdometer, inputEndOdometer);

        setInputConsumption(consumption);
        if (consumption_unit === 'liters') {
            setInputConsumptionUnit('Diesel (L)');
        } else if (consumption_unit === 'kWh') {
            setInputConsumptionUnit('Electricity (kWh)');
        } else {
            setInputConsumptionUnit('Diesel (L)');
        }
        setInputStartOdometer(start_odometer);
        setInputEndOdometer(end_odometer);

        setModalVisible(true);
    }
    const closeModal = () => setModalVisible(false);

    return (
        <Box>
            <Menu
                isOpen={menuVisible}
                onClose={closeMenu}
                className='bg-white me-4'
                offset={5}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} onPress={openMenu} className='bg-transparent absolute top-0 right-0'>
                            <MaterialCommunityIcons name='dots-vertical' size={25} color='gray' />
                        </Button>
                    )
                }}
            >
                <MenuItem
                    key='1'
                    textValue='Edit'
                    onPress={() => {
                        openModal();
                    }}
                >
                    <MenuItemLabel>Edit</MenuItemLabel>
                </MenuItem>

                <MenuItem
                    key='2'
                    textValue='Delete'
                    onPress={async () => {
                        await deleteFleetRecord(id);
                    }}
                >
                    <MenuItemLabel>Delete</MenuItemLabel>
                </MenuItem>
            </Menu>
            
            <Modal className='h-full p-8 justify-center items-center' isOpen={modalVisible} onClose={closeModal}>
                <ModalContent className='w-full h-fit'>
                    <Heading>Edit Fleet Record</Heading>
                    <ModalBody>
                        <ScrollView automaticallyAdjustKeyboardInsets={true}>
                            <Text bold={true} size='md'>Consumption</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputConsumption(parseInt(text))}
                                    value={inputConsumption.toString()}
                                    placeholder={inputConsumption.toString()}
                                    keyboardType='numeric'
                                />
                            </Input>

                            <Text bold={true} size='md'>Consumption Unit</Text>
                            <Select
                                onValueChange={setInputConsumptionUnit}
                                selectedValue={inputConsumptionUnit}
                            >
                                <SelectTrigger className='bg-white h-fit border-l-0 border-t-0 border-r-0 border-b-2 mt-2 mb-4'>
                                    <SelectInput className='pt-3 pb-3'/>
                                    <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectContent>
                                        <SelectItem value='liters' label='Diesel (Liters)'/>
                                        <SelectItem value='kWh' label='Electric (kWh)'/>
                                    </SelectContent>
                                </SelectPortal>
                            </Select>

                            <Text bold={true} size='md'>Start Odometer Reading</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputStartOdometer(parseInt(text))}
                                    value={inputStartOdometer.toString()}
                                    placeholder={inputStartOdometer.toString()}
                                    keyboardType='numeric'
                                />
                            </Input>

                            <Text bold={true} size='md'>Final Odometer Reading</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputEndOdometer(parseInt(text))}
                                    value={inputEndOdometer.toString()}
                                    placeholder={inputEndOdometer.toString()}
                                    keyboardType='numeric'
                                />
                            </Input>
                        </ScrollView>
                    </ModalBody>
                    <ModalFooter className='p-2'>
                        <Button className='bg-transparent me-4'
                            onPress={closeModal}
                        >
                            <ButtonText className='text-custom-secondary'>CANCEL</ButtonText>
                        </Button>

                        <Button className='bg-transparent'
                            onPress={async() => {
                                console.log(inputConsumptionUnit);
                                await updateFleetRecord({
                                    consumption: inputConsumption,
                                    consumption_unit: inputConsumptionUnit,
                                    start_odometer: inputStartOdometer,
                                    end_odometer: inputEndOdometer,
                                    id: id
                                }).then((res) => {
                                    console.log(res);

                                    if (Number(res) > 0) {
                                        closeModal();
                                    }
                                });
                            }}
                        >
                            <ButtonText className='text-custom-secondary'>SAVE</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

function Header({ navigation } : any) {
    const [menuVisible, setMenuVisible] = useState(false);
    const nav: any = useNavigation();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const exportFleetCSV = async () => {
        await onCreate().then(async () => {
            const data : any[] = [];

            const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permission.granted) {
                return;
            }

            try {
                const res = await allFleetRecords();

                res?.forEach((record: any, index: any) => {
                    data.push({
                        no: index + 1,
                        id: record.id,
                        route: record.route,
                        origin: record.origin,
                        originLat: record.origin_lat,
                        originLng: record.origin_lng,
                        destination: record.destination,
                        destinationLat: record.destination_lat,
                        destinationLng: record.destination_lng,
                        travelDistance: record.travel_distance,
                        startTime: record.start_time,
                        endTime: record.end_time,
                        travelTime: record.travel_time,
                        type: record.type,
                        capacity: record.capacity,
                        vehicleId: record.vehicle_id,
                        vehicleDetails: record.vehicle_details,
                        commuteDate: record.trip_date
                    });
                })

                const csv = jsonToCSV(data);

                await StorageAccessFramework.createFileAsync(
                    permission.directoryUri,
                    'MyFleetRecords.csv',
                    'application/csv'
                ).then( async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, csv, {
                        encoding: FileSystem.EncodingType.UTF8
                    })
                }).catch((error) => {
                    alert(`Failed to save fleet records ${error}`);
                });
            } catch (error) {
                // console.error(error);
                alert(`Failed to export fleet records ${error}`);
            }
        });
    }

    return (
        <Box className='flex-row bg-custom-primary justify-between items-center pt-14 ps-4 pb-4'>
            <MaterialCommunityIcons
                name='arrow-left'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Heading className='text-custom-secondary'>
                Fleet History
            </Heading>

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
                        // console.warn('pressed');
                        getUserState().then((res) => {
                            if (!res.username.includes('guest')) {
                                exportFleetCSV();
                            } else {
                                alert('You are not authorized to export fleet records');
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