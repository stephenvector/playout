import React, { useState } from "react";
import { useField } from "react-final-form";
import uuidv4 from "uuid/v4";
import produce from "immer";
import LayoutBuilderContext from "./LayoutBuilderContext";
import InsertRowBar from "./InsertRowBar";
import Row from "./Row";
import Column from "./Column";
import {
  Layout,
  Column as ColumnInterface,
  Row as RowInterface,
  DragDirection
} from "../../@types";

function getNewColumn(width: number = 1): ColumnInterface {
  return {
    id: uuidv4(),
    width
  };
}

function getNewRow(): RowInterface {
  return {
    id: uuidv4(),
    columns: [getNewColumn()]
  };
}

interface Props {
  name: string;
}

export default function LayoutBuilder({ name }: Props) {
  const field = useField<Layout>(name);

  const [isDraggingRow, setIsDraggingRow] = useState(false);
  const [isResizingColumn, setIsResizingColumn] = useState(false);
  const [
    currentlyResizedColumnOriginalWidth,
    setCurrentlyResizedColumnOriginalWidth
  ] = useState<number | undefined>(undefined);
  const [rowWidthsInPixels, setRowWidths] = useState<{
    [rowId: string]: number;
  }>({});
  const [currentlyDraggedRowId, setCurrentlyDraggedRowId] = useState<
    string | undefined
  >(undefined);
  const [currentlyResizedColumnId, setCurrentlyResizedColumnId] = useState<
    string | undefined
  >(undefined);

  function deleteColumn(rowIndex: number, columnIndex: number) {
    const newLayout = produce(field.input.value, draft => {
      draft.rows[rowIndex].columns.splice(columnIndex, 1);
    });

    field.input.onChange(newLayout);
  }

  function deleteRow(rowIndex: number) {
    const newLayout = produce(field.input.value, draft => {
      draft.rows.splice(rowIndex, 1);
    });

    field.input.onChange(newLayout);
  }

  function insertRow(newRowIndex: number) {
    const newLayout = produce(field.input.value, draft => {
      draft.rows.splice(newRowIndex, 0, getNewRow());
    });
    field.input.onChange(newLayout);
  }

  function splitColumn(
    rowIndex: number,
    columnIndex: number,
    columnId: string
  ) {
    const newLayout = produce(field.input.value, draft => {
      const columnWidth = draft.rows[rowIndex].columns[columnIndex].width;
      const leftColumnWidth = columnWidth / 2;
      const rightColumnWidth = columnWidth - leftColumnWidth;

      draft.rows[rowIndex].columns[columnIndex].width = leftColumnWidth;
      draft.rows[rowIndex].columns.splice(
        columnIndex,
        0,
        getNewColumn(rightColumnWidth)
      );
    });
    field.input.onChange(newLayout);
  }

  function resizeColumn(width: number, rowIndex: number, columnIndex: number) {
    const newLayout = produce(field.input.value, draft => {
      const newWidth = width / rowWidthsInPixels[draft.rows[rowIndex].id];

      draft.rows[rowIndex].columns[columnIndex].width = newWidth;
      const totalColumnWidths = draft.rows[rowIndex].columns.reduce(
        (acc, column) => acc + column.width,
        0
      );
      if (totalColumnWidths < 1) {
        // Make right side neighbor column wider
        draft.rows[rowIndex].columns[columnIndex + 1].width +=
          1 - totalColumnWidths;
      } else if (totalColumnWidths > 1) {
        // Make right side neighbor column narrower
        draft.rows[rowIndex].columns[columnIndex + 1].width -=
          totalColumnWidths - 1;
      }
    });
    field.input.onChange(newLayout);
  }

  function setRowDragging(rowId: string | undefined) {
    // We don't wanna allow resizing columns while row is being dragged
    if (rowId !== undefined) {
      setIsResizingColumn(false);
      setCurrentlyResizedColumnId(undefined);
      setCurrentlyResizedColumnOriginalWidth(undefined);
    }
    setIsDraggingRow(false);
    setCurrentlyDraggedRowId(undefined);
  }

  function setColumnResizing(
    columnId: string | undefined,
    numColumns: number | undefined
  ) {
    // We don't wanna allow resizing columns while row is being dragged
    if (columnId !== undefined) {
      setIsDraggingRow(false);
      setCurrentlyDraggedRowId(undefined);
    }

    setIsResizingColumn(columnId !== undefined);
    setCurrentlyResizedColumnId(columnId);
    setCurrentlyResizedColumnOriginalWidth(numColumns);
  }

  function setRowWidth(rowId: string, width: number) {
    setRowWidths({ ...rowWidthsInPixels, [rowId]: width });
  }

  return (
    <LayoutBuilderContext.Provider
      value={{
        rowWidthsInPixels,
        isDraggingRow,
        isResizingColumn,
        currentlyDraggedRowId,
        currentlyResizedColumnId,
        currentlyResizedColumnOriginalWidth,
        setRowWidth,
        setRowDragging,
        setColumnResizing,
        deleteRow,
        insertRow,
        deleteColumn,
        resizeColumn,
        splitColumn
      }}
    >
      <InsertRowBar newRowIndex={0} />
      {field.input.value.rows.map((row, rowIndex) => (
        <React.Fragment key={row.id}>
          <Row rowIndex={rowIndex} rowId={row.id}>
            {row.columns.map((column, columnIndex) => (
              <Column
                key={column.id}
                rowId={row.id}
                rowIndex={rowIndex}
                columnId={column.id}
                columnIndex={columnIndex}
                columnWidth={column.width}
                numColumns={row.columns.length}
              >
                {column.id}
              </Column>
            ))}
          </Row>
          <InsertRowBar newRowIndex={rowIndex + 1} />
        </React.Fragment>
      ))}
    </LayoutBuilderContext.Provider>
  );
}

// function fixColumnWidths(columns: ColumnInterface[]): ColumnInterface[] {
//   let columnWidthsFilled = 0;

//   let totalNumColumnsWide = 0;
//   const columnsWithinBounds = columns.filter(column => {
//     totalNumColumnsWide += column.width;
//     return totalNumColumnsWide <= 1;
//   });

//   const columnsOutOfBounds = columns.slice(columnsWithinBounds.length);
//   const columnsOutOfBoundsTotalColumnWidths = columnsOutOfBounds.reduce(
//     (acc, c) => acc + c.width,
//     0
//   );

//   const spaceForColumnsWithinBounds = 1 - columnsOutOfBoundsTotalColumnWidths;

//   const newColumnsWithinBounds = columnsWithinBounds.map((col, columnIndex) => {
//     const column = { ...col };
//     const newNumColumnsWide = Math.round(
//       (column.width / totalNumColumnsWide) * spaceForColumnsWithinBounds
//     );

//     column.width = newNumColumnsWide;

//     columnWidthsFilled += newNumColumnsWide;

//     if (
//       columnIndex === columnsWithinBounds.length - 1 &&
//       columnWidthsFilled !== spaceForColumnsWithinBounds
//     ) {
//       console.log(columnWidthsFilled);
//     }

//     return column;
//   });

//   return [...newColumnsWithinBounds, ...columnsOutOfBounds];
// }

// function standardizeLayout(layout: Layout): Layout {
//   const newLayout = { ...layout };

//   newLayout.rows = newLayout.rows.map(row => {
//     const newRow = Object.assign({}, row);

//     if (newRow.columns.length === 0) {
//       return {
//         ...newRow,
//         columns: [
//           {
//             id: uuidv4(),
//             width: 1
//           }
//         ]
//       };
//     }

//     const totalNumColumnsWide = newRow.columns.reduce((acc, column) => {
//       return acc + column.width;
//     }, 0);

//     if (totalNumColumnsWide !== 1) {
//       newRow.columns = fixColumnWidths(newRow.columns);
//     }

//     return newRow;
//   });

//   return newLayout;
// }
