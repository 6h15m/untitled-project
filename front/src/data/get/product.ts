import axios from 'axios';
import { ProductsType } from '../../../../models/product.interface';

async function getProductData() {
  try {
    const res = await axios.get<ProductsType>('/@api/productSelectAll');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getProductData;
