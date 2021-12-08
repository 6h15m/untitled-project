import axios from 'axios';
import { GetProductsType } from '../../../../models/data.interface';

export default async function getSearchData(query: string) {
  try {
    const res = await axios.get<GetProductsType>(`/@api/search/${query}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
