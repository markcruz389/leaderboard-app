FROM node:lts-alpine as builder

WORKDIR /server
COPY . .
RUN npm install
RUN npm run clean
RUN npm run build

FROM node:lts-alpine as prod
WORKDIR /server
COPY --from=builder ./server/dist ./dist
COPY package* ./
RUN npm install --omit=dev

EXPOSE $PORT
CMD [ "npm", "start" ]