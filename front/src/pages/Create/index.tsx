import React from 'react';
import useSWR from 'swr';
import { CategoryListType, TagType } from '../../../../models/model.interface';
import { fetcher } from '../../@utils';
import { Create, Header } from '../../components';

export interface CreatePageProps {}

export const CreatePage = ({}: CreatePageProps) => {
  const { data: categories_data } = useSWR<CategoryListType>('/api/categories', fetcher);
  const { data: tags_data } = useSWR<Array<TagType>>('/api/tags', fetcher);

  return (
    <>
      <Header />
      {categories_data && tags_data && <Create categories_data={categories_data} tags_data={tags_data} />}
    </>
  );
};
