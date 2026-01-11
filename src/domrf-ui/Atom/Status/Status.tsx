import React from 'react';
import styles from './Status.module.scss';
import classnames from '@src/assets/helpers/classnames';
import { STATUS, StatusColors, StatusInTextColors, StatusPriority, StatusSize } from './consts';
import { Icon } from '../../Icons/Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';

type Props =
  | {
      name: string;
      color: StatusColors | StatusInTextColors;
      size?: StatusSize;
      priority?: StatusPriority;
      idTooltip?: string;
      withText?: boolean;
      textInStatus?: boolean;
      onClickInfo?: () => void;
    }
  | {
      type: keyof typeof STATUS;
      name?: string;
      size?: StatusSize;
      priority?: StatusPriority;
      idTooltip?: string;
      withText?: boolean;
      textInStatus?: boolean;
      onClickInfo?: () => void;
    };

export function Status(props: Props): JSX.Element {
  if ('type' in props && !STATUS[props.type]) return null;

  const { color, name } = React.useMemo(() => {
    if ('type' in props) return STATUS[props.type];
    return { name: props.name, color: props.color };
  }, [props]);

  function handleInfo() {
    props.onClickInfo();
  }

  const statusClass = classnames(
    styles['status_dot'],
    styles[`status_dot_${color}`],
  );

  const statusClassTextInStatus = classnames(
    styles['status_textInStatus'],
    styles[`status_textInStatus_${props.size ? props.size : 'large'}`],
    styles[`status_textInStatus_${props.priority ? props.priority : 'main'}`],
    styles[`status_textInStatus_${props.priority ? props.priority : 'main'}_${color}`],
  );

  const statusDot = <span className={statusClass} />;

  return (
    <div>
      {props.textInStatus ? (
        <div className={styles['status']}>
          <div className={statusClassTextInStatus}>{props.name || name}</div>
        </div>
      ) : (
        <div className={styles['status']}>
          <div className={styles['status_item']}>
            <Tooltip tooltipText={!props.withText && (props.name || name)}>
              {statusDot}
            </Tooltip>
          </div>
          {props.withText && (
            <div className={styles['status_text']}>{props.name || name}</div>
          )}
          {props.onClickInfo && (
            <button className={styles['status_info']} onClick={handleInfo}>
              <Icon symbol="Information_mini" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
