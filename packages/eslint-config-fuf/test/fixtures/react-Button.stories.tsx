/* eslint-disable */

// TODO: currently we only check that formatting is working at all

import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './support/Button';

const meta: Meta<typeof Button> = {
      component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
