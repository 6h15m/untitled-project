import { HeaderComponent } from '../../components/Header/HeaderComponent.js';
import { FooterComponent } from '../../components/Footer/FooterComponent.js';
import { ProductListComponent } from '../../components/ProductList/ProductListComponent.js';
import getSearchData from '../../data/get/search';

const query = new URLSearchParams(window.location.search).get('q') ?? '';

(async () => {
  // 웹 컴포넌트 등록
  customElements.define(HeaderComponent.componentName, HeaderComponent);
  customElements.define(FooterComponent.componentName, FooterComponent);
  customElements.define(ProductListComponent.componentName, ProductListComponent);

  // 데이터 fetch
  const searched_products_data = await getSearchData(query);

  // view 그리기
  const body_el = document.body;
  const header_component_el = new HeaderComponent();
  const footer_component_el = new FooterComponent();
  const products_component_el = new ProductListComponent(searched_products_data);

  body_el.appendChild(header_component_el);
  body_el.appendChild(products_component_el);
  body_el.appendChild(footer_component_el);
})()
  .then(() => {
    console.log('JS 스크립트 실행 완료');
  })
  .catch((error) => {
    console.error(error);
  });
