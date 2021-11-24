import { PRODUCTS } from '../../sample-data';
import { map, pipe } from '@fxts/core';
import {
  getSmallCategoryNameById,
  getBigCategoryNameBySmallId,
  getTagIdByProductId,
  getTagNameById,
  getOptionNameByOptionId,
  getOptionPropertyByOptionId,
  getOptionIdByProductId,
} from '../../common-db';
import join from '../../join';
import styl from './styl';

export class DetailComponent extends HTMLElement {
  static get componentName() {
    return 'detail-component';
  }

  constructor(product_id: number) {
    super();
    const p = PRODUCTS[product_id - 1];
    const getAdditionalPrice = (additional_price: number) =>
      additional_price === 0 ? '' : `(+${additional_price})`;
    const detailContent = `
      <div class="wrap">
        <div class="product-image"></div>
        <div class="product-info">
          <div class="product-category">${getBigCategoryNameBySmallId(
            p.small_category_id,
          )} > ${getSmallCategoryNameById(p.small_category_id)}
          </div>
          <h2 class="product-name">${p.product_name}</h2>
          <div class="product-tags">
            ${
              pipe(
                getTagIdByProductId(p.product_id),
                map(
                  (t_id) => `
                  <div class="tag-name">
                    # ${getTagNameById(t_id)}
                  </div>
                  `,
                ),
                join(''),
              ) ?? ''
            }
          </div>
          <div class="product-options">
            ${pipe(
              getOptionIdByProductId(p.product_id),
              map(
                (o) => `
                <div class="option-name">${getOptionNameByOptionId(o.option_id)}</div>
                <div class="option-property-container">
                  ${pipe(
                    getOptionPropertyByOptionId(o.option_id),
                    map(
                      (op) => `
                      <div class="option-property">
                        <input type="radio" value=${op.option_property_id} name=${o.option_id} id=${
                        op.option_property_id
                      } ${op.option_property_base ? `checked` : ``}>
                        <label for=${op.option_property_id}>${op.option_property_name}${getAdditionalPrice(
                        op.option_property_additional_price,
                      )}</label>
                      </div>
                      `,
                    ),
                    join(''),
                  )}
                </div>
              `,
              ),
              join(''),
            )}
            <div class="option-name">EA</div>
            <div class="option-property-container">
              <div class="product-amount-container">
                <input type="button" value="-" class="amount-control"/>
                <div class="product-amount">1</div>
                <input type="button" value="+" class="amount-control" />
              </div>
            </div>
          </div>
          <div class="product-bottom">
            <div class="product-price">
              ${p.product_price.toLocaleString('ko-KR')}
            </div>
            <button class="cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

    const detailStyle = document.createElement('style');
    detailStyle.textContent = styl;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = detailContent;
    shadowRoot.appendChild(detailStyle);
  }
}
