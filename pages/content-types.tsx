import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

const ContentTypes: NextPage<{ users: any[] }> = ({ users }) => {
  return (
    <div>
      <h1>Content Types</h1>
      <p>List of all content types</p>
      <pre>
        <code>{JSON.stringify(users, null, 2)}</code>
      </pre>
    </div>
  );
};

ContentTypes.getInitialProps = async ({ req }) => {
  let endpoint = "/api/content-types";
  if (req !== undefined) {
    if (process.env.BASE_URI === undefined) {
      throw new Error("No BASE_URL defined.");
    }

    endpoint = `${process.env.BASE_URI}${endpoint}`;
  }

  const data = await fetch(endpoint).then(d => d.json());

  return {
    users: data.users
  };
};

export default ContentTypes;
