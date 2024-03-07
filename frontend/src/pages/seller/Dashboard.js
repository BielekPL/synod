import React from "react";
import { useAuthContext } from "../hooks/AuthContext";
import { Link } from "react-router-dom";

const renderList = (e) => {
  return (
    <ul>
      {e.map((v) => {
        return (
          <li>
            <Link to={v.href}>{v.txt}</Link>
          </li>
        );
      })}
    </ul>
  );
};

function Dashboard() {
  const { userData } = useAuthContext();

  return (
    <>
      <h2 className="topic border-bottom">Panel sprzedawcy</h2>
      <div className="Dashboard">
       <i>Tutaj będzie coś ciekawego... kiedyś...</i>
        </div>
    </>
  );
}

export default Dashboard;
