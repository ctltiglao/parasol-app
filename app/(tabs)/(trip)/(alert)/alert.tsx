import React, { useEffect, useState } from 'react';
import '@/global.css';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';

import { Alert, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Device from 'expo-device';
// import Paho, { Client } from 'paho-mqtt';

import { handleAlert } from './alertViewModel';
// import UseMqttClient from '@/src/_connection/mqttConnection';
// import { handleAlertMqttPublish } from './alertViewModel';

import { MQTT_HOST, MQTT_PASSWORD, MQTT_PORT, MQTT_USERNAME } from "@/assets/values/strings";

const num = Math.random() * 100;

// const client = new Paho.Client(
//     MQTT_HOST,
//     Number(MQTT_PORT),
//     `mqtt-async-test-${num}`
// )

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

    const toggleCheckbox = (name : any) => {
        setSelectedCheckboxes((prev : any) => ({
            ...prev, [name]: !prev[name]
        }));
    }

    // function handleAlertMqttPublish({ description } : any) {
    //     client.connect({
    //         onSuccess: () => {
    //             Alert.alert('MQTT', 'Connected!');

    //             client.subscribe('alert');
    //             const message = new Paho.Message(description);
    //             message.destinationName = 'alert';
    //             client.send(message);
    //         },
    //         onFailure: (error) => {
    //             console.warn(error);
    //             Alert.alert('MQTT', 'Failed to connect!');
    //         }
    //     });
    // }

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

            <Box className='flex-col mt-4'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Checkbox onChange={() => toggleCheckbox('lack')} className='bg-white border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.lack ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Lack of public transport
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_nopt.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('violation')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.violation ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Violation of minimum health standards
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_covid19.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('fare')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.fare ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Fare overpricing
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_overpricing.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('smoke')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.smoke ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Smoke belching
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_co2.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('overspeed')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.overspeed ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Overspeeding
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_overspeeding.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('quality')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.quality ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Poor vehicle quality
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_repair.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('unpro')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.unpro ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Unprofessional driver
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_driver.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('overload')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                <CheckboxIndicator size='md' className='border-zinc-300 bg-transparent border-1 rounded-md'>
                                    {
                                        selectedCheckboxes.overload ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                </CheckboxIndicator>
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Overloading
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_flattire.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('line')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                    {
                                        selectedCheckboxes.line ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Out-of-line operation
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_route.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('crash')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                    {
                                        selectedCheckboxes.crash ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Road crash
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_crash.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Checkbox onChange={() => toggleCheckbox('crime')} className='bg-white mt-3 border-custom-secondary border-2 rounded-md p-2' size='md' value='Lack of public transport'>
                        <Box className='flex-row w-full justify-between'>
                            <Box className='flex-row w-fit h-fit items-center'>
                                    {
                                        selectedCheckboxes.crime ? (
                                            <MaterialIcons color='#0038A8' name='check-box' size={24} />
                                        ) : (
                                            <MaterialIcons color='gray' name='check-box-outline-blank' size={24} />
                                        )
                                    }
                                <CheckboxLabel className='text-black text-lg font-medium'>
                                    Crime event
                                </CheckboxLabel>
                            </Box>
                            <Image source={(require('@/assets/icons/ic_police.png'))} alt='logo' />
                        </Box>
                    </Checkbox>

                    <Button
                        onPress={() => {
                            const message = handleAlert({ selectedCheckboxes });

                            // handleAlertMqttPublish(client);
                        }}
                        className='p-4 bg-custom-secondary mt-5 mb-20 ms-20 me-20'
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            SEND ALERT
                        </ButtonText>
                    </Button>
                </ScrollView>
            </Box>
        </Box>
    )
}