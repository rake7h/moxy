import S from '../style.module.css';
import { MoreOption } from './more-option';
import { CopyOption } from './copy-option';

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
                        <CopyOption defaultValues={{
                            id: id,
                            name: name,
                            path: path,
                        }} />
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