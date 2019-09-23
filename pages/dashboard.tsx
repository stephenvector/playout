import { useEffect } from "react";
import Router from "next/router";
import { useAuth } from "../contexts/auth";

export default function Dashboard() {
  const [authState, authDispatch] = useAuth();

  useEffect(() => {
    if (!authState.loggedIn) {
      Router.push("/signin");
    }
  }, [authState.loggedIn]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
