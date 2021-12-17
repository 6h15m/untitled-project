import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DetailPage, DetailPageProps } from './index';

export default {
  title: 'Pages/DetailPage',
  component: DetailPage,
} as Meta;

const Template: Story<DetailPageProps> = (args) => <DetailPage {...args} />;

export const NoProductId = Template.bind({});

export const HasProductId = Template.bind({});
HasProductId.args = { product_id: 4 };
