FROM node:lts-alpine

WORKDIR /app/server

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "serve"]
