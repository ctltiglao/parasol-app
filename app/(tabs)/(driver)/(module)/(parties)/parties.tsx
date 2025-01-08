import '@/global.css';
// react native
import React, { useState } from 'react';
// expo
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalBackdrop } from '@/components/ui/modal';
import OverviewScreen from './(overview)/overview';
import AdultsScreen from './(adults)/adults';
import MinorsScreen from './(minors)/minors';
import PhotoScreen from './(photos)/photos';

export default function PartiesScreen() {
    const [ isButton, setButton ] = useState<String[]>([]);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ isOverlayOverview, setOverlayOverview ] = useState(true);
    const [ isOverlayAdults, setOverlayAdults ] = useState(false);
    const [ isOverlayMinors, setOverlayMinors ] = useState(false);
    const [ isOverlayPhotos, setOverlayPhotos ] = useState(false);

    const addButton = () => {
        setButton([...isButton, `Party ${isButton.length + 1}`]);
    }

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const toggleOverlayOverview = () => {
        setOverlayOverview(!isOverlayOverview);
        setOverlayAdults(false);
        setOverlayMinors(false);
        setOverlayPhotos(false);
    }

    const toggleOverlayAdults = () => {
        setOverlayOverview(false);
        setOverlayAdults(!isOverlayAdults);
        setOverlayMinors(false);
        setOverlayPhotos(false);
    }

    const toggleOverlayMinors = () => {
        setOverlayOverview(false);
        setOverlayAdults(false);
        setOverlayMinors(!isOverlayMinors);
        setOverlayPhotos(false);
    }

    const toggleOverlayPhotos = () => {
        setOverlayOverview(false);
        setOverlayAdults(false);
        setOverlayMinors(false);
        setOverlayPhotos(!isOverlayPhotos);
    }

    return (
        <GluestackUIProvider mode='light'>
            <Box  className='flex-1 w-full h-full'>
                <Box className='w-full h-fit'>
                    {
                        isButton.length > 0 && (
                            isButton.map((label, index) => (
                                <Button
                                    key={index}
                                    className='bg-white justify-start p-4'
                                    onPress={() => openModal()}
                                >
                                    <ButtonText className='text-zinc-500'>{label}</ButtonText>
                                </Button>
                            ))
                        )
                    }
                </Box>
                <Button className='bg-zinc-300 p-4' onPress={addButton}>
                    <ButtonText className='text-black'>
                        ADD A PARTY
                    </ButtonText>
                </Button>

                <Modal
                    className='w-full h-full p-4 shadow-hard-2'
                    isOpen={modalVisible}
                    onClose={closeModal}
                >
                    <ModalContent className='bg-white w-full h-full p-0 rounded-none'>
                        <ModalHeader className='bg-white w-full'>
                            <Button className={ isOverlayOverview
                                ? 'bg-white p-4 border-b-2 border-custom-secondary'
                                : 'bg-white p-4'
                            }
                            onPress={() => toggleOverlayOverview()}>
                                <ButtonText className='text-black'>OVERVIEW</ButtonText>
                            </Button>

                            <Button className={ isOverlayAdults
                                ? 'bg-white p-4 border-b-2 border-custom-secondary'
                                : 'bg-white p-4'
                            }
                            onPress={() => toggleOverlayAdults()}>
                                <ButtonText className='text-black'>ADULTS</ButtonText>
                            </Button>

                            <Button className={ isOverlayMinors
                                ? 'bg-white p-4 border-b-2 border-custom-secondary'
                                : 'bg-white p-4'
                            }
                            onPress={() => toggleOverlayMinors()}>
                                <ButtonText className='text-black'>MINORS</ButtonText>
                            </Button>

                            <Button className={ isOverlayPhotos
                                ? 'bg-white p-4 border-b-2 border-custom-secondary'
                                : 'bg-white p-4'
                            }
                            onPress={() => toggleOverlayPhotos()}>
                                <ButtonText className='text-black'>PHOTOS</ButtonText>
                            </Button>
                        </ModalHeader>
                        <ModalBody className='bg-white'>
                            {(() => {
                                if (isOverlayOverview) {
                                    return <OverviewScreen />
                                } else if (isOverlayAdults) {
                                    return <AdultsScreen />
                                } else if (isOverlayMinors) {
                                    return <MinorsScreen />
                                } else if (isOverlayPhotos) {
                                    return <PhotoScreen />
                                }
                            })()}
                        </ModalBody>
                        <ModalFooter className='bg-white p-4'>
                            <Button
                                className='bg-zinc-300 p-3 rounded-sm'
                                onPress={() => closeModal()}
                            >
                                <ButtonText className='text-black'>CLOSE</ButtonText>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </GluestackUIProvider>
    )
}