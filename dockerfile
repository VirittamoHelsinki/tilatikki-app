FROM node:14-alpine

WORKDIR .

COPY . .


RUN npm install
RUN npm run install-client
RUN npm run build-client

COPY . /app

EXPOSE 5000

CMD ["npm", "run", "docker-build"]
