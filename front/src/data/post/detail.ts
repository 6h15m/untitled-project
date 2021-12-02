import axios from 'axios';
import { SendDetailType } from '../../../../models/detail.interface';

async function postDetailData(data: SendDetailType) {
  try {
    console.log(data);
    await axios.post(`/@api/detail/addToCart`, JSON.stringify(data), {
      headers: {
        'Content-Type': `application/json`,
      },
    });
    console.log('add cart' + data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default postDetailData;
