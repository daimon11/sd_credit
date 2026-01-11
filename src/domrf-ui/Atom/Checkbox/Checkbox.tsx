import React from 'react';

interface CheckboxProps {
  value: string;
  checked?: boolean;
  onClick?: (ev?: React.MouseEvent | React.ChangeEvent) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ value, checked, onClick }) => {
  return (
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onClick}
    />
  );
};
