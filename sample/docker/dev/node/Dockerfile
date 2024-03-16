FROM ubuntu:22.04
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    zip unzip \
    curl wget nano git\    
    htop net-tools dos2unix \
    build-essential libssl-dev make \
    lsb-release xdg-utils \        
    python3.10 \
    ca-certificates    

RUN groupadd -r nodegroup && useradd -m --no-log-init -r -g nodegroup nodeuser

USER nodeuser

ENV NODE_VERSION=21.4.0
ENV NVM_DIR=/home/nodeuser/.nvm

RUN mkdir ${NVM_DIR}


RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash \
    && . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION} \
    && . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION} \
    && . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}

ENV PATH="$NVM_DIR/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN curl -fsSL https://bun.sh/install | bash

RUN npm install -g yarn

USER root

COPY ./env/.ca.cnf /var/.startup/.ca.cnf

ADD install.sh /tmp/install.sh
RUN chmod +x /tmp/install.sh
RUN dos2unix /tmp/install.sh

ADD root_install.sh /tmp/root_install.sh
RUN chmod +x /tmp/root_install.sh
RUN dos2unix /tmp/root_install.sh

RUN usermod -a -G nodegroup root
RUN usermod -a -G nodegroup nodeuser

COPY entrypoint.sh /var/entrypoint.sh
RUN ["chmod", "+x", "/var/entrypoint.sh"]
RUN dos2unix /var/entrypoint.sh

RUN chmod -R 777 /tmp
RUN chmod 777 /var

ENTRYPOINT ["bash", "/var/entrypoint.sh"]
