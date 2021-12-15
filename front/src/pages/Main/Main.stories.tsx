import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MainPage } from './index';

export default {
  title: 'pages/Main',
  component: MainPage,
} as unknown as Meta;

const Template: Story = (args) => <MainPage {...args} />;

export const base = Template;
