import React from "react";
import { useAuthContext } from "../hooks/AuthContext";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { useOrderContext } from "../hooks/OrderContext";

let urls;

export default function Navbar({ target }) {
  const { userData } = useAuthContext();
  const { basket } = useOrderContext();

  if (!userData.current) {
    urls = [
      { txt: "Strona główna", id: "main-page", href: routes.CLIENT_MAIN, func: null },
      // { txt: "Status zamówienia", id: "order-status", href: null, func: null },
      { txt: "Itemki", id: "items", href: routes.CLIENT_ITEMS },
      { txt: "Koszyk", id: "basket", href: routes.CLIENT_BASKET, basket },
      { txt: "Zaloguj się", id: "login", href: routes.LOGIN }
    ];
  } else if (userData.current) {
    urls = [
      { txt: "Panel sprzedawcy", id: "main-page", href: routes.SELLER_DASHBOARD + "/", func: null },
      { txt: "Zamówienia", id: "orders", href: routes.SELLER_ORDERS_MAIN + "/", basket},
      { txt: "Itemy", id: "items", href: routes.SELLER_ITEMS },
      { txt: "Wyloguj się", id: "logout", href: routes.LOGOUT }
    ];
  }


  const items = urls.map((item) => {
    return (
      <NavLink
        className="btn btn-primary"
        to={item.href}
        id={item.id}
        key={item.id}
        onClick={()=>{try{document.querySelector(".show").classList.remove("show")}catch{}}}
      >
        <div items-amount={item.basket?1:0}>{item.txt}</div>
      </NavLink>
    );
  });

  return (
    <nav className="navbar navbar-expand-md">
      <button
        className="btn btn-primary navbar-btn  "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarList"
      >
        <span> Menu: </span>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarList">
        <div className="navbar-nav">{items}</div>
      </div>
    </nav>
  );
}
