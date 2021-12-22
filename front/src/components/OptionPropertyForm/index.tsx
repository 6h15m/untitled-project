import React, { useEffect, useState } from 'react';
import * as S from './style';

export type changeOptionPropertyDataType = (
  option_property_number: number,
  changed_option_property_data: OptionPropertyDataType,
) => void;

export interface OptionPropertyDataType {
  base: boolean;
  name: string;
  additional_price: number;
}

export interface OptionPropertyFormProps extends OptionPropertyDataType {
  option_number: number;
  option_property_number: number;
  changeOptionPropertyData: changeOptionPropertyDataType;
}

export const OptionPropertyForm = ({
  base,
  name,
  additional_price,
  option_number,
  option_property_number,
  changeOptionPropertyData,
}: OptionPropertyFormProps) => {
  const [optionPropertyData, setOptionPropertyData] = useState<OptionPropertyDataType>({
    base: base,
    name: name,
    additional_price: additional_price,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'radio') {
      setOptionPropertyData({ ...optionPropertyData, base: event.target.checked });
    } else {
      setOptionPropertyData({ ...optionPropertyData, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    changeOptionPropertyData(option_property_number, optionPropertyData);
  }, [optionPropertyData]);

  return (
    <S.OptionPropertyForm>
      <S.FormBox>
        <h5>Base Property</h5>
        <input type="radio" name={`${option_number}`} onChange={handleInputChange} defaultChecked={base} />
      </S.FormBox>
      <S.FormBox>
        <h5>Property Name</h5>
        <S.OptionPropertyTextInput type="text" onChange={handleInputChange} name="name" />
      </S.FormBox>
      <S.FormBox right>
        <h5>Additional Price</h5>
        <S.OptionPropertyTextInput
          type="number"
          placeholder="0"
          onChange={handleInputChange}
          name="additional_price"
        />
      </S.FormBox>
    </S.OptionPropertyForm>
  );
};
