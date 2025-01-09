import '@/global.css';
// react native
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
// gluestack

import CommuteScreen from './(commute)/commute';
import FleetScreen from './(fleet)/fleet';
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
    const [showwModal, setShowModal] = useState(false);
    const [pendingRoute, setPendingRoute] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (!pendingRoute) return;

            e.preventDefault();
            setShowModal(true);
        });

        return unsubscribe;
    }, [navigation, pendingRoute]);

    const handleConfirm = () => {
        setShowModal(false);
        setPendingRoute(null);

        if (pendingRoute) navigation.dispatch(pendingRoute);
    }

    const handleCancel = () => {
        setShowModal(false);
        
    }

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
        >
            <Tab.Screen name='Commute' component={CommuteScreen} />
            <Tab.Screen name='Fleet' component={FleetScreen} />
            <Tab.Screen name='Road Safety' component={RoadSafetyScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
}