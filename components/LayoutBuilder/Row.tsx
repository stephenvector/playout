import React, { useContext, useRef } from "react";
import { useDrop } from "react-dnd";
import ReactResizeDetector from "react-resize-detector";
import DeleteButton from "./DeleteButton";
import LayoutBuilderContext from "./LayoutBuilderContext";
import { ROW } from "../../constants";

interface RowProps {
  children: React.ReactNode;
  rowIndex: number;
  rowId: string;
}

export default function Row({ children, rowIndex, rowId }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const layout = useContext(LayoutBuilderContext);

  const [, drop] = useDrop({
    accept: [ROW],
    canDrop: () => false
  });

  function handleResize(width: number) {
    layout.setRowWidth(rowId, width);
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    layout.deleteRow(rowIndex, rowId);
  }

  drop(rowRef);

  return (
    <div ref={rowRef}>
      <ReactResizeDetector handleWidth onResize={handleResize}>
        <DeleteButton type="button" onClick={handleDelete} />
        <div style={{ display: "flex" }}>{children}</div>
      </ReactResizeDetector>
    </div>
  );
}
