import axios from 'axios';
import { DetailType } from '../../../../models/detail.interface';

async function getDetailData(product_id: number) {
  try {
    const res = await axios.get<DetailType>(`/@api/detail/${product_id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getDetailData;