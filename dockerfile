FROM node:14-alpine

WORKDIR .

COPY . .


RUN npm install

RUN cd client  && npm install && npm run build:docker


COPY . /app
ADD . /app

EXPOSE 5000

CMD ["npm", "run", "docker:build"]
