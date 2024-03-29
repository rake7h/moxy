import { readEndpointsFromDB } from '@/helpers/db/selectors';

interface getEndpointPathFromURL {
  url: string;
  moxyPrefix?: string;
}

/*
if (queries.endpoint?.length) {
    pathname = `/${queries.endpoint.join('/')}`
  }
*/

/**
 * /moxy/v1/users/get --> /v1/users/get
 */
const getEndpointPathFromURL = ({
  url,
  moxyPrefix = '/moxy',
}: getEndpointPathFromURL): {
  pathname: string;
  params: Record<string, string>;
} => {
  if (!url) {
    throw 'url is missing for getEndpointPathFromURL()';
  }
  const { pathname, searchParams } = new URL(
    url.replace(moxyPrefix, ''),
    'http://fake-base-host.com',
  );
  const params = Object.fromEntries(searchParams.entries());

  return { pathname, params };
};

interface MatchEndpointPathToDB {
  pathname: string;
}

const matchEndpointPathToDB = async ({ pathname }: MatchEndpointPathToDB) => {
  const endpoints = await readEndpointsFromDB();
  return endpoints.data.filter((ep) => ep.endpoint === pathname)[0] || {};
};

const findEndpointGroup = (allEndpoints) => {
  const group = [];
  const makeGroupName = (n: string) => {
    return n.split('/')[1];
  };

  allEndpoints.data.forEach((d) => {
    const g = makeGroupName(d.endpoint);
    const itemIndex = group.findIndex(({ name }) => name === g);
    if (itemIndex > -1) {
      group[itemIndex].items.push(d);
    } else {
      group.push({
        name: g,
        items: [d],
      });
    }
  });
  return group;
};

export { getEndpointPathFromURL, matchEndpointPathToDB, findEndpointGroup };
