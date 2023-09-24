import { DB } from '../index';
import {COLLECTIONS_DB_FILE, ENDPOINTS_DB_FILE} from '../../db/name'

const readDB = async <Type extends Record<any, any>>(dbPath: string): Promise<any> => {
    const dbInstance = new DB<Type>({ DbName: dbPath });
    const data = dbInstance.readDB()
    return data;
}

const readEndpointsFromDB = async <Type extends Record<any, any>>(): Promise<Type> => readDB<Type>(ENDPOINTS_DB_FILE)
const readMetaDB = async <Type extends Record<any, any>>(): Promise<Type> => readDB<Type>(COLLECTIONS_DB_FILE)

export { readEndpointsFromDB, readMetaDB }