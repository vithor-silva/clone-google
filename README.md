# React + Vite Google Search App

Este projeto é uma aplicação React criada com Vite que realiza buscas em uma API para retornar dados do Google de acordo com uma pesquisa. Utilizamos as seguintes tecnologias principais:

- **React**: Para criar a interface do usuário.
- **Axios**: Para realizar requisições HTTP à API.
- **SerpAPI**: Para obter dados das pesquisas no Google.
- **Node.js** com **Express**: Para criar um servidor que resolve problemas de CORS.

## Tecnologias Utilizadas

- **Vite**: Para configuração e build rápidos do projeto.
- **@vitejs/plugin-react** ou **@vitejs/plugin-react-swc**: Para integração com React.
- **Axios**: Cliente HTTP simples e poderoso.
- **Node.js** com **Express**: Backend para lidar com problemas de CORS.
- **SerpAPI**: API utilizada para obter dados de pesquisa do Google.

## Funcionalidades

- Realizar buscas no Google.
- Exibir resultados formatados com base nos dados retornados pela API.

## Como Executar o Projeto

### Requisitos

- Node.js instalado.
- Gerenciador de pacotes npm ou yarn.
- Chave de acesso à [SerpAPI](https://serpapi.com/).

### Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure sua chave da SerpAPI criando um arquivo `.env` na raiz do projeto e adicionando:
   ```env
   REACT_APP_SERPAPI_KEY=sua-chave-serpapi
   ```

4. Inicie o servidor Node.js para resolver o erro de CORS:
   ```bash
   node server.js
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Estrutura de Pastas

```plaintext
src/
|-- components/         # Componentes React
|-- App.jsx             # Componente principal
|-- main.jsx            # Entrada do projeto
server.js               # Backend Node.js com Express
```

### Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Faz o build da aplicação para produção.
- **`npm run preview`**: Visualiza o build em um servidor local.

## Disponibilidade

Logo mais, o projeto estará disponível em deploy.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Sinta-se à vontade para personalizar este README de acordo com as necessidades do seu projeto!

