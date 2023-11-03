import React from 'react';
import { OutletHeader } from '@/components/outlet/header/outlet-header'
import { OutletBody } from '@/components/outlet/outlet-body';
import { EndpointList } from '@/components/card/endpoints-list';
import {EndpointTableHeader} from '@/components/endpoints/endpoint-list-container'
import { EndpointHeaderActions } from '@/components/endpoints/endpoint-header-actions'
import { cookies } from 'next/headers'

export const revalidate = 0

async function getData() {

    // TODO: FIX it. I has to use some dynamic method to avoid automatic rendering of this page during build //
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    console.log({ theme })
    // TODO: FIX it. I has to use some dynamic method to avoid automatic rendering of this page during build //

    const url = process.env.APP_HOST + '/api/endpoints/?groupby=1' // '/api/endpoints/?groupby=1'
    const res = await fetch(url)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Page = async () => {
    const data = await getData()
    return (
        <>
            <OutletHeader title='Endpoints' subtitle="Api endpoints which are pointed to a record(JSON) or a target host for reverse proxy" actionChildren={<EndpointHeaderActions />} />
            <OutletBody>
              <EndpointTableHeader />
                {data.data.map((ep: any) => (
                    <EndpointList data={ep} key={ep.name} />
                ))}
            </OutletBody>
        </>
    )
}
export default Page