import React, { useContext } from "react";
import LayoutBuilderContext from "./LayoutBuilderContext";

interface InsertRowBarProps {
  newRowIndex: number;
}

export default function InsertRowBar({ newRowIndex }: InsertRowBarProps) {
  const layoutContext = useContext(LayoutBuilderContext);

  function handleInsertRow(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    layoutContext.insertRow(newRowIndex);
  }

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <button type="button" onClick={handleInsertRow}>
        Insert Row
      </button>
    </div>
  );
}
