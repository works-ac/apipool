FROM node:20-alpine
RUN mkdir -p /apps

WORKDIR /apps

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn run build
RUN rm -rf .git .gitignore nest-cli.json tsconfig.build.json tsconfig.json src

EXPOSE 12002

CMD [ "yarn", "run","start:prod" ]