import React from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Column,
  PrefabThemeProvider
} from "@stephenvector/prefab";

const App: React.FC = () => {
  return (
    <PrefabThemeProvider>
      <header>
        <Container>
          <Row>
            <Column>
              <h1>Playout</h1>
              <ul>
                <li>
                  <Link href="/content-types">
                    <a>Content Types</a>
                  </Link>
                </li>
                <li>
                  <Link href="/content-types/new">
                    <a>New Content Type</a>
                  </Link>
                </li>
              </ul>
            </Column>
          </Row>
        </Container>
      </header>
      <section></section>
    </PrefabThemeProvider>
  );
};

export default App;
