// react native
import React, { createContext, useEffect, useMemo, useReducer } from 'react';
// expo
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
// gluestack

export const getToken = async () => {
    try {
      const formData = {
        grant_type: 'authorization_code',
        client_id: 'safetravelph-cpa-test',
        code: '4b291242-02ad-4d99-b884-06d5c69309d6.8f503167-f64a-4f86-a2be-c4a7eca300c6.7bfe3239-d399-417e-b5dc-c31d3cc4cb58',
        code_verifier: 'y5Tf47fFGG2NdGS32KVUDlirGNqehCLSbAtGxbsea3ynKoxkPvINWkjFSGtaiXDK2N3SEEHcrORWMcNivzEvE4wMJtGOBi1m1kfDcRsPEumBABmBF3CpnRUmRHGAqAYy',
        redirect_uri: makeRedirectUri({
                scheme: 'com.safetravelph.parasol',
              })
    }

    const formBody = []

    for (const property in formData) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(formData[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }

    const response = await fetch(
      `https://staging-iam.safetravel.ph/realms/safetravelph-cpa/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.join('&')
      }
    )

    return response;
        
    } catch (error) {
      console.error(error);
    }
}

// export const getUserInfo = async () => {
//     try {
//         const accessToken = 
//     } catch (error) {
//         console.error(error);
//     }
// } 

// const initialState = {
//     isSignedIn: false,
//     accessToken: null,
//     idToken: null,
//     userInfo: null
// }

// const AuthContext = createContext({
//     state: initialState,
//     signIn: () => {},
//     signOut: () => {}
// })

// const AuthProvider = ({ children }) => {
//     const discovery = useAutoDiscovery('https://staging-iam.safetravel.ph/realms/safetravelph-cpa');
//     const redirectUri = makeRedirectUri();

//     const [ authState, dispatch ] = useReducer(( prevState, action ) => {
//         switch (action.type) {
//             case 'SIGN_IN':
//                 return {
//                     ...prevState,
//                     isSignedIn: true,
//                     accessToken: action.payload.access_token,
//                     idToken: action.payload.id_token
//                 }
            
//             case 'USER_INFO':
//                 return {
//                     ...prevState,
//                     userInfo: {
//                         username: action.payload.preferred_username,
//                         givenName: action.payload.given_name,
//                         familyName: action.payload.family_name,
//                         email: action.payload.email
//                     }
//                 }

//             case 'SIGN_OUT':
//                 return {
//                     initialState
//                 }
//         }
//     }, initialState);

//     const authContext = useMemo(
//         () => ({
//             state: authState,
//             signIn: () => {
//                 console.log(redirectUri);
//                 console.log('LOGIN');
//                 promptAsync();
//             },
//             signOut: async () => {
//                 try {
//                     console.log('LOGOUT');
//                     const idToken = authState.idToken
//                     await fetch(
//                         `https://staging-iam.safetravel.ph/realms/safetravelph-cpa/protocol/openid-connect/logout?id_token_hint=${idToken}`,
//                     )
//                     dispatch({ type: 'SIGN_OUT' })
//                 } catch (error) {
//                     console.error(error);
//                 }
//             }
//         }),
//         [ authState ]
//     )

//     const [ request, response, promptAsync ] = useAuthRequest({
//         clientId: 'safetravelph-cpa-test',
//         redirectUri: redirectUri,
//         scopes: [ 'openid', 'profile', 'email' ],
//         usePKCE: true
//     }, discovery);

//     useEffect(() => {
//         const getToken = async ({ code, codeVerifier, redirectUri }) => {
//             try {
//                 const formData = {
//                     grant_type: 'authorization_code',
//                     client_id: 'safetravelph-cpa-test',
//                     code: code,
//                     code_verifier: codeVerifier,
//                     redirect_uri: redirectUri
//                 }

//                 const formBody = []

//                 for (const property in formData) {
//                     var encodedKey = encodeURIComponent(property)
//                     var encodedValue = encodeURIComponent(formData[property])
//                     formBody.push(encodedKey + '=' + encodedValue)
//                 }

//                 const response = await fetch(
//                     `https://staging-iam.safetravel.ph/realms/safetravelph-cpa/protocol/openid-connect/token`,
//                     {
//                         method: 'POST',
//                         headers: {
//                             Accept: 'application/json',
//                             'Content-Type': 'application/x-www-form-urlencoded'
//                         },
//                         body: formBody.join('&')
//                     }
//                 )

//                 if (response.ok) {
//                     const payload = await response.json()
//                     dispatch({ type: 'SIGN_IN', payload })
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         const getUserInfo = async () => {
//             try {
//                 const accessToken = authState.accessToken
//                 const response = await fetch(
//                     `https://staging-iam.safetravel.ph/realms/safetravelph-cpa/protocol/openid-connect/userinfo`,
//                     {
//                         method: 'GET',
//                         headers: {
//                             Authorization: 'Bearer ' + accessToken,
//                             Accept: 'application/json'
//                         }
//                     }
//                 )

//                 console.log(response);

//                 if (response.ok) {
//                     const payload = await response.json()
//                     dispatch({ type: 'USER_INFO', payload })
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         if (response?.type === 'success') {
//             const { code } = response.params
//             getToken({
//                 code,
//                 codeVerifier: request?.codeVerifier,
//                 redirectUri
//             })
//         } else if (response?.type === 'error') {
//             console.error('Authentication error: ', response.error);
//         }

//         if (authState.isSignedIn) {
//             getUserInfo();
//         }
//     }, [ dispatch, redirectUri, request?.codeVerifier, response, authState.accessToken, authState.isSignedIn, dispatch ]);

//     return (
//         <AuthContext.Provider value={authContext}>{ children }</AuthContext.Provider>
//     )
// }

// export { AuthContext, AuthProvider }