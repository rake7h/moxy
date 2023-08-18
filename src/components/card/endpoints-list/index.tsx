import S from '../style.module.css';
import Image from 'next/image'
import { MoreOption } from './more-option';
import { CopyOption } from './copy-option';

interface Props {
    data: {
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
}

const EndpointListCard: React.FC<Props> = (prop) => {
    const { id, endpoint, mockDetails, moxyType, proxyDetails } = prop.data;

    console.log('prop.data', prop.data)

    return (
        <>
            <div className={S.cardWrapper}>
                <div className={S.cardMoxyDetails}>
                    <div className={S.cardLeftDetails} >
                        <div className={S.cardLabel}>Route</div>
                        <div title={endpoint} className={S.cardUrl}>{endpoint}</div>
                    </div>
                    <div className={S.cardCenterIcon}>
                        <Image src="/icons/arrow.svg" alt="" width="38" height="17" />
                    </div>
                    <div className={S.cardRightDetails}>
                        <div className={S.cardLabel}>Target</div>
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
                        <CopyOption defaultValues={{
                            id: id,
                            endpoint: endpoint,
                            moxy: moxyType,
                            targetUrl: proxyDetails.targetHost,
                            collectionId: mockDetails?.collectionId
                        }} />
                        <MoreOption defaultValues={{
                            id: id,
                            endpoint: endpoint,
                            moxy: moxyType,
                            targetUrl: proxyDetails.targetHost,
                            collectionId: mockDetails?.collectionId
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export { EndpointListCard }