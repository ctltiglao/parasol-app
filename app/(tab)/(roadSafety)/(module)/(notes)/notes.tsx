import '@/global.css';
// react native
// expo
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

export default function NotesScreen() {
    return (
        <GluestackUIProvider mode='light'>
            <Box  className='flex-1 w-full h-full p-4'>
                <Text size='lg' className='text-zinc-500'>Notes</Text>
                <Textarea
                    size='lg'
                    className='w-full h-1/2 border-2 border-outline-100'
                >
                    <TextareaInput
                        placeholder=''
                    />
                </Textarea>
            </Box>
        </GluestackUIProvider>
    )
}