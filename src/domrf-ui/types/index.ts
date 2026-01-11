export type RowSelectionState = Record<string, boolean>;

export type SortingState = Array<{ id: string; desc: boolean }>;

export type ColumnDef<T> = any;

export type ColumnPinningState = {
  left?: string[];
  right?: string[];
};

// Additional types for compatibility
export type ColumnOrderState = string[];

export type VisibilityState = Record<string, boolean>;

// TableRow and CellContext - define as any for now since they're not exported from @tanstack/react-table v8
export type TableRow<T = any> = any;
export type CellContext<T = any> = any;