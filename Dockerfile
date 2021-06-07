# base image
FROM node:12.13.1-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN npm install yarn -g --silent
RUN yarn install

# Bundle app source
COPY . ./

# start app
CMD ["yarn", "start"]