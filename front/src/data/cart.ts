import axios from 'axios';
import { CartsType } from '../models/cart.interface';

export default async function getCartsData(user_id: string) {
  try {
    const res = await axios.get<CartsType>(`/@api/cart/${user_id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}