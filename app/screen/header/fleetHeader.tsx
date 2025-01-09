import '@/global.css';
// react native
import React, { useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
// expo
// gluestac
import { Box } from '@/components/ui/box';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';


import { Ionicons } from '@expo/vector-icons';

export default function FleetHeader({ navigation, route, options } : any) {
    const [menuVisible, setMenuVisible] = useState(false);
    const nav: any = useNavigation();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleMenuItemClick = () => {
        closeMenu();
    };

    const fleetOptions = [
        { id: 1, label: 'Dashboard Monitor', value: '1', onPress: () => {
            nav.navigate('Dashboard');
            handleMenuItemClick();
        } },
        { id: 2, label: 'Fleet History', value: '2', onPress: () => {
            nav.navigate('History');
            handleMenuItemClick();
        } },
        { id: 3, label: 'Settings', value: '3', onPress: () => {
            nav.navigate('Settings');
            handleMenuItemClick();
        } },
    ]
    
    return(
        <Box 
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 10, paddingHorizontal: 10 }}
            className='items-center bg-custom-primary p-5'>
            <Ionicons
                name='menu'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch(DrawerActions.toggleDrawer())}
            />
            
            <Text className='font-bold text-custom-customBluegray'>
                Parasol Fleet
            </Text>

            <Menu
                isOpen={menuVisible}
                onClose={closeMenu}
                className='bg-custom-primary'
                offset={5}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} onPress={openMenu} className='bg-transparent'>
                            <Ionicons name='ellipsis-vertical' size={25} color='#0038A8' />
                        </Button>
                    )
                }}
            >
                { fleetOptions.map((options: any) => (
                    <MenuItem key={options.id} textValue={options.value}>
                        <MenuItemLabel bold={true} onPress={options.onPress}>{options.label}</MenuItemLabel>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}