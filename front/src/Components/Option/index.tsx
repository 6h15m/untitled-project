import React from 'react';
import styled from 'styled-components';
import { pipe, map, toArray } from '@fxts/core';
import { OptionType } from '../../../../models/data.interface';
import { OptionProperty } from '../index';

export interface OptionProps {
  option: OptionType;
  changeOptionProperty?: Function;
}

export const Option = ({ option, changeOptionProperty }: OptionProps) => {
  return (
    <OptionWrap>
      <div className="option-name">{option.name}</div>
      <div className="option-properties-container">
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
      </div>
    </OptionWrap>
  );
};

const OptionWrap = styled.div`
  .option-properties-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
  }
`;
