FROM node:16
RUN mkdir /codewithkaps-api
WORKDIR /codewithkaps-api
COPY package*.json /codewithkaps-api/
RUN npm install
COPY . /codewithkaps-api/
EXPOSE $NODE_DOCKER_PORT
CMD ["npm", "run", "start"]