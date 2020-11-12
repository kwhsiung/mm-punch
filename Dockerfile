# Credit to AdamTylerLynch's work on https://github.com/AdamTylerLynch/puppeteer-multiarch

FROM debian:stable-slim AS chromium-node

# Add yarn package repository
RUN apt update \
    && apt install -y curl gnupg \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt autoremove --purge -y curl gnupg \
    && apt clean

# Setup yarn module link script
RUN echo "#!/bin/sh\n\
    \n\
    set -ex \n\
    \n\
    MODULES=\"\n\
    source-map-support \\n\
    core-js \\n\
    lodash \\n\
    rxjs \\n\
    puppeteer-core\"\n\
    \n\
    GLOBAL_DIR=\"yarn global dir\"\n\
    for mod in $MODULES\n\
    do\n\
    yarn global add --verbose $mod\n\
    cd $GLOBAL_DIR/node_modules/$mod\n\
    yarn link\n\
    done\n\
    " > set_yarn_links.sh \
    && chmod 777 set_yarn_links.sh

# Install Chromium, nodejs, yarn, and link yarn modules
RUN apt update \
    && apt upgrade -y \
    && apt install -y --no-install-recommends chromium nodejs yarn \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/bin/chromium /usr/bin/chromium-browser \
    # Install the major packages globally, so not done every time we use the image
    && /bin/bash ./set_yarn_links.sh

FROM chromium-node
WORKDIR /mm-punch

# Set up the correct timezone
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./package.json ./yarn.lock /mm-punch/
RUN yarn install --production \
    && yarn global add cross-env

COPY . /mm-punch

ENTRYPOINT ["yarn", "cron"]
