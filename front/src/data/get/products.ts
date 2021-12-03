import axios from 'axios';
import { GetProductsType } from '../../../../models/data.interface';

export default async function getProductsData() {
  try {
    const res = await axios.get<GetProductsType>('/@api/products');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
