# Projeto React com Firebase e Integração com Gemini AI

Este é um projeto React que utiliza Firebase para autenticação e integração com a API Gemini AI para fornecer respostas inteligentes. Ele inclui telas de login, registro, e uma interface para interação com a IA.

## 🛠 Tecnologias Utilizadas

- React
- Firebase Authentication
- Gemini AI (provavelmente via API externa)
- Styled Components
- Vercel (para deploy)

## 📁 Estrutura do Projeto

src/
├── App.js # Componente principal da aplicação
├── index.js # Ponto de entrada da aplicação React
├── firebaseConfig.js # Configuração do Firebase
├── geminiAI.js # Integração com API Gemini
├── Logar.js # Tela de login
├── Register.js # Tela de registro
├── stylesAuth.js # Estilos das telas de autenticação
├── vercel.json # Configuração para deploy no Vercel
└── components/
└── ConfirmModal/
├── index.js # Componente modal de confirmação
└── styles.js # Estilo do modal

bash
Copy
Edit

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Conta no Firebase com projeto configurado

### Instalação

Clone o repositório:

bash
git clone https://seu-repositorio-aqui
cd nome-do-projeto
Instale as dependências:

bash
Copy
Edit
npm install
Configure o Firebase:

Edite o arquivo firebaseConfig.js com as credenciais do seu projeto Firebase.

Rode a aplicação:

bash
Copy
Edit
npm start

### 🔐 Autenticação
O projeto utiliza Firebase Authentication para login e registro de usuários via e-mail e senha.

### 💡 Integração com Gemini AI
A API Gemini é utilizada para fornecer respostas baseadas em inteligência artificial. Veja o arquivo geminiAI.js para a lógica de integração.

### 📦 Deploy
Para fazer o deploy, utilize a plataforma Vercel. A configuração já está preparada no arquivo vercel.json.
