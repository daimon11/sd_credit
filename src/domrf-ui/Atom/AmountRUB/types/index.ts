export type CurrencyTypes = 'RUB' | 'USD' | 'EUR' | 'CNY' | 'ALL';

export type AmountRUBType = JSX.IntrinsicElements['div'] & {
  number: number;
  currencyDisplay?: 'symbol' | 'code' | 'name';
  currency?: CurrencyTypes;
  noSign?: boolean;
  noColorDecor?: boolean;
  className?: string;
};
