import styled, { css } from 'styled-components';

export const OptionPropertyForm = styled.div`
  background-color: white;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  h5 {
    margin: 0 0.6rem 0 0;
    width: 4rem;
    font-weight: normal;
  }
`;

export const FormBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;

  ${(props: { right?: boolean }) =>
    props.right &&
    css`
      margin-right: 0;
    `}
`;

export const OptionPropertyTextInput = styled.input`
  height: 2rem !important;
  width: 10rem !important;
`;
