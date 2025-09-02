import React, { useState } from 'react';
import { 
  classifyContent, 
  isVideo, 
  getDomain, 
  getFaviconUrl, 
  getVisiblePages, 
  searchAPI 
} from '../utils.js';
import Noodles from '../assets/noodle.png';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (searchParams) => {
    setLoading(true);
    setError('');

    const result = await searchAPI(searchParams);

    if (result.success) {
      setResults(result.data.organic_results || []);
      setPagination(result.data.pagination || null);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    search({ query: query.trim() });
  };

  const goToPage = (pageNumber) => {
    if (loading) return;
    const start = (pageNumber - 1) * pagination.resultsPerPage;
    search({ query, start });
  };

  const nextPage = () => {
    if (pagination?.hasNextPage) {
      const nextStart = pagination.currentPage * pagination.resultsPerPage;
      search({ query, start: nextStart });
    }
  };

  const prevPage = () => {
    if (pagination?.hasPrevPage) {
      const prevStart = Math.max(0, (pagination.currentPage - 2) * pagination.resultsPerPage);
      search({ query, start: prevStart });
    }
  };

  return (
    <div className="app-container">
      <div className="logo-container">
        <img src={Noodles} alt="Noodles" className="logo-image" />
        <h1>
          Noodle<span>Search 2.0</span>
        </h1>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Digite sua busca inteligente..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <button className="search-button" type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      <div className="results-container">
        {error && <h4 className="error">{error}</h4>}
        
        {loading && <div className="loader"></div>}

        {!loading && !error && results.length > 0 && (
          <>
            <ul className="results-list">
              {results.map((item, index) => {
                const contentType = classifyContent(item.link, item.title);
                const isVideoContent = isVideo(item.link, item.title);
                const domain = getDomain(item.link);
                const faviconUrl = getFaviconUrl(domain);

                return (
                  <li key={index} className={`result-card ${isVideoContent ? 'video-card' : ''}`}>
                    <div className="result-content">
                      <div className="result-favicon">
                        {faviconUrl && (
                          <img 
                            src={faviconUrl} 
                            alt={`${domain} favicon`}
                            className="favicon"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                      </div>
                      
                      <div className="result-main">
                        <div className="result-header">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <h3>
                              {isVideoContent && <span className="video-icon">▶</span>}
                              {item.title}
                            </h3>
                          </a>
                          {contentType && (
                            <span 
                              className="content-type-tag"
                              style={{ backgroundColor: contentType.color }}
                            >
                              {contentType.label}
                            </span>
                          )}
                        </div>
                        <p>{item.snippet}</p>
                        {item.displayed_link && (
                          <small className="result-url">{item.displayed_link}</small>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {pagination && (
              <div className="pagination">
                <button
                  onClick={prevPage}
                  disabled={!pagination.hasPrevPage || loading}
                  className="pagination-btn prev-btn"
                >
                  <span>‹</span>
                </button>

                <div className="page-numbers">
                  {getVisiblePages(pagination.currentPage, pagination.totalPages).map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span className="page-ellipsis">...</span>
                      ) : (
                        <button
                          onClick={() => goToPage(page)}
                          disabled={loading}
                          className={`page-btn ${page === pagination.currentPage ? 'active' : ''}`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={!pagination.hasNextPage || loading}
                  className="pagination-btn next-btn"
                >
                  <span>›</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search; 