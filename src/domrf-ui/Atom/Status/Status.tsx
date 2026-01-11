import React from 'react';

interface StatusProps {
  name?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  textInStatus?: boolean;
}

export const Status: React.FC<StatusProps> = ({ name, color, size, textInStatus }) => {
  return <span>{name}</span>;
};
