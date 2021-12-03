import axios from 'axios';
import { GetCategoriesType } from '../../../../models/data.interface';

export default async function getCategoriesData() {
  try {
    const res = await axios.get<GetCategoriesType>('/@api/categories');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
