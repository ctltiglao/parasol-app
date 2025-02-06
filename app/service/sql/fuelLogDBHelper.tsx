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
            CREATE TABLE IF NOT EXISTS FuelLog (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                log_date TEXT, date_update TEXT,
                start_odometer REAL, end_odometer REAL,
                total_fuel REAL, consumption_unit TEXT
            );
        `)
    } catch (error) {
        alert(`Error creating table ${error}`);
    }
}

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
}

export const addFuelLog = async ({
    log_date,
    date_update,
    start_odometer,
    end_odometer,
    total_fuel,
    consumption_unit
}: any) => {
    try {
        const result = await db.runAsync('INSERT INTO FuelLog ' +
            '(log_date, date_update, start_odometer, end_odometer, total_fuel, consumption_unit) ' +
            'VALUES (?, ?, ?, ?, ?, ?);',
            [log_date, date_update, start_odometer, end_odometer, total_fuel, consumption_unit]
        );

        if (result.changes > 0) {
            alert('Fuel log added successfully');
        }
    } catch (error) {
        if (!db) throw new Error('Database not initialized');

        console.error(error);
        alert(`Failed to add fuel log ${error}`);
    }
}

export const allFuelRecords = async () => {
    try {
        const result = await db.getAllAsync('SELECT * FROM FuelLog ORDER BY id DESC');

        return result;
    } catch (error) {
        alert(`Failed to fetch fuel records ${error}`);
    }
}

export const updateFuelRecord = async ({
    log_date,
    date_update,
    start_odometer,
    end_odometer,
    total_fuel,
    consumption_unit,
    id
}: any) => {
    try {
        const result = await db.runAsync(
            `UPDATE FuelLog SET log_date = ?, date_update = ?, start_odometer = ?, end_odometer = ?, total_fuel = ?, consumption_unit = ? WHERE id = ?;`,
            [log_date, date_update, start_odometer, end_odometer, total_fuel, consumption_unit, id]
        )

        return result.changes;
    } catch (error) {
        alert(`Failed to update fuel record ${error}`);
    }
}

export const deleteFuelRecord = async (id: number) => {
    try {
        const result = await db.runAsync(
            `DELETE FROM FuelLog WHERE id = ?;`,
            [id]
        )

        return result.changes;
    } catch (error) {
        alert(`Failed to delete fuel record ${error}`);
    }
}