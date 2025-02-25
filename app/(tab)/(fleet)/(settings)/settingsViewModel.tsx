import AsyncStorage from "@react-native-async-storage/async-storage";

interface FleetSettingParam {
    telematics: boolean,
    gps_tracks: boolean,
    clean_gps: boolean,
    feed: boolean,
    clean_feed: boolean,
    vehicle: boolean,
    passenger: boolean
}

export const getFleetSetting = async () => {
    try {
        const json = await AsyncStorage.getItem('FleetSetting');
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        console.error(error);
    }
}

export const updateFleetSetting = async (setting: FleetSettingParam) => {
    try {
        const set = {
            telematics: setting.telematics,
            gps_tracks: setting.gps_tracks,
            clean_gps: setting.clean_gps,
            feed: setting.feed,
            clean_feed: setting.clean_feed,
            vehicle: setting.vehicle,
            passenger: setting.passenger
        }

        const json = JSON.stringify(set);
        await AsyncStorage.setItem('FleetSetting', json);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}