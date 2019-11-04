import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthContextProvider from "./AuthContextProvider";
import Header from "./Header";
import Dashboard from "./Dashboard";
import ContentTypeNew from "./ContentTypeNew";
import ContentTypeEdit from "./ContentTypeEdit";
import ContentTypes from "./ContentTypes";
import Posts from "./Posts";
import PostNew from "./PostNew";
import PostEdit from "./PostEdit";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Media from "./Media";
import { useAuth } from "../hooks";

const App: React.FC = () => {
  const auth = useAuth();

  return (
    <AuthContextProvider>
      <div>
        <Header />
        <section className="Content">
          {auth.checkedAuth && !auth.isSignedIn && (
            <Switch>
              <Route path="/" exact render={() => <div>Home</div>} />
              <Route path="/signin" exact component={SignIn} />
              <Route path="/signup" exact component={SignUp} />
            </Switch>
          )}
          {auth.checkedAuth && auth.isSignedIn && (
            <Switch>
              <Route path="/" exact component={Dashboard} />

              <Route path="/media" exact component={Media} />
              <Route path="/content-types" exact component={ContentTypes} />
              <Route
                path="/content-types/new"
                exact
                component={ContentTypeNew}
              />
              <Route
                path="/content-types/:contentTypeId"
                exact
                render={props => (
                  <ContentTypeEdit
                    contentTypeId={props.match.params.contentTypeId}
                  />
                )}
              />
              <Route
                path="/posts/:contentTypeId"
                exact
                render={props => (
                  <Posts contentTypeId={props.match.params.contentTypeId} />
                )}
              />
              <Route
                path="/posts/:contentTypeId/new"
                exact
                render={props => (
                  <PostNew contentTypeId={props.match.params.contentTypeId} />
                )}
              />
              <Route
                path="/posts/:contentTypeId/:postId"
                exact
                render={props => (
                  <PostEdit
                    postId={props.match.params.postId}
                    contentTypeId={props.match.params.contentTypeId}
                  />
                )}
              />
            </Switch>
          )}
        </section>
      </div>
    </AuthContextProvider>
  );
};

export default App;
