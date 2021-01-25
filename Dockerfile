# Credit to AdamTylerLynch's work on https://github.com/AdamTylerLynch/puppeteer-multiarch

FROM debian:stable-slim AS chromium-node

# Add yarn package repository
RUN apt update \
    && apt install -y curl gnupg \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt autoremove --purge -y curl gnupg \
    && apt clean

# Install Chromium, nodejs, yarn, and link yarn modules
RUN apt update \
    && apt upgrade -y \
    && apt install -y --no-install-recommends chromium nodejs yarn \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/bin/chromium /usr/bin/chromium-browser

# Install the major packages globally, so not done every time we use the image
RUN echo "#!/bin/sh\n\
\n\
set -ex \n\
\n\
MODULES=\"@types/node \\n\
        axios \\n\
        core-js \\n\
        cron \\n\
        cross-env \\n\
        dayjs \\n\
        dotenv \\n\
        lodash \\n\
        puppeteer-core \\n\
        rxjs \\n\
        source-map-support \\n\
        taiwan-holiday \\n\
        tslint \\n\
        typescript \\n\
        unirand\"\n\
\n\
GLOBAL_DIR=\`yarn global dir\`\n\
for mod in \$MODULES\n\
do\n\
    yarn global add --verbose \$mod\n\
    cd \$GLOBAL_DIR/node_modules/\$mod\n\
    yarn link\n\
done\n\
" > set_yarn_links.sh \
    && chmod 777 set_yarn_links.sh \
    && /bin/bash ./set_yarn_links.sh

FROM debian:stable-slim AS data

WORKDIR /

RUN apt update \
    && apt install curl jq -y

# Get the latest data from the OpenData API of Taipei
ARG CACHE_BUST
ADD https://data.taipei/api/v1/dataset/b0011e96-3fc3-43ec-8bf5-07fb46dd22bb?scope=resourceAquire 1.json
ADD https://data.taipei/api/v1/dataset/b0011e96-3fc3-43ec-8bf5-07fb46dd22bb?scope=resourceAquire&q=&limit=&offset=1000 2.json
RUN cat 1.json | jq '.result.results' > results-1.json \
    && cat 2.json | jq '.result.results' > results-2.json \
    && jq -n 'reduce inputs as $in (null; . + $in)' results-1.json results-2.json > taiwan-holiday-cache.json

FROM chromium-node
WORKDIR /mm-punch

# Set up the correct timezone
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./package.json ./yarn.lock /mm-punch/
RUN yarn install --production

COPY . /mm-punch

COPY --from=data /taiwan-holiday-cache.json /mm-punch/data/taiwan-holiday-cache.json

ENTRYPOINT ["yarn", "cron"]
