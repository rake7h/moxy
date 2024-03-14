import { makeProxyRequest } from '../proxy';

const ProxyEndpointMW = (req: Request, res: Response) => {
  const url = req.nextUrl;

  // 1. get the endpoint from url, remove moxy
  const endpointPath = getEndpointPathFromURL({ pathname: url.pathname });

  // 2. math is this endpoint exist in db
  const endpoints = await readEndpointsFromDB();
  const { id, moxyType, proxyDetails } = matchEndpointPathToDB({
    endpoint: endpointPath,
    entrypointdDB: endpoints.data,
  });

  // 3. if exist check is a proxy or mock
  if (!id) {
    return NextResponse.error();
  }

  // 4. if proxy do a proxy
  if (moxyType === 'proxy') {
    try {
      const axiosRes = await makeProxyRequest({
        headers: req.headers,
        method: req.method,
        targetHost: proxyDetails.targetHost,
        endpointPath: endpointPath,
      });

      return NextResponse.json(axiosRes.data, {
        statusText: axiosRes.statusText,
        headers: axiosRes.headers,
      });
    } catch (e) {
      return NextResponse.error();
    }
  }
};
