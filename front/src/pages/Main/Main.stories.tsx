import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Main } from './index';

export default {
  title: 'pages/Main',
  component: Main,
} as unknown as Meta;

const Template: Story = (args) => <Main {...args} />;

export const base = Template;
