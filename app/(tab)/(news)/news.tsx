import '@/global.css';
// react native
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
// expo
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';

import DrawerScreen from '@/app/(drawer)/drawer';
import CustomHeader from '@/app/screen/header/customHeader';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function NewsScreen() {
    const Screen = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
        return (
            <GluestackUIProvider mode='light'>
            <Box className='flex-1 w-full h-full mb-5'>
                <WebView
                    source={{ uri: 'https://www.safetravelph.org/newsfeed' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                />
            </Box>
        </GluestackUIProvider>
        );
    }

    return (
        <GluestackUIProvider mode='light'>
            <Drawer.Navigator
                initialRouteName='Main'
                drawerContent={props => <DrawerScreen {...props} />}

                screenOptions={{
                    header: (props) => <CustomHeader {...props} />
                }}
            >
                <Drawer.Screen name='Main' component={Screen} />
            </Drawer.Navigator>
        </GluestackUIProvider>
    );
}