import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DefaultInfo, DefaultInfoProps } from './index';

export default {
  title: 'Components/DefaultInfo',
  component: DefaultInfo,
} as Meta;

const Template: Story<DefaultInfoProps> = (args) => <DefaultInfo {...args} />;

export const Base = Template.bind({});
Base.args = {
  detail_data: {
    product: { id: 1, name: 'Overweight Hoodie', price: 25000 },
    small_category: { id: 1, name: 'Hoodies' },
    big_category: { id: 1, name: 'Apparel' },
    tags: [{ id: 1, name: 'Trendy' }],
    options: [
      {
        id: 1,
        name: 'Color',
        option_properties: [
          { id: 1, name: 'Red', additional_price: 0, base: true, option_id: 1 },
          { id: 2, name: 'Black', additional_price: 0, base: false, option_id: 1 },
          { id: 3, name: 'Blue', additional_price: 0, base: false, option_id: 1 },
          { id: 4, name: 'White', additional_price: 0, base: false, option_id: 1 },
        ],
      },
      {
        id: 2,
        name: 'Size',
        option_properties: [
          { id: 5, name: 'S', additional_price: 0, base: true, option_id: 2 },
          { id: 6, name: 'M', additional_price: 2000, base: false, option_id: 2 },
          { id: 7, name: 'L', additional_price: 5000, base: false, option_id: 2 },
          { id: 8, name: 'XL', additional_price: 7000, base: false, option_id: 2 },
        ],
      },
    ],
  },
};
