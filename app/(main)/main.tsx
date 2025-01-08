import '@/global.css';
// react native
import React, { useContext, useEffect, useState } from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
// expo
import { StatusBar } from 'expo-status-bar';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, TokenRequest, ResponseType, exchangeCodeAsync } from 'expo-auth-session';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

import { getToken } from '../service/authContext';
import String from '@/assets/values/strings';
import { continueAsGuest, getPermissions, useViewModel } from './mainViewModel';

const viewModel = useViewModel();

export default function MainScreen({ navigation } : { navigation: NavigationProp<any> }) {
  // const { signIn, signOut, state } = useContext(AuthContext);
  const loginDiscovery = useAutoDiscovery('https://staging-iam.safetravel.ph/realms/safetravelph-cpa');
  const discovery = {
    tokenEndpoint: 'https://staging-iam.safetravel.ph/realms/safetravelph-cpa/protocol/openid-connect/token',
  }

  const [ request, result, promptAsync ] = useAuthRequest(
    {
      clientId: 'safetravelph-cpa-test',
      clientSecret: 'Ej37vQTHv5RH3SUREM4vCNnLz4du21Oq',
      responseType: ResponseType.Code,
      redirectUri: makeRedirectUri({
        scheme: 'com.safetravelph.parasol',
      }),
      scopes: ['openid', 'profile', 'email'],
      usePKCE: true,
    }, loginDiscovery
  );

  getPermissions();

  const toRegister = () => {
    navigation.navigate('Register');
  }

  const toTab = () => {
    navigation.navigate('Tab');
  }

  useFocusEffect(() => {
    if (result?.type === 'success') {
      // console.log('RESULT: ', request);
      // const { code } = result.params;
      // const codeVerifier = request?.codeVerifier;

      // const getAccessToken = async() => {
      //   console.log('Code: ', code);

      //   try {
      //     await exchangeCodeAsync({
      //       clientId: 'safetravelph-cpa-test',
      //       clientSecret: 'Ej37vQTHv5RH3SUREM4vCNnLz4du21Oq',
      //       code: code,
      //       redirectUri: makeRedirectUri({
      //         scheme: 'com.safetravelph.parasol',
      //       }),
      //       extraParams: {
      //         grant_type: 'authorization_code',
      //       },
      //     }, discovery).then((tokenResponse) => {
      //       console.log('Token Response: ', tokenResponse);
      //     });
  
      //     console.log('here');
      //   } catch (error) {
      //     console.error(error);
      //   }
      //   // console.log('Token Response: ', tokenResponse);
      // }

      // getAccessToken();
      toTab();

      // console.log('RESULT: ', code);
      // console.log('');
      // console.log('REQUEST: ', request);
    }
  });

  return (
      <GluestackUIProvider mode='light'>
        <StatusBar backgroundColor='#FCD116' />
        <Box className='bg-white flex-1'>
            <TopView />
            
            <Box className='w-full items-center justify-center mt-24 flex-col p-4'>
              <Button
                className='bg-custom-primary w-full h-fit p-5 rounded-xl'
                // onPress={handleLogin}
                onPress={() => promptAsync()}
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