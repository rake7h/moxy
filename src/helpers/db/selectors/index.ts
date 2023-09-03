import { Collection } from '@/types';
import { DB } from '../index';
import {COLLECTIONS_DB_FILE, ENDPOINTS_DB_FILE} from '../../db/name'

const readDB = async <Type extends Record<any, any>>(dbPath: string): Promise<any> => {
    const dbInstance = new DB<Type>({ DbName: dbPath });
    const data = dbInstance.readDB()
    return data;
}
const readEndpointsFromDB = async <Type extends Record<any, any>>(): Promise<Type> => readDB<Type>(ENDPOINTS_DB_FILE)
const readMetaDB = async <Type extends Record<any, any>>(): Promise<Type> => readDB<Type>(COLLECTIONS_DB_FILE)

// todo: let's have node-lru here
const readCollectionByName = async (collectionName: string): Promise<any> => {
    const {data} = await readMetaDB<Collection>();
    console.log('readCollectionByName', collectionName)
    const collectionFilePath = data.filter((c)=>c.name.toLowerCase() === collectionName)[0].path;
    const collectionData = await readDB(collectionFilePath);
    return collectionData;
}
export { readEndpointsFromDB, readMetaDB, readCollectionByName }