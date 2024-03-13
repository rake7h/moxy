import { headers } from 'next/dist/client/components/headers';

const fetchCreateCollection = async (data) => {
  const path = '/api/collections';

  const res = await fetch(path, {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers: {
      'content-type': 'application/json',
    },
  });
  return res.json();
};

const fetchDeleteCollection = async (id: string) => {
  const url = '/api/collections';
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export { fetchCreateCollection, fetchDeleteCollection };
