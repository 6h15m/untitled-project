import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Option, OptionProps } from './index';
import { OptionProperty } from '../OptionProperty';

export default {
  title: 'Components/Option',
  component: Option,
  subcomponents: { OptionProperty },
} as Meta;

export const Empty: Story<OptionProps> = (args) => <Option {...args} />;
Empty.args = {
  option: {
    id: 1,
    name: 'Color',
    option_properties: [],
  },
};
