import React from 'react';

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> & {
  Box: React.FC<{ children: React.ReactNode }>;
} = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

Layout.Box = ({ children }) => {
  return <div>{children}</div>;
};
