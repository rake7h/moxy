import S from '../style.module.css';
import { MoreOption } from './more-option';
import { Badge } from '../../badge';

interface Props {
    data: {
        id: string,
        path: string
        name: string
        type: string
    }
}

const CollectionListCard: React.FC<Props> = (prop) => {
    const { id, name, path, type="json" } = prop.data;


    return (
        <>
            <div className={S.cardWrapper}>
                <div className={S.collectionCardContent}>
                    <div className={S.collectionCardLabel}>{name}</div>
                    <Badge type={type} />
                </div>
                <div>
                    <div>
                        <MoreOption defaultValues={{
                            id: id,
                            name: name,
                            path: path,
                            type: type
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export { CollectionListCard }