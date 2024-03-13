import { updateCollectionDB, deleteCollectionDB } from './db/writer';
import { CollectionInput } from '@/types';

const createNewCollection = async ({ id, name, value }: CollectionInput) => {
  try {
    const a = await updateCollectionDB({
      id: id,
      name: name,
      value: value,
    });
  } catch (e) {
    throw e;
  }
};

const deleteCollection = async (id: string) => {
  try {
    const result = await deleteCollectionDB(id);
    return result;
  } catch (e) {
    throw e;
  }
};

export { createNewCollection, deleteCollection };
