import axios from 'axios';
import { DeleteCartType } from '../../../../models/data.interface';

async function deleteCartData(data: DeleteCartType) {
  try {
    console.log(data);
    await axios.delete(`/@api/cart/deleteCartProduct`, {
      data: data
    });
    console.log('delete cart' + data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default deleteCartData;
