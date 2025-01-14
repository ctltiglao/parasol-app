import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerScreen from '@/app/(drawer)/drawer';
import CustomHeader from '@/app/screen/header/customHeader';

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
                            Guest
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Last Name
                        </Text>
                        <Text className='text-black text-lg'>
                            User
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Last Name
                        </Text>
                        <Text className='text-black text-lg'>
                            User
                        </Text>
                    </Box>
                </Box>

                <Box className='mt-8'>
                    <Box className='flex-col'>
                        <Text className='text-zinc-500 text-lg'>
                            User Role
                        </Text>
                        <Text className='text-black text-lg'>
                            Resident
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Resident Type
                        </Text>
                        <Text className='text-black text-lg'>
                            Operator
                        </Text>
                    </Box>

                    <Box className='flex-col mt-4'>
                        <Text className='text-zinc-500 text-lg'>
                            Your Device ID
                        </Text>
                        <Text className='text-black text-lg'>
                            a4d73b69bef8a382
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