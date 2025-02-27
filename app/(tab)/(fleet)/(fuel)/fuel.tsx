import '@/global.css';
// react native
import { useCallback, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Platform, ScrollView } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@/components/ui/modal';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectContent, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';

import { jsonToCSV } from 'react-native-csv';
import moment from 'moment';

import { CustomAddFab } from '@/app/screen/customFab';
import { getUserState } from '../../tabViewModel';
import { addFuelLog, allFuelRecords, deleteFuelRecord, onCreate, updateFuelRecord } from '@/app/service/sql/fuelLogDBHelper';

const Drawer = createDrawerNavigator();

export default function FuelLogsScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerFuelNavigator />
        </GluestackUIProvider>
    );
}

function DrawerFuelNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='FuelMain'
            screenOptions={{
                header: (props) => <Header {...props} />
            }}
        >
            <Drawer.Screen name='FuelMain' component={Screen} />
        </Drawer.Navigator>
    );
}

function Screen() {
    const [fuelLogs, setFuelLogs] = useState<any[]>([]);

    // const [inputDate, setInputDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [inputDate, setInputDate] = useState(new Date());
    const [inputeUpdateDate, setInputUpdateDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [inputStartOdometer, setInputStartOdometer] = useState<Number|null>(null);
    const [inputEndOdometer, setInputEndOdometer] = useState<Number|null>(null);
    const [inputTotalFuel, setInputTotalFuel] = useState<Number|null>(null);
    const [inputFuelUnit, setInputFuelUnit] = useState('liters');

    const [modalVisible, setModalVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        setShowDatePicker(false);
        setModalVisible(false);
    }

    const showPicker = () => setShowDatePicker(true);

    // ios data format
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // console.log(selectedDate);
        // let date = moment(selectedDate).format('YYYY-MM-DD')
        // setShowDatePicker(false);
        // setInputDate(date);

        setShowDatePicker(false);
        if (selectedDate) {
            setInputDate(selectedDate);
        }
    }

    useEffect(() => {
        const fetchFuel = async () => {
            await onCreate().then(async () => {
                const result = await allFuelRecords();
                setFuelLogs(result ?? []);
            })
        }

        fetchFuel();
    }, [inputDate])

    useFocusEffect(
        useCallback(() => {
            closeModal();

            // setInputDate(moment(new Date()).format('YYYY-MM-DD'));
            setInputUpdateDate(moment(new Date()).format('YYYY-MM-DD'));
            setInputStartOdometer(0);
            setInputEndOdometer(0);
            setInputTotalFuel(0);
            setInputFuelUnit('liters');
        }, [])
    );
    
    return (
        <GluestackUIProvider mode='light'>
            <Box className='bg-gray-200 w-screen h-full p-4'>
                <Box className='flex-1 z-10 absolute bottom-0 right-0'>
                    {/* <FabAdd /> */}
                    <CustomAddFab onFabPress={() => openModal()} />
                </Box>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        fuelLogs.map((res, index) => (
                            <VStack
                                key={index} space='md'
                                className='bg-white rounded-md mb-4 p-4'
                            >
                                <HStack className='justify-between'>
                                    <Heading>{moment(res.log_date).format('MMMM DD, YYYY')}</Heading>
                                    <SqlMenu
                                        id={res.id}
                                        log_date={new Date(res.log_date)}
                                        start_odometer={res.start_odometer}
                                        end_odometer={res.end_odometer}
                                        total_fuel={res.total_fuel}
                                        consumption_unit={res.consumption_unit}
                                    />
                                </HStack>
                                <Text>Update On {moment(res.date_update).format('YYYY-MM-DD')}</Text>
                                
                                <Divider />
                                <HStack>
                                    <VStack className='w-1/2'>
                                        <Text>Start Odometer</Text>
                                        <Text bold={true}>{res.start_odometer} km</Text>
                                    </VStack>
                                    <VStack className='w-1/2'>
                                        <Text>End Odometer</Text>
                                        <Text bold={true}>{res.end_odometer} km</Text>
                                    </VStack>
                                </HStack>

                                <Divider />
                                <HStack>
                                    <VStack className='w-1/2'>
                                        <Text>Total Distance</Text>
                                        <Text bold={true}>{res.end_odometer - res.start_odometer} km</Text>
                                    </VStack>
                                    <VStack className='w-1/2'>
                                        <Text>Total Fuel Consumed</Text>
                                        <Text bold={true}>
                                            {
                                                res.total_fuel 
                                            }{
                                                res.consumption_unit === 'liters' ? ' (L)' : ' (kWh)'
                                            }
                                        </Text>
                                    </VStack>
                                </HStack>
                            </VStack>
                        ))
                    }    
                </ScrollView>

                <Modal className='h-full p-8 justify-center items-center' isOpen={modalVisible} onClose={closeModal}>
                    <ModalContent className='w-full h-fit'>
                        <Heading>Add Fuel Record</Heading>
                        <ModalBody>
                            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                                <Text bold={true} size='md'>Log Date</Text>
                                {
                                    Platform.OS === 'ios' ? (
                                        <HStack space='md' className='items-center mb-4'>
                                            <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>
                                                { moment(inputDate).format('YYYY-MM-DD') }
                                            </Text>
                                            <DateTimePicker
                                                className='w-full h-fit'
                                                value={moment(inputDate).toDate()}
                                                mode='date'
                                                display='default'
                                                onChange={(event, date) => {onChangeDate(event, date)}}
                                            />
                                        </HStack>
                                    ) : (
                                        <Box>
                                            <HStack space='md' className='justify-between items-center mb-4'>
                                                <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>
                                                    { moment(inputDate).format('YYYY-MM-DD') }
                                                </Text>
                                                
                                                <Button
                                                    className='bg-zinc-300 p-1 rounded-md'
                                                    onPress={() => setShowDatePicker(true)}
                                                >
                                                    <ButtonText className='text-black'>CHANGE</ButtonText>
                                                </Button>

                                                { showDatePicker &&
                                                    <DateTimePicker
                                                        value={inputDate}
                                                        mode='date'
                                                        display='default'
                                                        onChange={onChangeDate}
                                                    />
                                                }
                                            </HStack>
                                        </Box>
                                    )
                                }
                                
                                <Text bold={true} size='md'>Start Odometer Reading</Text>
                                <Input
                                    className='w-full bg-white border-r-0 border-b-2 border-gray-300 mt-2 mb-4'
                                    variant='underlined'
                                >
                                    <InputField
                                        onChangeText={(text) => setInputStartOdometer(parseFloat(text))}
                                        value={inputStartOdometer ? inputStartOdometer.toString() : ''}
                                        placeholder=''
                                        keyboardType='numeric'
                                    />
                                </Input>

                                <Text bold={true} size='md'>End Odometer Reading</Text>
                                <Input
                                    className='w-full bg-white border-r-0 border-b-2 border-gray-300 mt-2 mb-4'
                                    variant='underlined'
                                >
                                    <InputField
                                        onChangeText={(text) => setInputEndOdometer(parseFloat(text))}
                                        value={inputEndOdometer ? inputEndOdometer.toString() : ''}
                                        placeholder=''
                                        keyboardType='numeric'
                                    />
                                </Input>

                                <Text bold={true} size='md'>Total Fuel Consumed</Text>
                                <Input
                                    className='w-full bg-white border-r-0 border-b-2 border-gray-300 mt-2 mb-4'
                                    variant='underlined'
                                >
                                    <InputField
                                        onChangeText={(text) => setInputTotalFuel(parseFloat(text))}
                                        value={inputTotalFuel ? inputTotalFuel.toString() : ''}
                                        placeholder=''
                                        keyboardType='numeric'
                                    />
                                </Input>

                                <Text bold={true} size='md'>Consumption Unit</Text>
                                <Select
                                    onValueChange={setInputFuelUnit}
                                    selectedValue={inputFuelUnit === 'liters' ? 'Diesel (L)' : 'Electric (kWh)'}
                                >
                                    <SelectTrigger className='bg-white h-fit border-l-0 border-t-0 border-r-0 border-b-2 border-gray-300 mt-2 mb-4'>
                                        <SelectInput className='pt-3 pb-3'/>
                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectContent>
                                            <SelectItem value='liters' label='Diesel (L)'/>
                                            <SelectItem value='kWh' label='Electric (kWh)'/>
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
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
                                    console.log(inputFuelUnit);
                                    await addFuelLog({
                                        log_date: moment(inputDate).format('YYYY-MM-DD'),
                                        date_update: inputeUpdateDate,
                                        start_odometer: inputStartOdometer,
                                        end_odometer: inputEndOdometer,
                                        total_fuel: inputTotalFuel,
                                        consumption_unit: inputFuelUnit
                                    }).then((res) => {
                                        console.log(res);
                                        
                                        if (Number(res) > 0) {
                                            closeModal();
                                        }
                                    })
                                }}
                            >
                                <ButtonText className='text-custom-secondary'>SAVE</ButtonText>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </GluestackUIProvider>
    );
}

function SqlMenu({
    id,
    log_date,
    start_odometer,
    end_odometer,
    total_fuel,
    consumption_unit
}: any) {
    const [inputDate, setInputDate] = useState(new Date());
    const [inputeUpdateDate, setInputUpdateDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [inputStartOdometer, setInputStartOdometer] = useState<number|null>(0);
    const [inputEndOdometer, setInputEndOdometer] = useState<number|null>(0);
    const [inputTotalFuel, setInputTotalFuel] = useState<number|null>(0);
    const [inputFuelUnit, setInputFuelUnit] = useState('');

    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openModal = () => {
        setInputDate(log_date);
        setInputStartOdometer(start_odometer);
        setInputEndOdometer(end_odometer);
        setInputTotalFuel(total_fuel);
        
        if (consumption_unit === 'liters') {
            setInputFuelUnit('Diesel (L)');
        } else if (consumption_unit === 'kWh') {
            setInputFuelUnit('Electricity (kWh)');
        } else {
            setInputFuelUnit('Diesel (L)');
        }

        setModalVisible(true);
    }
    const closeModal = () => setModalVisible(false);

    // const showPicker = () => setShowDatePicker(true);

    // ios data format
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // console.log(selectedDate);
        // let date = moment(selectedDate).format('YYYY-MM-DD')
        // setShowDatePicker(false);
        // setInputDate(date);

        setShowDatePicker(false);
        if (selectedDate) {
            console.log(selectedDate);
            setInputDate(selectedDate);
        }
    }

    // android date format
    const dateTextFormat = (input: any) => {
        let clean = input.replace(/\D/g, '');

        if (clean.length > 4) {
            clean = clean.slice(0, 4) + '-' + clean.slice(4);
        }
        if (clean.length > 7) {
            clean = clean.slice(0, 7) + '-' + clean.slice(7);
        }
        if (clean.length > 10) {
            clean = clean.slice(0, 10);
        }
    
        setInputDate(clean);
    }

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
                        console.log('edit');
                        openModal();
                    }}
                >
                    <MenuItemLabel>Edit</MenuItemLabel>
                </MenuItem>
            
                <MenuItem
                    key='2'
                    textValue='Delete'
                    onPress={async () => {
                        console.log(id)

                        await deleteFuelRecord(id);
                    }}
                >
                    <MenuItemLabel>Delete</MenuItemLabel>
                </MenuItem>
            </Menu>
            
            <Modal className='h-full p-8 justify-center items-center' isOpen={modalVisible} onClose={closeModal}>
                <ModalContent className='w-full h-fit'>
                    <Heading>Edit Fuel Record</Heading>
                    <ModalBody>
                        <ScrollView automaticallyAdjustKeyboardInsets={true}>
                            <Text bold={true} size='md'>Log Date</Text>
                            {
                                Platform.OS === 'ios' ? (
                                    <HStack space='md' className='items-center mb-4'>
                                        <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>
                                            { moment(inputDate).format('YYYY-MM-DD') }
                                        </Text>
                                        <DateTimePicker
                                            value={moment(inputDate).toDate()}
                                            mode='date'
                                            display='default'
                                            onChange={(event, date) => {onChangeDate(event, date)}}
                                        />
                                    </HStack>
                                ) : (
                                    <Box>
                                        <HStack space='md' className='justify-between items-center mb-4'>
                                            <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>
                                                { moment(inputDate).format('YYYY-MM-DD') }
                                            </Text>
                                                
                                            <Button
                                                className='bg-zinc-300 p-1 rounded-md'
                                                onPress={() => setShowDatePicker(true)}
                                            >
                                                <ButtonText className='text-black'>CHANGE</ButtonText>
                                            </Button>

                                            { showDatePicker &&
                                                <DateTimePicker
                                                    value={inputDate}
                                                    mode='date'
                                                    display='default'
                                                    onChange={onChangeDate}
                                                />
                                            }
                                        </HStack>
                                    </Box>
                                )
                            }
                            
                            <Text bold={true} size='md'>Start Odometer Reading</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputStartOdometer(text === '' ? null : parseFloat(text))}
                                    value={inputStartOdometer === null ? '' : inputStartOdometer.toString()}
                                    placeholder=''
                                    keyboardType='numeric'
                                />
                            </Input>

                            <Text bold={true} size='md'>End Odometer Reading</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputEndOdometer(text === '' ? null : parseFloat(text))}
                                    value={inputEndOdometer === null ? '' : inputEndOdometer.toString()}
                                    placeholder=''
                                    keyboardType='numeric'
                                />
                            </Input>

                            <Text bold={true} size='md'>Total Fuel Consumed</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputTotalFuel(text === '' ? null : parseFloat(text))}
                                    value={inputTotalFuel === null ? '' : inputTotalFuel.toString()}
                                    placeholder=''
                                    keyboardType='numeric'
                                />
                            </Input>

                            <Text bold={true} size='md'>Consumption Unit</Text>
                            <Select
                                onValueChange={setInputFuelUnit}
                                selectedValue={inputFuelUnit}
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
                                await updateFuelRecord({
                                    log_date: moment(inputDate).format('YYYY-MM-DD'),
                                    date_update: inputeUpdateDate,
                                    start_odometer: inputStartOdometer,
                                    end_odometer: inputEndOdometer,
                                    total_fuel: inputTotalFuel,
                                    consumption_unit: inputFuelUnit,
                                    id: id
                                }).then((res) => {
                                    console.log(res);

                                    if (Number(res) > 0) {
                                        closeModal();
                                    }
                                })
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

    const exportFuelCSV = async () => {
        await onCreate().then(async () => {
            const data : any[] = [];

            const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permission.granted) {
                return;
            }

            try {
                const res = await allFuelRecords();

                res?.forEach((record: any, index: any) => {
                    data.push({
                        no: index + 1,
                        id: record.id,
                        log_data: record.log_date,
                        data_update: record.date_update,
                        start_odometer: record.start_odometer,
                        end_odometer: record.end_odometer,
                        total_fuel: record.total_fuel,
                        consumption_unit: record.consumption_unit
                    })
                })

                const csv = jsonToCSV(data);

                await StorageAccessFramework.createFileAsync(
                    permission.directoryUri,
                    'MyFuelRecords.csv',
                    'application/csv'
                ).then( async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, csv, {
                        encoding: FileSystem.EncodingType.UTF8
                    })
                }).catch((error) => {
                    alert(`Failed to save fuel records ${error}`);
                });
            } catch (error) {
                // console.error(error);
                alert(`Failed to export fuel records ${error}`);
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
                Fuel Logs
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
                        // getUserState().then((res) => {
                        //     if (!res.username.includes('guest')) {
                                exportFuelCSV();
                        //     } else {
                        //         alert('You are not authorized to export fuel logs');
                        //     }
                        // })
                    }}
                >
                    <MenuItemLabel>Export To CSV</MenuItemLabel>
                </MenuItem>
            </Menu>
        </Box>
    )
}