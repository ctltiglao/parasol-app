// react native
import AsyncStorage from "@react-native-async-storage/async-storage";
// expo
// gluestack
// ========== ==========
// variables

export const getUserState = async () => {
    try {
        const json = await AsyncStorage.getItem('UserState');
        return json != null ? JSON.parse(json) : null;
    } catch (error) {
        console.error(error);
    }
}