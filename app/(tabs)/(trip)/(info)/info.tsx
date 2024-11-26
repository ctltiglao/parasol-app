import '@/global.css';
import { useCallback, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Select, SelectInput, SelectPortal, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

import { MaterialIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';

import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GooglePlacesAutocomplete, PlaceDetails, PlacesError } from 'expo-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { clearSelection, getCameraPermissions, purposeSelectChange, modeSelectChange } from './infoViewModel';
import { GOOGLE_PLACES_API_KEY, modeOptions, purposeOptions } from '@/assets/values/strings';

// navigator.geolocation = require('@react-native-community/geolocation');
// navigator.geolocation = require('react-native-geolocation-service');

export default function TripInfo({ handleAction } : any) {
    crypto.getRandomValues(new Uint8Array(16));

    // qrcode scanner overlay state
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    // text input states
    const [ inputOrigin, setInputOrigin ] = useState('');
    const [ inputDestination, setInputDestination ] = useState('');
    const [ selectedPurpose, setSelectedPurpose ] = useState<string | undefined>(undefined);
    const [ selectedMode, setSelectedMode ] = useState<string | undefined>(undefined);
    const [scanned, setScanned] = useState(false);
    const [ inputId, setInputId ] = useState('');
    const [ inputDescription, setInputDescription ] = useState('');

    // camera permission for qrcode scanner
    getCameraPermissions();

    // const onSearchError = useCallback((error: PlacesError) => {
    //     console.warn(error);
    // }, []);

    // const onPlaceSelected = useCallback((place: PlaceDetails) => {
    //     console.warn(place);
    // }, []);

    // set qrcode scanner overlay
    const toggleOverlay = () => setIsOverlayVisible(!isOverlayVisible);

    // open qrcode scanner
    const handleOverlay = () => {
        toggleOverlay();
    }

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
        handleOverlay();
    }

    const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

    const TripInfo = () => {
        return (
            <Box className='flex-1 bg-white p-4'>
                    {/* <GooglePlacesAutocomplete
                        placeholder='Trip Origin'
                        onPress={(data, details = null) => {
                            console.warn(data, details);
                        }}
                        query={{
                            key: 'AIzaSyBQPXxy1h4qcW2JOxfb3bm2jz039kUNN0E',
                            language: 'en',
                            components: 'country:ph',
                        }}
                        predefinedPlaces={[homePlace, workPlace]}
                    /> */}

                    {/* <GooglePlacesAutocomplete
                        apiKey='AIzaSyBQPXxy1h4qcW2JOxfb3bm2jz039kUNN0E'
                        requestConfig={{ countries: ['PH'] }}
                        onSearchError={onSearchError}
                        onPlaceSelected={onPlaceSelected}
                    /> */}

                <Box className='flex-row w-full justify-between'>
                    <Button
                        className='bg-typography-gray p-2 border-1 rounded-md'
                        onPress={() => clearSelection({
                            setInputOrigin,
                            setInputDestination,
                            setSelectedPurpose,
                            setSelectedMode,
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
                        className='bg-typography-gray p-2 border-1 rounded-md'
                        onPress={handleAction}
                    >
                        <ButtonText className='text-black text-lg font-medium'>
                            CLOSE
                        </ButtonText>
                    </Button>
                </Box>
    
                <Box className='flex-col mt-4 bg-white'>
                    <Input className='bg-white border-2 border-custom-secondary focus:border-custom-secondary rounded-md'>
                        <InputField
                            value={inputOrigin}
                            onChangeText={setInputOrigin}
                            className='text-zinc-700 text-lg font-medium p-2'
                            placeholder='Trip Origin'
                        />
                    </Input>
                    <Box className='flex-[0.5]'>
                        <GooglePlacesAutocomplete
                            placeholder='Trip Origin'
                            onPress={(data, details = null) => {
                                console.warn(data, details);
                            }}
                            query={{
                                key: GOOGLE_PLACES_API_KEY,
                                language: 'en'
                            }}
                            fetchDetails={true}
                            onFail={err => console.warn(err)}
                            listEmptyComponent={() => (
                                <Box className='flex-1 justify-center items-center'>
                                    <Text>No results</Text>
                                </Box>
                            )}
                        />
                    </Box>

                    <Input className='bg-white mt-3 border-2 border-custom-secondary focus:border-custom-secondary rounded-md'>
                        <InputField
                            value={inputDestination}
                            onChangeText={setInputDestination}
                            className='text-zinc-700 text-lg font-medium p-2'
                            placeholder='Trip Dest'
                        />
                    </Input>
                    
                    <Select
                        selectedValue={selectedPurpose}
                        onValueChange={() => purposeSelectChange({setSelectedPurpose})}
                    >
                        <SelectTrigger className='bg-white mt-3 border-2 border-custom-secondary focus:border-custom-secondary rounded-md'>
                            <SelectInput
                                className={ selectedPurpose
                                    ? 'text-black text-lg font-medium p-2'
                                    : 'text-zinc-700 text-lg font-medium p-2'
                                }
                                placeholder='Trip Purpose'
                            />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent>
                                {purposeOptions.map((option) => (
                                    <SelectItem
                                        className='text-black text-lg font-medium'
                                        key={option.id}
                                        label={option.label}
                                        value={option.value}
                                    />
                                ))}
                            </SelectContent>
                        </SelectPortal>
                    </Select>
    
                    <Select
                        selectedValue={selectedMode}
                        onValueChange={() => modeSelectChange({setSelectedMode})}
                    >
                        <SelectTrigger className='bg-white mt-3 border-2 border-custom-secondary focus:border-custom-secondary rounded-md'>
                            <SelectInput
                                className={ selectedMode
                                    ? 'text-black text-lg font-medium p-2'
                                    : 'text-zinc-700 text-lg font-medium p-2'
                                }
                                placeholder='Trip Mode'
                            />
                        </SelectTrigger>
                        <SelectPortal className='justify-center'>
                            <Box className='h-2/4 p-4'>
                                <ScrollView>
                                    <SelectContent>
                                        {modeOptions.map((option) => (
                                            <SelectItem
                                                className='text-black text-lg font-medium'
                                                key={option.id}
                                                label={option.label}
                                                value={option.value}
                                            />
                                        ))}
                                    </SelectContent>
                                </ScrollView>
                            </Box>
                        </SelectPortal>
                    </Select>
    
                    <Box className='flex-row mt-3 items-center w-full'>
                        <Input isDisabled={true} className='bg-white w-11/12 border-2 border-custom-secondary rounded-md'>
                            <InputField
                                value={inputId}
                                onChangeText={setInputId}
                                className={ inputId ? 'text-black text-lg font-medium p-2' : 'text-zinc-700 text-lg font-medium p-2' }
                                placeholder='Vehicle ID'
                            />
                        </Input>
    
                        <MaterialIcons name='qr-code-scanner' size={30} color='black'
                            onPress={
                                setScanned ? (
                                    () => {
                                        setScanned(false);
                                        handleOverlay();
                                    }
                                ) : (
                                    () =>{ handleOverlay(); }
                                )
                            }
                        />
                    </Box>
    
                    <Textarea isDisabled={true}  className='bg-white mt-3 border-2 border-custom-secondary rounded-md h-[30%]'>
                        <TextareaInput
                            value={inputDescription}
                            onChangeText={setInputDescription}
                            className={ inputDescription ? 'text-black text-lg font-medium p-2' : 'text-zinc-700 text-lg font-medium p-2' }
                            placeholder='Vehicle Details'
                        />
                    </Textarea>
    
                    <Button className='p-4 bg-custom-secondary mt-5'>
                        <ButtonText className='text-white text-lg font-bold'>
                            SET TRIP INFO
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
                    <TripScanner />
                ) : (
                    <TripInfo />
                )
            }
        </>
    );
}