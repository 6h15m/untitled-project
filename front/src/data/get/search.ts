import axios from 'axios';
import { GetProductsType } from '../../../../models/data.interface';

export default async function getSearchData(query: string) {
  try {
    const res = query
      ? await axios.get<GetProductsType>(`/@api/search/${query}`)
      : await axios.get<GetProductsType>('/@api/products');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
