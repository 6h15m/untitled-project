import React from 'react';
import { Meta, Story } from '@storybook/react';

import { SearchPage, SearchPageProps } from './index';

export default {
  title: 'Pages/SearchPage',
  component: SearchPage,
} as Meta;

const Template: Story<SearchPageProps> = (args) => <SearchPage {...args} />;
