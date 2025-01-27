import '@/global.css';
// react native
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
// expo
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionItem, AccordionTitleText, AccordionTrigger } from '@/components/ui/accordion';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Select, SelectContent, SelectPortal, SelectTrigger, SelectItem, SelectInput } from '@/components/ui/select';
import { Input, InputField } from '@/components/ui/input';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';

import { driverErrOptions, genderOptions, gradeOptions, injuryOptions, involvementOptions, seatbeltOptions } from '@/assets/values/strings';

export default function MinorsScreen() {
    const [ isButton, setButton ] = useState<String[]>([]);
    const [ selectGrade, setSelectGrade ] = useState('');
    const [ selectInvolvement, setSelectInvolvement ] = useState('');
    const [ inputFirst, setInputFirst ] = useState('Minor');
    const [ inputMiddle, setInputMiddle ] = useState('');
    const [ inputLast, setInputLast ] = useState(`${isButton.length + 1}`);
    const [ inputAddress, setInputAddress ] = useState('');
    const [ selectGender, setSelectGender ] = useState('');
    const [ inputLicense, setInputLicense ] = useState('');
    const [ inputAge, setInputAge ] = useState('0');
    const [ selectDriverErr, setSelectDriverErr ] = useState('');
    const [ selectInjury, setSelectInjury ] = useState('');
    const [ checkAlcohol, setCheckAlcohol ] = useState(false);
    const [ checkDrugs, setCheckDrugs ] = useState(false);
    const [ selectSeatbelt, setSelectSeatbelt ] = useState('');
    const [ selectHelment, setSelectHelment ] = useState('');
    const [ inputHospital, setInputHospital ] = useState('');

    const addButton = () => {
        setButton([...isButton, `Minor ${isButton.length + 1}`]);
    }

    const toggleAlcohol = () => {
        setCheckAlcohol(!checkAlcohol);
    }

    const toggleDrugs = () => {
        setCheckDrugs(!checkDrugs);
    }

    return (
        <GluestackUIProvider>
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <Box className='w-full h-fit'>
                    {
                        isButton.length > 0 && (
                            isButton.map((item, index) => (
                                <Accordion
                                    key={index}
                                    isCollapsible={true}
                                    className='flex-1 w-full h-fit'
                                >
                                    <AccordionItem className='bg-white p-4' value='New Person'>
                                        <AccordionHeader>
                                            <AccordionTrigger className='pt-4 pb-4'>
                                                <AccordionTitleText
                                                    className='text-zinc-500 font-bold text-lg'
                                                >
                                                    {item}
                                                </AccordionTitleText>
                                            </AccordionTrigger>
                                        </AccordionHeader>
                                        <AccordionContent>
                                            <VStack>
                                                <Text size='xl' className='text-zinc-500'>Grade Level</Text>
                                                <Select
                                                    onValueChange={setSelectGrade}
                                                    selectedValue={selectGrade}
                                                >
                                                    <SelectTrigger>
                                                        <SelectInput placeholder={ gradeOptions[0].label } placeholderTextColor={'#000'} />
                                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                                    </SelectTrigger>
                                                    <SelectPortal className='h-1/3'>
                                                        <SelectContent className='shadow-soft-3'>
                                                            { gradeOptions.map((option) => (
                                                                <SelectItem
                                                                    className='text-black font-medium'
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
                                                <Text size='xl' className='text-zinc-500'>Involvement</Text>
                                                <Select
                                                    onValueChange={setSelectInvolvement}
                                                    selectedValue={selectInvolvement}
                                                >
                                                    <SelectTrigger>
                                                        <SelectInput placeholder={ involvementOptions[0].label } placeholderTextColor={'#000'} />
                                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                                    </SelectTrigger>
                                                    <SelectPortal className='h-1/3'>
                                                        <SelectContent className='shadow-soft-3'>
                                                            { involvementOptions.map((option) => (
                                                                <SelectItem
                                                                    className='text-black font-medium'
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
                                                <Text size='xl' className='text-zinc-500'>First Name</Text>
                                                <Input
                                                    className='w-full bg-white border-outline-100 border-2 p-2'
                                                    variant='underlined'
                                                >
                                                    <InputField
                                                        onChangeText={setInputFirst}
                                                        value={inputFirst}
                                                        placeholder=''
                                                    />
                                                </Input>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='xl' className='text-zinc-500'>Middle Name</Text>
                                                <Input
                                                    className='w-full bg-white border-outline-100 border-2 p-2'
                                                    variant='underlined'
                                                >
                                                    <InputField
                                                        onChangeText={setInputMiddle}
                                                        value={inputMiddle}
                                                        placeholder=''
                                                    />
                                                </Input>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='xl' className='text-zinc-500'>Last Name</Text>
                                                <Input
                                                    className='w-full bg-white border-outline-100 border-2 p-2'
                                                    variant='underlined'
                                                >
                                                    <InputField
                                                        onChangeText={setInputLast}
                                                        value={inputLast}
                                                        placeholder=''
                                                    />
                                                </Input>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='xl' className='text-zinc-500'>Address</Text>
                                                <Input
                                                    className='w-full bg-white border-outline-100 border-2 p-2'
                                                    variant='underlined'
                                                >
                                                    <InputField
                                                        onChangeText={setInputAddress}
                                                        value={inputAddress}
                                                        placeholder=''
                                                    />
                                                </Input>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='xl' className='text-zinc-500'>Gender</Text>
                                                <Select
                                                    onValueChange={setSelectGender}
                                                    selectedValue={selectGender}
                                                >
                                                    <SelectTrigger>
                                                        <SelectInput placeholder={ genderOptions[0].label } placeholderTextColor={'#000'} />
                                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                                    </SelectTrigger>
                                                    <SelectPortal className='h-1/2'>
                                                        <SelectContent className='shadow-soft-3'>
                                                            { genderOptions.map((option) => (
                                                                <SelectItem
                                                                    className='text-black font-medium'
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
                                                <Text size='xl' className='text-zinc-500'>Lincense Number</Text>
                                                <Input
                                                    className='w-full bg-white border-outline-100 border-2 p-2'
                                                    variant='underlined'
                                                >
                                                    <InputField
                                                        onChangeText={setInputLicense}
                                                        value={inputLicense}
                                                        placeholder=''
                                                    />
                                                </Input>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='xl' className='text-zinc-500'>Age</Text>
                                                <Input
                                                    className='w-full bg-white border-outline-100 border-2 p-2'
                                                    variant='underlined'
                                                >
                                                    <InputField
                                                        keyboardType='numeric'
                                                        onChangeText={setInputAge}
                                                        value={inputAge}
                                                        placeholder=''
                                                    />
                                                </Input>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='xl' className='text-zinc-500'>Driver Error</Text>
                                                <Select
                                                    onValueChange={setSelectDriverErr}
                                                    selectedValue={selectDriverErr}
                                                >
                                                    <SelectTrigger>
                                                        <SelectInput placeholder={ driverErrOptions[0].label } placeholderTextColor={'#000'} />
                                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                                    </SelectTrigger>
                                                    <SelectPortal>
                                                        <SelectContent className='shadow-soft-3'>
                                                            { driverErrOptions.map((option) => (
                                                                <SelectItem
                                                                    className='text-black font-medium'
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
                                                <Text size='xl' className='text-zinc-500'>Injury</Text>
                                                <Select
                                                    onValueChange={setSelectInjury}
                                                    selectedValue={selectInjury}
                                                >
                                                    <SelectTrigger>
                                                        <SelectInput placeholder={ injuryOptions[0].label } placeholderTextColor={'#000'} />
                                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                                    </SelectTrigger>
                                                    <SelectPortal>
                                                        <SelectContent className='shadow-soft-3'>
                                                            { injuryOptions.map((option) => (
                                                                <SelectItem
                                                                    className='text-black font-medium'
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
                                                <Text size='lg' className='text-zinc-500'>Alcohol Suspicion</Text>
                                                <Checkbox size='md'
                                                    value='Fatal'
                                                    onChange={() => toggleAlcohol()}
                                                >
                                                    <CheckboxIndicator size='md'
                                                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                                                    >
                                                        {
                                                            checkAlcohol ? (
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
                                                        Alcohol Suspicion
                                                    </CheckboxLabel>
                                                </Checkbox>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='lg' className='text-zinc-500'>Drugs Suspicion</Text>
                                                <Checkbox size='md'
                                                    value='Fatal'
                                                    onChange={() => toggleDrugs()}
                                                >
                                                    <CheckboxIndicator size='md'
                                                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                                                    >
                                                        {
                                                            checkDrugs ? (
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
                                                        Drugs Suspicion
                                                    </CheckboxLabel>
                                                </Checkbox>
                                            </VStack>

                                            <VStack className='mt-4'>
                                                <Text size='xl' className='text-zinc-500'>Seatbelt State</Text>
                                                <Select
                                                    onValueChange={setSelectSeatbelt}
                                                    selectedValue={selectSeatbelt}
                                                >
                                                    <SelectTrigger>
                                                        <SelectInput placeholder={ seatbeltOptions[0].label } placeholderTextColor={'#000'} />
                                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                                    </SelectTrigger>
                                                    <SelectPortal>
                                                        <SelectContent className='shadow-soft-3'>
                                                            { seatbeltOptions.map((option) => (
                                                                <SelectItem
                                                                    className='text-black font-medium'
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
                                                <Text size='xl' className='text-zinc-500'>Helment State</Text>
                                                <Select
                                                    onValueChange={setSelectHelment}
                                                    selectedValue={selectHelment}
                                                >
                                                    <SelectTrigger>
                                                        <SelectInput placeholder={ seatbeltOptions[0].label } placeholderTextColor={'#000'} />
                                                        <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                                    </SelectTrigger>
                                                    <SelectPortal>
                                                        <SelectContent className='shadow-soft-3'>
                                                            { seatbeltOptions.map((option) => (
                                                                <SelectItem
                                                                    className='text-black font-medium'
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
                                                <Text size='xl' className='text-zinc-500'>Hospital</Text>
                                                <Input
                                                    className='w-full bg-white border-outline-100 border-2 p-2'
                                                    variant='underlined'
                                                >
                                                    <InputField
                                                        onChangeText={setInputHospital}
                                                        value={inputHospital}
                                                        placeholder=''
                                                    />
                                                </Input>
                                            </VStack>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))
                        )
                    }
                </Box>

                <Button className='h-fit bg-zinc-300 p-4' onPress={addButton}>
                    <ButtonText className='text-black'>
                        ADD A MINOR
                    </ButtonText>
                </Button>
            </ScrollView>
        </GluestackUIProvider>
    )
}