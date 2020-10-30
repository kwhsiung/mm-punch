FROM node:12-alpine AS builder

WORKDIR /mm-punch

RUN apk update && \
    apk add --virtual build-dependencies \
    build-base \
    gcc \
    wget \
    git

COPY . /mm-punch

RUN yarn upgrade && \
    yarn install && \
    yarn lintall

RUN yarn install --production

FROM node:12-alpine

WORKDIR /mm-punch

COPY --from=builder /mm-punch /mm-punch

ENTRYPOINT ["yarn", "cron"]
