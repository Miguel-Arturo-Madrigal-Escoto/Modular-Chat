# pull from official image
FROM node:lts-alpine3.18

# variables de entorno
ENV APP_HOME /app

# current working directory
WORKDIR $APP_HOME 

# install packages
COPY ./package*.json .
RUN npm install

# copy all files to current directory
COPY . .

# expose provided port
EXPOSE $PORT

# run project
CMD ["npm", "start"]