import { useEffect, useState } from 'react';
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

import { getUserState } from './surveyViewModel';

const Drawer = createDrawerNavigator();

var getUrl : string;

export default function SurveyScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <DrawerSurveyNavigator />
        </GluestackUIProvider>
    );
}

function DrawerSurveyNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='SurveyMain'

            screenOptions={{
                header: (props) => <Header {...props} />
            }}
        >
            <Drawer.Screen name='SurveyMain' component={Survey} />
        </Drawer.Navigator>
    );
}

function Survey() {
    const [currentUrl, setCurrentUrl] = useState('');
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        getUserState().then((response) => {
            setUsername(response.username);
            // setRealmRoles(response.realmRoles);

            if (response.realmRoles.includes('government')) {
                setUserType('government');
            } else if (response.realmRoles.includes('ngo')) {
                setUserType('ngo');
            } else {
                setUserType('resident');
            }

            return response;
        });
    }, []);

    const handleNavigationStateChange = (navState: any) => {
        if (navState.url.includes('jotform.com')) {
            let navStateUrl = `${navState.url}?guest_user_id=${username}`;
            setCurrentUrl(navStateUrl);
            getUrl = navStateUrl;
            
            console.warn(currentUrl);
        } else {
            setCurrentUrl(navState.url)
            getUrl = navState.url;

            console.warn(currentUrl);
        }
    };

    return (
        <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full mb-5'>
                <WebView
                    source={{ uri: `https://safetravel.ph/surveyapp/?user_type=${userType}` }}
                    onNavigationStateChange={handleNavigationStateChange}
                />
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
                PIVE Survey App
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
                        Linking.openURL(getUrl)
                        .catch((err) => console.error('An error occurred', err));

                        console.warn(getUrl);
                    }}
                >
                    <MenuItemLabel>Open in Browser</MenuItemLabel>
                </MenuItem>
            </Menu>
        </Box>
    )
}