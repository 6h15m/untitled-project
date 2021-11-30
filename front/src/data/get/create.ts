import axios from 'axios';
import { CreateType } from '../../models/create.interface';

async function getCategoryData() {
  try {
    const res = await axios.get<CreateType>('/@api/create');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getCategoryData;
