Aplicativo de Agendamento de Consultas - Esqueleto

Este repositório contém um esqueleto mínimo e funcional para um aplicativo de agendamento de consultas em clínica:

Backend: Node.js + Express + Prisma + PostgreSQL

Frontend: Vue 3 + Vite + Pinia + Axios

Estrutura

/backend – API em Express, schema do Prisma, autenticação, fluxo de agendamento, proxy de CEP, stub de serviço de clima

/frontend – Aplicação Vue 3 + Vite com páginas básicas (Login, Dashboard, Formulário de agendamento)

docker-compose.yml – Sobe backend, frontend (estático) e banco Postgres

README contém guia rápido de uso

Guia rápido (local, desenvolvimento)

Copie os arquivos .env.example para .env no backend e frontend, configure as variáveis (DATABASE_URL, JWT_SECRET, OPENWEATHER_KEY).

Inicie o Postgres (docker-compose fornecido) ou defina o DATABASE_URL para o seu banco.

Backend:

cd backend
npm install
npx prisma migrate dev --name init
npm run dev


Frontend:

cd frontend
npm install
npm run dev


Use a API em http://localhost:4000 e o frontend em http://localhost:5173 (valores padrão).

Docker (rápido)
docker-compose up --build


Isso irá construir e rodar o Postgres + backend. O frontend é construído como assets estáticos servidos por um nginx simples em configuração de produção (opcional).

Notas

O esqueleto inclui stubs de integração com OpenWeather + ViaCEP. Substitua OPENWEATHER_KEY por uma chave válida.

Persistência de refresh token e hardening completo de produção foram simplificados para o esqueleto.

Veja os comentários dentro dos arquivos para pontos de expansão (e-mail, SMS, tratamento robusto de erros).