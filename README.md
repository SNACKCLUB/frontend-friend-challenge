# 📌 Friend Management System

## 📖 Sobre o Projeto
Este projeto é um sistema de gerenciamento de amizades onde os usuários podem criar uma conta, adicionar amigos, aceitar ou recusar solicitações de amizade e remover amigos. A autenticação é feita com JWT (mockado) e o armazenamento de dados é simulado com um banco de dados fake (`fakeDB`).

O objetivo é demonstrar **boas práticas de desenvolvimento**, **testes automatizados**, **segurança** e **uso de Docker**.

---

## 🛠 Tecnologias Utilizadas

### 📌 **Frontend**
- **React (Next.js)** - Framework para construção da interface do usuário.
- **TypeScript** - Para garantir tipagem forte e segurança no código.
- **Tailwind CSS** - Para estilização da interface de maneira eficiente.
- **React Toastify** - Para exibir notificações ao usuário.
- **Jest & Testing Library** - Para testes unitários.

### 📌 **Backend (mockado)**
- **fakeDB** - Simulação de um banco de dados para armazenar usuários e amigos.
- **JWT mockado** - Geração de tokens de autenticação para simular login.

### 📌 **Ferramentas e Práticas**
- **Git Flow** - Fluxo de versionamento utilizando branches (`feature/`, `develop`, `main`).
- **Docker** - Containerização para facilitar a execução do projeto.
- **Helmet.js & CSRF Protection** - Para segurança contra XSS e CSRF.

---

## 📌 Funcionalidades Principais
### **📌 Registro e Autenticação**
✅ Usuários podem criar uma conta e fazer login.
✅ Autenticação utilizando JWT (mockado).

### **📌 Gerenciamento de Amizades**
✅ Enviar solicitações de amizade.
✅ Aceitar ou recusar pedidos.
✅ Listar amigos de um usuário.
✅ Remover amigos da lista.

### **📌 Notificações e Feedback**
✅ O usuário recebe notificações ao receber uma solicitação de amizade.
✅ Exibição do status da amizade (pendente, aceita, recusada).

---

## 📌 Como Rodar o Projeto
### 🐳 **Rodando com Docker**
O projeto está **totalmente dockerizado** para facilitar a execução.

1️⃣ **Clone o repositório**
```bash
  git clone git@github.com:Kdulima/frontend-friend-challenge.git
  cd frontend-friend-challenge
  cd friend-system
```

2️⃣ **Suba o container Docker**
```bash
  docker-compose up --build -d
```

3️⃣ **Acesse a aplicação**
```bash
  http://localhost:3000
```

---

## 📌 Como Funciona a Aplicação
### **Fluxo de Cadastro e Login**
1. O usuário se cadastra escolhendo um nome e um avatar.
2. O sistema gera um token JWT (mockado) e armazena no localStorage.
3. O usuário é redirecionado para a tela de amigos.

### **Fluxo de Amizade**
1. Usuário pode enviar solicitações de amizade para outros usuários.
2. O destinatário pode **aceitar ou recusar** a solicitação.
3. Quando aceita, o amigo aparece na lista de amigos do usuário.
4. O usuário pode remover um amigo da lista se desejar.

## 📌 Credenciais Mockadas

O sistema já conta com usuários preexistentes para facilitar os testes. Eles podem ser visualizados diretamente no painel da aplicação.

### 🔹 Usuários Disponíveis

| Nome    | Amigos                                  | Solicitações Pendentes |
|---------|-----------------------------------------|------------------------|
| Carlos  | Cibele, Eduardo, Luisa, Gabriel        | Nenhuma                |
| Cibele  | Carlos, Eduardo, Luisa, Gabriel        | Nenhuma                |
| Eduardo | Carlos, Cibele, Luisa, Gabriel         | Nenhuma                |
| Luisa   | Carlos, Cibele, Eduardo, Gabriel       | Nenhuma                |
| Gabriel | Carlos                                 | Nenhuma                |

### 🔹 Como Usar
- Você pode selecionar qualquer um desses usuários para testar o envio e recebimento de **solicitações de amizade**.
- O estado da amizade pode ser **aceito, recusado ou removido** a qualquer momento.
- Para simular **novos cadastros**, basta registrar um novo usuário na tela de cadastro.

---

## 📌 Testes Automatizados
O projeto conta com **testes unitários** para garantir a qualidade do código.

### **📌 Tecnologias de Teste**
- **Jest** - Para testes unitários.
- **Testing Library** - Para testes de componentes e hooks.

### **📌 Cobertura de Testes**
✅ **Coverage total acima de 80%**.

### **📌 Como Rodar os Testes**
Para rodar todos os testes unitários e de integração:
```bash
  npm run test
```

---

## 📌 Boas Práticas Seguidas
- ✅ **Git Flow** - Cada feature foi desenvolvida em uma branch separada.
- ✅ **Arquitetura Modular** - Componentes reutilizáveis e organizados.
- ✅ **Clean code** - Código limpo e padronizado.
- ✅ **Proteção contra XSS & CSRF** - Segurança implementada.
- ✅ **Docker** - Execução do projeto de forma isolada e padronizada.

---


## 🚀 Desenvolvido por
👨‍💻 Carlos Lima
📌 Software Develop
🔗 [LinkedIn](https://www.linkedin.com/in/carloslima90)
