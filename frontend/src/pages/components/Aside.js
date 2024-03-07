import React from "react";

export default function Aside() {
  const d = JSON.parse(sessionStorage.getItem("categories"));
  let categories = null;
  
  if (d === null) {
    categories = [
      { id: 0, name: "Formacja", href: "" },
      { id: 1, name: "Ciekawe", href: "" },
      { id: 2, name: "Nowości", href: "" },
      { id: 3, name: "Bestsellery", href: "" },
      { id: 4, name: "ks. Blachnicki", href: "" },
      { id: 5, name: "Gadżety", href: "" },
    ];
    sessionStorage.setItem("categories", JSON.stringify(categories));
  } else categories = Array.from(d);

  return (
    <aside>
      Kategorie:
      <ul>
        {categories.map((i) => {
          return (
            <li key={i.id}>
              <a className="link-underline link-underline-opacity-0" href={i.href}>
                {i.name}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
