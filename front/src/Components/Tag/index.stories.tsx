import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Tag, TagProps } from './index';

export default {
  title: 'Components/Tag',
  component: Tag,
} as Meta;

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const Base = Template.bind({});
Base.args = {
  tag: { id: 2, name: 'Modern' },
};
