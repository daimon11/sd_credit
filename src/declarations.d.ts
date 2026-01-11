declare module '*.html' {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.module.scss' {
  const src: { [className: string]: string };
  export default src;
}

declare module 'domrf-ui' {
  import * as React from 'react';
  
  export const Button: React.FC<any>;
  export const Layout: React.FC<any> & {
    Box: React.FC<any>;
  };
  export const Title: React.FC<any>;
  export const BackTop: React.FC<any>;
  export const Paginator: React.FC<any>;
  export const NoResults: React.FC<any>;
  export const SelectOrganizationWrapper: React.FC<any>;
  export type RowSelectionState = Record<string, boolean>;
  export type SortingState = Array<{ id: string; desc: boolean }>;
  export const useNotify: () => {
    notifyLoading: (message: string) => string;
    notifyStop: (id: string) => void;
    notificationNotify: (options: { type: string; title: string; autoClose?: number }) => void;
  };
  export const useDashboardFilter: <T>(options: { fieldLocalStorage: string }) => {
    filters: T | null;
    saveFilterInLocalStorage: (filters: T) => void;
  };
  export const useNonInitialEffect: (effect: () => void, deps: any[]) => void;
  export const useOrganizations: () => {
    selected?: { id: string };
    [key: string]: any;
  };
  export type ColumnDef<T> = any;
  export type ColumnPinningState = {
    left?: string[];
    right?: string[];
  };
  export const Checkbox: React.FC<any>;
  export const Status: React.FC<any>;
  export const AmountRUB: React.FC<any>;
  export const ResizableTableTemplateBase: <T>(props: any) => React.ReactElement;
  export const tanstackTable: {
    useReactTable: any;
    getCoreRowModel: any;
  };
}