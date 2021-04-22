FROM node:12-slim
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 8080
CMD [ "node", "server.js" ]