import axios from 'axios';
import { GetProductsType } from '../../../../models/data.interface';

export default async function getProductsData(small_category_id: number, big_category_id: number) {
  try {
    const res = small_category_id
      ? await axios.get<GetProductsType>(`/@api/productsFromSmallCategoryId/${small_category_id}`)
      : big_category_id
      ? await axios.get<GetProductsType>(`/@api/productsFromBigCategoryId/${big_category_id}`)
      : await axios.get<GetProductsType>('/@api/products');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
