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
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

const Drawer = createDrawerNavigator();
var getUrl : string = 'https://www.safetravelph.org/get-involved';

export default function FeedbackScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerFeedbackNavigator />
        </GluestackUIProvider>
    );
}

function DrawerFeedbackNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='FeedbackMain'

            screenOptions={{
                header: (props) => <Header {...props} />
            }}
        >
            <Drawer.Screen name='FeedbackMain' component={Feedback} />
        </Drawer.Navigator>
    );
}

function Feedback() {
    const handleUrlChange = (navState: any) => {
        getUrl = navState.url;
    }

    return (
        <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full'>
                <WebView
                    source={{ uri: getUrl }}
                    onNavigationStateChange={handleUrlChange}
                />
            </Box>
        </GluestackUIProvider>
    );
}

function Header({ navigation } : any) {
    const nav: any = useNavigation();

    return (
        <Box className='flex-row bg-custom-primary justify-between items-center pt-14 ps-4 pb-4'>
            <MaterialCommunityIcons
                name='arrow-left'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch( navigation.goBack() )}
            />
            
            <Heading className='text-custom-secondary'>Feedback</Heading>

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
                        Linking.openURL(getUrl)
                        .catch((err) => alert(`An error occurred: ${err}`));
                    }}
                >
                    <MenuItemLabel>Open in Browser</MenuItemLabel>
                </MenuItem>
            </Menu>
        </Box>
    )
}