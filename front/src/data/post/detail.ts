import axios from 'axios';
import { PostDetailType } from '../../../../models/data.interface';

async function postDetailData(data: PostDetailType) {
  try {
    console.log(data);
    await axios.post(`/@api/detail/addToCart`, JSON.stringify(data), {
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

export default postDetailData;
