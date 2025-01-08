import '@/global.css';
// react native
import React, { useContext, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// expo
// gluestack
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';

// import { AuthContext, AuthProvider } from './app/service/authContext';
import MainScreen from './app/(main)/main';
// import LoginScreen from './app/(main)/(login)/login';
import RegisterScreen from './app/(main)/(register)/register';
import TabScreen from './app/(tabs)/tab';

const Stack = createNativeStackNavigator();

// for mqtt
import { Buffer } from 'buffer';
import '@expo/browser-polyfill'
import { decode, encode } from 'base-64';

if (!global.Buffer) global.Buffer = Buffer;
if (!global.atob) global.atob = decode;
if (!global.btoa) global.btoa = encode;

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

// export default function App() {
//   return (
//     <AuthProvider>
//       <Main />
//     </AuthProvider>
//   )
// }

// function Main() {
//   const { state } = useContext(AuthContext);

//   return (
//     // <AuthProvider>
//       <GluestackUIProvider mode='light'>
//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName='Main'
//             screenOptions={{
//               headerShown: false,
//               contentStyle: { backgroundColor: 'white' },
//             }}
//           >
//             {/* { state.isSignedIn ? (
//               <Stack.Screen name='Tab' component={TabScreen} />
//             ) : (
              
//             )} */}
//             <Stack.Screen name='Main' component={MainScreen} options={{ animationTypeForReplace: 'pop' }} />
//             <Stack.Screen name='Register' component={RegisterScreen} />
//             <Stack.Screen name='Tab' component={TabScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </GluestackUIProvider>
//     // </AuthProvider>
//   )
// }