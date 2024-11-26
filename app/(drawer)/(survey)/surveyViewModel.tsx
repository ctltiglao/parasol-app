import AsyncStorage from "@react-native-async-storage/async-storage";


export const getUserState = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('UserState');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.error(e);
    }
}