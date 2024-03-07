import React, { useState } from "react";
// import img from "../zabity_za_prawde.jpg";
import "../stylesheets/order_table.css";
import '../stylesheets/cards.css'
import { OutlineBtn } from "./components/Buttons";
import SearchBar from "./components/SearchBar";
import BookCards from "./components/BookCards";
import routes from "../routes"

const img = null;

function Tr(d, i) {
  const amount = d.amount;
  return (
    <tr key={i} id={i}>
      <td /*scope="row" */ key="nr">{i}</td>
      <td /*scope="col" */ key="img">
        <img className="img" src={d.img} alt="img" />
      </td>
      <td /*scope="col" */ key="title">{d.title}</td>
        <td /*scope="col" */ className="align-items-center" key="amount">
          <input
            style={{
              padding: 0,
              paddingRight: ".5em",
              margin: "0 .3em",
              textAlignLast: "center",
            }}
            type="number"
            name="id_amount"
            // onChange={handleChange}
            id=""
            min={0}
            max={20}
            value={amount}
            disabled={true}
          />
        </td>
      <td /*scope="col" */ key="price" className="price">
        {d.price}
      </td>
      <td className="bin">
        <OutlineBtn onClick={() => {}} txt={"Aktualizuj"} href={routes.SELLER_UPDATE_ITEM + '/' +d.id} />
      </td>
    </tr>
  );
}

const data = new Array(15).fill(
  {
    id: 1,
    title: "Zabity za prawdę; Ks. Blachnicki w obozach i więzieniach",
    price: 35.25,
    amount: 12,
    dostepnosc: "Jest",
    href: "/items/1234",
    img,
  },
  0,
  10
);

export default function ItemsList({ seller }) {
  // feat: Uzupelniane po pobraniu danych z bazy
  let dt = data;
  const [list, updateList] = useState(dt);
  return (
    <div className="">
      <h2 className="topic border-bottom mb-3 w">Lista przedmiotów</h2>
      <div className="d-flex justify-content-center flex-column">
        <div className="mx-2 ">
          {(seller && <OutlineBtn txt="Dodaj nowy produkt" href={routes.SELLER_UPDATE_ITEM}/>)}
          <SearchBar className="mb-3" />
          {(!seller && <BookCards cards={data} />)}

          {seller && (
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-secondary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Zdjęcie</th>
                  <th scope="col">Tytuł</th>
                  {seller && <th scope="col">Ilość</th>}
                  <th scope="col">Cena</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {list.map((v, i) => {
                  return Tr(v, i + 1);
                })}
                <tr className="table-secondary">
                  <td colSpan="6" style={{ textAlign: "end" }}></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
