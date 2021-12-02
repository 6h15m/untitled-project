import axios from 'axios';
import { DeleteDetailedProductIdType } from '../../../../models/cart.interface';

async function deleteCartData(data: DeleteDetailedProductIdType) {
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
