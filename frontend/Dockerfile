FROM node:22.14.0-alpine

WORKDIR /frontend

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]
