import type { NextApiRequest, NextApiResponse } from 'next'
import {readEndpointsFromDB} from '@/helpers/db/selectors';
import { createEndpoint, deleteEndpoint } from '@/helpers/endpoint';
import {findEndpointGroup} from '@/helpers/utils/entrypoint';

const getData = async({groupby}) => {
  const data = await readEndpointsFromDB()

  if(groupby==="1") {
   const groupedEndpoints = findEndpointGroup(data)
    return {data:groupedEndpoints}
  }

  return data;
}

const handler = async (req:NextApiRequest,res:NextApiResponse) => {
  
  const { body, query } = req;
  
    /** Delete an endpoint */
    if (req.method === 'DELETE') {
      const id = body.id;
      try{
        const data = await deleteEndpoint(id)
        res.send({success: true, id: id})
      }
      catch(e) {
        res.status(500).send({success: false, error:e.message})
      }
    }

  /** Get Endpoints */
  if (req.method === 'GET') {
    const {groupby} = query;

    const data = await getData({groupby})
    res.status(200).json(data)
  }

  /** Create a new Endpoint */
  if (req.method === 'POST') {

    try {
      const a = await createEndpoint({ ...body.data })
      res.send({success: true})
    }
    catch (e) {
      console.log(e)
      res.status(500).send({success: false, error:e.message})
    }
  }

  res.status(500).end()
}

export default handler