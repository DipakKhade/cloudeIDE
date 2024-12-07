FROM node:alpine

WORKDIR /

COPY package*.json /.

RUN npm install

COPY . .

RUN npx prisma genarate

EXPOSE 3000

CMD ["npm","run","dev"]
