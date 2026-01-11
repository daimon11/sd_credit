import React from 'react';

interface FileProps {
  filename: string;
  id: string;
}

export const File: React.FC<FileProps> = ({ filename, id }) => {
  return <span>{filename}</span>;
};
