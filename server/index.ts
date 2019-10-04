import {
  GraphQLObjectTypeConfig,
  GraphQLFieldConfig,
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLSchemaConfig,
  GraphQLSchema
} from "graphql";
import next from "next";
import express from "express";
import graphqlHTTP from "express-graphql";
import bodyParser from "body-parser";

import authRoute from "./auth";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const jsonParser = bodyParser.json({});

type Post = {
  title: string;
  content: string;
};

function getPost(): Post {
  return {
    title: "this is a post",
    content: "this is some content"
  };
}

const titleField: GraphQLFieldConfig<Post, {}> = {
  type: new GraphQLScalarType({
    name: "title",
    serialize: (v: string) => v
  })
};

const contentField: GraphQLFieldConfig<Post, {}> = {
  type: new GraphQLScalarType({
    name: "content",
    serialize: v => v
  })
};

const postObjectConfig: GraphQLObjectTypeConfig<Post, {}> = {
  name: "Post",
  fields: {
    title: titleField,
    content: contentField
  }
};

const postObject = new GraphQLObjectType(postObjectConfig);

const queryObject = new GraphQLObjectType({
  name: "Posts",
  fields: {
    Posts: {
      type: postObject,
      resolve: getPost
    }
  }
});

const schemaConfig: GraphQLSchemaConfig = {
  query: queryObject
};

const schema: GraphQLSchema = new GraphQLSchema(schemaConfig);

app.prepare().then(() => {
  const server = express();

  server.use(
    "/api/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: {},
      graphiql: true
    })
  );

  server.post("/auth", jsonParser, authRoute);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

export default app;
