FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./

ENV ROLLUP_NATIVE_DISABLE=true

RUN rm -rf node_modules \
  && npm install -D vite \
  && npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
