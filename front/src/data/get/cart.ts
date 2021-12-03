import axios from 'axios';
import { GetCartsType } from '../../../../models/data.interface';

export default async function getCartsData(user_id: string) {
  try {
    const res = await axios.get<GetCartsType>(`/@api/cart/${user_id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}