# Use Node.js 16 (or higher) instead of 14
FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]
