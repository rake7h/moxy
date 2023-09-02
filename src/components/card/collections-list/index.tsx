import S from '../style.module.css';
import { MoreOption } from './more-option';

interface Props {
    data: {
        id: string,
        path: string
        name: string
    }
}

const CollectionListCard: React.FC<Props> = (prop) => {
    const { id, name, path } = prop.data;

    return (
        <>
            <div className={S.cardWrapper}>
                <div>{name}</div>
                <div>
                    <div>
                        <MoreOption defaultValues={{
                            id: id,
                            name: name,
                            path: path,
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export { CollectionListCard }