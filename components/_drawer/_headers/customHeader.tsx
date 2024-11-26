import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import React from "react";
import { Box } from '@/components/ui/box';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Button } from '@/components/ui/button';

import { Text } from 'react-native';
import { DrawerActions, useNavigation } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ navigation, route, options } : any) {
    const nav: any = useNavigation();
    
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
            
            <Text
                style={{ fontSize: 18, color: '#0038A8' }}
                className='font-bold'
            >
                Parasol Fleet
            </Text>

            <Box />
        </Box>
    )
}