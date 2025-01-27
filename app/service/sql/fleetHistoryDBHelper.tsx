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
            CREATE TABLE IF NOT EXISTS FleetRecord (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                route TEXT, origin TEXT, origin_lat REAL, origin_lng REAL,
                destination TEXT, destination_lat REAL, destination_lng REAL,
                travel_distance REAL, start_time INTEGER, end_time INTEGER, travel_time INTEGER,
                type TEXT, capacity TEXT, vehicle_id TEXT, vehicle_details TEXT, trip_date TEXT,
                consumption REAL, consumption_unit TEXT, start_odometer REAL, end_odometer REAL
            );
        `)
        // console.log(`Table created successfully`);
    } catch (error) {
        alert(`Error creating table ${error}`);
    }
};

export const onCreate = async () => {
    const dbName = 'safetravelph.db';
    const dbAssetPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    const dbExists = await FileSystem.getInfoAsync(dbAssetPath);

    if (!dbExists.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true })
        
        const asset = Asset.fromModule(require("./safetravelph.db"));
        await FileSystem.downloadAsync(asset.uri, dbAssetPath);
        // console.log('Database copied successfully');
    } else {
        // console.log('Database already exists');
    }

    db = await SQLite.openDatabaseAsync(dbName);
    createDb();
};

export const addFleetRecord = async ({
    route,
    origin,
    origin_lat,
    origin_lng,
    destination,
    destination_lat,
    destination_lng,
    travel_distance,
    start_time,
    end_time,
    travel_time,
    type,
    capacity,
    vehicle_id,
    vehicle_details,
    trip_date,
    consumption,
    consumption_unit,
    start_odometer,
    end_odometer
}: any) => {
    try {
        const result = await db.runAsync('INSERT INTO FleetRecord ' +
            '(route, origin, origin_lat, origin_lng, destination, destination_lat, destination_lng, travel_distance, start_time, end_time, travel_time, type, capacity, vehicle_id, vehicle_details, trip_date, consumption, consumption_unit, start_odometer, end_odometer) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [route,  origin, origin_lat, origin_lng, destination, destination_lat, destination_lng, travel_distance, start_time, end_time, travel_time, type, capacity, vehicle_id, vehicle_details, trip_date, consumption, consumption_unit, start_odometer, end_odometer]
        );

        console.log(start_time, end_time, travel_time, trip_date);
        if (result.changes > 0) {
            alert('Fleet record added successfully');
        }
    } catch (error) {
        if (!db) throw new Error('Database not initialized');

        console.error(error);
        alert(`Failed to add fleet record ${error}`);
    }
}

export const allFleetRecords = async () => {
    try {
        const result = await db.getAllAsync('SELECT * FROM FleetRecord');

        return result;
    } catch (error) {
        alert(`Failed to fetch fleet records ${error}`);
    }
}

export const updateFleetRecord = async ({
    consumption,
    consumption_unit,
    start_odometer,
    end_odometer,
    id
}: any) => {
    console.log(consumption, consumption_unit, start_odometer, end_odometer, id);

    try {
        const result = await db.runAsync(
            `UPDATE FleetRecord SET consumption = ?, consumption_unit = ?, start_odometer = ?, end_odometer = ? WHERE id = ?;`,
            [consumption, consumption_unit, start_odometer, end_odometer, id]
        )

        return result.changes;
    } catch (error) {
        alert(`Failed to update fleet record ${error}`);
    }
}

export const deleteFleetRecord = async (id: number) => {
    try {
        console.log(id);

        const result = await db.runAsync(
            'DELETE FROM FleetRecord WHERE id = $id;',
            { $id: id }
        );

        return result.changes;
    } catch (error) {
        console.log(error);
        alert(`Failed to delete fleet record ${error}`);
    }
}