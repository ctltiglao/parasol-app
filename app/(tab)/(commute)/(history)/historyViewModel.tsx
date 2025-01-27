// react native
// expo
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { StorageAccessFramework } from 'expo-file-system';
// gluestack

export const createiOSCSV = async (csv: any) => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
        return;
    }
    
    await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}MyCommuteRecords.csv`, csv, {
        encoding: FileSystem.EncodingType.UTF8
    });
    
    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(`${FileSystem.documentDirectory}MyCommuteRecords.csv`);
    } else {
        alert('Sharing is not available on this device');
    }
}

export const createAndroidCSV = async (csv: any) => {
    console.log('createAndroidCSV');

    const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permission.granted) {
        return;
    }

    try {
        const fileName = await getFileName(permission.directoryUri);
        console.log(fileName);

        await StorageAccessFramework.createFileAsync(
            permission.directoryUri,
            fileName,
            'application/csv'
        ).then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, csv, {
                encoding: FileSystem.EncodingType.UTF8
            });

            console.log(uri);
        }).catch((error) => {
            alert(`Failed to save commute records ${error}`);
        });
    } catch (error) {
        console.log(error);
        alert(`Failed to save commute records ${error}`);
    }
}

const getFileName = async (uri: any) => {
    let fileNumber = 1;
    let fileName = `MyCommuteRecords.csv`;

    while (await FileSystem.getInfoAsync(`${uri}${fileName}`).then(info => info.exists)) {
        fileNumber++;
        fileName = `MyCommuteRecords%20(${fileNumber}).csv`;
    }

    return fileName;
}