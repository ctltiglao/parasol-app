import '@/global.css';
// react native
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
// expo
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
// gluestack
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
// import { Select, SelectInput, SelectPortal, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

import { clearSelection, getCameraPermissions, saveCommuteDetails } from './infoViewModel';

export default function TripInfo({ handleAction, rate } : any) {
    // text input states
    // const [ inputOrigin, setInputOrigin ] = useState('');
    // const [ inputDestination, setInputDestination ] = useState('');
    // const [ selectedPurpose, setSelectedPurpose ] = useState<string | undefined>(undefined);
    // const [ selectedMode, setSelectedMode ] = useState<string | undefined>(undefined);
    const [scanned, setScanned] = useState(false);
    const [ inputId, setInputId ] = useState('');
    const [ inputDescription, setInputDescription ] = useState('');

    // camera permission for qrcode scanner
    useEffect(() => {
        console.log(rate);

        getCameraPermissions();
    }, []);

    // overlay camera
    const [isCameraOverlay, setIsCameraOverlay] = useState(false);
    const toggleCameraOverlay = () => setIsCameraOverlay(!isCameraOverlay);

    // qrcode scanner result
    // close camer when result is set
    const handleQRCodeScanned = ({ data }: any) => {
        setScanned(true);
        
        const pattern =/Plate:(.*?)\*\*\*/;
        const match = data.match(pattern);

        if (match) {
            const extractedText = match[1];
            setInputId(extractedText);
        }

        setInputDescription(data);
        toggleCameraOverlay();
    }

    const TripInfo = () => {
        return (
            <Box className='bg-white flex-1 p-4'>
                <HStack className='w-full justify-between'>
                    <Button
                        className='h-fit bg-typography-gray p-2 border-1 rounded-md'
                        onPress={() => clearSelection({
                            // setInputOrigin,
                            // setInputDestination,
                            // setSelectedPurpose,
                            // setSelectedMode,
                            setScanned,
                            setInputId,
                            setInputDescription
                        })}
                    >
                        <ButtonText className='text-black text-lg font-medium'>
                            CLEAR
                        </ButtonText>
                    </Button>
    
                    <Button
                        className='h-fit bg-typography-gray p-2 border-1 rounded-md'
                        onPress={handleAction}
                    >
                        <ButtonText className='text-black text-lg font-medium'>
                            CLOSE
                        </ButtonText>
                    </Button>
                </HStack>
    
                <Box className='flex-col mt-4'>
                    <HStack className='w-full items-center mt-6'>
                        <Input isDisabled={true}
                            className='bg-white w-11/12 border-2 border-custom-secondary rounded-md'
                        >
                            <InputField
                                value={inputId}
                                onChangeText={setInputId}
                                className={'text-lg font-medium p-2' + 
                                    inputId ? 'text-black' : 'text-zinc-700'}
                                placeholder='Vehicle ID'
                            />
                        </Input>
    
                        <MaterialCommunityIcons
                            name='qrcode-scan'
                            size={30}
                            color='black'
                            className='p-2'
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
                        />
                    </HStack>
    
                    <Textarea isDisabled={true}
                        className='bg-white mt-3 border-2 border-custom-secondary rounded-md h-[30%]'
                    >
                        <TextareaInput
                            value={inputDescription}
                            onChangeText={setInputDescription}
                            className={'text-lg font-medium p-2' +
                                inputDescription ? 'text-black' : 'text-zinc-700'}
                            placeholder='Vehicle Details'
                        />
                    </Textarea>
    
                    <Button className='bg-custom-secondary h-fit mt-5 p-4'
                        onPress={async () => {
                            const res = await saveCommuteDetails({
                                vehicleId: inputId,
                                vehicleDescription: inputDescription,
                                rate: rate
                            });

                            res && Alert.alert('Connected');
                        }}
                    >
                        <ButtonText className='text-white text-lg font-bold'>
                            SET COMMUTE INFO
                        </ButtonText>
                    </Button>
                </Box>
            </Box>
        )
    }

    const TripScanner = () => {
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
                    <TripScanner />
                ) : (
                    <TripInfo />
                )
            }
        </>
    );
}