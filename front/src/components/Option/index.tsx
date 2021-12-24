import React from 'react';
import { OptionDetail as OptionDetailType } from '../../../../models/model.interface';
import { changeOptionPropertyType } from '../Cart';
import { OptionProperty } from '../index';
import * as S from './style';

export interface OptionProps {
  option: OptionDetailType;
  changeOptionProperty: changeOptionPropertyType;
}

export const Option = ({ option, changeOptionProperty }: OptionProps) => {
  return (
    <S.Option>
      <S.OptionNameText>{option.name}</S.OptionNameText>
      <S.OptionPropertiesBox>
        {option.option_properties.map((option_property) => (
          <OptionProperty
            key={option_property.id}
            option_property={option_property}
            changeOptionProperty={changeOptionProperty}
          />
        ))}
      </S.OptionPropertiesBox>
    </S.Option>
  );
};
