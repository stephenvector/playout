import React from "react";
import ContentTypeBuilder from "./ContentTypeBuilder";

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Playout</h1>
      </header>
      <section>
        <ContentTypeBuilder />
      </section>
    </div>
  );
}
