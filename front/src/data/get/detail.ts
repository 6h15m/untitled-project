import axios from 'axios';
import { GetDetailType } from '../../../../models/data.interface';

async function getDetailData(product_id: number) {
  try {
    const res = await axios.get<GetDetailType>(`/@api/detail/${product_id}`);
    console.log(res.data)
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getDetailData;