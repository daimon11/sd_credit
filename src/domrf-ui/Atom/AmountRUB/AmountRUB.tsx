import React from 'react';

interface AmountRUBProps {
  number: number;
  currencyDisplay?: 'symbol' | 'code' | 'name';
  noColorDecor?: boolean;
  noSign?: boolean;
}

export const AmountRUB: React.FC<AmountRUBProps> = ({
  number,
  currencyDisplay,
  noColorDecor,
  noSign,
}) => {
  return <span>{number.toLocaleString('ru-RU')} ₽</span>;
};
