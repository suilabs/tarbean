FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY index.js /usr/src/app
COPY package-lock.json /usr/src/app
COPY utils.js /usr/src/app

RUN npm install

EXPOSE 3000

ENV VIRTUAL_HOST=static.suilabs.com
ENV LETSENCRYPT_HOST=static.suilabs.com
ENV LETSENCRYPT_EMAIL=borja.arias.upc@gmail.com

CMD [ "npm", "start" ]