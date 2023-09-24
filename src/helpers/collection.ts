import {updateCollectionDB, deleteCollectionDB} from './db/writer';
import {CollectionInput, Collection} from '@/types'
import {readMetaDB} from './db/selectors';
import { readFile } from '../helpers/fs';
import {DB_DIR} from '../helpers/db/name';

const createNewCollection = async ({id, name, value, type}:CollectionInput) => {
  try{
    const a = await updateCollectionDB({
        id: id,
        name: name,
        value: value,
        type: type
      })
  }
  catch(e) {
    throw e
  }
}

const deleteCollection = async (id:string) =>{
  try{
    const result = await deleteCollectionDB(id);
    return result;
  }
  catch(e){
    throw e
  }
}

// TODO: let's have node-lru here
const readCollectionByName = async (collectionName: string): Promise<any> => {
  const {data} = await readMetaDB<Collection>();
  const collection = data.filter((c)=>c.name.toLowerCase() === collectionName)[0];
  const filePath = DB_DIR + collection.path;
  const collectionData = await readFile({path:filePath});
  return collectionData;
}

export {createNewCollection, deleteCollection, readCollectionByName}