import '@/global.css';
// react native
import { useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';
// expo
import { StatusBar } from 'expo-status-bar';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

import String from '@/assets/values/strings';
import { continueAsGuest, getPermissions, useViewModel } from './loginViewModel';

const viewModel = useViewModel();

export default function LoginScreen({ navigation } : { navigation: NavigationProp<any> }) {
  const toRegister = () => {
    navigation.navigate('Register');
  }

  const toTab = () => {
    navigation.navigate('Tab');
  }

  getPermissions();

  return (
    <GluestackUIProvider mode='light'>
      <StatusBar backgroundColor='#FCD116' />
      <Box className='bg-white flex-1'>
          <TopView />
          
          <Box className='w-full items-center justify-center mt-24 flex-col p-4'>
            <Button
              className='bg-custom-primary w-full h-fit p-5 rounded-xl'
              onPress={() => toTab()}
            >
              <ButtonText className='text-black text-lg font-bold'>
                GET STARTED
              </ButtonText>
            </Button>
            
            <Button
              className='bg-white w-full h-fit p-5 border-custom-primary rounded-xl border-2 mt-4'
              onPress={() => toRegister()}
            >
              <ButtonText className='text-black text-sm font-medium'>
                REGISTER AN ORGANIZATION
              </ButtonText>
            </Button>
            
            <Button
              className='bg-white w-full h-fit p-3 rounded-xl mt-4'
              onPress={ async() => {
                await continueAsGuest() && toTab();
              }}
            >
              <ButtonText className='text-gray-500 text-sm font-medium'>
                CONTINUE AS GUEST
              </ButtonText>
            </Button>
          </Box>

          <BottomView />
        </Box>
    </GluestackUIProvider>
  );
}

function TopView() {
  return (
    <Box className='w-full items-center justify-center mt-20 flex-row p-4'>
      <Image size='sm' source={(require('@/assets/icons/stph_72.png'))} alt='logo' />
      <Box className='flex-col ms-3'>
        <Text className='text-custom-customBluegray text-[38px] font-bold' >SafeTravelPH</Text>
        <Text className='text-custom-customBluegray text-[11px] font-bold'>Shaing Information. Improving Transportation.</Text>
      </Box>
    </Box>
  );
}

function BottomView() {
  return (
    <Box className='flex-col w-full absolute bottom-0 mb-8 p-4'>
      <Text size='sm' className='text-black'>
        {String.notice_contact}
      </Text>

      <Text size='sm' className='text-black mt-5'>
        {String.notice_policy}
      </Text>
        
      <Button className='bg-transparent justify-start items-start'
        onPress={
          () => viewModel.openPolicy()
      }>
        <ButtonText size='sm' className='text-black font-normal'>
          {String.notice_policy_link}
        </ButtonText>
      </Button>

      <Text size='sm' className='text-black'>
        {String.notice_copyright}
      </Text>
    </Box>
  );
}