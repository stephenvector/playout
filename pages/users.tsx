import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

const Users: NextPage<{ users: any[] }> = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <p>List of all users</p>
      <pre>
        <code>{JSON.stringify(users, null, 2)}</code>
      </pre>
    </div>
  );
};

Users.getInitialProps = async ({ req }) => {
  let endpoint = "/api/users";
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

export default Users;
