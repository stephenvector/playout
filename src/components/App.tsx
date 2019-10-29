import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthContextProvider from "./AuthContextProvider";
import Header from "./Header";
import Upload from "./Upload";
import ContentTypeNew from "./ContentTypeNew";
import ContentTypeEdit from "./ContentTypeEdit";
import ContentTypes from "./ContentTypes";
import Posts from "./Posts";
import PostNew from "./PostNew";
import PostEdit from "./PostEdit";
import Auth from "./Auth";
import FieldTypeSelector from "./FieldTypeSelector";
import { useAuth } from "../hooks";

const App: React.FC = () => {
  const t = useAuth();
  return (
    <AuthContextProvider>
      <div>
        <Header />
        <Auth />
        <FieldTypeSelector />
        <section>
          <Switch>
            <Route path="/" exact component={Upload} />
            <Route path="/content-types" exact component={ContentTypes} />
            <Route path="/content-types/new" exact component={ContentTypeNew} />
            <Route
              path="/content-types/:contentTypeId"
              exact
              component={ContentTypeEdit}
            />
            <Route path="/posts/:contentTypeId" exact component={Posts} />
            <Route path="/posts/:contentTypeId/new" exact component={PostNew} />
            <Route
              path="/posts/:contentTypeId/:postId"
              exact
              component={PostEdit}
            />
          </Switch>
        </section>
      </div>
    </AuthContextProvider>
  );
};

export default App;
