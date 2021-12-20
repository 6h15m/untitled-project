import React from 'react';
import { Meta, Story } from '@storybook/react';

import { OptionProperty, OptionPropertyProps } from './index';

export default {
  title: 'components/OptionProperty',
  component: OptionProperty,
} as Meta;

const Template: Story<OptionPropertyProps> = (args) => <OptionProperty {...args} />;

export const Base = Template.bind({});
Base.args = {
  option_property: { id: 1, name: 'Red', additional_price: 0, base: true, option_id: 1 },
};
