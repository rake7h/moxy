import S from '../style.module.css';
import Image from 'next/image'
import { MoreOption } from './more-option';
import React from 'react';

interface Item {
    id: string
    endpoint: string,
    moxyType: 'proxy' | 'mock',
    mockDetails: {
        collectionId: string
    }
    proxyDetails: {
        protocal: "https" | 'https',
        targetHost: string
    }
}

type EndpointListCardProps = Item

interface GroupListProps {
    data: {
        name: string,
        items: Array<Item>
    }
}

const EndpointList: React.FC<GroupListProps> = ({ data }) => {
    const { name, items } = data;

    return (
        <>
            {items.length > 1 && <div>
                <h1 className={S.groupNameText}>/{name}</h1>
            </div>}
            <div className={S.cardWrapper} >
                {items.map(i => (
                    <EndpointListCard
                        key={i.id}
                        id={i.id}
                        endpoint={i.endpoint}
                        mockDetails={i.mockDetails}
                        moxyType={i.moxyType}
                        proxyDetails={i.proxyDetails} />
                ))
                }
            </div>
        </>
    )
}

const EndpointListCard: React.FC<EndpointListCardProps> = ({ id, endpoint, mockDetails, moxyType, proxyDetails }) => {

    return (
        <>
            <div className={S.cardMoxyDetails}>
                <div className={S.cardLeftDetails} >
                    <div title={endpoint} className={S.cardUrl}>{endpoint}</div>
                </div>
                <div className={S.cardCenterIcon}>
                    <Image src="/icons/arrow.svg" alt="" width="38" height="17" />
                </div>
                <div className={S.cardRightDetails}>
                    <div className={S.cardTargetDetails}>
                        {moxyType === "mock" &&
                            <>
                                <Image className={S.cardTargetIcon} src="/icons/collection.svg" alt="" width="26" height="26" />
                                <div title={mockDetails?.collectionId} className={S.cardUrl}>{mockDetails?.collectionId}</div>
                            </>
                        }
                        {moxyType === "proxy" &&
                            <>
                                <Image className={S.cardTargetIcon} src="/icons/proxy.svg" alt="" width="26" height="26" />
                                <div title={proxyDetails.targetHost} className={S.cardUrl}>{proxyDetails.targetHost}</div>
                            </>
                        }
                    </div>
                </div>
                <div className={S.cardRightOptions}>
                    <MoreOption defaultValues={{
                        id: id,
                        endpoint: endpoint,
                        moxy: moxyType,
                        targetUrl: proxyDetails.targetHost,
                        collectionId: mockDetails?.collectionId
                    }} />
                </div>
            </div>
        </>
    )
}


export { EndpointList }