import S from '../style.module.css';
import { MoreOption } from './more-option';

interface Props {
  data: {
    id: string;
    path: string;
    name: string;
  };
}

const CollectionListCard: React.FC<Props> = (prop) => {
  const { id, name, path } = prop.data;

  return (
    <>
      <div className={S.cardWrapper}>
        <div className={S.cardMoxyDetails}>
          <div className={S.cardLeftDetails} style={{ width: '100%' }}>
            {name}
          </div>
          <div className={S.cardRightOptions}>
            <MoreOption
              defaultValues={{
                id: id,
                name: name,
                path: path,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { CollectionListCard };
