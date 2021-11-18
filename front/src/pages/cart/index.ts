import { HeaderComponent } from "../../components/Header/HeaderComponent.js";
import { FooterComponent } from "../../components/Footer/FooterComponent.js";
import { CartComponent } from "../../components/Cart/CartComponent";

const user_id = 'test_c';

(async () => {
  // 웹 컴포넌트 등록
  customElements.define(HeaderComponent.componentName, HeaderComponent);
  customElements.define(FooterComponent.componentName, FooterComponent);
  customElements.define(CartComponent.componentName, CartComponent);
  const body_el = document.body;
  const header_component_el = new HeaderComponent();
  const footer_component_el = new FooterComponent();
  const cart_component_el = new CartComponent(user_id);
  body_el.appendChild(header_component_el);
  body_el.appendChild(cart_component_el);
  body_el.appendChild(footer_component_el);
})()
  .then(() => {
    console.log("JS 스크립트 실행 완료");
  })
  .catch((error) => {
    console.error(error);
  });
