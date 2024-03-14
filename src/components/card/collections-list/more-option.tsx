'use client';

import React, { useState } from 'react';
import { MoreCta } from '../../cta/more';
import dynamic from 'next/dynamic';
import { copyToClipBoard } from '@/helpers/utils/clipboard';

const NewCollectionDrawer = dynamic(
  () => import('../../collections/new-collection'),
  {
    loading: () => null,
    ssr: false,
  },
);

interface Props {
  defaultValues: {
    id: string;
    name: string;
    path: string;
  };
}

const MoreOption: React.FC<Props> = ({ defaultValues }) => {
  const [isDrawerOpen, setDrawer] = useState(false);

  const actions = [
    {
      name: 'Edit',
      action: () => setDrawer(true),
    },
    {
      name: 'Copy URL',
      action: () => {
        copyToClipBoard(
          `${window.location.host}/api/collections/${defaultValues.name}`,
        );
      },
    },
  ];

  return (
    <>
      <MoreCta actions={actions} />

      {isDrawerOpen && (
        <NewCollectionDrawer
          isOpen={isDrawerOpen}
          setOpen={setDrawer}
          defaultValues={defaultValues}
          canEdit
          canDelete
        />
      )}
    </>
  );
};

export { MoreOption };
