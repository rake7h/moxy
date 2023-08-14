import type { NextApiRequest, NextApiResponse } from 'next'
import {  readCollectionByName } from '@/helpers/db/selectors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queries = req.query;

   /** Get a record */
   if (req.method === 'GET') {
    const data = await readCollectionByName(queries.collection)
    res.status(200).json(data)
  }

  return res.status(404).end()
}


export default handler;