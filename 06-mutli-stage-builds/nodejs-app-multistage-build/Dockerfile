# single stage docker file
# FROM node:18

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

# multi stage docker file

# stage 1: Build

FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# stage 2: Run

FROM node:18-alpine

WORKDIR /app

# copies everything from build stage /app to run stage /app
COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]