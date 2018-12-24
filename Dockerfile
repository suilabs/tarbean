FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package-lock.json .
COPY package.json .
COPY src ./src

RUN npm install

ENV VIRTUAL_HOST=tarbean.suilabs.com:3001
ENV LETSENCRYPT_HOST=tarbean.suilabs.com
ENV LETSENCRYPT_EMAIL=borja.arias.upc@gmail.com

EXPOSE 3000

CMD [ "npm", "start" ]