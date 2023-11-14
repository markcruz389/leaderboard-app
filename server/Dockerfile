FROM node:lts-alpine as builder

WORKDIR /server
COPY . .
RUN npm install
RUN npm run clean


# ARG SERVER_PORT
# ARG SERVER_JWT_SECRET
# ENV PORT=$SERVER_PORT
# ENV JWT_SECRET=$SERVER_JWT_SECRET

RUN npm run build

FROM node:lts-alpine as prod
WORKDIR /server
COPY --from=builder ./server/dist ./dist
COPY package* ./
RUN npm install --omit=dev

EXPOSE $PORT
CMD [ "npm", "start" ]