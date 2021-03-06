import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header } from './index';

export default {
  title: 'components/Header',
  component: Header,
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const base = Template;
