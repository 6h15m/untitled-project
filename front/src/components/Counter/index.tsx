import React, { useEffect, useState } from 'react';
import { changeCountType } from '../Cart/Card';
import * as S from './style';

export interface CounterProps {
  default_count: number;
  changeCount: changeCountType;
}

export const Counter = ({ default_count, changeCount }: CounterProps) => {
  const [count, setCount] = useState(default_count);

  const inc = () => {
    if (count !== 100) {
      setCount(count + 1);
    }
  };
  const dec = () => {
    if (count !== 1) {
      setCount(count - 1);
    }
  };

  const handleCount = (e: React.MouseEvent<HTMLInputElement>) => {
    switch (e.currentTarget.value) {
      case '+':
        inc();
        break;
      case '-':
        dec();
        break;
    }
  };

  useEffect(() => {
    changeCount(count);
  }, [changeCount, count]);

  return (
    <S.Counter>
      <S.AmountControlInput type="button" value="-" onClick={handleCount} />
      <S.AmountText>{count}</S.AmountText>
      <S.AmountControlInput type="button" value="+" className="amount-control" onClick={handleCount} />
    </S.Counter>
  );
};
