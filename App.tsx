import '@/global.css';
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './app/(login)/login';
import RegisterScreen from './app/(register)/register';
import TabScreen from './app/(tabs)/tab';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode='light'>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'white' },
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Tab' component={TabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  )
}