import '@/global.css';
// react native
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
// expo
import { CameraView } from 'expo-camera';
// gluestack
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

import { getCameraPermissions } from '../../(commute)/(info)/infoViewModel';
import { clearSelection, saveFleetDetails } from './infoViewModel';

export default function FleetInfo({handleAction} : any) {
    const [scanned, setScanned] = useState(false);
    const [inputRoute, setInputRoute] = useState('');
    const [inputId, setInputId] = useState('');
    const [inputDescription, setInputDescription] = useState('');

    const [capacity, setCapacity] = useState(null);

    // camera permission
    getCameraPermissions();

    // set qrcode scanner overlay
    // open qrcode scanner
    const [isCameraOverlay, setIsCameraOverlay] = useState(false);
    const toggleCameraOverlay = () => setIsCameraOverlay(!isCameraOverlay);

    const handleQRCodeScanned = ({ data }: any) => {
        setScanned(true);

        const patternRoute = /Route:(.*?)\*\*\*/;
        const patternOperator = /Operator:(.*?)\*\*\*/;
        const patternPlate = /Plate:(.*?)\*\*\*/;
        const patternCapacity = /Capacity:\s*(\d+)/;
        
        const matchRoute = data.match(patternRoute);
        const matchOperator = data.match(patternOperator);
        const matchPlate = data.match(patternPlate);
        const matchCapacity = data.match(patternCapacity);

        if (matchRoute) {
            const extractedText = matchRoute[1];
            setInputRoute(extractedText);
        }

        if (matchOperator) {
            if (matchPlate) {
                const extractedOperator = matchOperator[1];
                const extractedPlate = matchPlate[1];
                
                const extractedText = `${extractedOperator}/${extractedPlate}`;
                setInputId(extractedText);
            }
        }

        if (matchCapacity) {
            const extractedText = matchCapacity[1];
            setCapacity(extractedText);
        }

        setInputDescription(data);
        toggleCameraOverlay();
    }

    const FleetInfo = () => {
        return (
            <Box className='flex-1 p-4 bg-white'>
                <HStack className='w-full justify-between'>
                    <Button
                        className='bg-typography-gray h-fit rounded-md p-3'
                        onPress={() => {
                            clearSelection({
                                setScanned,
                                setInputRoute,
                                setInputId,
                                setInputDescription
                            })
                        }}
                    >
                        <ButtonText className='text-black text-lg font-medium'>
                            CLEAR
                        </ButtonText>
                    </Button>
    
                    <Button
                        className='bg-typography-gray h-fit rounded-md p-3'
                        onPress={handleAction}
                    >
                        <ButtonText className='text-black text-lg font-medium'>
                            CLOSE
                        </ButtonText>
                    </Button>
                </HStack>
    
                <VStack className='mt-4'>
                    <Text className='mt-4'>
                        Scan the LTFRB QR Code of the PUV.
                    </Text>
    
                    <Box className='justify-center items-center mt-4'>
                        <Button
                            className='bg-typography-gray w-[110] h-[110] rounded-none'
                            onPress={
                                setScanned ? (
                                    () => {
                                        setScanned(false);
                                        toggleCameraOverlay();
                                    }
                                ) : (
                                    () => toggleCameraOverlay()
                                )
                            }
                        >
                            <ButtonText className='text-black text-lg font-medium text-center'>
                                SCAN QR CODE
                            </ButtonText>
                        </Button>
                    </Box>
    
                    <VStack className='mt-4'>
                        <Input isDisabled={true} className='border-custom-secondary border-2 rounded-md'>
                            <InputField
                                value={inputRoute}
                                onChangeText={setInputRoute}
                                className= {'text-lg font-medium' +
                                    inputRoute
                                    ? 'text-black'
                                    : 'text-zinc-700'
                                }
                                placeholder='Route'
                            />
                        </Input>
    
                        <Input isDisabled={true} className='border-custom-secondary border-2 mt-3 rounded-md'>
                            <InputField
                                value={inputId}
                                onChangeText={setInputId}
                                className= {'text-lg font-medium' +
                                    inputRoute
                                    ? 'text-black'
                                    : 'text-zinc-700'
                                }
                                placeholder='Vehicle ID'
                            />
                        </Input>
    
                        <Textarea isDisabled={true} className='border-custom-secondary border-2 h-[30%] mt-3 rounded-md'>
                            <TextareaInput
                                value={inputDescription}
                                onChangeText={setInputDescription}
                                className= {'text-lg font-medium' +
                                    inputRoute
                                    ? 'text-black'
                                    : 'text-zinc-700'
                                }
                                placeholder='Vehicle Details'
                            />
                        </Textarea>

                        <Button className='h-fit p-4 bg-custom-secondary mt-5'
                            onPress={async () => {
                                const res = await saveFleetDetails({
                                    route: inputRoute,
                                    vehicleId: inputId,
                                    vehicleDetails: inputDescription,
                                    capacity: capacity
                                })

                                res && Alert.alert('', 'Connected');
                            }}
                        >
                            <ButtonText className='text-white text-lg font-bold'>
                                SET FLEET INFO
                            </ButtonText>
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        )
    }

    const FleetScanner = () => {
        return (
            <View className='flex-1'>
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    onBarcodeScanned={scanned ? undefined : handleQRCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'pdf417'],
                    }}
                />
            </View>
        );
    }

    return (
        <>
            {
                isCameraOverlay ? (
                    <FleetScanner />
                ) : (
                    <FleetInfo />
                )
            }
        </>
    )
}