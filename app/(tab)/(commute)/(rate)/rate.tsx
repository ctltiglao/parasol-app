import '@/global.css';
// react native
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
// expo
import { MaterialIcons } from '@expo/vector-icons';
import * as Device from 'expo-device';
// gluestack
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { RadioGroup, RadioIndicator, Radio, RadioLabel } from '@/components/ui/radio';

import { handleRating, publishRating } from './rateViewModel';
import { getUserState } from '../../tabViewModel';
import { getCommuteDetails } from '../commuteViewModel';
import { HStack } from '@/components/ui/hstack';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

export default function TripRate({ handleAction, location } : any) {
    const smileys = [
        { id: 1, name: 'sentiment-very-dissatisfied', value: 'Terrible', colorSelect: '#CC5500', colorUnselect: 'gray' },
        { id: 2, name: 'sentiment-dissatisfied', value: 'Bad', colorSelect: '#FCD116', colorUnselect: 'gray' },
        { id: 3, name: 'sentiment-neutral', value: 'Okay', colorSelect: '#FCD116', colorUnselect: 'gray' },
        { id: 4, name: 'sentiment-satisfied-alt', value: 'Good', colorSelect: '#FCD116', colorUnselect: 'gray' },
        { id: 5, name: 'sentiment-very-satisfied', value: 'Great', colorSelect: '#FCD116', colorUnselect: 'gray' },
    ]

    const [isSelectedCondition, setIsSelectedCondition] = useState(null);
    const [isSelectedComfort, setIsSelectedComfort] = useState(null);
    const [isSelectedAdequacy, setIsSelectedAdequacy] = useState(null);
    const [isSelectedStop, setIsSelectedStop] = useState(null);
    const [isSelectedInfo, setIsSelectedInfo] = useState(null);
    const [isSelectedAvailable, setIsSelectedAvailable] = useState(null);
    const [isSelectedRoute, setIsSelectedRoute] = useState(null);
    const [isSelectedOverall, setIsSelectedOverall] = useState(null);
    const [inputComment, setInputComment] = useState('');

    // const [ locationSubscription, setLocationSubscription ] = useState<Location.LocationSubscription|null>(null);
    // const [ location, setLocation ] = useState<any|null>(null);
    const [ vehicleId, setVehicleId ] = useState('');
    const [ vehicleDescription, setVehicleDescription ] = useState('');
    const [ username, setUsername ] = useState('');

    const toggleSelectedCondition = (value: any) => setIsSelectedCondition(value);
    const toggleSelectedComfort = (value: any) => setIsSelectedComfort(value);
    const toggleSelectedAdequacy = (value: any) => setIsSelectedAdequacy(value);
    const toggleSelectedStop = (value: any) => setIsSelectedStop(value);
    const toggleSelectedInfo = (value: any) => setIsSelectedInfo(value);
    const toggleSelectedAvailable = (value: any) => setIsSelectedAvailable(value);
    const toggleSelectedRoute = (value: any) => setIsSelectedRoute(value);
    const toggleSelectedOverall = (value: any) => setIsSelectedOverall(value);

    // const getLocation = async() => {
    //     if (!locationSubscription) {
    //         const locSubscription = await Location.watchPositionAsync({
    //             accuracy: Location.Accuracy.High,
    //             timeInterval: 1000,
    //             distanceInterval: 1
    //         }, (newLocation) => {
    //             setLocation(newLocation);
    //         });
    
    //         setLocationSubscription(locSubscription);
    //     }
    // }
    
    useEffect(() => {
        getUserState().then((response) => {
            setUsername(response.username);
        });
    
        getCommuteDetails().then((response) => {
            setVehicleId(response.vehicleId);
            setVehicleDescription(response.vehicleDescription);
        })

        // getLocation();
    }, [])

    return (
        <Box className='bg-white p-4'>
            <HStack className='w-full justify-between'>
                <Text className='text-xl font-medium'>Please rate your trip.</Text>
                <Button
                    className='h-fit bg-typography-gray p-2 left-0 border-1 rounded-md'
                    onPress={handleAction}
                >
                    <ButtonText className='text-black text-lg font-medium'>
                        CLOSE
                    </ButtonText>
                </Button>
            </HStack>

            <Box className='mt-4 mb-20 pl-6 pr-6'>
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    <VStack className='mt-1'>
                        <Text size='md'>1. Vehicle condition</Text>
                        <RadioGroup onChange={toggleSelectedCondition} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedCondition === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedCondition === smiley.value ? 45 : 40 }
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </VStack>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </VStack>

                    <VStack className='mt-2'>
                        <Text size='md'>2. Ride comfort</Text>
                        <RadioGroup onChange={toggleSelectedComfort} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedComfort === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedComfort === smiley.value ? 45 : 40 }
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </VStack>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </VStack>

                    <VStack className='mt-2'>
                        <Text size='md'>3. Service adequacy</Text>
                        <RadioGroup onChange={toggleSelectedAdequacy} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedAdequacy === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedAdequacy === smiley.value ? 45 : 40 }
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </VStack>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </VStack>

                    <Box className='mt-2'>
                        <Text size='md'>4. Stop accessibility</Text>
                        <RadioGroup onChange={toggleSelectedStop} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <Box>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedStop === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedStop === smiley.value ? 45 : 40 }
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </Box>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </Box>

                    <VStack className='mt-2'>
                        <Text size='md'>5. Information provision</Text>
                        <RadioGroup onChange={toggleSelectedInfo} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedInfo === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedInfo === smiley.value ? 45 : 40 }
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </VStack>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </VStack>

                    <VStack className='mt-2'>
                        <Text size='md'>6. Service availability</Text>
                        <RadioGroup onChange={toggleSelectedAvailable} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedAvailable === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedAvailable === smiley.value ? 45 : 40 }
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </VStack>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </VStack>

                    <VStack className='mt-2'>
                        <Text size='md'>7. Route connectivity</Text>
                        <RadioGroup onChange={toggleSelectedRoute} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedRoute === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedRoute === smiley.value ? 45 : 40 }
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </VStack>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </VStack>

                    <VStack className='mt-4 items-center'>
                        <Text size='lg' className='font-medium'>What is your overall rating?</Text>
                        <RadioGroup onChange={toggleSelectedOverall} className='w-full flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='h-fit w-fit border-transparent bg-transparent border-1'>
                                            <MaterialIcons
                                                color={ isSelectedOverall === smiley.value ? smiley.colorSelect : smiley.colorUnselect }
                                                name={smiley.name as "sentiment-very-dissatisfied" | "sentiment-dissatisfied" | "sentiment-neutral" | "sentiment-satisfied-alt" | "sentiment-very-satisfied"}
                                                size={ isSelectedOverall === smiley.value ? 45 : 40}
                                            />
                                        </RadioIndicator>
                                        <RadioLabel className='ml-2 text-md'>{smiley.value}</RadioLabel>
                                    </VStack>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </VStack>
                
                    <VStack space='md' className='mt-4 mb-32 items-center'>
                        <Textarea className='bg-white border-2 border-custom-secondary rounded-md h-[30%]'>
                            <TextareaInput
                                value={inputComment}
                                onChangeText={setInputComment}
                                className='text-lg font-medium p-2 text-black'
                                placeholder='Comments and suggestions'
                            />
                        </Textarea>

                        <Button
                            className='w-1/2 h-fit p-4 bg-custom-secondary rounded-none'
                            onPress={() => {
                                // if (vehicleId !== '') {
                                    const description = handleRating({
                                        isSelectedCondition,
                                        isSelectedComfort,
                                        isSelectedAdequacy,
                                        isSelectedStop,
                                        isSelectedInfo,
                                        isSelectedAvailable,
                                        isSelectedRoute,
                                        isSelectedOverall,
                                        inputComment
                                    });

                                    console.log(description);

                                    const message = {
                                        deviceId: Device.osBuildId ?? Device.osInternalBuildId ?? '',
                                        lat: location.coords.latitude,
                                        lng: location.coords.longitude,
                                        timestamp: new Date().toISOString(),
                                        userId: username,
                                        description: description,
                                        vehicleId: vehicleId,
                                        vehicleDetails: vehicleDescription
                                    }
                                        
                                    publishRating(message);
                                // } else {
                                //     alert('Please set commute information');
                                // }
                            }}
                        >
                            <ButtonText className='text-white text-lg font-bold'>
                                RATE YOUR TRIP
                            </ButtonText>
                        </Button>
                    </VStack>
                </ScrollView>
            </Box>
        </Box>
    )
}