'use client';

import React from 'react';
import S from '../styles.module.css';

interface Props {
  title: string;
  subtitle?: string;
  actionChildren?: React.ReactNode;
}

const OutletHeader: React.FC<Props> = ({ title, subtitle, actionChildren }) => {
  return (
    <header className={S.outletHeader}>
      <div className={S.outletHeaderMain}>
        <div>
          <h1 className={S.outletHeaderTitle}>{title}</h1>
        </div>
        <div className={S.outletHeaderActions}>{actionChildren}</div>
      </div>
      <div className={S.outletHeaderSec}>
        <h2 className={S.outletHeaderSubTitle}>{subtitle}</h2>
      </div>
    </header>
  );
};

export { OutletHeader };
