import React from "react";

export default function Loading() {
  return (
    <>
      <main id="main-content" className="loading" style={{gridRow: "2", display: "grid", justifyContent: "center", alignItems:"center"}}>
        <span style={{fontSize: "2.5em"}}>Ładowanie...</span>
      </main>
    </>
  );
}
