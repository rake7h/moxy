import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

interface MakeProxyRequest {
    headers: NextApiRequest["headers"]
    method: AxiosRequestConfig['method'],
    targetHost: AxiosRequestConfig['url'],
    endpointPath: string,
    data: AxiosRequestConfig['data']
    params: Record<string, string>
}
interface MakeTargetURL {
    reqPath:string
    targetURL:string
}

const makeTargetURL = ({ reqPath, targetURL }:MakeTargetURL) => {
    /**  
     /v2/get/users --> http://example.com/*
     /v2/get/users --> http://example.com/v2/get/users
    */

    let target = targetURL;

    // if target url ends with /* append the reqPath 
    if (targetURL.endsWith('/*')) {
        target = targetURL.replace('/*', path.normalize(reqPath))
    }

    return target;
}

const makeProxyRequest = async ({ headers, method, targetHost, endpointPath, data, params }: MakeProxyRequest) => {

    /**
     * basically, will call the proxy api with headers, query and 
     * other info that client provides.
     * using axois to make api calls
     * 
     * TODO: ideally we should have done this with piping the request with 
     * proxy server. Will expolre this later, I saw some error in res.pipe
     * something specific to Next.js I'm guessing
     */

    /**
     * 
     * remove Next.js specific headers
     */
    [
        'date',
        'host',
        // 'x-forwarded-host',
        // 'x-forwarded-proto',
        // 'x-forwarded-port',
        // 'x-forwarded-for',
        'x-middleware-invoke',
        'x-invoke-path',
        'x-invoke-query',
        'x-middleware-next',
        'content-length'
    ].forEach(h => {
        delete headers[h]
    })

    /** Add some proxy related headers */
    headers['connection'] = 'keep-alive'

    const targetURL = makeTargetURL({ reqPath: endpointPath, targetURL: targetHost });

    console.log('targetURL', targetURL, params)
    const config = {
        method,
        headers,
        timeout: 20000,
        url: targetURL,
        params
    }
    
    // add data is present 
    if(data) config.data = data

    console.log('axios', { config })
    const axiosRes = await axios(config);
    return axiosRes;
}

export { makeProxyRequest }