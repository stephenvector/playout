import React, { useCallback, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import ContentTypes from "./ContentTypes";
import ContentTypeNew from "./ContentTypeNew";

const App: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Playout</h1>
        <ul>
          <li>
            <NavLink exact to="/">
              Content Types
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/content-types/new">
              New Content Type
            </NavLink>
          </li>
        </ul>
      </header>
      <section>
        <Switch>
          <Route path="/" exact component={ContentTypes} />
          <Route path="/content-types/new" exact component={ContentTypeNew} />
        </Switch>
      </section>
    </div>
  );
};

export default App;
