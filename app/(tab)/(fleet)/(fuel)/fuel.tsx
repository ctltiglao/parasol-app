import '@/global.css';
// react native
import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Platform, ScrollView } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import { format, parse } from 'date-fns';
import moment from 'moment';

import { CustomAddFab, CustomFleetFab, SubFab } from '@/app/screen/customFab';
// import { allFleetRecords, deleteFleetRecord, onCreate, updateFleetRecord } from '@/app/service/sql/fleetHistoryDBHelper';
import { getUserState } from '../../tabViewModel';
import { allCommuteRecords, onCreate } from '@/app/service/sql/tripHistoryDBHelper';

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

    const [inputDate, setInputDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [inputStartOdometer, setInputStartOdometer] = useState(0);
    const [inputEndOdometer, setInputEndOdometer] = useState(0);
    const [inputTotalFuel, setInputTotalFuel] = useState(0);
    const [inputFuelUnit, setInputFuelUnit] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        setShowDatePicker(false);
        setModalVisible(false);
    }

    const showPicker = () => setShowDatePicker(true);
    const onChangeDate = (event: any, selectedDate: any) => {
        console.log(selectedDate);
        let date = moment(new Date(selectedDate)).format('YYYY-MM-DD')
        setShowDatePicker(false);
        setInputDate(date);
    }

    useEffect(() => {
        const fetchFuel = async () => {
            await onCreate().then(async () => {
                const result = await allCommuteRecords();
                setFuelLogs(result ?? []);
            })
        }

        fetchFuel();
    })
    
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
                                    <Heading>{res.commute_date}</Heading>
                                    <SqlMenu />
                                </HStack>
                                <Text>Update On {res.commute_date}</Text>
                                
                                <Divider />
                                <HStack>
                                    <VStack className='w-1/2'>
                                        <Text>Start Odometer</Text>
                                        <Text bold={true}>{res.mode}</Text>
                                    </VStack>
                                    <VStack className='w-1/2'>
                                        <Text>End Odometer</Text>
                                        <Text bold={true}>{res.mode}</Text>
                                    </VStack>
                                </HStack>

                                <Divider />
                                <HStack>
                                    <VStack className='w-1/2'>
                                        <Text>Total Distance</Text>
                                        <Text bold={true}>{res.mode}</Text>
                                    </VStack>
                                    <VStack className='w-1/2'>
                                        <Text>Total Fuel Consumed</Text>
                                        <Text bold={true}>{res.mode}</Text>
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
                                            <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>{inputDate.toString()}</Text>
                                            <DateTimePicker
                                                value={moment(inputDate).toDate()}
                                                mode='date'
                                                display='default'
                                                onChange={(event, date) => {onChangeDate(event, date)}}
                                            />
                                        </HStack>
                                    ) : (
                                        <Box>
                                            <HStack space='md' className='items-center mb-4'>
                                                <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>{inputDate.toString()}</Text>
                                                <Button className='bg-white h-fit w-fit' onPress={showPicker}>
                                                    <ButtonText className='text-custom-secondary'>Pick Date</ButtonText>
                                                </Button>
                                            </HStack>
                                            
                                            { showDatePicker && (
                                                <DateTimePicker
                                                    className='w-full'
                                                    value={moment(inputDate).toDate()}
                                                    mode='date'
                                                    display='default'
                                                    onChange={onChangeDate}
                                                />
                                            )}
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
                                        value={inputStartOdometer.toString()}
                                        placeholder=''
                                        keyboardType='numeric'
                                        onPress={() => {
                                            showPicker();
                                        }}
                                    />
                                </Input>

                                <Text bold={true} size='md'>End Odometer Reading</Text>
                                <Input
                                    className='w-full bg-white border-r-0 border-b-2 border-gray-300 mt-2 mb-4'
                                    variant='underlined'
                                >
                                    <InputField
                                        onChangeText={(text) => setInputEndOdometer(parseFloat(text))}
                                        value={inputEndOdometer.toString()}
                                        placeholder=''
                                        keyboardType='numeric'
                                        onPress={() => {
                                            showPicker();
                                        }}
                                    />
                                </Input>

                                <Text bold={true} size='md'>Total Fuel Consumed</Text>
                                <Input
                                    className='w-full bg-white border-r-0 border-b-2 border-gray-300 mt-2 mb-4'
                                    variant='underlined'
                                >
                                    <InputField
                                        onChangeText={(text) => setInputTotalFuel(parseFloat(text))}
                                        value={inputTotalFuel.toString()}
                                        placeholder=''
                                        keyboardType='numeric'
                                        onPress={() => {
                                            showPicker();
                                        }}
                                    />
                                </Input>

                                <Text bold={true} size='md'>Consumption Unit</Text>
                                <Select
                                    onValueChange={setInputFuelUnit}
                                    selectedValue={inputFuelUnit}
                                >
                                    <SelectTrigger className='bg-white h-fit border-l-0 border-t-0 border-r-0 border-b-2 border-gray-300 mt-2 mb-4'>
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
                                    console.log(inputFuelUnit);
                                    console.log(inputDate);
                                    // await updateFuelRecord({
                                    //     date: inputDate,
                                    //     start_odometer: inputStartOdometer,
                                    //     end_odometer: inputStartOdometer,
                                    //     total_fuel: inputTotalFuel,
                                    //     consumption_unit: inputFuelUnit,
                                    //     id: id
                                    // }).then((res) => {
                                    //     console.log(res);

                                    //     if (Number(res) > 0) {
                                    //         closeModal();
                                    //     }
                                    // });
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
    const [inputDate, setInputDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [inputStartOdometer, setInputStartOdometer] = useState(0);
    const [inputEndOdometer, setInputEndOdometer] = useState(0);
    const [inputTotalFuel, setInputTotalFuel] = useState(0);
    const [inputFuelUnit, setInputFuelUnit] = useState('');

    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => setModalVisible(false);

    const showPicker = () => setShowDatePicker(true);
    const onChangeDate = (event: any, selectedDate: any) => {
        console.log(selectedDate);
        let date = moment(new Date(selectedDate)).format('YYYY-MM-DD')
        setShowDatePicker(false);
        setInputDate(date);
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
                    onPress={() => {
                        console.log('delete');
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
                                        <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>{inputDate.toString()}</Text>
                                        <DateTimePicker
                                            value={moment(inputDate).toDate()}
                                            mode='date'
                                            display='default'
                                            onChange={(event, date) => {onChangeDate(event, date)}}
                                        />
                                    </HStack>
                                ) : (
                                    <Box>
                                        <HStack space='md' className='items-center mb-4'>
                                            <Text className='w-1/2 border-b-2 border-gray-300 pb-2'>{inputDate.toString()}</Text>
                                            <Button className='bg-white h-fit w-fit' onPress={showPicker}>
                                                <ButtonText className='text-custom-secondary'>Pick Date</ButtonText>
                                            </Button>
                                        </HStack>
                                            
                                        { showDatePicker && (
                                            <DateTimePicker
                                                className='w-full'
                                                value={moment(inputDate).toDate()}
                                                mode='date'
                                                display='default'
                                                onChange={onChangeDate}
                                            />
                                        )}
                                    </Box>
                                )
                            }
                            
                            <Text bold={true} size='md'>Start Odometer Reading</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputStartOdometer(parseFloat(text))}
                                    value={inputStartOdometer.toString()}
                                    placeholder=''
                                    keyboardType='numeric'
                                    onPress={() => {
                                        showPicker();
                                    }}
                                />
                            </Input>

                            <Text bold={true} size='md'>End Odometer Reading</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputEndOdometer(parseFloat(text))}
                                    value={inputEndOdometer.toString()}
                                    placeholder=''
                                    keyboardType='numeric'
                                    onPress={() => {
                                        showPicker();
                                    }}
                                />
                            </Input>

                            <Text bold={true} size='md'>Total Fuel Consumed</Text>
                            <Input
                                className='w-full bg-white border-r-0 border-b-2 mt-2 mb-4'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={(text) => setInputTotalFuel(parseFloat(text))}
                                    value={inputTotalFuel.toString()}
                                    placeholder=''
                                    keyboardType='numeric'
                                    onPress={() => {
                                        showPicker();
                                    }}
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
                                console.log(inputFuelUnit);
                                // await updateFuelRecord({
                                //     date: inputDate,
                                //     start_odometer: inputStartOdometer,
                                //     end_odometer: inputStartOdometer,
                                //     total_fuel: inputTotalFuel,
                                //     consumption_unit: inputFuelUnit,
                                //     id: id
                                // }).then((res) => {
                                //     console.log(res);

                                //     if (Number(res) > 0) {
                                //         closeModal();
                                //     }
                                // });
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
                        // console.warn('pressed');
                    }}
                >
                    <MenuItemLabel>Export To CSV</MenuItemLabel>
                </MenuItem>
            </Menu>
        </Box>
    )
}