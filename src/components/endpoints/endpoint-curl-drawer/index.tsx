'use client';

import React from 'react';
import { Drawer } from '../../drawer';
import 'react-modern-drawer/dist/index.css';
import { Actions } from './actions';
import { CodeBlock } from '../../code/code-block';
import S from './styles.module.css';

interface Props {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  defaultValues?: Inputs;
  canEdit?: boolean;
  canDelete?: boolean;
}

type Inputs = {
  id: string;
  endpoint: string;
  moxy: string;
  targetUrl: string;
  collectionId: string;
};

const EndpointDrawer: React.FC<Props> = ({
  canDelete,
  canEdit,
  isOpen,
  setOpen,
  defaultValues = {},
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      setOpen={setOpen}
      actions={<Actions canDelete={canDelete} canEdit={canEdit} />}
      direction='bottom'
      size='16%'
    >
      <div className={S.container}>
        <div className={S.codeBlock}>
          <CodeBlock code='jjkdls jdklasjd http:/m///.com'></CodeBlock>
        </div>
      </div>
    </Drawer>
  );
};

export default EndpointDrawer;
