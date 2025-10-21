/* eslint-disable */

/* eslint-disable import-x/no-extraneous-dependencies */
/* eslint-disable import-x/no-unresolved */

import React from 'react';

import { cn, tv } from '@fuf-stack/pixel-utils';

// tailwind variants
const _variants = tv({
  base: 'px-4 bg-blue-500 text-base rounded text-white py-2'
});

const MyComponent = () => {
  const _outsideCn = cn('px-4 bg-blue-500 text-base rounded text-white py-2');

  return (
    <div className="text-white rounded">
      <div className={cn('text-white rounded')}>with cn</div>
    </div>
  );
};

export default MyComponent;
