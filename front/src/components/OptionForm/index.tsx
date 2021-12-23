import React, { useEffect, useState } from 'react';
import {
  changeOptionPropertyDataType,
  OptionPropertyDataType,
  OptionPropertyForm,
} from '../OptionPropertyForm';
import * as S from './style';

type optionPropertyDataListType = Array<OptionPropertyDataType>;

export interface OptionDataType {
  name: string;
  option_property_data_list: optionPropertyDataListType;
}

export type changeOptionDataType = (option_number: number, changed_option_data: OptionDataType) => void;

export interface OptionFormProps extends OptionDataType {
  option_number: number;
  changeOptionData: changeOptionDataType;
}

export const OptionForm = ({
  name,
  option_property_data_list,
  option_number,
  changeOptionData,
}: OptionFormProps) => {
  const [optionData, setOptionData] = useState<OptionDataType>({
    name: name,
    option_property_data_list: option_property_data_list,
  });

  const [optionPropertyDataList, setOptionPropertyDataList] = useState<optionPropertyDataListType>([
    {
      base: true,
      name: '',
      additional_price: 0,
    },
  ]);

  const addOptionProperty = () => {
    setOptionPropertyDataList([
      ...optionPropertyDataList,
      {
        base: false,
        name: '',
        additional_price: 0,
      },
    ]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionData({ ...optionData, [event.target.name]: event.target.value });
  };

  const changeOptionPropertyData: changeOptionPropertyDataType = (
    option_property_number,
    changed_option_property_data,
  ) => {
    optionPropertyDataList[option_property_number] = changed_option_property_data;
    setOptionData({ ...optionData, option_property_data_list: optionPropertyDataList });
  };

  useEffect(() => {
    changeOptionData(option_number, optionData);
  }, [optionData, option_number, changeOptionData]);

  return (
    <S.OptionForm>
      <S.FormBox>
        <h4>Option Name</h4>
        <S.OptionNameInput type="text" onChange={handleInputChange} name="name" required />
      </S.FormBox>
      <S.FormBox>
        <h4>Option Properties</h4>
        <S.OptionPropertiesBox>
          {optionPropertyDataList.map((option_property_data, index) => (
            <OptionPropertyForm
              key={`option-property-form-${index}`}
              option_property_number={index}
              option_number={option_number}
              base={option_property_data.base}
              name={option_property_data.name}
              additional_price={option_property_data.additional_price}
              changeOptionPropertyData={changeOptionPropertyData}
            />
          ))}
        </S.OptionPropertiesBox>
        <S.AddOptionPropertyBtn type="button" onClick={addOptionProperty}>
          +
        </S.AddOptionPropertyBtn>
      </S.FormBox>
    </S.OptionForm>
  );
};
