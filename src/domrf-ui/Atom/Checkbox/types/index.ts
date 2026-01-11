export type CheckboxItemType = JSX.IntrinsicElements['div'] & {
  id?: string;
  name?: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  errorText?: string;
  isError?: boolean;
  intermidiate?: boolean;
  iconName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetValue?: (data: { value?: string; checked?: boolean }) => void;
  onClick?: (ev?: React.MouseEvent | React.ChangeEvent) => void;
};
