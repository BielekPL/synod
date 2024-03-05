import React, { useEffect, useState } from "react";
import "../stylesheets/order_table.css";
import { OutlineDangerBtn, PrimaryBtn, TestButton } from "./components/Buttons";
import { Link } from "react-router-dom";
import routes from "../routes";
import { useOrderContext } from "./hooks/OrderContext";
import { BASKET as BasketStruct} from "../structures";

const markText = (e) =>{
  e.target.select()
}

function Tr(d, i, f, updateAmount) {
  const amount = d[BasketStruct.amount];
  const updateAmountMid = (v) => {
    if (v < 1) v = 1;
    updateAmount(i - 1, v);
  };
  if (!d[BasketStruct.id]) return;
  const handleChange = (e) => {
    if(e.target.value == null)return;
     updateAmountMid(Number(e.target.value))};
  
  return (
    <tr key={i} id={i}>
      <td /*scope="row" */ key="nr">{i}</td>
      <td /*scope="col" */ key="img">
        <img className="img" src={d[BasketStruct.img] || ''} alt="preview" />
      </td>
      <td /*scope="col" */ key="title">
        <Link to={"/items/" + d[BasketStruct.id]}>{d[BasketStruct.title]}</Link>
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
          min={0}
          max={20}
          value={amount}
        />
        <button
          className="amount-btn"
          onClick={() => updateAmountMid(amount + 1)}
        >
          +
        </button>
      </td>
      <td /*scope="col" */ key="price" className="price">
        {d[BasketStruct.prize]}
      </td>
      <td className="bin">
        <OutlineDangerBtn onClick={() => f(i)} txt={"Usuń z koszyka"} />
      </td>
    </tr>
  );
}

let data = new Array(5).fill(
  [
    1,
    "Zabity za prawdę",
    35.25,
    2,
    "/details/1234"
  ],
  0,
  10
);

export default function Basket() {
  // feat: Uzupelniane po pobraniu danych z bazy
  let dt = [];
  try {
    dt = Array.from(JSON.parse(sessionStorage.getItem("basket")));
  } catch {}
  // dt = data;
  const [list, updateList] = useState(dt);
  const { setBasket } = useOrderContext();
  useEffect(() => {
    try {
      const d = list.filter((v) => {
        return v[BasketStruct.id] ? v : null;
      });
      // eslint-disable-next-line
      dt = d;
      sessionStorage.setItem("basket", JSON.stringify(d));
      updateList(d);
    } catch {}
  }, []);

  useEffect(() => {
    console.log("Updating storage");
    sessionStorage.setItem("basket", JSON.stringify(list));
    setBasket(list.length > 0);
  }, [list]);

  const updateListMid = (i, v) => {
    let temp = list;
    temp[i][BasketStruct.amount] = v;
    updateList([...temp]);
  };
  let sum = 0;

  // !TEST-REASON
  const fillBasket = () => {
    updateList([...data]);
    // window.location.reload()
    // console.log(data);
  };

  if (dt === null || dt.length === 0)
    return (
      <div className="Basket">
        <h2 className="topic border-bottom mb-3">Koszyk</h2>
        <span style={{ textAlign: "center", width: "100%" }}>
          Twój koszyk jest pusty...
        </span>
        {/* !TEST-REASON */}
        <TestButton action={fillBasket}>Napełnij koszyk</TestButton>
      </div>
    );

  function filterList(nr) {
    console.log("To delete: ", nr);
    let received = list.filter((v, i) => {
      if (nr - 1 !== i) {
        return v;
      }
      return null;
    });
    updateList([...received]);
  }

  return (
    <div className="Basket">
      <h2 className="topic border-bottom mb-3">Koszyk</h2>
      <table className="table table-bordered table-striped table-hover" >
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
          {list.map((v, i) => {
            sum += v[BasketStruct.prize] * v[BasketStruct.amount];
            return Tr(v, i + 1, filterList, updateListMid);
          })}

          <tr className="table-secondary">
            <td colSpan="6" style={{ textAlign: "end" }}></td>
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
          Razem: {(Math.round(sum * 100) / 100).toFixed(2)}
        </span>
        <Link to={routes.CLIENT_SUBMIT_ORDER}>
          <PrimaryBtn txt="Złóż zamówienie" />
        </Link>
      </span>
    </div>
  );
}
