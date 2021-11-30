import { HeaderComponent } from '../../components/Header/HeaderComponent.js';
import { FooterComponent } from '../../components/Footer/FooterComponent.js';
import { CreateComponent } from '../../components/Create/CreateComponent';
import getCreateData from '../../data/get/create';

(async () => {
  // 웹 컴포넌트 등록
  customElements.define(HeaderComponent.componentName, HeaderComponent);
  customElements.define(FooterComponent.componentName, FooterComponent);
  customElements.define(CreateComponent.componentName, CreateComponent);

  // 데이터 fetch
  const create_data = await getCreateData();

  // view 그리기
  const body_el = document.body;
  const header_component_el = new HeaderComponent();
  const create_component_el = new CreateComponent(create_data);
  const footer_component_el = new FooterComponent();

  body_el.appendChild(header_component_el);
  body_el.appendChild(create_component_el);
  body_el.appendChild(footer_component_el);
})()
  .then(() => {
    console.log('JS 스크립트 실행 완료');
  })
  .catch((error) => {
    console.error(error);
  });
