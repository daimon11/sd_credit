import React from 'react';
import classnames from '@src/assets/helpers/classnames';
import styles from './Title.module.scss';

interface Props {
  type: 'h1' | 'h2' | 'h3';
  text: React.ReactNode;
  className?: string;
}

export function Title(props: Props): JSX.Element {
  const titleClass = classnames(
    styles['title'],
    styles[`title_${props.type}`],
    { [styles[props.className || '']]: !!props.className }
  );

  let titleHtml: React.ReactElement<HTMLHeadingElement>;

  switch (props.type) {
    case 'h1':
      titleHtml = <h1 className={titleClass}>{props.text}</h1>;
      break;
    case 'h2':
      titleHtml = <h2 className={titleClass}>{props.text}</h2>;
      break;
    case 'h3':
      titleHtml = <h3 className={titleClass}>{props.text}</h3>;
      break;
    default:
      titleHtml = null as any;
  }

  return <div>{titleHtml}</div>;
}
