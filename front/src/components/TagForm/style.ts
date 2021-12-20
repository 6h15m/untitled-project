import styled from 'styled-components';

export const TagForm = styled.div`
  display: flex;
  align-items: center;
  width: 42rem;
  flex-flow: row wrap;
  margin-bottom: -1.4rem;
`;

export const Tag = styled.div`
  margin-bottom: 1.4rem;
  input[type='checkbox']:not(:checked),
  input[type='checkbox']:checked {
    display: none;
  }
  input[type='checkbox'] + label {
    margin-right: 0.6rem;
    padding: 0.4rem 1rem;
    background-color: #f4f5f8;
    border-radius: 1rem;
    font-size: 0.8rem;
    cursor: pointer;
  }
  input[type='checkbox']:checked + label {
    color: white;
    background-color: #212529;
  }
`;

export const AddTagBtn = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1rem;
  border: none;
  background-color: #495057;
  color: white;
  display: flex;
  justify-content: center;
  margin-bottom: 1.4rem;
`;
