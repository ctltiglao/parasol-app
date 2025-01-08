import '@/global.css';
// react native
import React, { useState, useEffect } from 'react';
// expo
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { keycloakConfig } from './loginViewModel';

export default function LoginScreen() {
    const [ authState, useAuthState ] = useState(null);

    return (
        <GluestackUIProvider mode='light'>
            
        </GluestackUIProvider>
    )
}