FROM node:19-alpine as builder

WORKDIR /app

# Copy package.json
COPY package.json .
COPY tsconfig.json .
COPY ./src /app/src

# Install dependencies
RUN npm install \
    && npm run build

FROM node:19-alpine as runtime

ENV NODE_ENV=production

WORKDIR /usr/app
COPY package.json .

# Install dependencies
RUN npm install --production

COPY --from=builder /app/build /usr/app/

VOLUME /etc/app/logs
ENV FOLDER_LOGS=/etc/app/logs

CMD ["node", "index.js"]