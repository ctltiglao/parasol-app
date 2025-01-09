import '@/global.css';
// react native
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
// expo
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Select, SelectContent, SelectPortal, SelectTrigger, SelectItem, SelectInput } from '@/components/ui/select';
import { Input, InputField } from '@/components/ui/input';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';

import { agencyOptions, causeOptions, collisionOptions, lightOptions, weatherOptions } from '@/assets/values/strings';

export default function IncidentDetailsScreen() {
    const [ selectWeather, setSelectWeather ] = useState('');
    const [ selectLight, setSelectLight ] = useState('');
    const [ checkSeverity, setCheckSeverity ] = useState({
        damage: false,
        injury: false,
        fatal: false
    });
    const [ selectCause, setSelectCause ] = useState('');
    const [ selectCollision, setSelectCollision ] = useState('');
    const [ selectAgency, setSelectAgency ] = useState('');
    const [ inputEmail, setInputEmail ] = useState('');
    const [ inputDescription, setInputDescription ] = useState('');
    const [ checkLocation, setCheckLocation ] = useState(false);

    const toggeleSeverity = (severity: any) => {
        setCheckSeverity((prev: any) => ({
            ...prev, [severity]: !prev[severity]
        }));
    }

    const toggleLocation = () => {
        setCheckLocation(!checkLocation);
    }

    const SeverityCheckbox = () => {
        return (
            <>
                <Checkbox size='md'
                    value='Property Damage'
                    onChange={() => toggeleSeverity('damage')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkSeverity.damage ? (
                                <MaterialIcons size={24}
                                    color='#0038A8'
                                    name='check-box'
                                />
                            ) : (
                                <MaterialIcons size={24}
                                    color='gray'
                                    name='check-box-outline-blank'
                                />
                            )
                        }
                    </CheckboxIndicator>
                    <CheckboxLabel size='lg' className='text-black'>
                        Property Damage
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox size='md'
                    value='Injury'
                    onChange={() => toggeleSeverity('injury')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkSeverity.injury ? (
                                <MaterialIcons size={24}
                                    color='#0038A8'
                                    name='check-box'
                                />
                            ) : (
                                <MaterialIcons size={24}
                                    color='gray'
                                    name='check-box-outline-blank'
                                />
                            )
                        }
                    </CheckboxIndicator>
                    <CheckboxLabel size='lg' className='text-black'>
                        Injury
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox size='md'
                    value='Fatal'
                    onChange={() => toggeleSeverity('fatal')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkSeverity.fatal ? (
                                <MaterialIcons size={24}
                                    color='#0038A8'
                                    name='check-box'
                                />
                            ) : (
                                <MaterialIcons size={24}
                                    color='gray'
                                    name='check-box-outline-blank'
                                />
                            )
                        }
                    </CheckboxIndicator>
                    <CheckboxLabel size='lg' className='text-black'>
                        Fatal
                    </CheckboxLabel>
                </Checkbox>
            </>
        );
    }

    return (
        <GluestackUIProvider mode='light'>
            {/* <Box  className='flex-1 w-full h-full items justify-center'>
                <Text>Incident Details</Text>
            </Box> */}
            <ScrollView
                className='p-4'
                automaticallyAdjustKeyboardInsets={true}
            >
                <VStack>
                    <Text size='lg' className='text-zinc-500'>Location</Text>
                    <Text size='lg' className='text-black ms-4'>Location here</Text>
                </VStack>

                <VStack className='mt-4'>
                    <Text size='lg' className='text-zinc-500'>Date Time</Text>
                    <HStack className='justify-between ms-4'>
                        <Text size='lg' className='text-black'>Date here</Text>
                        <Button className='bg-zinc-300 p-1 rounded-md'>
                            <ButtonText className='text-black'>CHANGE</ButtonText>
                        </Button>
                    </HStack>
                </VStack>

                <VStack className='mt-4'>
                    <Text size='lg' className='text-zinc-500'>Weather</Text>
                    {/* <Text size='lg' className='text-black'>Location here</Text> */}
                    <Select
                        className='ms-4'
                        onValueChange={setSelectWeather}
                        selectedValue={selectWeather}
                    >
                        <SelectTrigger>
                            <SelectInput placeholder={ weatherOptions[0].label } placeholderTextColor={'#000'} />
                            <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent className='shadow-soft-3'>
                                { weatherOptions.map((option) => (
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
                    <Text size='lg' className='text-zinc-500'>Light</Text>
                    <Select
                        className='ms-4'
                        onValueChange={setSelectLight}
                        selectedValue={selectLight}
                    >
                        <SelectTrigger>
                            <SelectInput placeholder={ lightOptions[0].label } placeholderTextColor={'#000'} />
                            <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent className='shadow-soft-3'>
                                { lightOptions.map((option) => (
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
                    <Text size='lg' className='text-zinc-500'>Severity</Text>
                    <SeverityCheckbox />
                </VStack>

                <VStack className='mt-4'>
                    <Text size='lg' className='text-zinc-500'>Main Cause</Text>
                    <Select
                        className='ms-4'
                        onValueChange={setSelectCause}
                        selectedValue={selectCause}
                    >
                        <SelectTrigger>
                            <SelectInput placeholder={ causeOptions[0].label } placeholderTextColor={'#000'} />
                            <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent className='shadow-soft-3'>
                                { causeOptions.map((option) => (
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
                    <Text size='lg' className='text-zinc-500'>Collision Type</Text>
                    <Select
                        className='ms-4'
                        onValueChange={setSelectCollision}
                        selectedValue={selectCollision}
                    >
                        <SelectTrigger>
                            <SelectInput placeholder={ collisionOptions[0].label } placeholderTextColor={'#000'} />
                            <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent className='shadow-soft-3'>
                                { collisionOptions.map((option) => (
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
                    <Text size='lg' className='text-zinc-500'>Reporting Agency</Text>
                    <Select
                        className='ms-4'
                        onValueChange={setSelectAgency}
                        selectedValue={selectAgency}
                    >
                        <SelectTrigger>
                            <SelectInput placeholder={ agencyOptions[0].label } placeholderTextColor={'#000'} />
                            <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent className='shadow-soft-3'>
                                { agencyOptions.map((option) => (
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
                    <Text size='lg' className='text-zinc-500'>Encoder Email</Text>
                    <Box className='ps-4'>
                        <Input
                            className='w-full bg-white border-outline-100 border-2 p-2'
                            variant='underlined'
                        >
                            <InputField
                                onChangeText={setInputEmail}
                                value={inputEmail}
                                placeholder=''
                            />
                        </Input>
                    </Box>
                </VStack>

                <VStack className='mt-4'>
                    <Text size='lg' className='text-zinc-500'>Description</Text>
                    <Box className='ps-4'>
                        <Input
                            className='w-full bg-white border-outline-100 border-2 p-2'
                            variant='underlined'
                        >
                            <InputField
                                onChangeText={setInputDescription}
                                value={inputDescription}
                                placeholder=''
                            />
                        </Input>
                    </Box>
                </VStack>

                <VStack className='mt-4'>
                    <Text size='lg' className='text-zinc-500'>Location Approximate</Text>
                    <Checkbox size='md'
                        value='Fatal'
                        onChange={() => toggleLocation()}
                    >
                        <CheckboxIndicator size='md'
                            className='border-zinc-300 bg-transparent border-1 rounded-md'
                        >
                            {
                                checkLocation ? (
                                    <MaterialIcons size={24}
                                        color='#0038A8'
                                        name='check-box'
                                    />
                                ) : (
                                    <MaterialIcons size={24}
                                        color='gray'
                                        name='check-box-outline-blank'
                                    />
                                )
                            }
                        </CheckboxIndicator>
                        <CheckboxLabel size='lg' className='text-black'>
                            Location Approximate
                        </CheckboxLabel>
                    </Checkbox>
                </VStack>
            </ScrollView>
        </GluestackUIProvider>
    )
}