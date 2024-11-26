import '@/global.css';
import React from "react";
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawer(props: any) {
    const navigation: any = useNavigation();

    return (
        <DrawerContentScrollView {...props}>
            <StatusBar backgroundColor='#FCD116' />
            <Box className='w-full h-10 bg-custom-primary p-4 mt-0'>
                <Box className='flex-row'>
                    <Box className='flex-col'>
                        <MaterialIcons name='account-circle' size={75} color='#0038A8' />
                        <Text className='text-custom-secondary font-medium'>guest</Text>
                    </Box>

                    <Box className='flex-col'>
                        <MaterialIcons className='bg-white' name='qr-code-scanner' size={40} color='black' />
                    </Box>
                </Box>
            </Box>

            <Box className='w-full bg-custom-customBackground p-3'>
                <Text className='text-typography-500 font-bold' >PIVE</Text>

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='edit' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Survey'
                    onPress={() => navigation.navigate('Survey')}
                />

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='comment' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Chatbot'
                    onPress={() => navigation.navigate('Chatbot')}
                />

                <Divider className="bg-gray-300" />
                <Text className='text-typography-500 font-bold' >Communicate</Text>

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='share' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Share'
                    onPress={() => navigation.navigate('Share')}
                />

                <Divider className="bg-gray-300" />
                <Text className='text-typography-500 font-bold' >Support</Text>

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='help' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Request My Data'
                    onPress={() => navigation.navigate('Data')}
                />

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='feedback' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Feedback'
                    onPress={() => navigation.navigate('Feedback')}
                />

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='info' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='About'
                    onPress={() => navigation.navigate('About')}
                />

                <Divider className="bg-gray-300" />

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='settings' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Settings'
                    onPress={() => navigation.navigate('Settings')}
                />

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='logout' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Logout'
                    onPress={ async() => {
                        try {
                            await AsyncStorage.removeItem('UserState').then(() => {
                                navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                            });
                        } catch (e) {
                            alert(e);
                        }
                    }}
                />
            </Box>
        </DrawerContentScrollView>
    )
}