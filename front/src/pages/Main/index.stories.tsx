import React from 'react';
import { Meta, Story } from '@storybook/react';

import { MainPage, MainPageProps } from './index';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
} as Meta;

const Template: Story<MainPageProps> = (args) => <MainPage {...args} />;

export const NoSelected = Template.bind({});
NoSelected.args = { selected_small_category_id: null, selected_big_category_id: null };

export const BigCategorySelected = Template.bind({});
BigCategorySelected.args = { selected_small_category_id: null, selected_big_category_id: 2 };

export const SmallCategorySelected = Template.bind({});
SmallCategorySelected.args = { selected_small_category_id: 1, selected_big_category_id: null };
