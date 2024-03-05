import React, { useState } from "react";
import { useAuthContext } from "./hooks/AuthContext";
import { PrimaryBtn } from "./components/Buttons";

export default function LoginPage() {

  const { handleLogin } = useAuthContext();
  const [btnState, updateBtnState] = useState(false);
  return (
    <>
      <h2 className="topic border-bottom">Strona logowania</h2>
      <form onSubmit={(e)=>{handleLogin(e); updateBtnState(!btnState)}} className="mx-2 my-3 w-50 d-flex flex-column" style={{alignSelf: "center"}}>
        <div className="form-floating mb-2">
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
            Login
          </label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            step="0.01"
            size="2"
            min="1"
            name="passwd"
            id="passwd"
            placeholder="23"
            required
          />
          <label htmlFor="passwd" className="form-label">
            Hasło
          </label>
        </div>
      <small style={{fontStyle: "italic"}}>Wpisz cokolwiek, tu wszystko zadziała</small>
        
        <span className="mw mt-4 " style={{display: "grid", justifyContent: 'end'}}>
                    <PrimaryBtn type="submit" txt="Zaloguj się" disabled={btnState} />
                </span></form>
    </>
  );
}
