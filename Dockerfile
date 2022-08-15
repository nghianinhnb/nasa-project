FROM node:16-alpine3.16

WORKDIR /app

COPY . .

RUN chown -R node ./

USER node

RUN npm install --omit=dev

RUN mv ./.env.example ./.env

CMD ["npm", "start"]


EXPOSE 8000
