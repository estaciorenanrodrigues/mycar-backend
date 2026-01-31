# Backend - CRUD de Veículos

Backend desenvolvido em Node.js com Express para gerenciamento de veículos.

## 📋 Funcionalidades

- ✅ Criar veículo
- ✅ Listar todos os veículos
- ✅ Buscar veículo por ID
- ✅ Atualizar veículo
- ✅ Deletar veículo

## 🚀 Tecnologias

- Node.js
- Express.js
- CORS
- dotenv

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

## 🏃 Executando o projeto

### Modo desenvolvimento (com nodemon):
```bash
npm run dev
```

### Modo produção:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000/api/veiculos
```

### 1. Listar todos os veículos
```
GET /api/veiculos
```

**Resposta:**
```json
{
  "success": true,
  "data": [...],
  "total": 0
}
```

### 2. Buscar veículo por ID
```
GET /api/veiculos/:id
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "placa": "ABC1234",
    "chassi": "9BW12345678901234",
    "renavam": "12345678901",
    "modelo": "Civic",
    "marca": "Honda",
    "ano": 2023
  }
}
```

### 3. Criar novo veículo
```
POST /api/veiculos
```

**Body:**
```json
{
  "placa": "ABC1234",
  "chassi": "9BW12345678901234",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Veículo criado com sucesso",
  "data": {...}
}
```

### 4. Atualizar veículo
```
PUT /api/veiculos/:id
```

**Body:**
```json
{
  "placa": "XYZ5678",
  "modelo": "Corolla",
  "marca": "Toyota",
  "ano": 2024
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Veículo atualizado com sucesso",
  "data": {...}
}
```

### 5. Deletar veículo
```
DELETE /api/veiculos/:id
```

**Resposta:**
```json
{
  "success": true,
  "message": "Veículo deletado com sucesso",
  "data": {...}
}
```

## 📝 Modelo de Veículo

```javascript
{
  "id": Number,          // Gerado automaticamente
  "placa": String,       // Obrigatório, único
  "chassi": String,      // Obrigatório, único
  "renavam": String,     // Obrigatório, único
  "modelo": String,      // Obrigatório
  "marca": String,       // Obrigatório
  "ano": Number          // Obrigatório, entre 1900 e ano atual + 1
}
```

## 🔧 Validações

- Placa, chassi e renavam devem ser únicos
- Todos os campos são obrigatórios
- Ano deve estar entre 1900 e o ano atual + 1

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── controllers/
│   │   └── veiculoController.js
│   ├── models/
│   │   └── Veiculo.js
│   ├── routes/
│   │   └── veiculoRoutes.js
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```
PORT=3000
```

## 📌 Notas

- Os dados são armazenados em memória (serão perdidos ao reiniciar o servidor)
- Para persistência de dados, recomenda-se integrar com um banco de dados (MongoDB, PostgreSQL, MySQL, etc.)

