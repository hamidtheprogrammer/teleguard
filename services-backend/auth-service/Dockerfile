FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD [ "npx", "tsx", "src/index.ts" ] 
