import type { NextApiRequest, NextApiResponse } from 'next'
import {  readCollectionByName } from '@/helpers/collection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queries = req.query;

   /** Get a record */
   if (req.method === 'GET' && queries.collection && typeof queries.collection === 'string') {
    const data = await readCollectionByName(queries.collection.toLowerCase())
    console.log('data', data)
    res.status(200).end(data)
  }

  return res.status(404).end()
}


export default handler;