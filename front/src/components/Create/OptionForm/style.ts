import styled from 'styled-components';

export const OptionForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f4f5f8;
  width: fit-content;
  margin-bottom: 1rem;
  h4 {
    margin: 0 0 1rem 0;
    font-weight: normal;
  }
`;

export const FormBox = styled.div`
  margin-bottom: 1rem;
`;

export const OptionNameInput = styled.input`
  background-color: white !important;
`;

export const OptionPropertiesBox = styled.div``;

export const AddOptionPropertyBtn = styled.button`
  display: flex;
  margin: 1rem auto 0 auto;
  justify-content: center;
  align-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1rem;
  border: none;
  background-color: #495057;
  color: white;
`;
