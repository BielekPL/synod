import SearchBar from "./components/SearchBar";
import React from "react";
import BookCards from './components/BookCards'
import '../stylesheets/cards.css'
import img from "../zabity_za_prawde.jpg"

const cards = [
  {
    key: 0,
    title: "Droga ku dojrzałości Chrześcijańskiej",
    href: null,
    dostepnosc: "Nie działa",
    price: "25,26",
  },
  {
    key: 1,
    title: "Zabity za prawdę",
    href: "items/1234",
    dostepnosc: "DZIAŁA-kliknij",
    price: "35.22",
    img
  },
  {
    key: 2,
    title: "Tytuł książki",
    href: null,
    dostepnosc: "Nie działa",
    price: "25,26",
  },
  {
    key: 3,
    title: "ZAKŁADKA MAGNETYCZNA: DARY ZOBOWIĄZANIA DOMOWEGO KOŚCIOŁA",
    href: null,
    dostepnosc: "Nie działa",
    price: "25,26",
  },
  {
    key: 4,
    title: "Tytuł książki",
    href: null,
    dostepnosc: "Nie działa",
    price: "25,26",
  },
  {
    key: 5,
    title: "Tytuł książki",
    href: null,
    dostepnosc: "Nie działa",
    price: "25,26",
  },
];

function Home() {
  return (
    <>
      <SearchBar />
      <h2 className="topic">Nowości</h2>
      <BookCards cards={cards} name="newest" />
      <h2 className="topic">Popularne</h2>
      <BookCards cards={cards} name="topic" />
    </>
  );
}

export default Home;
