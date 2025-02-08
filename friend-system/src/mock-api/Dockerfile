FROM node:20-alpine
WORKDIR /api

COPY package.json package-lock.json ./
RUN npm install json-server --save-dev
COPY . .

EXPOSE 5001

CMD ["npx", "json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "5001"]
