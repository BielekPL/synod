import React, { useState } from "react";
import { PrimaryBtn, SuccessBtn, CheckboxBtn } from "../components/Buttons";
import "../../stylesheets/order_table.css";
import img from "../../zabity_za_prawde.jpg";
import routes from "../../routes";
import { Link } from "react-router-dom";

const order = {
  id: "20240215_1234",
  person: "Przemysław Zielent",
  email: "poczta@domena.pl",
  authorized: "Larynta",
  status: 0,
};
// const data = [];

const statusCode = (i) => {
  if (i === 0) return "Oczekujące";
  else if (i === 1) return "W trakcie przygotowania";
  else if (i === 2) return "Oczekuje na odbiór";
  else if (i === 3) return "Wydane";
};

// function OrderShort({ data }) {
//   return (
//     <tr>
//       <td className="order-id">#{data.id}</td>
//       <td className="order-status">{statusCode(data.status)}</td>
//       <td className="order-person">{data.person}</td>
//       <td className="order-email">{data.email}</td>
//       <td className="order-actions">
//         <OutlineBtn txt="Pokaż" href={"/orders/" + data.id} />
//       </td>
//     </tr>
//   );
// }

let data = new Array(3).fill(
  {
    id: 1234,
    title: "Zabity za prawdę",
    price: 35.22,
    amount: 2,
    img,
  },
  0,
  10
);

export default function Content() {
  const list = data;
  const [btns, btnsState] = useState(Array(list.length).fill(false)),

  [notify, updateNotify] = useState(false),
  [placeOrder, updatePlaceOrder] = useState(false);
  let sum = 0;

  const notifyClient = () =>{
    alert("Klient powiadomiony");
    updatePlaceOrder(true);
  }

  const updateState = (id, s) => {
    // Aktualizowanie przycisków "JEST"
    let temp = btns;
    temp = temp.map((v, i) => {
      if (i === id) return s;
      return v;
    });
    btnsState([...temp]);
    if(!temp.includes(false))
      updateNotify(true);
    // console.log(id, temp, btns);
  };

  return (
    <div className="OrderDetails">
      <h2 className="topic border-bottom mg-3">
        Zamówienie #{order.id} - szczegóły
      </h2>
      <ul className="my-2">
        <li>
          Zamawiający: <strong>{order.person}</strong>
        </li>
        <li>
          Adres email: <strong id="email">{order.email}</strong>
        </li>
        <li>
          Upoważniony: <strong id="authorized">{order.authorized}</strong>
        </li>
        <li>
          Status: <strong id="status">{statusCode(order.status)}</strong>
        </li>
      </ul>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-secondary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Zdjęcie</th>
            <th scope="col">Tytuł</th>
            <th scope="col">Ilość</th>
            <th scope="col">Cena</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {list.map((d, i) => {
            sum += d.price * d.amount;
            // Wiersz tabeli
            return (
              <tr key={i} id={i}>
                <td key="nr">{i + 1}</td>
                <td key="img">
                  <img className="img" src={d.img} alt="img"/>
                </td>
                <td key="title">
                  <Link to={routes.SELLER_ITEM_DETAILS.replace(":id", d.id)}>{d.title}</Link>
                </td>

                <td className="align-items-center" key="amount">
                  <input
                    style={{
                      padding: 0,
                      paddingRight: ".5em",
                      margin: "0 .3em",
                      textAlignLast: "center",
                    }}
                    type="number"
                    id=""
                    min={0}
                    max={20}
                    value={d.amount}
                    readOnly={true}
                  />
                </td>
                <td key="price" className="price">
                  {d.price}
                </td>
                <td className="bin">
                  <CheckboxBtn
                    i={i}
                    txt="Jest"
                    name={"item_" + i}
                    checked={btns[i]}
                    action={updateState}
                  />
                </td>
              </tr>
            );
          })}

          <tr className="table-secondary">
            <td colSpan="6" style={{ textAlign: "end" }}>
            </td>
          </tr>
        </tbody>
      </table>

      <span
        className="mw"
        style={{ display: "grid", justifyItems: "end", gap: ".7em" }}
      >
        <span
          className="price"
          style={{ fontSize: "x-large", marginRight: ".5em" }}
        >
          { (Math.round(sum*100) / 100).toFixed(2) }
        </span>

        <PrimaryBtn txt="Powiadom odbiorcę" disabled={!(notify&&!placeOrder)} onClick={()=>{notifyClient()}} />
        <SuccessBtn txt="Wydaj zamówienie" disabled={!(notify&&placeOrder)} />
      </span>
    </div>
  );
}
