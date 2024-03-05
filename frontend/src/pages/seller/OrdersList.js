import React from "react";
import "../../stylesheets/order_table.css";
import { OutlineBtn } from "../components/Buttons";
import routes from "../../routes";

const data = new Array(5)
data.fill({
    id: "20240215_1234",
    person: "Przemysław Zielent",
    email: "poczta@domena.pl",
    authorized: "Larynta",
    status: 0
}, 0,5);
// const data = [];

const statusCode = (i)=>{
    if(i===0)
        return "Oczekujące";
    else if(i === 1)
        return "W trakcie przygotowania";
    else if (i === 2) 
        return "Oczekuje na odbiór"
    else if (i=== 3)
        return "Wydane"
}

function OrderShort({data}){
return(
    <tr>
        <td className="order-id">#{data.id}</td>
        <td className="order-status">{statusCode(data.status)}</td>
        <td className="order-person">{data.person}</td>
        <td className="order-email">{data.email}</td>
        <td className="order-actions"><OutlineBtn txt="Pokaż" href={'./'+data.id} /></td>
    </tr>
)
}

export default function Content() {
    console.log(data.length)
  return (
    <div className="OrdersList">
      <h2 className="topic border-bottom mb-3">Lista zamówień</h2>
      <div className="m-2">
      <OutlineBtn txt="Stwórz nowe zamówienie" href={routes.SELLER_ORDER_CREATE}/>
      </div>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Nr zamówienia</th>
            <th scope="col">Status</th>
            <th scope="col">Zamawiający</th>
            <th scope="col">Adres email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i)=>{
            return (
            <OrderShort key={v.id + i} data={v} />
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
