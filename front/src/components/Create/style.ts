import styled from 'styled-components';

export const Create = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: fit-content;
  margin: 2rem 2rem 0 2rem;
  h3 {
    font-weight: 500;
    margin-bottom: 1rem;
  }
`;

export const FormBox = styled.div`
  margin-bottom: 1rem;
`;

export const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const OptionsBox = styled.div``;

export const AddOptionBtn = styled.button`
  display: flex;
  margin: 1rem auto 0.6rem auto;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1rem;
  border: none;
  background-color: #495057;
  color: white;
`;

export const CreateBtn = styled.input`
  background-color: #495057;
  border: none;
  color: white;
  width: 8rem;
  height: 2.2rem;
  font-size: 1.1em;
  align-self: center;
  margin-top: 2rem;
`;
