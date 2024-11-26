import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Button } from '@/components/ui/button';

import { Text, Linking } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function AboutScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerAboutNavigator />
        </GluestackUIProvider>
    );
}

function DrawerAboutNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='AboutMain'

            screenOptions={{
                header: (props) => <Header {...props} />
            }}
        >
            <Drawer.Screen name='AboutMain' component={About} />
        </Drawer.Navigator>
    );
}

function About() {
    return (
        <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full'>
                <WebView source={{ uri: 'https://www.safetravelph.org/who-we-are' }} />
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
            <Ionicons
                name='arrow-back'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Text
                style={{ fontSize: 18, color: '#0038A8' }}
                className='font-bold'
            >
                About
            </Text>

            <Menu
                className='bg-custom-primary'
                offset={5}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} className='bg-transparent'>
                            <Ionicons name='ellipsis-vertical' size={25} color='#0038A8' />
                        </Button>
                    )
                }}
            >
                <MenuItem key='1' textValue='Open in Browser'
                    onPress={() => {
                        Linking.openURL('https://www.safetravelph.org/who-we-are')
                        .catch((err) => console.error('An error occurred', err));
                    }}
                >
                    <MenuItemLabel>Open in Browser</MenuItemLabel>
                </MenuItem>
            </Menu>
        </Box>
    )
}