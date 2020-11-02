FROM node:12-buster AS builder

WORKDIR /mm-punch

RUN apt update && \
    apt upgrade -y && \
    apt install -y build-essential

COPY . /mm-punch

RUN yarn upgrade && \
    yarn install && \
    yarn lintall

RUN yarn install --production

FROM node:12-buster-slim

WORKDIR /mm-punch

COPY --from=builder /mm-punch /mm-punch

ENTRYPOINT ["yarn", "cron"]
