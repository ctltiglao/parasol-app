
import '@/global.css';
// react native
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// expo
import { StatusBar } from 'expo-status-bar';
// gluestack
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';

import IncidentDetailsScreen from './(incident)/incident';
import NotesScreen from './(notes)/notes';
import CrashDiagramScreen from './(crash)/crash';
import PartiesScreen from './(parties)/parties';
import { getLocationName } from '../../tabViewModel';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

interface Coordinate {
    latitude: number;
    longitude: number;
}

type RoadParams = {
    location: Coordinate[];
}

type RoadParamsProp = RouteProp<{RoadModule: RoadParams}, 'RoadModule'>;

export default function RoadModuleScreen({ navigation }: any) {
    const nav: NavigationProp<any, any> = useNavigation();
    const navRoute = useRoute<RoadParamsProp>();

    const [ location, setLocation ] = useState<Coordinate[]>([]);
    const [ locationName, setLocationName ] = useState('');

    const [ isOverlayIncident, setOverlayIncident ] = useState(true);
    const [ isOverlayNotes, setOverlayNotes ] = useState(false);
    const [ isOverlayCrash, setOverlayCrash ] = useState(false);
    const [ isOverlayParties, setOverlayParties ] = useState(false);

    const toggleOverIncident = () => {
        setOverlayIncident(!isOverlayIncident);
        setOverlayNotes(false);
        setOverlayCrash(false);
        setOverlayParties(false);
    }
    const toggleOverNotes = () => {
        setOverlayIncident(false);
        setOverlayNotes(!isOverlayNotes);
        setOverlayCrash(false);
        setOverlayParties(false);
    }
    const toggleOverCrash = () => {
        setOverlayIncident(false);
        setOverlayNotes(false);
        setOverlayCrash(!isOverlayCrash);
        setOverlayParties(false);
    }
    const toggleOverParties = () => {
        setOverlayIncident(false);
        setOverlayNotes(false);
        setOverlayCrash(false);
        setOverlayParties(!isOverlayParties);
    }

    useEffect(() => {
        const getParams = async () => {
            if (navRoute.params) {
                const loc = navRoute.params.location;
                // console.log(navRoute.params)
                setLocation(loc);

                const locName = await getLocationName(loc);
                // console.log(locName);
                setLocationName(locName);
            }
        }

        getParams();
    }, [navRoute.params])

    return (
        <GluestackUIProvider mode='light'>
            <StatusBar backgroundColor='#FCD116' />
            <Box className='bg-white flex-1 w-full h-full'>
                
                <Box className='flex-row w-full h-fit mt-14 mb-2'>
                    <ScrollView horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <Button className={ isOverlayIncident
                            ? 'h-fit bg-white p-4 border-b-2 border-custom-secondary'
                            : 'h-fit bg-white p-4'
                        }
                        onPress={() =>  toggleOverIncident()}>
                            <ButtonText className='text-black'>INCIDENT DETAILS</ButtonText>
                        </Button>
                        <Button className={ isOverlayNotes
                            ? 'h-fit bg-white p-4 border-b-2 border-custom-secondary'
                            : 'h-fit bg-white p-4'
                        }
                        onPress={() => toggleOverNotes()}>
                            <ButtonText className='text-black'>NOTES</ButtonText>
                        </Button>
                        <Button className={ isOverlayCrash
                            ? 'h-fit bg-white p-4 border-b-2 border-custom-secondary'
                            : 'h-fit bg-white p-4'
                        }
                        onPress={() => toggleOverCrash()}>
                            <ButtonText className='text-black'>CRASH DIAGRAM</ButtonText>
                        </Button>
                        <Button className={ isOverlayParties
                            ? 'h-fit bg-white p-4 border-b-2 border-custom-secondary'
                            : 'h-fit bg-white p-4'
                        }
                        onPress={() => toggleOverParties()}>
                            <ButtonText className='text-black'>PARTIES</ButtonText>
                        </Button>
                    </ScrollView>
                </Box>

                <Box className='flex-1'>
                    {(() => {
                        if (isOverlayIncident) {
                            return <IncidentDetailsScreen loc={location} locName={locationName}/>
                        } else if (isOverlayNotes) {
                            return <NotesScreen/>
                        } else if (isOverlayCrash) {
                            return <CrashDiagramScreen/>
                        } else if (isOverlayParties) {
                            return <PartiesScreen/>
                        }
                    })()}
                </Box>

                <HStack space='md' className=' relative bottom-0 p-4'>
                    <Button className='h-fit bg-zinc-300 p-3 rounded-sm me-4'>
                        <ButtonText className='text-black'>SUBMIT</ButtonText>
                    </Button>
                    <Button
                        className='h-fit bg-zinc-300 p-3 rounded-sm'
                        onPress={() => nav.dispatch(navigation.goBack())}
                    >
                        <ButtonText className='text-black'>CLOSE</ButtonText>
                    </Button>
                </HStack>
            </Box>
        </GluestackUIProvider>
    );
}