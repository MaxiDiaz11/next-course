# Description

## Run in dev

1. Copiar y renombrar `.env.template`
2. levantar DB `docker compose up -d`
3. Correr migraciones de prisma `npx prisma migrate dev`
4. Ejecutar Seed `npm run seed`
5. Correr proyecto `npm run dev`
