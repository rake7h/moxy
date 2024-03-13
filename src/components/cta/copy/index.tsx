import React from 'react';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}
const CopyCta: React.FC<Props> = ({ onClick }) => {
  return (
    <button className='btn btn-icon' onClick={onClick}>
      <Image src='/icons/copy.svg' alt='...' width='26' height='26' />
    </button>
  );
};

export { CopyCta };
