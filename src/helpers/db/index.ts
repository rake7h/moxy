import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { deleteFile } from '../fs'
import { DB_DIR, COLLECTIONS_DB_PATH } from '../../helpers/db/name'
import { writeJsonFile } from '../fs';

interface DBProps {
    DbName: string
}

class DB<Type extends Record<any, any>> {
    dbName: string
    dbPath: string
    file: string
    db: Low<Type>

    constructor({ DbName }: DBProps) {

        this.dbName = DbName
        this.dbPath = DB_DIR
        this.file = this.dbPath + this.dbName;
        console.log('this.file', this.file)

        // Configure lowdb to write data to JSON file
        const adapter = new JSONFile<Type>(this.file)

        // db instance
        const defaultData: any = {
            data: []
        }
        this.db = new Low<Type>(adapter, defaultData)
    }

    async readDB(): Promise<Type> {
        // Read data from JSON file, this will set db.data content
        // If JSON file doesn't exist, defaultData is used instead
        await this.db.read()
        return this.db.data
    }
    async updateCollection(value: Type) {
        try {
            // add record entry in db
            await this.db.read()
            const collections = this.db.data.data
            const index = collections.findIndex((e: Type) => e.id === value.id);

            const collectionPath = COLLECTIONS_DB_PATH + value.name + '.json'
            const filePath = this.dbPath + collectionPath

            this.db.data.data[index] = {
                id: value.id,
                name: value.name,
                path: collectionPath
            };
            await this.db.write()

            // write a record file
            writeJsonFile({ path: filePath, content: JSON.parse(value.value) })
        }
        catch (e) {
            throw e
        }
    }
    async addCollection(value: Type) {
        try {
            await this.db.read()
            const collections = this.db.data.data

            // check if a record already present with same name
            collections.forEach((c: Type) => {
                if (c.name === value.name) {
                    throw new Error('A record is already exist with same name')
                }
            })

            const collectionPath = COLLECTIONS_DB_PATH + value.name + '.json'
            const filePath = this.dbPath + collectionPath

            // add record entry in db
            collections.push({
                id: value.id,
                name: value.name,
                path: collectionPath
            })
            await this.db.write()

            // write a record file
            writeJsonFile({ path: filePath, content: JSON.parse(value.value) })
        }
        catch (e) {
            throw e
        }
    }
    async updateEndpoint(value: Type) {
        try {
            await this.db.read()
            const endpoints = this.db.data.data
            const index = endpoints.findIndex((e: Type) => e.id === value.id);
            this.db.data.data[index] = value;
            await this.db.write()
        }
        catch (e) {
            throw e
        }
    }
    async addEndpoint(data: Type) {
        try {
            await this.db.read()
            const endpoints = this.db.data.data
            endpoints.forEach((c: Type) => {
                if (c.endpoint === data.endpoint) {
                    throw new Error('An endpoint already exist with same route.')
                }
            })
            endpoints.unshift(data)
            await this.db.write()
        }
        catch (e) {
            throw e
        }
    }
    async deleteEndpoint(id: Type['id']) {
        try {
            await this.db.read()
            let endpoints = this.db.data.data

            const index = endpoints.findIndex((e: Type) => e.id === id);
            if (index <= -1) {
                throw new Error('Request endpoint does not exist!');
            }
            // Delete
            this.db.data.data = endpoints.filter((e: Type) => e.id !== id);
            await this.db.write()
        }
        catch (e) {
            throw e
        }
    }
    async deleteCollection(id: string) {
        try {
            await this.db.read()
            let collections = this.db.data.data

            const index = collections.findIndex((e: Type) => e.id === id);
            const { path } = collections[index] || {};

            if (index <= -1) {
                throw new Error('Request collection does not exist!');
            }

            // Delete
            this.db.data.data = collections.filter((e: Type) => e.id !== id);
            await this.db.write()

            // delete the file too
            const recordSrc = this.dbPath + path
            deleteFile({ path: recordSrc })
        }
        catch (e) {
            throw e
        }
    }
}
export { DB }