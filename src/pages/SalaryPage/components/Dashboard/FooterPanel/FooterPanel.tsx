import React from 'react';

interface FooterPanelProps {
  rowSelection: any;
  setRowSelection: (selection: any) => void;
  referenceRef: React.RefObject<HTMLDivElement>;
  selectedStatusTab: string;
  signVerificationInfo: any;
}

export const FooterPanel: React.FC<FooterPanelProps> = ({
  rowSelection,
  setRowSelection,
  referenceRef,
  selectedStatusTab,
  signVerificationInfo,
}) => {
  return <div>FooterPanel</div>;
};
