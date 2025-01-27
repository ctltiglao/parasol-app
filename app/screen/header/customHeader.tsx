import '@/global.css';
// react native
import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
// expo
import { Ionicons } from '@expo/vector-icons';
// gluestack
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';

export default function CustomHeader({ navigation, route, options } : any) {
    const nav: any = useNavigation();
    
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

            <Box/>
        </Box>
    )
}