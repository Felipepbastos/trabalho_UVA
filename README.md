https://github.com/Felipepbastos/trabalho_UVA

Aplicativo de Agendamento de Consultas - Esqueleto

Este repositório contém um esqueleto mínimo e funcional para um aplicativo de agendamento de consultas em clínica:

Backend: Node.js + Express + Prisma + PostgreSQL

Frontend: Vue 3 + Vite + Pinia + Axios

Estrutura

/backend – API em Express, schema do Prisma, autenticação, fluxo de agendamento, proxy de CEP, stub de serviço de clima

/frontend – Aplicação Vue 3 + Vite com páginas básicas (Login, Dashboard, Formulário de agendamento)

docker-compose.yml – Sobe backend, frontend (estático) e banco Postgres

README

Guia rápido (local, desenvolvimento)

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

O esqueleto inclui stubs de integração com OpenWeather + ViaCEP. 
Persistência de refresh token e hardening completo de produção foram simplificados para o esqueleto.
Veja os comentários dentro dos arquivos para pontos de expansão (e-mail, SMS, tratamento robusto de erros).