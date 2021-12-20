import React from 'react';
import useSWR from 'swr';
import { GetCategoriesType, TagType } from '../../../../models/data.interface';
import { fetcher } from '../../@utils';
import { Create, Header } from '../../components';

export interface CreatePageProps {}

export const CreatePage = ({}: CreatePageProps) => {
  const { data: categories_data } = useSWR<GetCategoriesType>('/api/categories', fetcher);
  const { data: tags_data } = useSWR<Array<TagType>>('/api/tags', fetcher);

  return (
    <>
      <Header />
      {categories_data && tags_data && <Create categories_data={categories_data} tags_data={tags_data} />}
    </>
  );
};
