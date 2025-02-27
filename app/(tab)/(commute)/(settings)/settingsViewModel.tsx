import AsyncStorage from "@react-native-async-storage/async-storage";

interface CommuteSettingParam {
    gps_tracks: boolean,
    clean_gps: boolean,
    feed: boolean,
    clean_feed: boolean
}

export const getCommuteSetting = async () => {
    try {
        const json = await AsyncStorage.getItem('CommuteSetting');
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        console.error(error);
    }
}

export const updateCommuteSetting = async (setting: CommuteSettingParam) => {
    try {
        console.log(setting);

        const set = {
            gps_tracks: setting.gps_tracks,
            clean_gps: setting.clean_gps,
            feed: setting.feed,
            clean_feed: setting.clean_feed
        }

        const json = JSON.stringify(set);
        await AsyncStorage.setItem('CommuteSetting', json);

        return true;
    } catch (error) {
        console.error(error);
        return false
    }
}