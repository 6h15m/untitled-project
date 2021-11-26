import { HeaderComponent } from '../../components/Header/HeaderComponent.js';
import { FooterComponent } from '../../components/Footer/FooterComponent.js';
import { CategoryComponent } from '../../components/Category/CategoryComponent.js';
import { ProductComponent } from '../../components/Product/ProductComponent.js';
import getCategoryData from '../../data/category';
import getProductData from '../../data/product';

(async () => {
  // 웹 컴포넌트 등록
  customElements.define(HeaderComponent.componentName, HeaderComponent);
  customElements.define(FooterComponent.componentName, FooterComponent);
  customElements.define(CategoryComponent.componentName, CategoryComponent);
  customElements.define(ProductComponent.componentName, ProductComponent);

  // 데이터 fetch
  const category_data = await getCategoryData();
  const product_data = await getProductData();

  // view 그리기
  const body_el = document.body;
  const header_component_el = new HeaderComponent();
  const footer_component_el = new FooterComponent();
  const product_component_el = new ProductComponent(product_data);
  const category_component_el = new CategoryComponent(category_data);

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
