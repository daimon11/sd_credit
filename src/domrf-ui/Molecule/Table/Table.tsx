import React, { useEffect, useRef, useState } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { Tooltip } from '../../Atom/Tooltip/Tooltip';
import * as PopperJS from '@popperjs/core';

type Props<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T] & {
  noDefaultStyle?: boolean;
};

function Table({ className, children, noDefaultStyle, ...props }: Props<'table'>) {
  const name = classNames(styles['table'], className);
  return (
    <table {...props} className={name}>
      {children}
    </table>
  );
}

function Head({ className, children, noDefaultStyle, ...props }: Props<'thead'>) {
  const name = classNames(styles['head'], className);
  return (
    <thead {...props} className={name}>
      {children}
    </thead>
  );
}

function Body({ className, children, noDefaultStyle, ...props }: Props<'tbody'>) {
  const name = classNames(styles['body'], className);
  return (
    <tbody {...props} className={name}>
      {children}
    </tbody>
  );
}

function Tr({ className, children, noDefaultStyle, ...props }: Props<'tr'>) {
  const name = classNames(styles['tr'], className);
  return (
    <tr {...props} className={name}>
      {children}
    </tr>
  );
}

function Th({ className, children, noDefaultStyle, ...props }: Props<'th'>) {
  const name = classNames(styles['th'], className);
  return (
    <th {...props} className={name}>
      {children}
    </th>
  );
}

type AdditionalPropsTD = {
  tooltipPlacement?: PopperJS.Placement;
  cellWidthMultForTooltip?: number;
  tooltipWidth?: React.CSSProperties['width'];
  customTooltipText?: React.ReactNode;
};

/**
 * Если указан параметр customTooltipText
 * @param customTooltipText - если указан этот параметр, подсказка всегда будет отображаться с переданным содержимым
 * @param cellWidthMultForTooltip - множитель размера (ширины) подсказки,
 * где 1 - разместить подсказку не больше всей ширины контейнера (элемента td),
 * 0.5 (значения <1 ) - меньше ширины контейнера
 * @returns
 */
function Td({
  className,
  children,
  noDefaultStyle,
  tooltipPlacement,
  cellWidthMultForTooltip,
  tooltipWidth,
  customTooltipText,
  ...props
}: Props<'td'> & AdditionalPropsTD) {
  const [isWide, setIsWide] = useState(false);
  const name = classNames(styles['td'], className, {
    [styles['td_default']]: !noDefaultStyle,
  });
  const refTd = useRef<HTMLTableCellElement>(null);

  const tooltipW = React.useMemo(() => {
    if (cellWidthMultForTooltip && refTd.current) {
      return refTd.current.clientWidth * cellWidthMultForTooltip;
    }
    return tooltipWidth;
  }, [tooltipWidth, cellWidthMultForTooltip, refTd.current]);

  useEffect(() => {
    setIsWide(refTd.current.clientWidth < refTd.current.scrollWidth);
  }, [children]);

  return (
    <td {...props} className={name} ref={refTd}>
      {isWide || customTooltipText ? (
        <Tooltip
          tooltipText={customTooltipText || children}
          placementArrow="auto"
          maxWidth={tooltipW}
        >
          <div className={styles['child-wrapper']}>{children}</div>
        </Tooltip>
      ) : (
        <div>{children}</div>
      )}
    </td>
  );
}

Table.Head = Head;
Table.Body = Body;
Table.Tr = Tr;
Table.Th = Th;

/**
 * Если указан параметр customTooltipText -
 * @param customTooltipText - если указан этот параметр, подсказка всегда будет отображаться с переданным содержимым
 * @param cellWidthMultForTooltip - множитель размера (ширины) подсказки,
 * где 1 - разместить подсказку не больше всей ширины контейнера (элемента td),
 * 0.5 (значения <1) - меньше ширины контейнера
 * @returns
 */
Table.Td = Td;

export { Table, PopperJS };
