import React, { useContext, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Resizable } from "re-resizable";
import DeleteButton from "./DeleteButton";
import { COLUMN } from "../../constants";
import LayoutBuilderContext from "./LayoutBuilderContext";
import { DragDirection } from "../../@types";

interface ColumnProps {
  children: React.ReactNode;
  rowIndex: number;
  rowId: string;
  columnIndex: number;
  columnId: string;
  columnWidth: number;
  numColumns: number;
}

export default function Column({
  children,
  rowIndex,
  rowId,
  columnIndex,
  columnId,
  columnWidth,
  numColumns
}: ColumnProps) {
  const layout = useContext(LayoutBuilderContext);

  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    item: {
      type: COLUMN,
      rowIndex,
      rowId,
      columnIndex,
      columnId
    }
  });

  const [, drop] = useDrop({
    accept: COLUMN,
    canDrop: () => false
  });

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    layout.deleteColumn(rowIndex, columnIndex, columnId);
  }

  function handleColumnSplit(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    layout.splitColumn(rowIndex, columnIndex, columnId);
  }

  drop(drag(ref));

  return (
    <Resizable
      size={{
        width: `${columnWidth * 100}%`,
        height: "auto"
      }}
      enable={{
        left: false,
        right: columnIndex !== numColumns - 1,
        top: false,
        bottom: false
      }}
      minWidth={"5%"}
      bounds="parent"
      onResizeStart={e => {}}
      onResize={(_event, direction, _ref, delta) => {
        const boundingRectangle = _ref.getBoundingClientRect();
        layout.resizeColumn(
          boundingRectangle.width,
          rowIndex,
          columnIndex,
          direction
        );
      }}
      onResizeStop={(event, direction, ref) => {
        const boundingRectangle = ref.getBoundingClientRect();
        layout.resizeColumn(
          boundingRectangle.width,
          rowIndex,
          columnIndex,
          direction
        );
        layout.setColumnResizing(undefined, undefined);
      }}
    >
      <div ref={ref}>
        <DeleteButton type="button" onClick={handleDelete} />
        <div>{children}</div>
        <button type="button" onClick={handleColumnSplit}>
          {`Split Column (${columnWidth})`}
        </button>
      </div>
    </Resizable>
  );
}
