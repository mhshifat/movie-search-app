FROM node:lts-alpine

WORKDIR /app/web

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]