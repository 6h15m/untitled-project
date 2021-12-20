import React from 'react';
import { Meta, Story } from '@storybook/react';

import { CategoryList, CategoryListProps } from './index';

export default {
  title: 'components/CategoryList',
  component: CategoryList,
} as Meta;

const Template: Story<CategoryListProps> = (args) => <CategoryList {...args} />;

const sample_categories_data = {
  big_categories: [
    { id: 1, name: 'Apparel' },
    { id: 2, name: 'Accessories' },
    { id: 3, name: 'Stationary' },
  ],
  small_categories: [
    { id: 1, name: 'Hoodies', big_category_id: 1 },
    { id: 2, name: 'T-shirts', big_category_id: 1 },
    { id: 3, name: 'Pants', big_category_id: 1 },
    { id: 4, name: 'Pouches', big_category_id: 2 },
    { id: 5, name: 'Bags', big_category_id: 2 },
    { id: 6, name: 'Keychains', big_category_id: 2 },
    { id: 7, name: 'Jewelry', big_category_id: 2 },
    { id: 8, name: 'Tin Cases', big_category_id: 3 },
    { id: 9, name: 'Mouse Pads', big_category_id: 3 },
    { id: 10, name: 'Pens', big_category_id: 3 },
  ],
};

export const NoSelectedBigProductId = Template.bind({});
NoSelectedBigProductId.args = {
  categories_data: sample_categories_data,
};

export const hasSelectedBigProductId = Template.bind({});
hasSelectedBigProductId.args = {
  categories_data: sample_categories_data,
  selected_big_category_id: 2,
};
