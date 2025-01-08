import '@/global.css';
// react native
import { useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';

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
    return (
        <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full items justify-center'>
                <Text>Trip history</Text>
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
            
            <Text
                style={{ fontSize: 18, color: '#0038A8' }}
                className='font-bold'
            >
                Dashboard Monitor
            </Text>

            <Box />
        </Box>
    )
}