import '@/global.css';
// react native
import React, { useCallback, useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
// expo
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
// gluestack
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';

import { keycloakLogout } from '../(drawer)/drawerViewModel';
import { getUserState } from '../(tab)/tabViewModel';

export default function DrawerScreen(props: any) {
    const navigation: any = useNavigation();

    const [username, setUsername] = useState('');

    const openFbApp = async () => {
        const url = 'fb://';

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                await Linking.openURL('https://www.facebook.com/');
            }
        } catch (error) {
            console.error(error);
            alert(`Cannot open facebook app: ${error}`);
        }
    }

    // useEffect(() => {
    //     getUserState().then((response) => {
    //         setUsername(response);
    //         // setUsername('no username haha');
    //     })
    // })

    useFocusEffect(
        useCallback(() => {
            getUserState().then((response) => {

                if (response.username !== undefined) {
                    setUsername(response.username);
                }

                if (response.preferred_username !== undefined) {
                    console.log('guest ', response.preferredUsername);
                    setUsername(response.preferred_username);
                }
            })
        }, [username])
    )

    return (
        <DrawerContentScrollView {...props} className='-top-2'>
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

            <Box className='bg-custom-customBackground h-full p-3'>
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
                    onPress={openFbApp}
                />

                <Divider />

                <Text className='text-typography-500 font-bold' >Communicate</Text>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='share' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Share'
                    onPress={() => {}}
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
                    onPress={() => {}}
                />

                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name='logout' size={size} color={color} />
                    )}
                    labelStyle={{ color: '#0038A8' }}
                    label='Logout'
                    onPress={ async() => {
                        try {
                            await keycloakLogout().then(async (res) => {
                                console.log('res here ', res);
                                if (res === true) {
                                    await AsyncStorage.removeItem('UserState').then(() => {
                                        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                                    });
                                }
                            })
                        } catch (e) {
                            alert(e);
                        }
                    }}
                />
            </Box>
        </DrawerContentScrollView>
    )
}