import axios from 'axios';
import { CategoryType } from '../models/category.interface';

async function getCategoryData() {
  try {
    const res = await axios.get<CategoryType>('/@api/categorySelectAll');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getCategoryData;
