import '@/global.css';
// react native
import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
// expo
import { Ionicons } from '@expo/vector-icons';
// gluestack
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

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
            
            <Text className='font-bold text-custom-customBluegray'>
                Parasol Fleet
            </Text>

            <Box/>
        </Box>
    )
}