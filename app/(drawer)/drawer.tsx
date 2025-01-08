import '@/global.css';
// react native
import React, { useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// expo
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
// gluestack
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';

import { getUserState } from '../(drawer)/drawerViewModel';

export default function DrawerScreen(props: any) {
    const navigation: any = useNavigation();

    const [username, setUsername] = useState('');

    useEffect(() => {
        getUserState().then((response) => {
            setUsername(response.username);
        })
    })

    return (
        <DrawerContentScrollView {...props}>
            <StatusBar backgroundColor='#FCD116' />
            <Box className='bg-custom-primary w-full h-fit p-4'>
                <HStack className='justify-between'>
                    <VStack>
                        <MaterialCommunityIcons name='account-circle' size={60} color='#0038A8' />
                        <Text size='md' bold={true} className='text-custom-secondary'>
                            {username ? username : 'no_username'}
                        </Text>
                    </VStack>
                    <VStack>
                        <MaterialCommunityIcons className='bg-white' name='qrcode' size={40} color='black' />
                    </VStack>            
                </HStack>
            </Box>

            <Box className='bg-custom-customBackground w-full p-3'>
                <Text className='text-typography-500 font-bold' >PIVE</Text>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='edit' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Survey App'
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

                <Divider />

                <Text className='text-typography-500 font-bold' >Communicate</Text>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='share' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Share'
                    onPress={() => navigation.navigate('Share')}
                />

                <Divider />

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

                <Divider />

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