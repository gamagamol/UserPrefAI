# FROM node:20-alpine using this if your laptop not used ARM 
FROM --platform=linux/amd64 node:20-alpine  

WORKDIR /app
COPY . .
RUN npm install
RUN npm update
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
