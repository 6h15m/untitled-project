import axios from 'axios';
import { GetCategoriesType, TagType } from '../../../../models/data.interface';

export default async function getCreateData() {
  try {
    const res_categories = await axios.get<GetCategoriesType>('/@api/categories');
    const res_tags = await axios.get<Array<TagType>>('/@api/tags');
    return { categories: res_categories.data, tags: res_tags.data };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
