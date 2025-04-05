FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV PORT=3000
ENV MONGO_URI=mongodb://localhost:27017/blog

CMD ["node", "server.js"]