FROM node:20-alpine
RUN mkdir -p /apps

WORKDIR /apps

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn run build
RUN yarn run test
RUN yarn run lint

RUN rm -rf .git .gitignore nest-cli.json tsconfig.build.json tsconfig.json src

ARG PORT=12002
EXPOSE ${PORT}

CMD [ "yarn", "run","start:prod" ]