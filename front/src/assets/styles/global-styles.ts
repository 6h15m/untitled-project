import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    box-sizing: border-box;
  }
  body {
    padding: 2rem;
  }
  a {
    text-decoration: none;
    color: black;
  }
  input[type="text"], input[type="password"], input[type="number"] {
    height: auto;
    line-height: normal;
    width: 20rem;
    padding: .8rem;
    background-color: #F4F5F8;
    border: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyle;
