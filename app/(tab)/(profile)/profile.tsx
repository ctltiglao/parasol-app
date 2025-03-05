import '@/global.css';
// react native
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
// import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// expo
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import DrawerScreen from '@/app/(drawer)/drawer';
import CustomHeader from '@/app/screen/header/customHeader';
import { getUserState } from '../tabViewModel';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

export default function ProfileScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerNavigator />
        </GluestackUIProvider>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='Main'
            drawerContent={props => <DrawerScreen {...props} />}

            screenOptions={{
                header: (props) => <CustomHeader {...props} />
            }}
        >
            <Drawer.Screen name='Main' component={Screen} />
        </Drawer.Navigator>
    );
}

function Screen() {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [resident, setResident] = useState('');
    const [deviceId, setDeviceId] = useState('');

    useFocusEffect(
        useCallback(() => {
            getUserState().then((response) => {
                console.log('hereee ', response);
                
                if (response.username !== undefined) {
                    setFirst(response.firstName);
                    setLast(response.lastName);
                    setUsername(response.username);
                    setEmail(response.email);

                    if (response.realmRoles.includes('government')) {
                        setRole('Government');
                    } else if (response.realmRoles.includes('ngo')) {
                        setRole('NGO');
                    } else if (response.realmRoles.includes('resident')) {
                        setRole('Resident');
                    }

                    setResident(response.appRoles);
                    setDeviceId(response.androidId);
                }

                if (response.preferred_username !== undefined) {
                    setFirst(response.given_name);
                    setLast(response.family_name);
                    setUsername(response.preferred_username);
                    setEmail(response.email);
                    // setRole(response.realmRoles);
                    // setResident(response.appRoles);
                    setDeviceId(response.sub);
                }
            });
        }, [])
    )

    return (
        <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full p-4'>
                <Text className='text-custom-secondary font-semibold text-4xl'>Profile</Text>

                <Box className='mt-8'>
                    <Box className='flex-col'>
                        <Text className='text-zinc-500 text-lg'>
                            First Name
                        </Text>
                        <Text className='text-black text-lg'>
                            {first ? first : ''}
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Last Name
                        </Text>
                        <Text className='text-black text-lg'>
                            {last ? last : ''}
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Username
                        </Text>
                        <Text className='text-black text-lg'>
                            {username ? username : ''}
                        </Text>
                    </Box>
                    
                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Email
                        </Text>
                        <Text className='text-black text-lg'>
                            {email ? email : ''}
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            User Role
                        </Text>
                        <Text className='text-black text-lg'>
                            {role ? role : ''}
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Resident Type
                        </Text>
                        <Text className='text-black text-lg'>
                            {resident ? resident : ''}
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Your Device ID
                        </Text>
                        <Text className='text-black text-lg'>
                            {deviceId ? deviceId : ''}
                        </Text>
                    </Box>
                </Box>

                <Box className='mt-8'>
                    <Box className='flex-col'>
                        <Text className='text-zinc-500 text-lg'>
                            Manage Account
                        </Text>
                        <Button className='h-fit w-full bg-custom-secondary p-2 mt-1'>
                            <ButtonText className='text-white text-lg'>
                                MANAGE ACCOUNT
                            </ButtonText>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </GluestackUIProvider>
    );
}