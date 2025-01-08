import '@/global.css';
// react native
import { Linking } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

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
            <MaterialCommunityIcons
                name='arrow-left'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Text size='lg' className='font-bold text-custom-secondary'>About</Text>

            <Menu
                className='bg-custom-primary'
                offset={5}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} className='bg-transparent'>
                            <MaterialCommunityIcons name='dots-vertical' size={25} color='#0038A8' />
                        </Button>
                    )
                }}
            >
                <MenuItem key='1' textValue='Open in Browser'
                    onPress={() => {
                        Linking.openURL('https://www.safetravelph.org/who-we-are')
                        .catch((err) => alert(`An error occurred: ${err}`));
                    }}
                >
                    <MenuItemLabel>Open in Browser</MenuItemLabel>
                </MenuItem>
            </Menu>
        </Box>
    )
}