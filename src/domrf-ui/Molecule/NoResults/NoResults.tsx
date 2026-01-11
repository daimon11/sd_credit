import React from 'react';

interface NoResultsProps {
  resetFilters?: () => void;
}

export const NoResults: React.FC<NoResultsProps> = ({ resetFilters }) => {
  return <div>NoResults</div>;
};
