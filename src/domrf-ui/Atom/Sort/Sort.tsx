import React from 'react';
import { Icon } from '../../Icons/Icon/Icon';
import classNames from 'classnames';
import styles from './Sort.module.scss';

export type SortProps = JSX.IntrinsicElements['span'] & {
  type?: 'asc' | 'desc';
};

export function Sort({ type, className, ...props }: SortProps) {
  const name = classNames(className, styles['sort'], {
    [styles['sort_asc']]: type === 'asc',
    [styles['sort_desc']]: type === 'desc',
  });

  return <Icon className={name} symbol={'Sort_mini'} {...props} />;
}
