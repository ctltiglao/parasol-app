import '@/global.css';
// react native
import React, { useEffect, useState } from "react";
import { Text } from 'react-native';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import WebView from 'react-native-webview';
// expo
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Button, ButtonText } from '@/components/ui/button';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@/components/ui/modal';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';

export default function QuickTourScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const toggleCheckbox = () => setSelectedCheckboxes(!selectedCheckboxes);

    useEffect(() => {
        console.log(selectedCheckboxes);
        openModal();
    });

    return (
        <GluestackUIProvider mode='light'>
            <Modal
                className='h-screen p-14'
                isOpen={modalVisible}
                onClose={closeModal}
            >
                <ModalContent className='w-full h-full'>
                    <ModalBody>
                        <WebView source={{ uri: 'https://www.safetravelph.org/quick-tour' }}/>
                    </ModalBody>
                    <ModalFooter>
                        <Checkbox size='md'
                            className='bg-white border-custom-secondary border-2 rounded-md p-2'
                            value='Do not show again'
                            onChange={() => toggleCheckbox()}
                        >
                            <CheckboxIndicator size='md'
                                className='border-zinc-300 bg-transparent border-1 rounded-md'
                            >
                                {
                                    selectedCheckboxes ? (
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
                            <CheckboxLabel size='md' className='text-black font-medium'>
                                Do not show again
                            </CheckboxLabel>
                        </Checkbox>

                        <Button className='bg-transparent me-4'
                            onPress={closeModal}
                        >
                            <ButtonText className='text-custom-secondary'>CANCEL</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </GluestackUIProvider>
    );
}