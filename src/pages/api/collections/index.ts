import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '@/helpers/db';
import { createNewCollection, deleteCollection } from '@/helpers/collection';
import { COLLECTIONS_DB_FILE } from '@/helpers/db/name';

const getData = async () => {
  const DbInstance = new DB({ DbName: COLLECTIONS_DB_FILE });
  const data = DbInstance.readDB();
  return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  /** Delete an endpoint */
  if (req.method === 'DELETE') {
    const id = body.id;
    try {
      const data = await deleteCollection(id);
      res.send({ success: true, id: id });
    } catch (e) {
      res.status(500).send({ success: false, error: e.message });
    }
  }

  /** Get collections */
  if (req.method === 'GET') {
    const data = await getData();
    res.status(200).json(data);
  }

  /** Write a new collection */
  if (req.method === 'POST') {
    try {
      const a = await createNewCollection({ ...body.data });
      res.send({ success: true });
    } catch (e) {
      console.log(e);
      res.status(400).send({ success: false, error: e.message });
    }
  }

  return res.status(404).end();
};

export default handler;
