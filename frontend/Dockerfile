FROM node

ADD . /frontend
WORKDIR /frontend

RUN npm install --force
RUN yarn add vite

CMD npm run dev
