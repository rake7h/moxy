'use client';

import React from 'react';
import S from './styles.module.css';

interface Props {
  code: string;
}

const CodeBlock: React.FC<Props> = ({ code }) => {
  return (
    <div>
      <code> {code}</code>
    </div>
  );
};

export { CodeBlock };
