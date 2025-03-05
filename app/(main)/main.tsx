import '@/global.css';
// react native
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
// expo
import { StatusBar } from 'expo-status-bar';
// import { makeRedirectUri, useAuthRequest, useAutoDiscovery, ResponseType } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

import String, { CLIENT_ID, REALM, REDIRECT_URI, SECRET } from '@/assets/values/strings';
import { checkUser, continueAsGuest, fetchToken, getLocationPermissions, getNotificationPermissions, useViewModel } from './mainViewModel';

const viewModel = useViewModel();

// for production
// export const REDIRECT_URI = AuthSession.makeRedirectUri({
//   scheme: 'parasol',
//   path: 'com.safetravelph.parasol'
// });

// for development
// export const REDIRECT_URI = AuthSession.makeRedirectUri();

export default function MainScreen({ navigation } : any) {
  const loginDiscovery = AuthSession.useAutoDiscovery(`${REALM}`);

  const [ request, result, promptAsync ] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      clientSecret: SECRET,
      responseType: AuthSession.ResponseType.Code,
      redirectUri: REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
      usePKCE: true
    }, loginDiscovery
  );

  const checkKeycloak = async () => {
    const res = await checkUser();
    console.log('res here ', res);

    if (res === true) {
      toTab();
    }
  }

  useEffect(() => {
    getLocationPermissions();

    getNotificationPermissions();
    // console.log(REDIRECT_URI);
  }, []);

  const toRegister = () => {
    navigation.navigate('Register');
  }

  const toTab = () => {
    navigation.navigate('Tab');
  }
  
  useFocusEffect(
    useCallback(() => {
      checkKeycloak();

      if (result?.type === 'success') {
        const token = async () => {
          await fetchToken(result.params.code, request?.codeVerifier ?? '');
          // console.log('token: ', JSON.stringify(res.id_token));
        }

        token()
        toTab();
      }
    }, [result])
  );

  return (
      <GluestackUIProvider mode='light'>
        <StatusBar backgroundColor='#FCD116' />
        <Box className='bg-white flex-1'>
            <TopView />
            
            <Box className='w-full items-center justify-center mt-24 flex-col p-4'>
              <Button
                className='bg-custom-primary w-full h-fit p-5 rounded-xl'
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