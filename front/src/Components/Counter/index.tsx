import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Counter = ({ default_count, changeCount }: { default_count: number; changeCount: Function }) => {
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

  const handleCount = (e: any) => {
    switch (e.target.value) {
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
  }, [handleCount]);

  return (
    <CounterWrap>
      <input type="button" value="-" className="amount-control" onClick={handleCount} />
      <div id="amount">{count}</div>
      <input type="button" value="+" className="amount-control" onClick={handleCount} />
    </CounterWrap>
  );
};

const CounterWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 6rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  .amount-control {
    height: 1.4rem;
    width: 1.4rem;
    background-color: #868e96;
    border: none;
    border-radius: 0.2rem;
    color: white;
  }
`;
