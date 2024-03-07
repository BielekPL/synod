import React from "react";
import img from "../zabity_za_prawde.jpg";
import "../stylesheets/details.css";
import { useOrderContext } from "./hooks/OrderContext";
import routes from "../routes";
import { Link } from "react-router-dom";

function labelDetail(d) {
  return (
    <li className={"info " + d.cat_id} key={d.cat_id} data-tag={d.name}>
      {d.val}
    </li>
  );
}

export default function Content({ seller }) {
  // feat: Uzupelniane po pobraniu danych z bazy
  const { setBasket, displayAlert } = useOrderContext();
  const details_list = [
    { cat_id: "dostepnosc", name: "Dostępność: ", val: "Jest w magazynie" },
    { cat_id: "category", name: "Kategoria: ", val: "x. Blachnicki" },
    { cat_id: "publisher", name: "Wydawnictwo: ", val: "LWT" },
    { cat_id: "pages", name: "Stron: ", val: "Sporo..." },
  ];

  const [id, title, pic, price] = [1234, "Zabity za prawdę", img, 35.22],
    desc =
      "Zaczęło się tak: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, assumenda earum facilis dolore id eligendi alias, rem officiis inventore sapiente ab quo nisi perferendis qui dolorem, labore repellat veniam dicta!";

  function addItemToBasket() {
    const d = [id, title, price, 1, ""];
    let temp; 
    try {
      temp = JSON.parse(sessionStorage.getItem("basket"))
      console.log({ temp });
      if (temp === null) temp = new Array([]);
      else
        temp = Array.from(temp);
    } catch {
      temp = new Array([]);
    }
    // const a = new Array()
    const i = temp.findIndex((v) => v[0] === id);
    console.log({ temp });
    if (i < 0) temp.push(d);
    else temp[i][3] += 1;

    console.log({ i, d, temp });
    sessionStorage.setItem("basket", JSON.stringify(temp));
    setBasket(true);
    console.log({displayAlert})
    displayAlert();
    // alert("Dodano!");
  }
  let btn, btn_pc;
  console.log({ seller });
  if (seller) {
    btn_pc = (
      <Link to={routes.SELLER_UPDATE_ITEM + "/" + id}>
        <button className="my-btn pc" type="button">
          Aktualizuj artykuł
        </button>
      </Link>
    );
  } else {
    btn = (
      // btn for PC (under img and .details)
      <button className="my-btn" type="button" onClick={addItemToBasket}>
        Dodaj do koszyka
      </button>
    );

    btn_pc = (
      // btn for PC (in .details)
      <button className="my-btn pc" type="button" onClick={addItemToBasket}>
        Dodaj do koszyka
      </button>
    );
  }
  return (
    <div className="DetailsContainer ">
      <h2 className="topic border-bottom">{title}</h2>
      <img src={pic} alt="" />
      <div className="details">
        <ul>{details_list.map(labelDetail)}</ul>
        <span className="price">{price}</span>
        {btn_pc}
      </div>
      {btn}
      <div className="description">{desc}</div>
    </div>
  );
}
