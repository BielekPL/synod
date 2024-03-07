import React from "react";
import { useAuthContext } from "./hooks/AuthContext";
import Loading from "./components/Loading";

export default function Logout() {
  const { handleLogout } = useAuthContext();
  handleLogout();
  return <Loading />
}
