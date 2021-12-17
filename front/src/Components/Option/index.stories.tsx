import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OptionProperty } from '../index';
import { Option, OptionProps } from './index';

export default {
  title: 'Components/Option',
  component: Option,
  subcomponents: { OptionProperty },
} as Meta;

export const NoOptionProperties: Story<OptionProps> = (args) => <Option {...args} />;
NoOptionProperties.args = {
  option: {
    id: 1,
    name: 'Color',
    option_properties: [],
  },
};

export const hasOptionProperties: Story<OptionProps> = (args) => <Option {...args} />;
hasOptionProperties.args = {
  option: {
    id: 1,
    name: 'Color',
    option_properties: [
      { id: 1, name: 'Red', additional_price: 0, base: true, option_id: 1 },
      { id: 2, name: 'Black', additional_price: 0, base: false, option_id: 1 },
      { id: 3, name: 'Blue', additional_price: 0, base: false, option_id: 1 },
      { id: 4, name: 'White', additional_price: 0, base: false, option_id: 1 },
    ],
  },
};
