import type { NextApiRequest, NextApiResponse } from 'next'
import { readEndpointsFromDB } from '@/helpers/db/selectors';
import { getEndpointPathFromURL, matchEndpointPathToDB } from '@/helpers/utils/entrypoint';
import { makeProxyRequest } from '@/helpers/proxy';
import {readCollectionByName} from '@/helpers/collection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queries = req.query;
  const body = req.body;

  // 1. get the endpoint from url, remove moxy
  let pathname = getEndpointPathFromURL({ pathname: req.url || '' })

  // 2. math is this endpoint exist in db
  const endpoints = await readEndpointsFromDB()
  const { id, moxyType, proxyDetails, mockDetails } = matchEndpointPathToDB({ endpoint: pathname, entrypointdDB: endpoints.data })

  if (!id) {
    return res.status(500).json({ "message": `no mathing moxy entry found for ${pathname}` })
  }

  // 3. if exist check is a proxy or mock
  // if proxy do a proxy
  if (moxyType === 'proxy') {

    // set moxy-type identifiers
    res.setHeader('x-moxy-type', 'proxy');

    try {
      const axiosRes = await makeProxyRequest({
        headers: req.headers,
        method: req.method,
        targetHost: proxyDetails.targetHost,
        endpointPath: pathname,
        data: JSON.stringify(body)
      });

      // Set the target response headers to the proxy response
      Object.keys(axiosRes.headers).forEach((key) => {
        res.setHeader(key, axiosRes.headers[key]);
      });

      // Send the response from the target to the client
      return res.status(axiosRes.status).send(axiosRes.data);
    }
    catch (e) {
      const axiosErrorResp = e.response;

      // Set the target response headers to the proxy response
      Object.keys(axiosErrorResp.headers).forEach((key) => {
        res.setHeader(key, axiosErrorResp.headers[key]);
      });
      return res.status(axiosErrorResp.status).send(axiosErrorResp.data);
    }
  }

  // 4. if mock, read the collection for endpoint and return
  if (moxyType === "mock") {
    
    // set moxy-type identifiers
    res.setHeader('x-moxy-type', `mock, ${mockDetails.collectionId}`);

    const collectionData = await readCollectionByName(mockDetails.collectionId)
    return res.status(200).send(collectionData);
  }

}


export default handler;