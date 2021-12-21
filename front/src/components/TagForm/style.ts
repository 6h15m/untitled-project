import styled from 'styled-components';

export const TagForm = styled.div`
  margin-bottom: 1.4rem;
`;

export const TagCheck = styled.input`
  &:not(:checked),
  &:checked {
    display: none;
  }
  &:checked + label {
    color: white;
    background-color: #212529;
  }
`;

export const TagLabel = styled.label`
  margin-right: 0.6rem;
  padding: 0.4rem 1rem;
  background-color: #f4f5f8;
  border-radius: 1rem;
  font-size: 1rem;
  cursor: pointer;
`;
