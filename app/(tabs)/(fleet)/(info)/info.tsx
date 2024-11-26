import { useState } from 'react';
import '@/global.css';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

import { CameraView } from 'expo-camera';

import { StyleSheet, Text, View } from 'react-native';
import { getCameraPermissions } from '../../(trip)/(info)/infoViewModel';
import { clearSelection } from './infoViewModel';

export default function FleetInfo({handleFabAction} : any) {
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const [scanned, setScanned] = useState(false);
    const [inputRoute, setInputRoute] = useState('');
    const [inputId, setInputId] = useState('');
    const [inputDescription, setInputDescription] = useState('');

    // camera permission
    getCameraPermissions();

    // set qrcode scanner overlay
    // open qrcode scanner
    const toggleOverlay = () => setOverlayVisible(!isOverlayVisible);
    const handleOverlay = () => {
        toggleOverlay();
    }

    const handleQRCodeScanned = ({ data }: any) => {
        setScanned(true);

        const patternRoute = /Route:(.*?)\*\*\*/;
        const patternOperator = /Operator:(.*?)\*\*\*/;
        const patternPlate = /Plate:(.*?)\*\*\*/;
        
        const matchRoute = data.match(patternRoute);
        const matchOperator = data.match(patternOperator);
        const matchPlate = data.match(patternPlate);

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

        setInputDescription(data);
        handleOverlay();
    }

    const FleetInfo = () => {
        return (
            <Box className='p-4 bg-white'>
                <Box className='flex-row w-full justify-between'>
                    <Button
                        style={{ borderRadius: 3 }}
                        className='bg-typography-gray p-2'
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
                        style={{ borderRadius: 3 }}
                        className='bg-typography-gray p-2 left-0'
                        onPress={handleFabAction}
                    >
                        <ButtonText className='text-black text-lg font-medium'>
                            CLOSE
                        </ButtonText>
                    </Button>
                </Box>
    
                <Box className='flex-col mt-4 h-screen'>
                    <Text className='mt-4'>
                        Scan the LTFRB QR Code of the PUV.
                    </Text>
    
                    <Box className='justify-center items-center mt-4'>
                        <Button
                            className='w-[110] h-[110] bg-typography-gray'
                            onPress={
                                setScanned ? (
                                    () => {
                                        setScanned(false);
                                        handleOverlay();
                                    }
                                ) : (
                                    () => handleOverlay()
                                )
                            }
                        >
                            <ButtonText className='text-black text-lg font-medium text-center'>
                                SCAN QR CODE
                            </ButtonText>
                        </Button>
                    </Box>
    
                    <Box className='flex-col mt-4'>
                        <Input isDisabled={true} className='border-custom-secondary border-2 p-1 rounded-md'>
                            <InputField
                                value={inputRoute}
                                onChangeText={setInputRoute}
                                className= {
                                    inputRoute
                                    ? 'text-black text-lg font-medium'
                                    : 'text-zinc-700 text-lg font-medium'
                                }
                                placeholder='Route'
                            />
                        </Input>
    
                        <Input isDisabled={true} className='border-custom-secondary border-2 p-1 mt-3 rounded-md'>
                            <InputField
                                value={inputId}
                                onChangeText={setInputId}
                                className= {
                                    inputRoute
                                    ? 'text-black text-lg font-medium'
                                    : 'text-zinc-700 text-lg font-medium'
                                }
                                placeholder='Vehicle ID'
                            />
                        </Input>
    
                        <Textarea isDisabled={true} className='border-custom-secondary border-2 h-[30%] mt-3 rounded-md'>
                            <TextareaInput
                                value={inputDescription}
                                onChangeText={setInputDescription}
                                className= {
                                    inputDescription
                                    ? 'text-black text-lg font-medium'
                                    : 'text-zinc-700 text-lg font-medium'
                                }
                                placeholder='Vehicle Details'
                            />
                        </Textarea>

                        <Button className='p-4 bg-custom-secondary mt-5'>
                            <ButtonText className='text-white text-lg font-bold'>
                                SET FLEET INFO
                            </ButtonText>
                        </Button>
                    </Box>
            </Box>
        </Box>
        )
    }

    const FleetScanner = () => {
        return (
            <View className='flex-1'>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleQRCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'pdf417'],
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }

    return (
        <>
            {
                isOverlayVisible ? (
                    <FleetScanner />
                ) : (
                    <FleetInfo />
                )
            }
        </>
    )
}