const fetchCollections = async(name:string, type:string) => {
    const path = name ? `/api/collections/${name}` : '/api/collections'

    const res =  await fetch(path);
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    if(type === 'json') return res.json()
    return res.text()
}

export {fetchCollections}