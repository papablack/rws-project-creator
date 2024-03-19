#!/bin/bash

export PROJ_NAME="rws-sample-project"

export NVM_DIR="/home/$USR_DIR/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

sh /tmp/install.sh

cd /app

if [ -d /app/$PROJ_NAME ]; then
    rm -rf /app/$PROJ_NAME
fi

#rws-create init $PROJ_NAME .

while true; do sleep 5 ; done;