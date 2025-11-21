
# 📘 Gerenciador de Tarefas

Aplicação completa para gerenciamento de tarefas, construída em **Node.js**, **Express**, **SQLite** e **HTML/CSS/JS**.  
Permite cadastrar, listar, editar e excluir tarefas de forma simples e eficiente.

Este projeto foi desenvolvido para fins acadêmicos, no curso de **Análise e Desenvolvimento de Sistemas**.

---

## 🚀 Funcionalidades

✔ Cadastrar nova tarefa  
✔ Listar tarefas cadastradas  
✔ Editar tarefa existente  
✔ Excluir tarefa  
✔ Indicar prioridade (baixa, média, alta)  
✔ Exibir data de vencimento  
✔ Interface amigável e responsiva  
✔ Banco de dados local SQLite (persistência definitiva)

---

## 🛠 Tecnologias Utilizadas

### **Backend**
- Node.js
- Express.js
- Better-SQLite3 (banco de dados)
- Body-parser
- CORS

### **Frontend**
- HTML5
- CSS3 (customizado)
- JavaScript (fetch API)

### **Banco de Dados**
- SQLite 3 (arquivo local `database.sqlite`)

---

## ⚙️ **Instalação e Configuração**

### 🔹 **1. Clonar o repositório**


git clone https://github.com/Isabelcsouza/gerenciador-de-tarefas.git
cd gerenciador-de-tarefas

🔹 2. Instalar dependências

Copiar código
npm install

🔹 3. Instalar o SQLite (se necessário)
Baixe o SQLite Tools:
https://www.sqlite.org/download.html

Depois, adicione o arquivo sqlite3.exe ao PATH do Windows.

🔹 4. Iniciar o servidor

node src/server.js
Servidor rodando em:
👉 http://localhost:3000

🔹 5. Abrir a interface
Acesse no navegador:

Copiar código
http://localhost:3000

---
## Exemplos de Uso
### Criar uma nova tarefa

Preencha

Título:

Descrição:

Data de vencimento:

Prioridade:

Clique em Salvar.

---

## ✏️ Editar tarefa

 - Clique no botão Editar, altere os campos desejados e salve novamente.

## 🗑️ Excluir tarefa

- Clique no botão Excluir e confirme.

---

## 📡 Rotas da API
GET /api/tarefas
- Retorna todas as tarefas.

POST /api/tarefas
- Cria uma nova tarefa.

```sh
{
  "titulo": "Estudar",
  "descricao": "Projeto da faculdade",
  "data_vencimento": "2025-11-20",
  "prioridade": "alta"
}

```
GET /api/tarefas/:id
- Retorna uma tarefa específica.

PUT /api/tarefas/:id
- Atualiza uma tarefa.

DELETE /api/tarefas/:id
- Remove uma tarefa.

----

Isabel Souza - 
Estudante de Análise e Desenvolvimento de Sistemas
2025

