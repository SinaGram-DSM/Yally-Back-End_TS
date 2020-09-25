FROM ubuntu:18.04
MAINTAINER seungbin9850@gmail.com

RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN sudo bash nodesource_setup.hs
RUN sudo apt-get install nodejs
RUN sudo apt-get install build-essential

RUN mkdir /src

COPY package.json
COPY src /src/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]