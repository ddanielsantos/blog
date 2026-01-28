import React from 'react';

export const BackButton = () => {
  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <button onClick={goBack} className='hover:underline cursor-pointer w-fit' >
      &#x2190; voltar
    </button>
  );
};
