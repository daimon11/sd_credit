import React from 'react';

interface InfoFiltersProps {
  selectedFiltersCount: number;
  totalAmount?: number;
}

export const InfoFilters: React.FC<InfoFiltersProps> = ({
  selectedFiltersCount,
  totalAmount,
}) => {
  return <div>InfoFilters</div>;
};
