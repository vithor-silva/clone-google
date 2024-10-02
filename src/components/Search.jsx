import axios from "axios";
import React from "react";
import { useState } from "react";
import Noodles from "../assets/noodle.jfif";

const Serach = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    setError("");
    setLoading(true);

    try {
      const URL = "http://localhost:4000/search";
      const res = await axios.get(URL, {
        params: {
          query: query,
        },
      });
      const data = res.data.organic_results || [];
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
        {error ? (
          <h4>{error}</h4>
        ) : loading ? (
          <h4>Carregando...</h4>
        ) : (
          <ul>
            {results.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}{" "}
                  </a>
                  <p>{item.snippet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Serach;
