import { HeaderComponent } from '../../components/Header/HeaderComponent.js';
import { FooterComponent } from '../../components/Footer/FooterComponent.js';
import { CategoryComponent } from '../../components/Category/CategoryComponent.js';
import { ProductComponent } from '../../components/Product/ProductComponent.js';

(async () => {
  // 웹 컴포넌트 등록
  customElements.define(HeaderComponent.componentName, HeaderComponent);
  customElements.define(FooterComponent.componentName, FooterComponent);
  customElements.define(CategoryComponent.componentName, CategoryComponent);
  customElements.define(ProductComponent.componentName, ProductComponent);
  const body_el = document.body;
  const header_component_el = new HeaderComponent();
  const category_component_el = new CategoryComponent();
  const footer_component_el = new FooterComponent();
  const product_component_el = new ProductComponent();
  body_el.appendChild(header_component_el);
  body_el.appendChild(category_component_el);
  body_el.appendChild(product_component_el);
  body_el.appendChild(footer_component_el);
})()
  .then(() => {
    console.log('JS 스크립트 실행 완료');
  })
  .catch((error) => {
    console.error(error);
  });
