import React, { useState } from 'react';
import { OptionPropertyForm } from '../OptionPropertyForm';
import * as S from './style';

interface OptionFormProps {
  option_number: number;
}

export const OptionForm = ({ option_number }: OptionFormProps) => {
  const [optionPropertyNumber, setOptionPropertyNumber] = useState(0);
  const [optionPropertyList, setOptionPropertyList] = useState([
    <OptionPropertyForm
      option_number={option_number}
      base
      key={`option-property-form-${optionPropertyNumber}`}
    />,
  ]);

  const addOptionProperty = () => {
    setOptionPropertyList(
      optionPropertyList.concat(
        <OptionPropertyForm
          option_number={option_number}
          key={`option-property-form-${optionPropertyNumber + 1}`}
        />,
      ),
    );
    setOptionPropertyNumber(optionPropertyNumber + 1);
  };

  return (
    <S.OptionForm>
      <S.FormBox>
        <h4>Option Name</h4>
        <S.OptionNameInput type="text" />
      </S.FormBox>
      <S.FormBox>
        <h4>Option Properties</h4>
        <S.OptionPropertiesBox>{optionPropertyList}</S.OptionPropertiesBox>
        <S.AddOptionPropertyBtn onClick={addOptionProperty}>+</S.AddOptionPropertyBtn>
      </S.FormBox>
    </S.OptionForm>
  );
};
