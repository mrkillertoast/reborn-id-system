import { IIdNumbersCollection } from '@AthenaPlugins/reborn-id-system/shared/interface/IIdNumbersCollection';
import Database from '@stuyk/ezmongodb';

let collection: string = 'idnumbers';

export const initDatabase = async () => {
    await Database.createCollection(collection);
};

export const generateNewNumber = async () => {
    const dbItems: IIdNumbersCollection[] = await Database.fetchAllData(collection);

    let idNumber = Math.floor(1000000 + Math.random() * 9000000);

    //@ts-ignore
    while (dbItems.find((e) => e.uid === idNumber)) {
        idNumber = Math.floor(1000000 + Math.random() * 9000000);
    }

    return idNumber;
};

export const insertId = async (idNumber: number, idType: string) => {
    const res = Database.insertData({ uid: idNumber, type: idType }, collection, true);

    if (!res) {
        console.error(res);
    }
};
