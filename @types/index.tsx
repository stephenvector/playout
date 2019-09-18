export interface ColumnBlock {
  id: string;
  value: string;
  type: string;
}

export interface Column {
  id: string;
  width: number;
}

export interface Row {
  id: string;
  columns: Column[];
}

export interface Layout {
  id: string;
  rows: Row[];
}

export type DragDirection =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomRight"
  | "bottomLeft";

export interface LayoutBuilder {
  isDraggingRow: boolean;
  isResizingColumn: boolean;
  currentlyDraggedRowId: string | undefined;
  currentlyResizedColumnId: string | undefined;
  rowWidthsInPixels: { [rowId: string]: number };
  currentlyResizedColumnOriginalWidth: undefined | number;
  setRowWidth(rowId: string, widthInPixels: number): void;
  setRowDragging(rowId: string | undefined): void;
  setColumnResizing(
    columnId: string | undefined,
    width: number | undefined
  ): void;
  deleteRow(rowIndex: number, rowId: string): void;
  insertRow(newRowIndex: number): void;
  splitColumn(rowIndex: number, columnIndex: number, columnId: string): void;
  resizeColumn(
    deltaWidth: number,
    rowIndex: number,
    columnIndex: number,
    direction: DragDirection
  ): void;
  deleteColumn(rowIndex: number, columnIndex: number, columnId: string): void;
}
