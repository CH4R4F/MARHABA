FROM node:16 AS UI_PRODUCTION

WORKDIR /client

COPY . .

RUN npm install

ENV REACT_APP_SERVER_URL='http://localhost:5000'

EXPOSE 3000

CMD ["npm", "start"]