import { HeaderComponent } from "../../components/Header/HeaderComponent.js";

(async () => {
    // 웹 컴포넌트 등록
    customElements.define(HeaderComponent.componentName, HeaderComponent);

    const body_el = document.body;
    const header_component_el = new HeaderComponent();
    body_el.appendChild(header_component_el);

    fetch("/@api/.....").then(() => {})
})()
  .then(() => {
    console.log("JS 스크립트 실행 완료");
  })
  .catch((error) => {
    console.error(error);
  });
