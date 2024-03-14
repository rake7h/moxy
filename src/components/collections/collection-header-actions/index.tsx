'use client';

import React, { useState } from 'react';
import 'react-modern-drawer/dist/index.css';
import dynamic from 'next/dynamic';

const NewCollectionDrawer = dynamic(() => import('../new-collection'), {
  loading: () => null,
  ssr: false,
});

interface Props {
  text?: string;
}

const HeaderActions: React.FC<Props> = ({ text }) => {
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
        <NewCollectionDrawer isOpen={isDrawerOpen} setOpen={setDrawer} />
      )}
    </>
  );
};

export { HeaderActions };
