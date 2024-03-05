import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import routes from "../../routes";
import Loading from "../components/Loading";

const myContex = createContext(),
  // defaultUser = { name: "Bartek", token: "123456"};
  defaultUser = null,
  KEY = "user-credentials",
  fakeAuth = (creds) =>
    new Promise((resolve) => {
      setTimeout(() => resolve("12345678"), 250);
    });

export default function AuthProvider({ children }) {
  const userData = useRef(defaultUser),
    [ifLoadedCreds, setLoadedCreds] = useState(false);

  const setCredentials = (d) => {
    sessionStorage.setItem(KEY, JSON.stringify(d));
    userData.current = d;
  }

  useEffect(() => {
    // Getting credentials from storage
    let creds = {};
    // alert("Setting creds")
    try {
      creds = JSON.parse(sessionStorage.getItem(KEY));
      if(!creds)
        setLoadedCreds(true);
    } catch (error) {}
    fakeAuth(creds).then((token) => {
      creds.token = token;
      setCredentials(creds);
      setLoadedCreds(true);
    })
    .catch(()=>{
      setCredentials(null);
      setLoadedCreds(true);
    });
  }, []);

  const nav = useNavigate();
  const handleLogin = (e) => {
    // debugger
    if (e) e.preventDefault();
    // alert("Logging")
    fakeAuth().then((t)=>{
      let d = {name: "Bartek", token: t};
      setCredentials(d);
      console.log(userData.current)
      nav(routes.SELLER_DASHBOARD)
    });
    
  };

  const handleLogout = async () => {
      setCredentials(null);
      console.log("Logging out...")
      nav(routes.CLIENT_MAIN);
    };

  const value = {
    userData,
    handleLogin,
    handleLogout,
  };

  if(!ifLoadedCreds)
   return <Loading />;
  return <myContex.Provider value={value}>{children}</myContex.Provider>;
}

const useAuthContext = () => useContext(myContex);

const redirectUnauthorized = () => {
  return (
    <>
      <h2 className="topic border-bottom">Brak uprawnień</h2>
      <span>Nie możesz tu wejść bez zalogowania. Nie masz uprawnień</span>
    </>
  );
};

const ProtectedPage = ({ children }) => {
  const { userData, ifLoadedCreds } = useAuthContext(),
    loc = useLocation();
    // console.log({userData})
  if (!userData.current ) {
    return <Navigate to={routes.CLIENT_MAIN} state={{ from: loc }} />;
  }
  return children;
};

export { useAuthContext, ProtectedPage };
