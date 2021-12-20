import React from 'react';
import { OptionPropertyForm } from '../OptionPropertyForm';
import * as S from './style';

interface OptionFormProps {}

export const OptionForm = ({}: OptionFormProps) => {
  return (
    <S.OptionForm>
      <S.FormBox>
        <h4>Option Name</h4>
        <S.OptionNameInput type="text" name="option-name" />
      </S.FormBox>
      <S.FormBox>
        <h4>Option Properties</h4>
        <S.OptionPropertiesBox>
          <OptionPropertyForm />
        </S.OptionPropertiesBox>
        <S.AddOptionPropertyBtn>+</S.AddOptionPropertyBtn>
      </S.FormBox>
    </S.OptionForm>
  );
};
