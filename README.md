Uso
Cloná el repositorio haciendo git clone https://github.com/sergiecode/proyecto-curso-node-yt
Abrí el proyecto en su editor de código
Instalá de los paquetes y módulos requeridos: npm install
Agrega las variables de entorno que correspondan usando como plantilla .env.template
Teniendo abierto Docker Desktop ejecuta docker compose up -d
Levantá el servidor haciendo npm run dev
Requiere:
NODE: Se debe instalar NODE en el sistema operativo
DOCKER: Para poder levantar la imágen de Mongo en el contenedor
GIT: Debe tener Instalado GIT
Pasos para configurar un proyecto como este:
npm init -y
npm install express jsonwebtoken bcrypt @prisma/client dotenv typescript
npm install --save-dev ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt @types/node rimraf prisma
npx tsc --init --outDir dist/ --rootDir src
Agregar carpetas excluídas e incluídas al archivo de configuración de TypeScript "exclude": ["node_modules","dist" ], "include": ["src"] 
npx prisma init
npx prisma generate
Agregar los modelos en schema.prisma
npmx prisma migrate dev
docker-compose up -d
Agregar los siguientes scripts: "dev": "tsnd --respawn --clear src/app.ts",   "build": "rimraf ./dist && tsc",   "start": "npm run build && node dist/app.js"
