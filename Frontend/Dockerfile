# Inherit docker image from an image containing linux alpine + node.js
FROM node:18-alpine3.18

# Node.js Global installations:
RUN npm i -g ts-node

# Create project directory:
WORKDIR /app

# Copy package.json into /app
COPY package*.json /app

# Install node_modules:
RUN npm i

# Copy our app into image:
COPY . /app

# When the container starts - which command runs our app:
ENTRYPOINT npm start