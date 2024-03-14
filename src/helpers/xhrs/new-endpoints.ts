const fetchCreateEndpoint = async (data) => {
  const path = '/api/endpoints';
  try {
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({ data }),
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

const fetchDeleteEndpoint = async (id: string) => {
  const url = '/api/endpoints';
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

export { fetchCreateEndpoint, fetchDeleteEndpoint };
