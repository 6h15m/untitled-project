import React, { useState } from 'react';
import styled from 'styled-components';
import { OptionPropertyType } from '../../../../models/data.interface';

export interface OptionPropertyProps {
  option_property: OptionPropertyType;
  changeOptionProperty?: Function;
}

export const OptionProperty = ({ option_property, changeOptionProperty }: OptionPropertyProps) => {
  let first_checked = option_property.base;
  const [selectedOptionProperty, setSeletedOptionProperty] = useState<number>(option_property.id);
  const handleSelectedOptionProperty = (event: any) => {
    setSeletedOptionProperty(event.target.value);
    changeOptionProperty &&
      changeOptionProperty(
        selectedOptionProperty,
        option_property.additional_price,
        option_property.option_id,
      );
  };
  return (
    <OptionPropertyWrap>
      <input
        type="radio"
        id={`${option_property.id}`}
        value={option_property.id}
        name={`${option_property.option_id}`}
        defaultChecked={first_checked}
        onChange={handleSelectedOptionProperty}
      />
      <label htmlFor={`${option_property.id}`}>
        {option_property.name}
        {option_property.additional_price === 0
          ? ''
          : `(+${option_property.additional_price.toLocaleString('ko-KR')})`}
      </label>
    </OptionPropertyWrap>
  );
};

const OptionPropertyWrap = styled.div`
  margin-right: 0.6rem;
  label {
    margin-left: 0.4rem;
  }
`;
