import {Endpoints} from '@/types'

interface getEndpointPathFromURL {
    pathname: string,
    moxyPrefix?: string
}

/*
if (queries.endpoint?.length) {
    pathname = `/${queries.endpoint.join('/')}`
  }
*/

/**
 * /moxy/v1/users/get --> /v1/users/get
 */
const getEndpointPathFromURL = ({ pathname, moxyPrefix = '/moxy' }: getEndpointPathFromURL) => {
    if (!pathname) {
        throw ('url is missing for getEndpointPathFromURL()')
    }

    let formatedURL = pathname;
    if (moxyPrefix && pathname.includes(moxyPrefix)) {
        formatedURL = pathname.replace(moxyPrefix, '')
    }
    return formatedURL;
}

interface MatchEndpointPathToDB {
    endpoint: string,
    entrypointdDB: Array<Endpoints>
}

const matchEndpointPathToDB = ({ endpoint, entrypointdDB }: MatchEndpointPathToDB) => {
    return entrypointdDB.filter(ep=>ep.endpoint === endpoint)[0] || {};
}

export { getEndpointPathFromURL, matchEndpointPathToDB }