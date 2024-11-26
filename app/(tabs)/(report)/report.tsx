import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { ScrollView, Text } from 'react-native';

import String from '@/assets/values/strings';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReportScreen() {

    return (
        <GluestackUIProvider mode='light'>
            <ScrollView className='flex-1 h-full'>
                <Box>
                    <Button className='p-4 bg-custom-secondary'>
                        <ButtonText className='text-base font-bold'>
                            PIVE SURVEY APP
                        </ButtonText>
                    </Button>
                    <Button className='p-4 bg-custom-secondary'>
                        <ButtonText className='text-base font-bold'>
                            SEND REPORT
                        </ButtonText>
                    </Button>
                </Box>

                <Box>
                    <Box className='h-2/4 bg-gray-300'>
                        <Text>Map</Text>
                    </Box>

                    <Box className='flex-row pt-6 ps-6 pe-6'>
                        <Image className='w-6/12 h-36 border-black border-[1px]' source={require('@/assets/icons/camera.png')} alt='logo' />
                                    
                        <Box className='flex-col w-6/12 ps-4 justify-center items-center'>
                            <Button
                                style={{ borderRadius: 3 }}
                                className='bg-typography-gray w-9/12 p-3'
                            >
                                <ButtonText className='text-black text-lg font-medium'>
                                    TAKE A PHOTO
                                </ButtonText>
                            </Button>

                            <Button
                                style={{ borderRadius: 3 }}
                                className='bg-typography-gray w-9/12 p-3 mt-3'
                            >
                                <ButtonText className='text-black text-lg font-medium'>
                                    PICK A PHOTO
                                </ButtonText>
                            </Button>
                        </Box>
                    </Box>

                    <Box className='pb-6 ps-6 pe-6'>
                        <Input className='border-custom-secondary border-2 p-1 mt-6 rounded-md'>
                            <InputField className='text-zinc-700 text-lg font-medium' placeholder='Street' />
                        </Input>

                        <Input className='border-custom-secondary border-2 p-1 mt-3 rounded-md'>
                            <InputField className='text-zinc-700 text-lg font-medium' placeholder='Nearest landmark' />
                        </Input>

                        <Input className='border-custom-secondary border-2 p-1 mt-3 rounded-md'>
                            <InputField className='text-zinc-700 text-lg font-medium' placeholder='Barangay' />
                        </Input>

                        <Input className='border-custom-secondary border-2 p-1 mt-3 rounded-md'>
                            <InputField className='text-zinc-700 text-lg font-medium' placeholder='City/Municipality' />
                        </Input>

                        <Textarea className='border-custom-secondary border-2 h-[35%] p-1 mt-3 rounded-md'>
                            <TextareaInput className='text-zinc-700 text-lg font-medium' placeholder={ String.report_placeholder } />
                        </Textarea>
                    </Box>
                </Box>
            </ScrollView>
        </GluestackUIProvider>
    );
}