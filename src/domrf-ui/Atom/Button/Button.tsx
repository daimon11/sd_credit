import React from 'react';

interface ButtonProps {
  size?: 's' | 'm' | 'l';
  theme?: 'black' | 'green' | 'gray';
  iconName?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size,
  theme,
  iconName,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
