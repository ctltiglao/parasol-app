import '@/global.css';
// react native
import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
// expo
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
// gluestack
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';

import { handleAlert, publishAlert } from './alertViewModel';
import { getUserState } from '../../tabViewModel';
import { getCommuteDetails } from '../commuteViewModel';

export default function TripAlert({ handleAction } : any) {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({
        lack: false,
        violation: false,
        fare: false,
        smoke: false,
        overspeed: false,
        quality: false,
        unpro: false,
        overload: false,
        line: false,
        crash: false,
        crime: false
    });

    const [ locationSubscription, setLocationSubscription ] = useState<Location.LocationSubscription|null>(null);
    const [location, setLocation] = useState<any|null>(null);
    const [ vehicleId, setVehicleId ] = useState('');
    const [ vehicleDescription, setVehicleDescription ] = useState('');
    const [ username, setUsername ] = useState('');

    const toggleCheckbox = (name : any) => {
        setSelectedCheckboxes((prev : any) => ({
            ...prev, [name]: !prev[name]
        }));
    }

    const getLocation = async() => {
        if (!locationSubscription) {
            const locSubscription = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1
            }, (newLocation) => {
                setLocation(newLocation);
            });

            setLocationSubscription(locSubscription);
        }
    }

    useEffect(() => {
        getUserState().then((response) => {
            setUsername(response.username);
        });

        getCommuteDetails().then((response) => {
            setVehicleId(response.vehicleId);
            setVehicleDescription(response.vehicleDescription);
        })

        getLocation();
    }, [])

    return (
        <Box className='p-4 bg-white'>
            <Box className='flex-row w-full justify-end'>
                <Button
                    className='bg-typography-gray p-2 left-0 border-1 rounded-md'
                    onPress={handleAction}
                >
                    <ButtonText className='text-black text-lg font-medium'>
                        CLOSE
                    </ButtonText>
                </Button>
            </Box>

            <VStack className='flex-col mt-4'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Checkbox size='md'
                        className='bg-white border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('lack')}
                    >
                        <HStack className='w-full justify-between'>
                            <HStack className='w-fit h-fit items-center'>
                                <CheckboxIndicator size='md'
                                    className='border-zinc-300 bg-transparent border-1 rounded-md'
                                >
                                    {
                                        selectedCheckboxes.lack ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Lack of public transport
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_nopt.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('violation')}
                    >
                        <HStack className='w-full justify-between'>
                            <HStack className='w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.violation ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Violation of minimum health standards
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_covid19.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('fare')}
                    >
                        <HStack className='w-full justify-between'>
                            <HStack className='w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.fare ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Fare overpricing
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_overpricing.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('smoke')}
                    >
                        <HStack className='w-full justify-between'>
                            <HStack className='w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.smoke ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Smoke belching
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_co2.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('overspeed')}
                    >
                        <HStack className='flex-row w-full justify-between'>
                            <HStack className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.overspeed ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Overspeeding
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_overspeeding.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('quality')}
                    >
                        <HStack className='flex-row w-full justify-between'>
                            <HStack className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.quality ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Poor vehicle quality
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_repair.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('unpro')}
                    >
                        <HStack className='flex-row w-full justify-between'>
                            <HStack className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.unpro ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Unprofessional driver
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_driver.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('overload')}
                    >
                        <HStack className='flex-row w-full justify-between'>
                            <HStack className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.overload ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Overloading
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_flattire.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('line')}
                    >
                        <HStack className='flex-row w-full justify-between'>
                            <HStack className='flex-row w-fit h-fit items-center'>
                                    {
                                        selectedCheckboxes.line ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Out-of-line operation
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_route.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('crash')}
                    >
                        <HStack className='w-full justify-between'>
                            <HStack className='w-fit h-fit items-center'>
                                    {
                                        selectedCheckboxes.crash ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Road crash
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_crash.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Checkbox size='md'
                        className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2'
                        value='Lack of public transport'
                        onChange={() => toggleCheckbox('crime')}
                    >
                        <HStack className='w-full justify-between'>
                            <HStack className='w-fit h-fit items-center'>
                                    {
                                        selectedCheckboxes.crime ? (
                                            <MaterialIcons size={24}
                                                color='#0038A8'
                                                name='check-box'
                                            />
                                        ) : (
                                            <MaterialIcons size={24}
                                                color='gray'
                                                name='check-box-outline-blank'
                                            />
                                        )
                                    }
                                <CheckboxLabel size='md' className='text-black font-medium'>
                                    Crime event
                                </CheckboxLabel>
                            </HStack>
                            <Image source={(require('@/assets/icons/ic_police.png'))} alt='logo' />
                        </HStack>
                    </Checkbox>

                    <Button className='bg-custom-secondary h-fit mt-5 mb-20 ms-20 me-20 p-4'
                        onPress={() => {
                            if (vehicleId !== '') {
                                const description = handleAlert({ selectedCheckboxes });
                                const message = {
                                    deviceId: Device.osBuildId ?? Device.osInternalBuildId ?? '',
                                    lat: location.coords.latitude,
                                    lng: location.coords.longitude,
                                    timestamp: new Date().toISOString(),
                                    userId: username,
                                    description: description,
                                    vehicleId: vehicleId,
                                    vehicleDetails: vehicleDescription
                                }

                                publishAlert(message).then((response) => {
                                    if (response) {
                                        locationSubscription?.remove();
                                        setLocationSubscription(null);
                                    }
                                });
                            } else {
                                alert('Please set commute information');
                            }
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            SEND ALERT
                        </ButtonText>
                    </Button>
                </ScrollView>
            </VStack>
        </Box>
    )
}