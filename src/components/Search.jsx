import axios from "axios";
import React from "react";
import { useState } from "react";
import Noodles from "../assets/noodle.jfif";

const Serach = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY =
    "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    setLoading(true);

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
    } finally {
      setLoading(false);
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
      <div>
        <ul>
          {error ? (
            <h4>{error}</h4>
          ) : loading ? (
            <h4>Carregando...</h4>
          ) : (
            results.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}{" "}
                  </a>
                  <p>{item.snippet}</p>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Serach;
