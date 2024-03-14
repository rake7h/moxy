const fetchCollections = async (name: string) => {
  const path = name ? `/api/collections/${name}` : '/api/collections';

  const res = await fetch(path);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export { fetchCollections };
