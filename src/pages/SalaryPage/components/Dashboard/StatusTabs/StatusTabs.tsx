import React from 'react';

interface StatusTabsProps {
  tabs: any[];
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
}

export const StatusTabs: React.FC<StatusTabsProps> = ({
  tabs,
  selectedTab,
  onTabChange,
}) => {
  return <div>StatusTabs</div>;
};
