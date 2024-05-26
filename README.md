# Configuración del Proyecto

## Preparación

1. Abre el proyecto en tu editor de código.
2. Instala los paquetes y módulos requeridos ejecutando `npm install`.
3. Agrega las variables de entorno correspondientes usando como plantilla `.env.template`.

## Requisitos

- **NODE**: Debes tener NODE instalado en tu sistema operativo.
- **DOCKER**: Necesario para poder levantar la imagen de Mongo en el contenedor.
- **GIT**: Debes tener GIT instalado.

## Configuración

1. Inicializa un nuevo proyecto con `npm init -y`.
2. Instala las dependencias necesarias con `npm install express jsonwebtoken bcrypt @prisma/client dotenv typescript`.
3. Instala las dependencias de desarrollo con `npm install --save-dev ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt @types/node rimraf prisma`.
4. Inicializa un nuevo proyecto TypeScript con `npx tsc --init --outDir dist/ --rootDir src`.
5. Agrega las carpetas excluidas e incluidas al archivo de configuración de TypeScript `"exclude": ["node_modules","dist" ], "include": ["src"]`.
6. Inicializa Prisma con `npx prisma init`.
7. Genera los clientes Prisma con `npx prisma generate`.
8. Agrega los modelos en `schema.prisma`.
9. Ejecuta las migraciones de Prisma con `npx prisma migrate dev`.
10. Levanta el contenedor de Docker con `docker-compose up -d`.

## Scripts

Agrega los siguientes scripts a tu archivo `package.json`:

```json
"scripts": {
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
}
