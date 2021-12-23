import { map, pipe, toArray } from '@fxts/core';
import React from 'react';
import { OptionDetailType } from '../../../../models/model.interface';
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
        {pipe(
          option.option_properties,
          map((option_property) => (
            <OptionProperty
              key={option_property.id}
              option_property={option_property}
              changeOptionProperty={changeOptionProperty}
            />
          )),
          toArray,
        )}
      </S.OptionPropertiesBox>
    </S.Option>
  );
};
