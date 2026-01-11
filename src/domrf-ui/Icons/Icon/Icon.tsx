import React from 'react';
import { IconsSymbol, IconsSocSymbol, IconsOtherSymbol } from './consts';
import styles from './Icon.module.scss';
import classNames from 'classnames';

export const icons = {
  ...IconsSymbol,
  ...IconsSocSymbol,
  ...IconsOtherSymbol,
};

export type Props = JSX.IntrinsicElements['span'] & {
  symbol: keyof typeof icons;
  className?: string;
};

export function Icon({ symbol, className, ...props }: Props): JSX.Element {
  const iconClass = classNames(className, styles['icon'], {
    [styles[`icon_${symbol}`]]: symbol,
  });

  let iconSymbol;
  if (icons[symbol]) {
    iconSymbol = icons[symbol];
  }

  return (
    <span {...props} className={iconClass}>
      {iconSymbol}
    </span>
  );
}
