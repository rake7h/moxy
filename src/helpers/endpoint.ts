import { updateEndpointDB, deleteEndpointDB } from './db/writer';

interface CreateNewCollection {
  id: string;
  endpoint: string;
  moxyType: 'proxy' | 'mock';
  proxyDetails: {
    targetHost: string;
  };
  mockDetails: {
    collectionId: string;
  };
}

const createEndpoint = async (opts: CreateNewCollection) => {
  //2. add the entry in collections.db.json with path and id
  try {
    const result = await updateEndpointDB({
      id: opts?.id,
      endpoint: opts.endpoint,
      moxyType: opts.moxyType,
      proxyDetails: {
        targetHost: opts.proxyDetails?.targetHost,
      },
      mockDetails: {
        collectionId: opts.mockDetails?.collectionId,
      },
    });
    return result;
  } catch (e) {
    throw e;
  }
};

const deleteEndpoint = async (id: string) => {
  try {
    const result = await deleteEndpointDB(id);
    return result;
  } catch (e) {
    throw e;
  }
};

export { createEndpoint, deleteEndpoint };
