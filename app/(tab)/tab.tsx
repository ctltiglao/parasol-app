import '@/global.css';
// react native
import React, { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, NavigationContainer, useNavigationState } from '@react-navigation/native';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
// gluestack

import CommuteScreen from './(commute)/commute';
import FleetScreen from './(fleet)/fleet';
import NewsScreen from './(news)/news';
import RoadSafetyScreen from './(roadSafety)/roadSafety';
import ProfileScreen from './(profile)/profile';

import SurveyScreen from '../(drawer)/(survey)/survey';
import ChatbotScreen from '../(drawer)/(chatbot)/chatbot';
import ShareScreen from '../(drawer)/(share)/share';
import DataScreen from '../(drawer)/(data)/data';
import FeedbackScreen from '../(drawer)/(feedback)/feedback';
import AboutScreen from '../(drawer)/(about)/about';
import SettingsScreen from '../(drawer)/(settings)/settings';
import LoginScreen from '../(main)/main';

import { getCommuteSetting } from './(commute)/(settings)/settingsViewModel';
import { getFleetSetting } from './(fleet)/(settings)/settingsViewModel';
import { onMqttClose } from '../service/mqtt/mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserState } from './tabViewModel';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabScreen() {
    return (
        // <NavigationIndependentTree>
            <NavigationContainer independent={true}>
                <Stack.Navigator>
                    <Stack.Screen name='Tab' component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name='Survey' component={SurveyScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Chatbot' component={ChatbotScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Share' component={ShareScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Data' component={DataScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Feedback' component={FeedbackScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='About' component={AboutScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        // </NavigationIndependentTree>
    );
}

 function TabNavigator() {
    const [isGuest, setIsGuest] = useState<boolean|null>(null);

    useEffect(() => {
        getCommuteSetting().then((setting) => {
            // console.log('Commute ', setting);
        });
        getFleetSetting().then((setting) => {
            // console.log('Fleet ', setting);
        });

        getUserState().then((response) => {
            if (response.username !== undefined) {
                setIsGuest(true);
            } else {
                setIsGuest(false);
            }
        });
    })

    return (
        <Tab.Navigator
            screenOptions = {({ route } : any) => ({
                headerShown: false,
                tabBarActiveTintColor: '#0038A8',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, focused, size } : any) => {
                    const iconSize = focused ? 30 : 24;

                    if (route.name === 'Commute') {
                        return <MaterialCommunityIcons name='navigation' size={iconSize} color={color} />
                    } else if (route.name === 'Fleet') {
                        return <MaterialCommunityIcons name='bus' size={iconSize} color={color} />
                    } else if (route.name === 'News') {
                        return <MaterialCommunityIcons name='newspaper-variant-multiple' size={iconSize} color={color} />
                    } else if (route.name === 'Road Safety') {
                        return <MaterialCommunityIcons name='steering' size={iconSize} color={color} />
                    } else if (route.name === 'Profile') {
                        return <MaterialCommunityIcons name='account' size={iconSize} color={color} />
                    }
                },
                tabBarLabel: ({ focused } : any) => {
                    return (
                        <Text style={{
                            color: focused ? '#0038A8' : 'gray',
                            fontSize: focused ? 12 : 11,
                            fontWeight: focused ? 'bold' : 'normal',
                        }}>
                            { route.name }
                        </Text>
                    )
                },
            })}
            screenListeners={({ navigation, route } : any) => ({
                tabPress: (e) => {
                    e.preventDefault();

                    const currRouteName = navigation.getState().routes[navigation.getState().index].name;
                    console.log(currRouteName);
                    
                    var currentTab : string = '';
                    if (navigation.getState().index === 0) {
                        currentTab = 'Commute';
                    } else if (navigation.getState().index === 1) {
                        currentTab = 'Fleet';
                    } else if (navigation.getState().index === 2) {
                        currentTab = 'News';
                    } else if (navigation.getState().index === 3) {
                        currentTab = 'Road Safety';
                    } else if (navigation.getState().index === 4) {
                        currentTab = 'Profile';
                    }

                    if (currRouteName === route.name) {
                        return;
                    }

                    Alert.alert(
                        'Confirm',
                        `Are you sure you want to exit ${currentTab}?`,
                        [
                            {text: 'No', style: 'cancel'},
                            {text: 'Yes', onPress: async () => {
                                if (currentTab === 'Commute') {
                                    await AsyncStorage.removeItem('CommuteDetails');
                                    console.log('removed commute details');

                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: "Commute" }],
                                    })
                                } else if (currentTab === 'Fleet') {
                                    navigation.reset({
                                        index: 1,
                                        routes: [{ name: "Fleet" }],
                                    })
                                } else {
                                    navigation.navigate(route.name);
                                }

                                // navigation.navigate(route.name);
                                
                                // onMqttClose();
                                console.log(navigation.navigate(route));
                            }},
                        ]
                    )
                }
            })}
        >
            <Tab.Screen name='Commute' component={CommuteScreen} />
            <Tab.Screen name='Fleet' component={FleetScreen} />

            {/* { isGuest === false &&
                <Tab.Screen name='Fleet' component={FleetScreen} />
            } */}

            <Tab.Screen name='News' component={NewsScreen} />
            <Tab.Screen name='Road Safety' component={RoadSafetyScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
}