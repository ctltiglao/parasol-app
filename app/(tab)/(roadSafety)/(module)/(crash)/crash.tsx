import '@/global.css';
// react native
import { useState } from 'react';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Select, SelectContent, SelectPortal, SelectTrigger, SelectItem, SelectInput } from '@/components/ui/select';
import { Input, InputField } from '@/components/ui/input';
import { crashOptions } from '@/assets/values/strings';

export default function CrashDiagramScreen() {
    const [ selectCrash, setSelectCrash ] = useState('');
    const [ inputMovement, setInputMovement ] = useState('');

    return (
        <GluestackUIProvider mode='light'>
            <Box  className='flex-1 w-full h-full p-4'>
                <VStack>
                    <Text size='lg' className='text-zinc-500'>Crash Type</Text>
                    <Select
                        onValueChange={setSelectCrash}
                        selectedValue={selectCrash}
                    >
                        <SelectTrigger>
                            <SelectInput placeholder={ crashOptions[0].label } placeholderTextColor={'#000'} />
                            <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent className='shadow-soft-3'>
                                { crashOptions.map((option) => (
                                    <SelectItem
                                        className='text-black text-lg font-medium'
                                        key={option.id}
                                        label={option.label}
                                        value={option.value}
                                    />
                                )) }
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </VStack>

                <VStack className='mt-4'>
                    <Text size='lg' className='text-zinc-500'>Movement Code</Text>
                    <Input
                        className='w-full bg-white border-outline-100 border-2 p-2'
                        variant='underlined'
                    >
                        <InputField
                            onChangeText={setInputMovement}
                            value={inputMovement}
                            placeholder=''
                        />
                    </Input>
                </VStack>
            </Box>
        </GluestackUIProvider>
    )
}