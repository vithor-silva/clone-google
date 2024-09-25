import axios from "axios";
import React from "react";
import { useState } from "react";
import Noodles from "../assets/noodle.jfif";

const Serach = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://serpapi.com/search.json";
    try {
      const res = await axios.get(URL, {
        params: {
          q: query,
          engine: "google",
          google_domain: "google.com.br",
          api_key: API_KEY,
          hl: "pt-br",
          gl: "br",
          num: 10,
        },
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao fazer a busca");
    }
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
