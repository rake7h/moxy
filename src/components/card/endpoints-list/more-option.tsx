'use client';

import React, { useState } from 'react';
import { MoreCta } from '../../cta/more';
import dynamic from 'next/dynamic';
import { copyToClipBoard } from '@/helpers/utils/clipboard';

const EndpointDrawer = dynamic(() => import('../../endpoints/new-endpoint'), {
  loading: () => null,
  ssr: false,
});

const EndpointCurlViewDrawer = dynamic(
  () => import('../../endpoints/endpoint-curl-drawer'),
  {
    loading: () => null,
    ssr: false,
  },
);

interface Props {
  defaultValues: {
    id: string;
    endpoint: string;
    moxy: string;
    targetUrl: string;
    collectionId: string;
  };
}

const MoreOption: React.FC<Props> = ({ defaultValues }) => {
  const [editDrawer, setEditDrawer] = useState(false);
  const [curlDrawer, setCurlDrawer] = useState(false);

  const actions = [
    {
      name: 'Edit',
      action: () => setEditDrawer(true),
    },
    {
      name: 'Curl',
      action: () => setCurlDrawer(true),
    },
  ];

  return (
    <>
      <MoreCta actions={actions} />
      {editDrawer && (
        <EndpointDrawer
          isOpen={editDrawer}
          setOpen={setEditDrawer}
          defaultValues={defaultValues}
          canEdit
          canDelete
        />
      )}
      {curlDrawer && (
        <EndpointCurlViewDrawer
          isOpen={curlDrawer}
          setOpen={setCurlDrawer}
          defaultValues={defaultValues}
        />
      )}
    </>
  );
};

export { MoreOption };
