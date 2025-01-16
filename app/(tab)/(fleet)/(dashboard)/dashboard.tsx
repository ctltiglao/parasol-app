import '@/global.css';
// react native
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
// expo
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Switch } from '@/components/ui/switch';

const Drawer = createDrawerNavigator();

export default function DashboardMonitorScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerHistorybotNavigator />
        </GluestackUIProvider>
    );
}

function DrawerHistorybotNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='DashboardMain'

            screenOptions={{
                header: (props) => <Header {...props} />
            }}
        >
            <Drawer.Screen name='DashboardMain' component={Screen} />
        </Drawer.Navigator>
    );
}

function Screen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const nav: any = useNavigation();
    
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    
    const handleMenuItemClick = () => {
        closeMenu();
    };

    const dashboardOptions = [
        { id: 1, label: 'Settings', value: '1', onPress: () => {
            // nav.navigate('Settings');
            // handleMenuItemClick();
            console.log('settings')
        } },
        { id: 2, label: 'Take Photo', value: '2', onPress: () => {} },
        { id: 3, label: 'Record Video', value: '3', onPress: () => {} },
        { id: 4, label: 'Focus', value: '4', onPress: () => {} },
        { id: 5, label: 'Change Resolution', value: '5', onPress: () => {} },
        { id: 6, label: 'Start Snapshot Service', value: '6', onPress: () => {} },
    ]

    return (
        <GluestackUIProvider mode='light'>
            <Box className='bg-white flex-1 w-full h-full p-4'>
                <HStack className='justify-between'>
                    <Heading className='text-custom-secondary'>Dashboard Monitor</Heading>

                    <Menu
                        isOpen={menuVisible}
                        onClose={closeMenu}
                        className='bg-custom-primary'
                        trigger={({ ...triggerProps }) => {
                            return (
                                <Button {...triggerProps} onPress={openMenu} className='bg-transparent'>
                                    <Ionicons name='ellipsis-vertical' size={25} color='#0038A8' />
                                </Button>
                            )
                        }}
                    >
                        { dashboardOptions.map((options: any) => (
                            <MenuItem key={options.id} textValue={options.value} onPress={options.onPress}>
                                <MenuItemLabel bold={true}>{options.label}</MenuItemLabel>
                            </MenuItem>
                        ))}
                    </Menu>
                </HStack>

                <HStack space='md'>
                    <Button
                        className='bg-typography-gray h-fit rounded-md p-3'
                        onPress={() => { nav.goBack() }}
                    >
                        <ButtonText className='text-black text-lg font-medium'>
                            CLOSE
                        </ButtonText>
                    </Button>
                    <HStack className='w-1/2 justify-between'>
                        <Text size='lg' className='text-custom-secondary'>Status:</Text>
                        <Heading className='text-custom-secondary'>OFF</Heading>
                    </HStack>
                </HStack>

                <HStack space='md' className='items-center absolute bottom-0 p-4'>
                    <Text size='lg' className='text-custom-secondary'>View Frames</Text>
                    <Switch
                        size='sm'
                        value={true}
                        trackColor={{ true: '#0038A8', false: '#FFFFFF' }}
                    />
                </HStack>
            </Box>
        </GluestackUIProvider>
    );
}

function Header({ navigation } : any) {
    const nav: any = useNavigation();

    return (
        <Box 
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 10, paddingHorizontal: 10 }}
            className='items-center bg-custom-primary p-5'>
            <MaterialCommunityIcons
                name='arrow-left'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Heading className='text-custom-secondary'>
                Dashboard Monitor
            </Heading>

            <Box />
        </Box>
    )
}