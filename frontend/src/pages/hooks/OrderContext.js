import React, { createContext, useContext, useState } from "react";
import { PrimaryBtn } from "../components/Buttons";
import "../../stylesheets/alert.css"

const myContex = createContext();
const hideAlert = ()=>{
  document.querySelector(".alert.active").classList.remove("active");
  };
const displayAlert = ()=>
  document.querySelector(".alert").classList.add("active");

const ItemAlert = () => {
  return (
        <div className="alert">
          <div>
          <span>Dodano do koszyka!</span>
          <PrimaryBtn txt="OK" onClick={hideAlert} />
        </div>
        </div>
  );
};

export default function OrderProvider({ children }) {
  const [basket, setBasket] = useState(0),
    value = {
      basket,
      setBasket,
      displayAlert
    };

  useState(() => {
    try {
      setBasket(sessionStorage.getItem("basket").length > 0);
    } catch {}
  }, []);

  return <myContex.Provider value={value}><ItemAlert />{children}</myContex.Provider>;
}

const useOrderContext = () => useContext(myContex);

export { useOrderContext };
