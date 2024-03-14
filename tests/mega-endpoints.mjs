import fs from 'fs-extra';

const generateLargeEndpoints = () => {
  const t = 10000;

  let data = {
    data: [],
  };

  const sample = (i) => {
    return {
      id: i,
      endpoint: `v1/users/get/${i}`,
      moxyType: 'mock',
      proxyDetails: {
        targetHost: 'https://example.user.me/*',
      },
      mockDetails: {
        collectionId: 'users',
      },
    };
  };
  for (let i = 0; i < t; i++) {
    data.data.push(sample(i));
  }
  const path = process.cwd() + '/db/endpoints.db.json';

  fs.outputJsonSync(path, data);
};

generateLargeEndpoints();
