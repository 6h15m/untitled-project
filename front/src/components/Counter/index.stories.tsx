import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Counter, CounterProps } from './index';

export default {
  title: 'components/Counter',
  component: Counter,
} as Meta;

const Template: Story<CounterProps> = (args) => <Counter {...args} />;

export const NoFunction = Template.bind({});
NoFunction.args = {
  default_count: 1,
};

export const ConsoleLogFunction = Template.bind({});
ConsoleLogFunction.args = {
  default_count: 2,
  changeCount: (count: number) => {
    console.log(count);
  },
};
