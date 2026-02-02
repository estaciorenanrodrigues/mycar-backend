# Backend - CRUD de Veículos

Backend desenvolvido em Node.js com Express para gerenciamento de veículos.

## 📋 Funcionalidades

- ✅ Criar veículo
- ✅ Listar veículos com paginação e ordenação
- ✅ Buscar veículo por ID
- ✅ Obter próximo ID disponível
- ✅ Atualizar veículo
- ✅ Deletar veículo
- ✅ Validação de dados
- ✅ Tratamento de erros

## 🚀 Tecnologias

- Node.js
- Express.js
- CORS
- dotenv
- ES Modules

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
http://localhost:3000
```

### 1. Listar veículos (com paginação e ordenação)
```
GET /list
```

**Query Parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10, máximo: 100)
- `sortBy` (opcional): Campo para ordenação (id, placa, chassi, renavam, modelo, marca, ano) (padrão: id)
- `sortOrder` (opcional): Ordem de classificação (asc, desc) (padrão: asc)

**Exemplo:**
```
GET /list?page=1&limit=10&sortBy=marca&sortOrder=asc
```

**Resposta:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "sort": {
    "sortBy": "marca",
    "sortOrder": "asc"
  }
}
```

### 2. Obter próximo ID disponível
```
GET /id
```

**Resposta:**
```json
{
  "id": 1
}
```

### 3. Buscar veículo por ID
```
GET /search/:id
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

**Erro (404):**
```json
{
  "success": false,
  "message": "Veículo não encontrado"
}
```

### 4. Criar novo veículo
```
POST /create
```

**Body:**
```json
{
  "id": 1,
  "placa": "ABC1234",
  "chassi": "9BW12345678901234",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}
```

**Resposta (201):**
```json
{
  "success": true,
  "message": "Veículo criado com sucesso",
  "data": {...}
}
```

**Erro (400):**
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": ["Placa é obrigatória", "Ano inválido"]
}
```

### 5. Atualizar veículo
```
PUT /update/:id
```

**Body (todos os campos são opcionais):**
```json
{
  "placa": "XYZ5678",
  "chassi": "9BW98765432109876",
  "renavam": "98765432109",
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

**Erro (404):**
```json
{
  "success": false,
  "message": "Veículo não encontrado"
}
```

**Erro (400):**
```json
{
  "success": false,
  "message": "Já existe outro veículo cadastrado com esta placa"
}
```

### 6. Deletar veículo
```
DELETE /delete/:id
```

**Resposta:**
```json
{
  "success": true,
  "message": "Veículo deletado com sucesso",
  "data": {...}
}
```

**Erro (404):**
```json
{
  "success": false,
  "message": "Veículo não encontrado"
}
```

## 📝 Modelo de Veículo

```javascript
{
  "id": Number,          // Obrigatório, deve ser único
  "placa": String,       // Obrigatório, único
  "chassi": String,      // Obrigatório, único
  "renavam": String,     // Obrigatório, único
  "modelo": String,      // Obrigatório
  "marca": String,       // Obrigatório
  "ano": Number          // Obrigatório, entre 1900 e ano atual + 1
}
```

## 🔧 Validações

- **Placa, chassi e renavam**: Devem ser únicos no sistema
- **Todos os campos**: São obrigatórios na criação
- **Ano**: Deve estar entre 1900 e o ano atual + 1
- **ID**: Deve ser único e fornecido na criação

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── controllers/
│   │   └── veiculoController.js    # Lógica de negócio dos endpoints
│   ├── data/
│   │   └── cars.js                 # Armazenamento em memória dos veículos
│   ├── middleware/
│   │   ├── errors.js               # Tratamento de erros
│   │   └── validateCar.js         # Validação de veículos
│   ├── models/
│   │   └── Veiculo.js              # Modelo e validações do veículo
│   ├── routes/
│   │   └── veiculoRoutes.js        # Definição das rotas
│   └── server.js                   # Configuração do servidor Express
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```
PORT=3000
```

Se não for definido, o servidor usará a porta `3000` por padrão.

## ⚠️ Tratamento de Erros

A API retorna respostas padronizadas:

**Sucesso:**
```json
{
  "success": true,
  "data": {...},
  "message": "Mensagem de sucesso (opcional)"
}
```

**Erro:**
```json
{
  "success": false,
  "message": "Mensagem de erro",
  "error": "Detalhes do erro (opcional)",
  "errors": ["Array de erros de validação (opcional)"]
}
```

**Códigos de Status HTTP:**
- `200`: Sucesso
- `201`: Criado com sucesso
- `400`: Dados inválidos ou duplicados
- `404`: Recurso não encontrado
- `500`: Erro interno do servidor

## 📌 Notas

- Os dados são armazenados em memória (serão perdidos ao reiniciar o servidor)
- Para persistência de dados, recomenda-se integrar com um banco de dados (MongoDB, PostgreSQL, MySQL, etc.)
- O projeto utiliza ES Modules (`"type": "module"` no package.json)
- A paginação permite até 100 itens por página
- A ordenação funciona com todos os campos do modelo de veículo

