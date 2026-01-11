import React from 'react';
import styles from './AmountRUB.module.scss';
import { AmountRUBType, CurrencyTypes } from './types';
import classnames from '@src/assets/helpers/classnames';

export function AmountRUB(props: AmountRUBType): JSX.Element {
  const { number, currencyDisplay = 'code', currency = 'RUB', noSign } = props;
  if (isNaN(number)) return <span>Передано NaN значение</span>;

  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currencyDisplay,
    currency,
  }).format(number);
  const [integer, remnantWithCurrencySign] = formattedNumber.split(',');
  const [remnant, sign] = remnantWithCurrencySign.split('');

  const amountClass = classnames(
    styles['amount'],
    {
      [styles['amount_no-color-decor']]: props.noColorDecor,
    },
    props.className
  );
  const ellipsisClass = classnames(styles['amount__ellipsis'], props.className);

  const rubClass = classnames(
    styles['amount__rub'],
    {
      [styles['amount__rub_no-color-decor']]: props.noColorDecor,
    }
  );

  function rewriteSign(sign: string, currency: CurrencyTypes) {
    if (currencyDisplay !== 'symbol') return sign;
    if (currency === 'ALL') {
      return '';
    }
    if (currency === 'CNY') {
      return '¥';
    }
    return sign;
  }

  return (
    <div className={amountClass}>
      <div className={ellipsisClass}>
        <span className={rubClass}>{integer}</span>
        <span>
          ,{remnant}
          {!noSign && rewriteSign(sign, currency)}
        </span>
      </div>
    </div>
  );
}
