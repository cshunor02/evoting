FROM node

ADD . /frontend
WORKDIR /frontend

ENV NODE_ENV=development
RUN npm install --force
RUN npm install vite -force

CMD npm run dev
