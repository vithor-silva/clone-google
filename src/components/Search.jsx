import React from "react";
import { useState } from "react";
import Noodles from "../assets/noodle.jfif";

const Serach = () => {
  const [query, setQuery] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="App">
      <div className="Logo">
        <h1>Noodles</h1>
        <img src={Noodles} alt="Noodles"></img>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sua busca"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default Serach;
