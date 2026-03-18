FROM node:20-slim

WORKDIR /usr/src/app

# Pre-install dependencies for better build caching
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Set to listen on the correct port
EXPOSE 3000

# Start mission
CMD [ "node", "index.js" ]