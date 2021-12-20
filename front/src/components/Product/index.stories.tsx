import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Product, ProductProps } from './index';

export default {
  title: 'components/Product',
  component: Product,
} as Meta;

const Template: Story<ProductProps> = (args) => <Product {...args} />;

const sample_product_data = {
  id: 1,
  name: 'Overweight Hoodie',
  price: 25000,
  small_category_id: 1,
  tags: [{ id: 1, name: 'Trendy' }],
};

export const Base = Template.bind({});
Base.args = {
  product: sample_product_data,
};

export const NoTags = Template.bind({});
NoTags.args = {
  product: { id: 2, name: 'Crop Hoodie', price: 20000, small_category_id: 1, tags: [] },
};
