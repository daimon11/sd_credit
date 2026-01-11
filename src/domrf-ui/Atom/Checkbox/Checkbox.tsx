import React from 'react';
import styles from './Checkbox.module.scss';
import { Icon } from '@src/domrf-ui/index';
import { CheckboxItemType } from './types';
import classNames from 'classnames';

export function Checkbox(props: CheckboxItemType): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (typeof props.intermidiate == 'boolean') {
      inputRef.current.indeterminate = !props.checked && props.intermidiate;
    }
  }, [inputRef, props.intermidiate, props.checked]);

  function onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>): void {
    props.onGetValue &&
      props.onGetValue({
        value: e.currentTarget?.value,
        checked: e.currentTarget?.checked,
      });
  }

  const styleText = classNames(styles['checkbox_text'], {
    [styles['checkbox_text_disabled']]: props.disabled,
  });

  const styleCheckboxFake = classNames(styles['checkbox_fake'], {
    [styles['checkbox_fake_error']]: props.isError,
  });

  return (
    <>
      <div className={styles['checkbox']} onClick={props.onClick}>
        <label className={styles['checkbox_label']}>
          <input
            className={styles['checkbox_input']}
            type="checkbox"
            id={props?.id}
            name={props?.name}
            value={props.value}
            disabled={props.disabled}
            checked={props.checked}
            onChange={props.onChange ?? onCheckboxChange}
            data-testid="checkbox"
            ref={inputRef}
          />
          <span
            className={styleCheckboxFake}
            onClick={(ev) => ev.stopPropagation()}
          >
            <Icon symbol={!!props.iconName ? props.iconName : 'CheckNew'} />
          </span>
          {props.label && (
            <div className={styleText} onClick={(ev) => ev.stopPropagation()}>
              {props.label}
            </div>
          )}
        </label>
      </div>
      {props.errorText && (
        <div className={styles['checkbox_error-text']}>{props.errorText}</div>
      )}

    </>
  );
}
