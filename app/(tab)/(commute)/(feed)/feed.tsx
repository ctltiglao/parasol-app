import '@/global.css';
// react native
import WebView from 'react-native-webview';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
// gluestack
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

export default function TripFeed({ handleAction } : any) {
    return (
        <Box className='bg-white flex-1 p-2'>
            <Box className='z-10 absolute top-0 right-2'>
                <Button
                    className='bg-custom-primary h-fit rounded-full p-1 m-2'
                    onPress={handleAction}
                >
                    <MaterialCommunityIcons name='close' size={24} color="black" />
                </Button>
            </Box>

            <Box className='flex-1 w-full h-full'>
                <WebView source={{ uri: 'https://www.safetravelph.org/open-data' }} />
            </Box>
        </Box>
    )
}