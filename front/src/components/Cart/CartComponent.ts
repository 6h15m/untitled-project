import { filter, map, pipe, reduce, take, toArray } from '@fxts/core';
import join from '../../join';
import styl from './styl';
import { CartsType } from '../../models/cart.interface';
import { ProductType } from '../../models/product.interface';

export class CartComponent extends HTMLElement {
  static get componentName() {
    return 'cart-component';
  }

  constructor(carts_data: CartsType) {
    super();
    let total_price: number; // TODO: 변수를 없애고 싶다
    let product_total_price: number[] = [];

    const sumAll = (iter: number[]) => reduce((a, b) => a + b, iter);

    const getProductById = (product_id: number) =>
      pipe(
        carts_data.products,
        filter((p) => p.product_id === product_id),
        take(1),
      ).next().value;

    const getProductByDetailedProductId = (detailed_product_id: number) =>
      getProductById(carts_data.detailed_products[detailed_product_id - 1].product_id);

    const getOptionPropertyById = (option_property_id: number) =>
      pipe(
        carts_data.option_properties,
        filter((p) => p.option_property_id === option_property_id),
        take(1),
      );

    const getDetailedProductOptionPropertyId = (detailed_product_id: number) =>
      pipe(
        carts_data.detailed_products_option_properties,
        filter((d) => (d.detailed_product_id === detailed_product_id ? d : null)),
        map((d) => d.option_property_id),
        toArray,
      );

    const cartContent = `
      <div class="wrap">
        <h2>${carts_data.user_id}'s Cart</h2>
        <div class="cart-product-container">
          ${pipe(
            carts_data.cart,
            map((c) => {
              const product: ProductType = getProductByDetailedProductId(c.detailed_product_id);
              let price = product.product_price; // TODO: 변수를 없애고 싶다
              return `
                <div class="cart-product">
                  <div class="product-container">
                    <div class="product">
                      <div class="product-left">
                        <a href="../detail?product_id=${product.product_id}" class="product-name">
                          ${product.product_name}
                        </a>
                        <div class="product-option-property">
                          ${pipe(
                            getDetailedProductOptionPropertyId(c.detailed_product_id),
                            map((pp_id) => {
                              const option_property = getOptionPropertyById(pp_id).next().value;
                              price += option_property.option_property_additional_price;
                              return `${option_property.option_property_name}(+${option_property.option_property_additional_price})`;
                            }),
                            join(', '),
                          )}
                        </div>
                      </div>
                      <div class="product-right">
                        <button value="delete" class='delete'>X</button>
                        <div class="price">${price.toLocaleString('ko-KR')}</div>
                      </div>
                    </div>
                    <div class="cart-product">
                      <div class="product-amount-container">
                        <input type="button" value="-" class="amount-control"/>
                        <div class="product-amount">${c.cart_product_amount}</div>
                        <input type="button" value="+" class="amount-control" />
                      </div>
                      <div class="product-total-price">
                        <!--TODO: 조금 더 아름다운 방법을 고민해보자-->
                        <div class="none">${product_total_price.push(price * c.cart_product_amount)}</div> 
                        ${(price * c.cart_product_amount).toLocaleString('ko-KR')}
                      </div>
                    </div>
                  </div>
                </div>`;
            }),
            join(''),
          )}
            </div>
            <div class="total-price-container">
              <!--TODO: 조금 더 아름다운 방법을 고민해보자-->
              <div class="none">${(total_price = sumAll(product_total_price))}</div>
                Total Price <div class="total-price">${total_price.toLocaleString('ko-KR')}</div>
            </div>
        </div>`;
    const cartStyle = document.createElement('style');
    cartStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = cartContent;
    shadowRoot.appendChild(cartStyle);
  }
}
