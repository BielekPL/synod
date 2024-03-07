import React from "react";
import { Link } from "react-router-dom";

export function PrimaryBtn({ txt, onClick, disabled=false }) {
  return (
    <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {txt}
    </button>
  );
}

export function SecondaryBtn({ txt, onClick }) {
  return (
    <button className="btn btn-secondary" onClick={onClick}>
      {txt}
    </button>
  );
}

export function SuccessBtn({ txt, onClick, disabled }) {
  return (
    <button className="btn btn-success" onClick={onClick} disabled={disabled}>
      {txt}
    </button>
  );
}

export function OutlineBtn({ txt, href, disabled, onClick }) {
  if (href)
    return (
      <Link style={{ color: "unset", textDecoration: "none" }} to={href}>
        <button className="btn btn-outline-primary" disabled={disabled} onClick={onClick}>
          {txt}
        </button>
      </Link>
    );
  return (
    <>
      <button disabled={disabled} className="btn btn-outline-primary">
        {txt}
      </button>
    </>
  );
}

export function OutlineDangerBtn({ onClick, txt }) {
  return (
    <button
      type="button"
      className="close btn btn-outline-danger"
      aria-label="Close"
      onClick={onClick}
    >
      <span aria-hidden="true">{txt}</span>
    </button>
  );
}

export function CheckboxBtn({ i, txt, checked, action }) {
  const f = (e) => {
    action(i, e.target.checked);
  };
  return (
    <>
      <input
        name={"check-" + i}
        id={"check-" + i}
        onChange={f}
        checked={checked}
        type="checkbox"
        className="btn-check"
      />
      <label htmlFor={"check-" + i} className="btn btn-outline-primary">
        {txt}
      </label>
    </>
  );
}

export function TestButton({ txt, action, children }) {
  return (
    <span>
      <button
        title="Przycisk testowy, na produkcji nie powinno go być"
        data-placement="top"
        type="button"
        className="d-block btn btn-outline-info test-btn m-2"
        aria-label="Close"
        onClick={action}
      >
        {txt || children}
      </button>
    </span>
  );
}
