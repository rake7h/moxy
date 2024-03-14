export const DB_DIR = (() => {
  let path = process.cwd();
  const { DB_PATH } = process.env;
  if (DB_PATH) return path + DB_PATH;
  return path + '/db'; // default to /db/
})();

export const ENDPOINTS_DB_FILE = 'endpoints.db.json';
export const COLLECTIONS_DB_FILE = 'collections.db.json';
export const COLLECTIONS_DB_PATH = '/collections/';
