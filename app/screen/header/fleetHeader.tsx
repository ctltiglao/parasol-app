import '@/global.css';
// react native
import React, { useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
// expo
// gluestac
import { Box } from '@/components/ui/box';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Heading } from '@/components/ui/heading';
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
        { id: 1, label: 'Fleet History', value: '1', onPress: () => {
            nav.navigate('History');
            handleMenuItemClick();
        } },
        { id: 2, label: 'Fuel Logs', value: '2', onPress: () => {
            nav.navigate('Fuel');
            handleMenuItemClick();
        } },
        { id: 3, label: 'Settings', value: '3', onPress: () => {
            nav.navigate('Settings');
            handleMenuItemClick();
        } },
    ]
    
    return(
        <Box className='flex-row bg-custom-primary justify-between items-center pt-14 ps-4 pb-4'>
            <Ionicons
                name='menu'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch(DrawerActions.toggleDrawer())}
            />
            
            <Heading className='text-custom-secondary'>
                Parasol Fleet
            </Heading>

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
                    <MenuItem key={options.id} textValue={options.value} onPress={options.onPress}>
                        <MenuItemLabel bold={true}>{options.label}</MenuItemLabel>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}