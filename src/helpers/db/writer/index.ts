import { DB } from '../index';
import { generateUUID } from '../../utils/uuid';
import { Endpoint, Collection } from '@/types';
import { COLLECTIONS_DB_FILE, ENDPOINTS_DB_FILE } from '../../db/name';
import { CollectionInput } from '@/types';

const updateCollectionDB = async (value: CollectionInput) => {
  try {
    const instance = new DB<CollectionInput>({ DbName: COLLECTIONS_DB_FILE });
    // if name is present in request then it's a update request
    if (value.id) {
      const result = await instance.updateCollection(value);
      return result;
    }
    value.id = generateUUID();
    const result = await instance.addCollection(value);
    return result;
  } catch (e) {
    throw e;
  }
};
const updateEndpointDB = async (value: Endpoint) => {
  try {
    const instance = new DB<Endpoint>({ DbName: ENDPOINTS_DB_FILE });
    // if id is present in request then it's a update request
    if (value.id) {
      const result = await instance.updateEndpoint(value);
      return result;
    }
    // add new endpoint
    else {
      value.id = generateUUID();
      const result = await instance.addEndpoint(value);
      return result;
    }
  } catch (e) {
    throw e;
  }
};

const deleteEndpointDB = async (id: string) => {
  try {
    const instance = new DB<Endpoint>({ DbName: ENDPOINTS_DB_FILE });
    const result = await instance.deleteEndpoint(id);
    return result;
  } catch (e) {
    throw e;
  }
};
const deleteCollectionDB = async (id: string) => {
  try {
    const instance = new DB<Collection>({ DbName: COLLECTIONS_DB_FILE });
    const result = await instance.deleteCollection(id);
    return result;
  } catch (e) {
    throw e;
  }
};

export {
  updateCollectionDB,
  updateEndpointDB,
  deleteEndpointDB,
  deleteCollectionDB,
};
