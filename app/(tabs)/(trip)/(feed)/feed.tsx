import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import WebView from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';

export default function TripFeed({ handleAction } : any) {
    return (
        <Box className='h-full bg-white'>
            <Box className='p-4 flex-row w-full justify-end'>
                <Button
                    className='bg-custom-primary p-1 left-0 rounded-full'
                    onPress={handleAction}
                >
                    <MaterialIcons name='clear' size={24} color="black" />
                </Button>
            </Box>

            <Box className='flex-1 w-full h-full'>
                <WebView source={{ uri: 'https://www.safetravelph.org/open-data' }} />
            </Box>
        </Box>
    )
}