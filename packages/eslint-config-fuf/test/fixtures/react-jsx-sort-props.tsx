/* eslint-disable */

import Button from './support/Button';

// Props should be alphabetically sorted
// Reserved props (key, ref) should come first
// But other shorthand props don't need to be listed first
const Example = () => {
  const items = [
    { id: 1, label: 'First' },
    { id: 2, label: 'Second' },
  ];

  return (
    <div>
      {items.map((item) => {
        return (
          <Button
            disabled
            key={item.id}
            label={item.label}
            primary
            onClick={() => {
              console.log('clicked');
            }}
            aria-label="Primary button"
          />
        );
      })}
    </div>
  );
};

export default Example;
