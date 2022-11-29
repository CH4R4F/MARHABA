FROM node:16 AS Production

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]