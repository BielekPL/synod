FROM node:21-alpine

WORKDIR /synod/frontend/

COPY package*json /synod/frontend/
RUN npm install

COPY . /synod/frontend/

CMD ["npm", "start"]