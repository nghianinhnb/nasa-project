FROM node:16-alpine3.16

WORKDIR /app

COPY ./back-end .

COPY ./tmp-build ./src/build

RUN chown -R node ./

USER node

RUN npm install --omit=dev

RUN mv ./.env.example ./.env

CMD ["npm", "start"]


EXPOSE 8000
