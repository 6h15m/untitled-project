import React from 'react';
import * as S from './style';

export interface OptionPropertyFormProps {
  option_number: number;
  base?: boolean;
}

export const OptionPropertyForm = ({ option_number, base }: OptionPropertyFormProps) => {
  return (
    <S.OptionPropertyForm>
      <S.FormBox>
        <h5>Base Property</h5>
        <input type="radio" name={`${option_number}`} defaultChecked={base} />
      </S.FormBox>
      <S.FormBox>
        <h5>Property Name</h5>
        <S.OptionPropertyTextInput type="text" />
      </S.FormBox>
      <S.FormBox right>
        <h5>Additional Price</h5>
        <S.OptionPropertyTextInput type="number" placeholder="0" />
      </S.FormBox>
    </S.OptionPropertyForm>
  );
};
