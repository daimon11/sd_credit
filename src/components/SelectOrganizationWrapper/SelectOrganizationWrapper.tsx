import React, { ReactNode } from 'react';

interface SelectOrganizationWrapperProps {
    requiredRights: string[];
    children: ReactNode;
}

export const SelectOrganizationWrapper: React.FC<SelectOrganizationWrapperProps> = ({
    requiredRights,
    children,
}) => {
    return <>{children}</>;
};
