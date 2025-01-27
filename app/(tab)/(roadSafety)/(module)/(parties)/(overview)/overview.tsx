import '@/global.css';
// react native
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
// expo
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectContent, SelectPortal, SelectTrigger, SelectItem, SelectInput } from '@/components/ui/select';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';

import { classificationOptions, loadingOptions, maneuverOptions, vehicleOptions } from '@/assets/values/strings';

export default function OverviewScreen() {
    const [ inputParty, setInputParty ] = useState('Party 1');
    const [ selectClassification, setSelectClassification ] = useState('');
    const [ selectVehicle, setSelectVehicle ] = useState('');
    const [ inputMake, setInputMake ] = useState('');
    const [ inputPlate, setInputPlate ] = useState('');
    const [ inputModel, setInputModel ] = useState('');
    const [ selectManeuver, setSelectManeuver ] = useState('');
    const [ checkDamages, setCheckDamages ] = useState({
        front: false,
        rear: false,
        right: false,
        left: false,
        roof: false
    });
    const [ checkDefects, setCheckDefects ] = useState({
        lights: false,
        brakes: false,
        steering: false,
        tires: false
    })
    const [ selectLoading, setSelectLoading ] = useState('');
    const [ inputInsurance, setInputInsurance ] = useState('');
    const [ inputEngine, setInputEngine ] = useState('');
    const [ inputChassis, setInputChassis ] = useState('');

    const toggleDamages = (damage: any) => {
        setCheckDamages((prev: any) => ({
            ...prev, [damage]: !prev[damage]
        }));
    }

    const toggleDefects = (defect: any) => {
        setCheckDefects((prev: any) => ({
            ...prev, [defect]: !prev[defect]
        }));
    }

    const DamagesCheckbox = () => {
        return (
            <>
                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Front'
                    onChange={() => toggleDamages('front')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDamages.front ? (
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
                        Front
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Rear'
                    onChange={() => toggleDamages('rear')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDamages.rear ? (
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
                        Rear
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Right'
                    onChange={() => toggleDamages('right')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDamages.right ? (
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
                        Right
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox size='md'
                    value='Left'
                    onChange={() => toggleDamages('left')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDamages.left ? (
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
                        Left
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Roof'
                    onChange={() => toggleDamages('roof')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDamages.roof ? (
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
                        Roof
                    </CheckboxLabel>
                </Checkbox>
            </>
        );
    }

    const DefectsCheckbox = () => {
        return (
            <>
                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Lights'
                    onChange={() => toggleDefects('lights')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDefects.lights ? (
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
                        Lights
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Brakes'
                    onChange={() => toggleDefects('brakes')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDefects.brakes ? (
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
                        Brakes
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Steering'
                    onChange={() => toggleDefects('steering')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDefects.steering ? (
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
                        Steering
                    </CheckboxLabel>
                </Checkbox>

                <Checkbox
                    size='md'
                    className='mt-1'
                    value='Tires'
                    onChange={() => toggleDefects('tires')}
                >
                    <CheckboxIndicator size='md'
                        className='border-zinc-300 bg-transparent border-1 rounded-md'
                    >
                        {
                            checkDefects.tires ? (
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
                        Tires
                    </CheckboxLabel>
                </Checkbox>
            </>
        );
    }

    return (
        <GluestackUIProvider>
            <ScrollView
                className='p-4'
                automaticallyAdjustKeyboardInsets={true}
                showsVerticalScrollIndicator={false}
            >
                {/* <Box className='flex-1 w-full h-full'> */}
                    <VStack>
                        <Text size='lg' className='text-zinc-500'>Party Name</Text>
                        <Input
                            className='w-full bg-white border-outline-100 border-2 p-2'
                            variant='underlined'
                        >
                            <InputField
                                onChangeText={setInputParty}
                                value={inputParty ? inputParty : ''}
                                placeholder=''
                            />
                        </Input>
                    </VStack>

                    <VStack className='mt-4'>
                        <Text bold={true} size='2xl' className='text-zinc-500'>Vehicle Details</Text>
                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Classification</Text>
                            <Select
                                onValueChange={setSelectClassification}
                                selectedValue={selectClassification}
                            >
                                <SelectTrigger>
                                    <SelectInput placeholder={ classificationOptions[0].label } placeholderTextColor={'#000'} />
                                    <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                </SelectTrigger>
                                <Box className='bg-custom-primary h-fit'>
                                    <SelectPortal className='h-1/3'>
                                        <SelectContent className='h-fit shadow-soft-3'>
                                            { classificationOptions.map((option) => (
                                                <SelectItem
                                                    className='text-black text-lg font-medium'
                                                    key={option.id}
                                                    label={option.label}
                                                    value={option.value}
                                                />
                                            )) }
                                        </SelectContent>
                                    </SelectPortal>
                                </Box>
                            </Select>
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Vehicle Type</Text>
                            <Select
                                onValueChange={setSelectVehicle}
                                selectedValue={selectVehicle}
                            >
                                <SelectTrigger>
                                    <SelectInput placeholder={ vehicleOptions[0].label } placeholderTextColor={'#000'} />
                                    <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                </SelectTrigger>
                                <SelectPortal className='h-1/2'>
                                    <ScrollView>
                                        <SelectContent className='shadow-soft-3'>
                                            { vehicleOptions.map((option) => (
                                                <SelectItem
                                                    className='text-black text-lg font-medium'
                                                    key={option.id}
                                                    label={option.label}
                                                    value={option.value}
                                                />
                                            )) }
                                        </SelectContent>
                                    </ScrollView>
                                </SelectPortal>
                            </Select>
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Make</Text>
                            <Input
                                className='w-full bg-white border-outline-100 border-2 p-2'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={setInputMake}
                                    value={inputMake}
                                    placeholder=''
                                />
                            </Input>
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Plate Number</Text>
                            <Input
                                className='w-full bg-white border-outline-100 border-2 p-2'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={setInputPlate}
                                    value={inputPlate}
                                    placeholder=''
                                />
                            </Input>
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Model</Text>
                            <Input
                                className='w-full bg-white border-outline-100 border-2 p-2'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={setInputModel}
                                    value={inputModel}
                                    placeholder=''
                                />
                            </Input>
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Maneuver</Text>
                            <Select
                                onValueChange={setSelectManeuver}
                                selectedValue={selectManeuver}
                            >
                                <SelectTrigger>
                                    <SelectInput placeholder={ maneuverOptions[0].label } placeholderTextColor={'#000'} />
                                    <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectContent className='h-1/2 shadow-soft-3'>
                                        { maneuverOptions.map((option) => (
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
                            <Text size='lg' className='text-zinc-500'>Damages</Text>
                            <DamagesCheckbox />
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Defects</Text>
                            <DefectsCheckbox />
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Loading</Text>
                            <Select
                                onValueChange={setSelectLoading}
                                selectedValue={selectLoading}
                            >
                                <SelectTrigger>
                                    <SelectInput placeholder={ loadingOptions[0].label } placeholderTextColor={'#000'} />
                                    <MaterialCommunityIcons className='absolute right-2' size={24} name='chevron-down' />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectContent className='h-1/2 shadow-soft-3'>
                                        { loadingOptions.map((option) => (
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
                            <Text size='lg' className='text-zinc-500'>Insurance Details</Text>
                            <Input
                                className='w-full bg-white border-outline-100 border-2 p-2'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={setInputInsurance}
                                    value={inputInsurance}
                                    placeholder=''
                                />
                            </Input>
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Engine Number</Text>
                            <Input
                                className='w-full bg-white border-outline-100 border-2 p-2'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={setInputEngine}
                                    value={inputEngine}
                                    placeholder=''
                                />
                            </Input>
                        </VStack>

                        <VStack className='mt-4'>
                            <Text size='lg' className='text-zinc-500'>Chassis Number</Text>
                            <Input
                                className='w-full bg-white border-outline-100 border-2 p-2'
                                variant='underlined'
                            >
                                <InputField
                                    onChangeText={setInputChassis}
                                    value={inputChassis}
                                    placeholder=''
                                />
                            </Input>
                        </VStack>
                    </VStack>
                {/* </Box> */}
            </ScrollView>
        </GluestackUIProvider>
    )
}