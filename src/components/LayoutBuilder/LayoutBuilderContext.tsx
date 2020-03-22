import React from "react";
import { Row, Column, LayoutBuilder } from "../../@types";

const defaultLayoutBuilderContextValue: LayoutBuilder = {
  isDraggingRow: false,
  isResizingColumn: false,
  currentlyDraggedRowId: undefined,
  currentlyResizedColumnId: undefined,
  currentlyResizedColumnOriginalWidth: undefined,
  rowWidthsInPixels: {},
  setRowWidth: () => {},
  setRowDragging: () => {},
  setColumnResizing: () => {},
  deleteRow: () => {},
  insertRow: () => {},
  splitColumn: () => {},
  resizeColumn: () => {},
  deleteColumn: () => {}
};

const LayoutBuilderContext = React.createContext(
  defaultLayoutBuilderContextValue
);

export default LayoutBuilderContext;
