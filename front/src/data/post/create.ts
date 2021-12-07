import { PostCreateType } from '../../../../models/data.interface';
import axios from 'axios';

export default async function postCreateData(data: PostCreateType) {
  try {
    await axios.post(`/@api/create`, JSON.stringify(data), {
      headers: {
        'Content-Type': `application/json`,
      },
    });
    console.log(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
