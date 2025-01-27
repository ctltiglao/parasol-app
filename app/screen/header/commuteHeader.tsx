import '@/global.css';
// react native
import React, { useEffect, useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import WebView from 'react-native-webview';
// expo
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// gluestack
import { Box } from '@/components/ui/box';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@/components/ui/modal';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';

export default function CommuteHeader({ navigation, route, options, openModal } : any) {
    const [menuVisible, setMenuVisible] = useState(false);
    const nav: any = useNavigation();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleMenuItemClick = () => {
        closeMenu();
    };

    const tripOptions = [
        { id: 1, label: 'Commute History', value: '1', onPress: () => {
            nav.navigate('History');
            handleMenuItemClick();
        } },
        { id: 2, label: 'Quick Tour', value: '2',onPress: () => {
            openModal();
            handleMenuItemClick();
        } },
        { id: 3, label: 'Settings', value: '3', onPress: () => {
            nav.navigate('Settings');
            handleMenuItemClick();
        } },
    ]
    
    return(
        <Box className='flex-row bg-custom-primary justify-between items-center pt-14 ps-4 pb-4'>
            <Ionicons
                name='menu'
                size={25}
                color='#0038A8'
                onPress={() => nav.dispatch(DrawerActions.toggleDrawer())}
            />
            
            <Heading className='text-custom-secondary'>
                Parasol Fleet
            </Heading>

            <Menu
                isOpen={menuVisible}
                onClose={closeMenu}
                className='bg-custom-primary'
                offset={5}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} onPress={openMenu} className='bg-transparent'>
                            <Ionicons name='ellipsis-vertical' size={25} color='#0038A8' />
                        </Button>
                    )
                }}
            >
                { tripOptions.map((options: any) => (
                    <MenuItem key={options.id} textValue={options.value} onPress={options.onPress}>
                        <MenuItemLabel bold={true}>{options.label}</MenuItemLabel>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

const QuickTour = () => {
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
        <Modal
            className='h-screen p-4'
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
    )
}