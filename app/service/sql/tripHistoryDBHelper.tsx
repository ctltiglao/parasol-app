// react native
// expo
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
// gluestack

let db: SQLite.SQLiteDatabase;

const createDb = async () => {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS CommuteRecord (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                origin TEXT, origin_lat REAL, origin_lng REAL,
                destination TEXT, destination_lat REAL, destination_lng REAL,
                mode TEXT, purpose TEXT,
                vehicle_id TEXT, vehicle_details TEXT, commute_date TEXT
            );
        `)
        // console.log(`Table created successfully`);
    } catch (error) {
        // console.log('Error creating table ', error);
    }
};

export const onCreate = async () => {
    const dbName = 'safetravelph.db';
    const dbAssetPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    const dbExists = await FileSystem.getInfoAsync(dbAssetPath);

    if (!dbExists.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true })
        
        const asset = Asset.fromModule(require("@/assets/safetravelph.db"));
        await FileSystem.downloadAsync(asset.uri, dbAssetPath);
        // console.log('Database copied successfully');
    } else {
        // console.log('Database already exists');
    }

    db = await SQLite.openDatabaseAsync(dbName);
    createDb();
};

export const addCommuteRecord = async ({
    origin,
    origin_lat,
    origin_lng,
    destination,
    destination_lat,
    destination_lng,
    mode,
    purpose,
    vehicle_id,
    vehicle_details,
    commute_date
}: any) => {
    try {
        const result = await db.runAsync('INSERT INTO CommuteRecord ' +
            '(origin, origin_lat, origin_lng, destination, destination_lat, destination_lng, mode, purpose, vehicle_id, vehicle_details, commute_date) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [origin, origin_lat, origin_lng, destination, destination_lat, destination_lng, mode, purpose, vehicle_id, vehicle_details, commute_date]
        );

        console.log(origin, destination, commute_date);
        if (result.changes > 0) {
            alert('Commute record added successfully');
        }
    } catch (error) {
        alert(`Failed to add commute record ${error}`);
    }
}

export const allCommuteRecords = async () => {
    try {
        const result = await db.getAllAsync('SELECT * FROM CommuteRecord');

        return result;
    } catch (error) {
        alert(`Failed to fetch commute records ${error}`);
    }
}

export const deleteCommuteRecords = async () => {
    try {
        const result = await db.getAllAsync('DELETE FROM CommuteRecord');

        return result;
    } catch (error) {
        alert(`Failed to fetch commute records ${error}`);
    }
}