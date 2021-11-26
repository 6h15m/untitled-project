import { filter, map, pipe } from '@fxts/core';
import join from '../../join';
import styl from './styl';
import { DetailType } from '../../models/detail.interface';

export class DetailComponent extends HTMLElement {
  static get componentName() {
    return 'detail-component';
  }

  constructor(detail_data: DetailType) {
    super();
    const getAdditionalPrice = (additional_price: number) =>
      additional_price === 0 ? '' : `(+${additional_price})`;
    const detailContent = `
      <div class="wrap">
        <div class="product-image"></div>
        <div class="product-info">
          <div class="product-category">${
            detail_data.big_category.big_category_name
          } > ${detail_data.small_category.small_category_name}
          </div>
          <h2 class="product-name">${detail_data.product.product_name}</h2>
          <div class="product-tags">
            ${
              pipe(
                detail_data.tags,
                map(
                  (t) => `
                  <div class="tag-name">
                    # ${t.tag_name}
                  </div>
                  `,
                ),
                join(''),
              ) ?? ''
            }
          </div>
          <div class="product-options">
            ${pipe(
              detail_data.options,
              map(
                (o) => `
                <div class="option-name">${o.option_name}</div>
                <div class="option-property-container">
                  ${pipe(
                    detail_data.option_properties_all,
                    filter(all => (all.option_id === o.option_id)),
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
              ${detail_data.product.product_price.toLocaleString('ko-KR')}
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
