import React, { useState } from 'react';
import { OptionPropertyDetailType } from '../../../../models/model.interface';
import { changeOptionPropertyType } from '../Cart';
import * as S from './style';

export interface OptionPropertyProps {
  option_property: OptionPropertyDetailType;
  changeOptionProperty: changeOptionPropertyType;
}

export const OptionProperty = ({ option_property, changeOptionProperty }: OptionPropertyProps) => {
  const [selectedOptionProperty, setSelectedOptionProperty] = useState<number>(option_property.id);

  const handleSelectedOptionProperty = (event: any) => {
    setSelectedOptionProperty(event.target.value);
    changeOptionProperty(selectedOptionProperty, option_property.additional_price, option_property.option_id);
  };

  return (
    <S.OptionProperty>
      <input
        type="radio"
        id={`${option_property.id}`}
        value={option_property.id}
        name={`${option_property.option_id}`}
        defaultChecked={option_property.base}
        onChange={handleSelectedOptionProperty}
      />
      <label htmlFor={`${option_property.id}`}>
        {option_property.name}
        {option_property.additional_price === 0
          ? ''
          : `(+${option_property.additional_price.toLocaleString('ko-KR')})`}
      </label>
    </S.OptionProperty>
  );
};
