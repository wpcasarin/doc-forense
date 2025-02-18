FROM node:22.14.0-alpine

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_POCKETBASE_URL
ARG VITE_FASTAPI_URL

RUN echo "VITE_POCKETBASE_URL=${VITE_POCKETBASE_URL}" >> .env
RUN echo "VITE_FASTAPI_URL=${VITE_FASTAPI_URL}" >> .env

RUN npm run build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]
