FROM ubuntu:18.04
MAINTAINER seungbin9850@gmail.com

RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install curl -y 
RUN apt-get install nodejs -y
RUN apt-get install build-essential -y

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm install
RUN npm install nodemon ts-node

EXPOSE 3000 80

CMD ["npm", "start"]
