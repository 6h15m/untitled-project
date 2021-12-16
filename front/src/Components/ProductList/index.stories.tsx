import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Product } from '../Product';
import { ProductList, ProductListProps } from './index';

export default {
  title: 'Components/ProductList',
  component: ProductList,
  subcomponents: { Product },
} as Meta;

export const Empty: Story<ProductListProps> = (args) => <ProductList {...args} />;
Empty.args = { products_data: { products: [] } };

export const OneItem: Story<ProductListProps> = (args) => (
  <ProductList {...args}>
    <Product product={args.products_data.products[0]} />
  </ProductList>
);
OneItem.args = {
  products_data: {
    products: [
      {
        id: 1,
        name: 'Overweight Hoodie',
        price: 25000,
        small_category_id: 1,
        tags: [{ id: 1, name: 'Trendy' }],
      },
    ],
  },
};
