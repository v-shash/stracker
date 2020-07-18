# base image
# FROM node:10

# # set working directory
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY package.json /app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm i serve

# COPY . ./

# EXPOSE 80

# RUN npm run build

# CMD ["serve", "-p", "80", "-s", "build"]

# EXPOSE 3000
# EXPOSE 35729
# CMD ["npm", "start"]


# base image
FROM node:12

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm i serve

COPY . .

EXPOSE 80

RUN npm run build

CMD ["serve", "-p", "80", "-s", "build"]