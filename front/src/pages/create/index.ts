import { HeaderComponent } from "../../components/Header/HeaderComponent.js";
import { FooterComponent } from "../../components/Footer/FooterComponent.js";
import { CreateComponent } from "../../components/Create/CreateComponent";

const user_id = 'test_c';

(async () => {
    // 웹 컴포넌트 등록
    customElements.define(HeaderComponent.componentName, HeaderComponent);
    customElements.define(FooterComponent.componentName, FooterComponent);
    customElements.define(CreateComponent.componentName, CreateComponent);
    const body_el = document.body;
    const header_component_el = new HeaderComponent();
    const footer_component_el = new FooterComponent();
    const create_component_el = new CreateComponent();
    body_el.appendChild(header_component_el);
    body_el.appendChild(create_component_el);
    body_el.appendChild(footer_component_el);
})()
    .then(() => {
        console.log("JS 스크립트 실행 완료");
    })
    .catch((error) => {
        console.error(error);
    });
