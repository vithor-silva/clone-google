const API_URL = 'http://localhost:4000/search';
const FAVICON_SIZE = 32;

const CONTENT_TYPES = {
  BLOG: { label: 'Blog', color: '#10b981' },
  NEWS: { label: 'Notícia', color: '#3b82f6' },
  VIDEO: { label: 'Vídeo', color: '#ef4444' },
  CODE: { label: 'Código', color: '#8b5cf6' },
  WIKI: { label: 'Wiki', color: '#f59e0b' },
  PRODUCT: { label: 'Produto', color: '#06b6d4' },
  SOCIAL: { label: 'Social', color: '#0ea5e9' },
  DOCUMENT: { label: 'Documento', color: '#6b7280' }
};

const NEWS_DOMAINS = ['g1.globo.com', 'uol.com.br', 'terra.com.br', 'r7.com'];
const BLOG_DOMAINS = ['medium.com', 'dev.to', 'hashnode.dev'];
const SOCIAL_DOMAINS = ['linkedin.com', 'twitter.com', 'facebook.com', 'instagram.com'];

export const classifyContent = (url, title) => {
  if (!url || !title) return null;

  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();

  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be') || titleLower.includes('vídeo')) {
    return CONTENT_TYPES.VIDEO;
  }
  
  if (urlLower.includes('/blog/') || titleLower.includes('blog') || BLOG_DOMAINS.some(d => urlLower.includes(d))) {
    return CONTENT_TYPES.BLOG;
  }
  
  if (urlLower.includes('/news/') || titleLower.includes('notícia') || NEWS_DOMAINS.some(d => urlLower.includes(d))) {
    return CONTENT_TYPES.NEWS;
  }
  
  if (urlLower.includes('github.com') || titleLower.includes('github')) {
    return CONTENT_TYPES.CODE;
  }
  
  if (urlLower.includes('wikipedia.org') || titleLower.includes('wiki')) {
    return CONTENT_TYPES.WIKI;
  }
  
  if (urlLower.includes('amazon.com') || urlLower.includes('/produto/')) {
    return CONTENT_TYPES.PRODUCT;
  }
  
  if (SOCIAL_DOMAINS.some(d => urlLower.includes(d))) {
    return CONTENT_TYPES.SOCIAL;
  }
  
  if (urlLower.includes('.pdf') || urlLower.includes('.doc')) {
    return CONTENT_TYPES.DOCUMENT;
  }
  
  return null;
};

export const isVideo = (url, title) => {
  const type = classifyContent(url, title);
  return type?.label === 'Vídeo';
};

export const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
};

export const getFaviconUrl = (domain) => {
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${FAVICON_SIZE}`;
};

export const getVisiblePages = (currentPage, totalPages) => {
  if (!currentPage || !totalPages) return [];
  
  const pages = [];
  
  if (currentPage > 3) {
    pages.push(1);
    if (currentPage > 4) pages.push('...');
  }
  
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) pages.push('...');
    pages.push(totalPages);
  }
  
  return pages;
};

export const searchAPI = async (params) => {
  try {
    const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro na busca');
    }
    
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro de conexão' 
    };
  }
}; 