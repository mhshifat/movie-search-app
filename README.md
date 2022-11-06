<p float="left">
  <img src="https://img.shields.io/badge/-ReactJS-61DAFB?logo=React&logoColor=303030&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-NodeJS-339933?logo=Node.js&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-NextJS-000000?logo=Next.js&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-ExpressJS-000000?logo=Express&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-Axios-5A29E4?logo=Axios&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-React Query-FF4154?logo=React Query&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-Redux-764ABC?logo=Redux&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-Docker-2496ED?logo=Docker&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-Elasticsearch-005571?logo=Elasticsearch&logoColor=fff&style={STYLE}" alt="badge sample"/>
  <img src="https://img.shields.io/badge/-RabbitMQ-FF6600?logo=RabbitMQ&logoColor=fff&style={STYLE}" alt="badge sample"/>
</p>

## Movie Search App

#### What is Movie Search App?

Movie Search App is an app where you can search from all movies and get their info like genre, release, short description etc.

#### Demo link: https://mhs-dev.netlify.app/

## Project Screen Shot(s)

#### Example:   
![Link previewer mockup](./preview.png)

## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node`, `npm` and `Docker` installed globally on your machine. Docker is needed to setup development process with ease.  

Installation:

### Frontend

```
cd web
npm install
```   

To Start Server:

`npm start` - Docker will handle this for you.

To Visit App:

```
http://localhost:3000
```  


### Backend

```
cd server
npm install
```  

To Start Server:

`npm run serve` - Docker will handle this for you.  

Apis will be available at 8000 port if not provided in .env file


```
http://localhost:8000
```

### Update `.env` for the web
```
NEXT_PUBLIC_API_URI="http://localhost:8000"
```

### Update `.env` for the server
```
RAPIDAPI_KEY="your rapid api key"
RAPIDAPI_HOST="your rapid api host"
SERVER_URI="http://localhost:8000"
```

## Reflection

  - This project was built, so that i could learn elasticsearch and apply that on a real world project.
  - Learned about cron job. I have used this to get all movies from rapid api and store them in elasticsearch if not exist in every month. 
