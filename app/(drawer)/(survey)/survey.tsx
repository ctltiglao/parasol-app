import '@/global.css';
// react native
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
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

import { getUserState } from '@/app/(drawer)/drawerViewModel';

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
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        getUserState().then((response) => {
            setUsername(response.username);
            
            if (response.realmRoles.includes('government')) {
                setUserType('government');
                getUrl = `https://safetravel.ph/surveyapp/?user_type=${userType}`
            } else if (response.realmRoles.includes('ngo')) {
                setUserType('ngo');
                getUrl = `https://safetravel.ph/surveyapp/?user_type=${userType}`
            } else {
                setUserType('resident');
                getUrl = `https://safetravel.ph/surveyapp/?user_type=${userType}`
            }

            return response;
        });
    }, []);

    const handleNavigation = (event: WebViewNavigation) => {
        console.log(event.url);

        if (event.url.includes('jotform.com') || event.url.includes('safetravel.ph')) {
            return true;
        }

        return false;
    }

    const handleUrlChange = (navState: any) => {
        console.log(navState.url);
        
        if (navState.url.includes('jotform.com')) {
            let navStateUrl = `${navState.url}?guest_user_id=${username}`
            getUrl = navStateUrl;
        } else {
            getUrl = navState.url;
        }
    }

    return (
        <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full mb-5'>
                <WebView
                    source={{ uri: `https://safetravel.ph/surveyapp/?user_type=${userType}` }}
                    onNavigationStateChange={handleUrlChange}
                    onShouldStartLoadWithRequest={handleNavigation}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
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
            
            <Heading className='text-custom-secondary'>PIVE Survey App</Heading>

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