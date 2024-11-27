import '@/global.css';
// react native
import { useState } from 'react';
import { ScrollView } from 'react-native';
// expo
import { MaterialIcons } from '@expo/vector-icons';
// gluestack
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { RadioGroup, RadioIndicator, Radio, RadioLabel } from '@/components/ui/radio';

import { handleRating } from './rateViewModel';

export default function TripRate({ handleAction } : any) {
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

    const toggleSelectedCondition = (value: any) => setIsSelectedCondition(value);
    const toggleSelectedComfort = (value: any) => setIsSelectedComfort(value);
    const toggleSelectedAdequacy = (value: any) => setIsSelectedAdequacy(value);
    const toggleSelectedStop = (value: any) => setIsSelectedStop(value);
    const toggleSelectedInfo = (value: any) => setIsSelectedInfo(value);
    const toggleSelectedAvailable = (value: any) => setIsSelectedAvailable(value);
    const toggleSelectedRoute = (value: any) => setIsSelectedRoute(value);
    const toggleSelectedOverall = (value: any) => setIsSelectedOverall(value);

    return (
        <Box className='p-4'>
            <Box className='flex-row w-full justify-between'>
                <Text className='text-xl font-medium'>Please rate your trip.</Text>
                <Button
                    className='bg-typography-gray p-2 left-0 border-1 rounded-md'
                    onPress={handleAction}
                >
                    <ButtonText className='text-black text-lg font-medium'>
                        CLOSE
                    </ButtonText>
                </Button>
            </Box>

            <Box className='mt-4 mb-20 pl-6 pr-6'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <VStack className='mt-1'>
                        <Text size='md'>1. Vehicle condition</Text>
                        <RadioGroup onChange={toggleSelectedCondition} className='flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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

                    <VStack className='mt-6 items-center'>
                        <Text size='lg' className='font-medium'>What is your overall rating?</Text>
                        <RadioGroup onChange={toggleSelectedOverall} className='w-full flex-row justify-between pl-4 pr-4'>
                            { smileys.map((smiley) => (
                                <Radio key={smiley.id} value={smiley.value} size='lg'>
                                    <VStack>
                                        <RadioIndicator className='border-transparent bg-transparent border-1'>
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

                    <Box className='items-center mt-5'>
                        <Button
                            className='w-1/2 p-4 bg-custom-secondary'
                            onPress={() => {
                                const description = handleRating({
                                    isSelectedCondition,
                                    isSelectedComfort,
                                    isSelectedAdequacy,
                                    isSelectedStop,
                                    isSelectedInfo,
                                    isSelectedAvailable,
                                    isSelectedRoute,
                                    isSelectedOverall
                                });

                                console.warn(description);

                                alert(description);
                            }}
                        >
                            <ButtonText className='text-white text-lg font-bold'>
                                RATE YOUR TRIP
                            </ButtonText>
                        </Button>
                    </Box>
                </ScrollView>
            </Box>
        </Box>
    )
}