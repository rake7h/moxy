'use client';

import React from 'react';
import { default as D } from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import S from './styles.module.css';

interface Props {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

const Drawer: React.FC<Props> = ({
  isOpen,
  setOpen,
  title,
  actions,
  children,
  size = '40%',
  direction = 'right',
}) => {
  return (
    <D
      open={isOpen}
      onClose={() => setOpen(false)}
      direction={direction}
      className={S.drawerRoot}
      size={size}
    >
      {title && (
        <div className={S.drawerHeader}>
          <div>
            <h1 className={S.drawerHeaderTitle}>{title}</h1>
          </div>
          <div className={S.drawerActions}>{actions}</div>
        </div>
      )}
      <div className={S.drawerBody}>{children}</div>
    </D>
  );
};

export { Drawer };
