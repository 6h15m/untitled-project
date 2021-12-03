import { HeaderComponent } from '../../components/Header/HeaderComponent.js';
import { FooterComponent } from '../../components/Footer/FooterComponent.js';
import { DetailComponent } from '../../components/Detail/DetailComponent.js';
import getDetailData from '../../data/get/detail';

const product_id = parseInt(new URLSearchParams(window.location.search).get('product_id')!);

(async () => {
  // 웹 컴포넌트 등록
  customElements.define(HeaderComponent.componentName, HeaderComponent);
  customElements.define(FooterComponent.componentName, FooterComponent);
  customElements.define(DetailComponent.componentName, DetailComponent);

  // 데이터 fetch
  const detail_data = await getDetailData(product_id);

  // view 그리기
  const body_el = document.body;
  const header_component_el = new HeaderComponent();
  const detail_component_el = new DetailComponent(detail_data);
  const footer_component_el = new FooterComponent();

  body_el.appendChild(header_component_el);
  body_el.appendChild(detail_component_el);
  body_el.appendChild(footer_component_el);
})()
  .then(() => {
    console.log('JS 스크립트 실행 완료');
  })
  .catch((error) => {
    console.error(error);
  });
