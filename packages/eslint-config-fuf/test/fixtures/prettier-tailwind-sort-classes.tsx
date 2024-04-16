/* eslint-disable */
import React from 'react';

import classNames from 'classnames';
import tv from 'tailwind-variants';

const cn = classNames;

// tailwind variants
const _variants = tv({
  base: 'px-4 bg-blue-500 text-base rounded text-white py-2'
});

const MyComponent = () => {
  const _outsideClassNames = classNames('px-4 bg-blue-500 text-base rounded text-white py-2');
  const _outsideCn = cn('px-4 bg-blue-500 text-base rounded text-white py-2');

  return (
    <div className="text-white rounded">
      <div className={classNames('text-white rounded')}>with classNames</div>
      <div className={cn('text-white rounded')}>with cn</div>
    </div>
  );
};

export default MyComponent;
