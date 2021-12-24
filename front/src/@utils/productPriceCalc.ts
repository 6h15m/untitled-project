import { map, pipe, reduce } from '@fxts/core';
import { GetCard } from '../../../models/model.interface';

export const productPriceCalc = (cart_data: GetCard) => {
  return (
    cart_data.detailed_product.price +
    (pipe(
      cart_data.detailed_product.option_properties,
      map((option_properties) => option_properties.additional_price),
      reduce((a, b) => a + b),
    ) || 0)
  );
};
