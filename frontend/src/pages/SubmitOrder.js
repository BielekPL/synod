import React from "react";

function MyFrom(){
    function action(e){
        'use server'
        e.preventDefault();
        const f= e.target;
        const data = new FormData(f);
        data.append("items", sessionStorage.getItem("basket"))
        alert("Formularz zosanie wysłany. Info w konsoli");
        // todo: Wstawić tu wysyłanie danych przez API/Serwer 
    }

    return (
        <form onSubmit={action} className="mx-2">
                <div className="mb-2">
                    <label htmlFor="name" className="form-label">Imię i nazwisko zamawiającego:</label>
                    <input type="text" name="name" id="name" className="form-control mx-1" minLength="3"
                        placeholder="Przemek Krakowski" required />
                    <div className="form-text px-2" >Pole obowiązkowe</div>
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Adres email:</label>
                    <input type="email" name="email" className="form-control mx-1" minLength="3"
                        placeholder="przyklad@poczta.pl" id="" required />
                    <div className="form-text px-2">Pole obowiązkowe</div>
                </div>
                <div className="mb-4">
                    <label htmlFor="authorized" className="form-label">Osoby upoważnione do odbioru (oddzielić po przecinku):</label>
                    <input type="text" name="authorized" className="form-control mx-1" minLength="3"
                        placeholder="Grzegorz Majstersztyk" />
                </div>
                <span className="mw" style={{display: "grid", justifyContent: 'end'}}>
                    <button type="submit" className="btn btn-primary">Złóż zamówienie</button>
                </span>

            </form>
    )
}

export default function Content(){
    

    return(
        <div className="submitOrder">
            <h2 className="topic border-bottom mb-3">Składanie zamówienia</h2>
            <MyFrom />
        </div>
    )
}
