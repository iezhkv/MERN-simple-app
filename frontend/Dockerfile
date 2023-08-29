FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# Move the build files to the backend's public directory
CMD ["npm", "start"]