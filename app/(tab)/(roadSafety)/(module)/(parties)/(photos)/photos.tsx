import '@/global.css';
// react native
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
// expo
import * as ImagePicker from 'expo-image-picker';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';

export default function PhotoScreen() {
    const [ selectPhoto, setSelectedPhoto ] = useState<string[]>([]);

    const getPhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access media library was denied');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            const uris = result.assets.map((asset) => asset.uri);
            setSelectedPhoto((prev) => [...prev, ...uris]);
        }
    }

    return (
        <GluestackUIProvider>
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <Box className='w-full h-fit'>
                    <Button
                        className='bg-zinc-300 w-1/2 p-4 rounded-sm'
                        onPress={() => getPhoto()}
                    >
                        <ButtonText className='text-black'>
                            SELECT PHOTOS
                        </ButtonText>
                    </Button>

                    {
                        selectPhoto.map ((uri, index) => (
                            <Image
                                key={index}
                                source={{ uri }}
                                className='w-full h-96'
                            />
                        ))
                    }
                </Box>
            </ScrollView>
        </GluestackUIProvider>
    )
}