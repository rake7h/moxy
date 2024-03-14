'use client';

import React, { useState } from 'react';
import 'react-modern-drawer/dist/index.css';
import dynamic from 'next/dynamic';

const EndpointDrawer = dynamic(() => import('../new-endpoint/index'), {
  loading: () => null,
  ssr: false,
});

interface Props {
  text?: string;
}

const EndpointHeaderActions: React.FC<Props> = ({ text }) => {
  const [isDrawerOpen, setDrawer] = useState(false);

  const handleNewClick = () => {
    setDrawer(true);
  };

  return (
    <>
      <button className='btn btn-primary' onClick={handleNewClick}>
        New
      </button>
      {isDrawerOpen && (
        <EndpointDrawer isOpen={isDrawerOpen} setOpen={setDrawer} />
      )}
    </>
  );
};

export { EndpointHeaderActions };
