import { HeaderComponent } from '../../components/Header/HeaderComponent.js';
import { FooterComponent } from '../../components/Footer/FooterComponent.js';
import { CategoryComponent } from '../../components/Category/CategoryComponent.js';
import { ProductListComponent } from '../../components/ProductList/ProductListComponent.js';
import getCategoriesData from '../../data/get/categories';
import getProductsData from '../../data/get/products';

const small_category_id = parseInt(
  new URLSearchParams(window.location.search).get('small_category_id') ?? '',
);
const big_category_id = parseInt(new URLSearchParams(window.location.search).get('big_category_id') ?? '');

(async () => {
  // 웹 컴포넌트 등록
  customElements.define(HeaderComponent.componentName, HeaderComponent);
  customElements.define(FooterComponent.componentName, FooterComponent);
  customElements.define(CategoryComponent.componentName, CategoryComponent);
  customElements.define(ProductListComponent.componentName, ProductListComponent);

  // 데이터 fetch
  const categories_data = await getCategoriesData();
  const products_data = await getProductsData(small_category_id, big_category_id);

  // view 그리기
  const body_el = document.body;
  const header_component_el = new HeaderComponent();
  const footer_component_el = new FooterComponent();
  const product_list_component_el = new ProductListComponent(products_data);
  const categories_component_el = new CategoryComponent(categories_data, small_category_id, big_category_id);

  body_el.appendChild(header_component_el);
  body_el.appendChild(categories_component_el);
  body_el.appendChild(product_list_component_el);
  body_el.appendChild(footer_component_el);
})()
  .then(() => {
    console.log('JS 스크립트 실행 완료');
  })
  .catch((error) => {
    console.error(error);
  });
