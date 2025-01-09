import '@/global.css';
// react native
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';
// expo
import '@expo/browser-polyfill'
// gluestack
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';

import MainScreen from './app/(main)/main';
import RegisterScreen from './app/(main)/(register)/register';
import TabScreen from './app/(tab)/tab';

// for mqtt
import { Buffer } from 'buffer';
import { decode, encode } from 'base-64';

if (!global.Buffer) global.Buffer = Buffer;
if (!global.atob) global.atob = decode;
if (!global.btoa) global.btoa = encode;

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: ['parasol-app://'],
    config: {
      screens: {
        Tab1: 'trip',
        Tab2: 'fleet',
        Tab3: 'driver',
        Tab4: 'profile',
        Redirect: 'redirect'
      }
    }
  }

  return (
    <GluestackUIProvider mode='light'>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Main'
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'white' },
          }}
        >
          <Stack.Screen name='Main' component={MainScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Tab' component={TabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  )
}