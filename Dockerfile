FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN chmod +x wait-for

EXPOSE 4000

CMD ["node", "./src/index.js"]

