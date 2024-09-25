import React from "react";
import Noodles from "../assets/noodle.jfif";

const Serach = () => {
  return (
    <div className="App">
      <div className="Logo">
        <h1>Noodles</h1>
        <img src={Noodles} alt="Noodles"></img>
      </div>
      <form>
        <input type="text" placeholder="Sua busca" />
        <button>Buscar</button>
      </form>
    </div>
  );
};

export default Serach;
