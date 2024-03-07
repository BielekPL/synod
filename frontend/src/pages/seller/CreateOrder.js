import React, { useState } from "react";
import { PrimaryBtn } from "../components/Buttons";
import api_req from "../hooks/api";
import { Navigate as nav } from "react-router-dom";

const markText = (e) =>{
  e.target.select()
}

function Tr(d, i, f, updateAmount) {
  const amount = d.amount;
  d.id = i;
  const updateAmountMid = (v) => {
    if (v < 0) v = 0;
    updateAmount(i - 1, v);
  };

  const handleChange = (e) => {
    updateAmountMid(Number(e.target.value));
  };

  return (
    <tr key={i} id={i}>
      <td /*scope="row" */ key="nr">{i}</td>
      <td /*scope="col" */ key="img">
        <img className="img" src={d.img} />
      </td>
      <td /*scope="col" */ key="title">
        <a href={"/details/" + d.id}>{d.title}</a>
      </td>

      <td /*scope="col" */ className="align-items-center" key="amount">
        <button
          className="amount-btn"
          onClick={() => updateAmountMid(amount - 1)}
        >
          -
        </button>
        <input
          style={{
            padding: 0,
            paddingRight: ".5em",
            margin: "0 .3em",
            textAlignLast: "center",
          }}
          type="number"
          name="id_amount"
          onChange={handleChange}
          onClick={markText}
          id=""
          min={0}
          max={20}
          value={amount}
        />
        <button
          className="amount-btn"
          onClick={(e) => updateAmountMid(amount + 1, e)}
        >
          +
        </button>
      </td>
      <td /*scope="col" */ key="price" className="price">
        {d.price}
      </td>
      {/* {<td className="bin">
        <OutlineBtn onClick={() => f(i)} txt={"Dodaj do zamówienia"}/>
      </td>} */}
    </tr>
  );
}

const data = new Array([
  {
    id: 1,
    title: "Zabity za prawdę",
    price: 35.25,
    amount: 0,
    href: "/details/1234",
    img: null,
  },
  {
    id: 2,
    title: "Zabity za prawdę",
    price: 35.25,
    amount: 0,
    href: "/details/1234",
    img: null,
  },
  {
    id: 3,
    title: "Zabity za prawdę",
    price: 35.25,
    amount: 0,
    href: "/details/1234",
    img: null,
  },
  {
    id: 4,
    title: "Zabity za prawdę",
    price: 35.25,
    amount: 0,
    href: "/details/1234",
    img: null,
  },
])[0];

function submit() {
  const name = document.getElementById("name").value,
    email = document.getElementById("email").value | null,
    parsed_basket = JSON.parse(sessionStorage.getItem("basket")),
    data = {
      name,
      email,
      parsed_basket,
    };

  const resp = api_req(data);
  if (resp.status === 200) nav("/orders/" + resp.id);
}

export default function CreateOrder() {
  const [list, updateList] = useState(data);
  console.log({ list });
  const updateListMid = (i, v) => {
    let temp = list;
    console.log({ i, v });
    temp[i].amount = v;
    console.log({ temp });
    console.log({ temp, list });
    updateList([...temp]);
    sessionStorage.setItem("basket", JSON.stringify(temp));
  };
  let sum = 0;

  return (
    <>
      <h2 className="topic border-bottom">Tworzenie zamówienia</h2>
      <form
        className="mx-2 my-2 w-100 d-flex flex-row justify-content-between"
        style={{ alignSelf: "center" }}
      >
        <div className="form-floating mx-3 col">
          <input
            type="text"
            className="form-control"
            min="1"
            name="name"
            id="name"
            placeholder="0"
            required
          />
          <label htmlFor="name" className="form-label">
            Zamawiający
          </label>
          <div className="form-text px-2">*Pole obowiązkowe</div>
        </div>
        <div className="form-floating col mx-3">
          <input
            type="text"
            className="form-control"
            min="1"
            name="email"
            id="email"
            placeholder="0"
          />
          <label htmlFor="email" className="form-label">
            Adres email
          </label>
        </div>
      </form>

      <table className="Basket table table-bordered table-striped table-hover">
        <thead className="table-secondary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Zdjęcie</th>
            <th scope="col">Tytuł</th>
            <th scope="col">Ilość</th>
            <th scope="col">Cena</th>
            {/* <th scope="col"></th> */}
          </tr>
        </thead>

        <tbody>
          {list.map((v, i) => {
            sum += v.price * v.amount;
            v.id = i;
            return Tr(v, i + 1, null, updateListMid);
          })}

          <tr className="table-secondary">
            <td colSpan="6" style={{ textAlign: "end" }}></td>
          </tr>
        </tbody>
      </table>

      <span
        className="mw mt-4 "
        style={{ display: "grid", justifyContent: "end" }}
      >
        <PrimaryBtn type="submit" txt="Stwórz zamówienie" onClick={()=>alert("Zamówienie stworzone... itp")} />
      </span>
    </>
  );
}
