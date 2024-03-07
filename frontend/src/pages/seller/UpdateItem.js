import React, { useEffect, useState } from "react";
import "../../stylesheets/update_item.css";
import { PrimaryBtn } from "../components/Buttons";
import { useParams } from "react-router-dom";

function ParseCategory({ v }) {
  return (
    <option key={v.id} value={v.id}>
      {v.name}
    </option>
  );
}

const uploadPhoto = () => {};
const fetchData = (e) => new Promise((res) => setTimeout(res, 500));

const fillItemData = (v) => {
  document.getElementById("title").value = v[0] || null;
  document.getElementById("category").value = v[1] || null;
  document.getElementById("amount").value = v[2] || null;
  document.getElementById("prize").value = v[3] || null;
  document.getElementById("description").innerText = v[4] || null;
};

const item = [
  "Zabity za prawdę",
  4,
  null,
  35.22,
  "Zaczęło się tak: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, assumenda earum facilis dolore id eligendi alias, rem officiis inventore sapiente ab quo nisi perferendis qui dolorem, labore repellat veniam dicta!",
];

export default function UpdateItem({}) {
  const [categories, updateCategories] = useState([]),
    [fetchStatus, updateFetchStatus] = useState(false),
    id = useParams()["id"];

  useEffect(() => {
    let temp = JSON.parse(sessionStorage.getItem("categories"));
    updateCategories(temp);

    if (id)
      fetchData().then(() => {
        fillItemData(item);
        updateFetchStatus(true);
      });
  }, []);

  return (
    <div className="updateItem">
      <h2 className="topic border-bottom">Dodawanie artykułu</h2>
      <div className="wrapper">
        <div className="img">
          <img alt="Miejsce na zdjęcie" />
          <button className="btn btn-secondary" onClick={(e) => uploadPhoto(e)}>
            Dodaj/aktualizuj zdjęcie
          </button>
        </div>

        <form>
          <ul>
            <li className="form-floating">
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                placeholder="Zabity za prawdę..."
                required
              />
              <label htmlFor="title">Tytuł:</label>
            </li>
            <li className="form-floating col-md">
              <select
                className="form-select"
                name="category"
                id="category"
                defaultValue=""
                aria-label="Wybierz kategorię"
                required
              >
                <option value="" disabled>
                  ...
                </option>
                {categories.map((v, i) => {
                  return <ParseCategory key={i} v={v} />;
                })}
              </select>
              <label htmlFor="category" className="form-label">
                Kategoria:
              </label>
            </li>
            <div className="d-flex  g-1" style={{ gap: "1.5em" }}>
              <li className="form-floating col-sm">
                <input
                  type="number"
                  className="form-control"
                  size="2"
                  min="1"
                  name="amount"
                  id="amount"
                  placeholder="0"
                  required
                />
                <label htmlFor="amount" className="form-label">
                  Liczba sztuk:
                </label>
              </li>
              <li className="form-floating col-sm">
                <input
                  type="number"
                  className="form-control"
                  step="0.01"
                  size="2"
                  min="1"
                  name="prize"
                  id="prize"
                  placeholder="23"
                  required
                />
                <label htmlFor="prize" className="form-label">
                  Cena (zł):
                </label>
              </li>
            </div>
            <li className="form-floating">
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                placeholder="..."
              ></textarea>
              <label htmlFor="description">Opis:</label>
            </li>
            <div
              className="mw"
              style={{ display: "grid", justifyContent: "end" }}
            >
              <PrimaryBtn txt="Dodaj/aktualizuj pozycję" />
            </div>
          </ul>
        </form>
      </div>
    </div>
  );
}
