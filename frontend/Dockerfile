FROM node

ADD . /frontend
WORKDIR /frontend

ENV NODE_ENV=development
RUN yarn add vite --force
RUN npm install --force
RUN npm install vite -force

CMD npm install vite --force && npm run dev
