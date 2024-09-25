import React from 'react';

export const BackButton = () => {
  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <a onClick={goBack} className='hover:underline cursor-pointer' >
      &#x2190; voltar
    </a>
  );
};
