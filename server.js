import express from "express";
import cors from "cors";
import axios from "axios";

const PORT = 4000;
const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
  const { query, pageUrl, start = 0 } = req.query;

  if (!query && !pageUrl) {
    return res
      .status(400)
      .json({ error: "Parâmetro 'query' ou 'pageUrl' obrigatório." });
  }

  const API_KEY =
    "fe1c176d5c3677c6696723def70848f9911fd90bf8615199c9bf258b60871071";
  const BASE_URL = "https://serpapi.com/search.json";

  try {
    let response;

    if (pageUrl) {
      const urlObj = new URL(pageUrl);
      if (!urlObj.searchParams.get("api_key")) {
        urlObj.searchParams.set("api_key", API_KEY);
      }
      response = await axios.get(urlObj.toString());
    } else {
      response = await axios.get(BASE_URL, {
        params: {
          q: query,
          engine: "google",
          google_domain: "google.com.br",
          api_key: API_KEY,
          hl: "pt-br",
          gl: "br",
          num: 10,
          start: parseInt(start),
        },
      });
    }
    const searchParams = response.data.search_parameters;
    const currentStart = searchParams.start || 0;
    const resultsPerPage = parseInt(searchParams.num) || 10;
    const totalResults = response.data.search_information?.total_results || 0;

    const currentPage = Math.floor(currentStart / resultsPerPage) + 1;
    const totalPages = Math.min(Math.ceil(totalResults / resultsPerPage), 10);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    const baseUrl = new URL(BASE_URL);
    baseUrl.searchParams.set("q", searchParams.q);
    baseUrl.searchParams.set("engine", searchParams.engine);
    baseUrl.searchParams.set("google_domain", searchParams.google_domain);
    baseUrl.searchParams.set("hl", "pt-br");
    baseUrl.searchParams.set("gl", "br");
    baseUrl.searchParams.set("num", resultsPerPage.toString());
    baseUrl.searchParams.set("api_key", API_KEY);

    const paginationInfo = {
      currentPage,
      totalPages,
      totalResults,
      resultsPerPage,
      hasNextPage,
      hasPrevPage,
      nextPageUrl: hasNextPage
        ? `${baseUrl.toString()}&start=${currentStart + resultsPerPage}`
        : null,
      prevPageUrl: hasPrevPage
        ? `${baseUrl.toString()}&start=${Math.max(
            0,
            currentStart - resultsPerPage
          )}`
        : null,
      pageUrls: {},
    };

    for (let i = 1; i <= Math.min(5, totalPages - currentPage); i++) {
      const pageNum = currentPage + i;
      paginationInfo.pageUrls[pageNum] = `${baseUrl.toString()}&start=${
        (pageNum - 1) * resultsPerPage
      }`;
    }

    const enhancedResponse = {
      ...response.data,
      pagination: paginationInfo,
    };

    res.json(enhancedResponse);
  } catch (error) {
    console.error("Erro na busca:", error.message);
    res.status(500).json({ error: "Erro ao buscar resultados" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
