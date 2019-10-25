import React from "react";
import {
  Container,
  Row,
  Column,
  PrefabThemeProvider
} from "@stephenvector/prefab";
import { Switch, Route, NavLink } from "react-router-dom";
import { ContentType } from "../types";
import { contentTypeContentType } from "../config";
import { useFirebaseCollection } from "../hooks";
import PostNew from "./PostNew";
import Collection from "./Collection";

const App: React.FC = () => {
  const {} = useFirebaseCollection<ContentType>("content-types");
  return (
    <PrefabThemeProvider>
      <header>
        <Container>
          <Row>
            <Column>
              <h1>Playout</h1>
              <ul>
                <li>
                  <NavLink exact to="/content-types">
                    Content Types
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/content-types/new">
                    New Content Type
                  </NavLink>
                </li>
              </ul>
            </Column>
          </Row>
        </Container>
      </header>
      <section>
        <Switch>
          <Route
            path="/content-types"
            exact
            render={() => (
              <Collection
                contentType={contentTypeContentType}
                firebaseCollectionName="content-types"
              />
            )}
          />
          <Route
            path="/content-types/new"
            exact
            render={() => (
              <PostNew
                contentType={contentTypeContentType}
                firebaseCollectionName="content-types"
              />
            )}
          />
        </Switch>
      </section>
    </PrefabThemeProvider>
  );
};

export default App;
