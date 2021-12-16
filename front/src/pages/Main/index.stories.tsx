import React from 'react';
import { Meta, Story } from '@storybook/react';

import { MainPage, MainPageProps } from './index';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
} as Meta;

const Template: Story<MainPageProps> = (args) => <MainPage {...args} />;

export const Base = Template.bind({});
