#!/bin/bash

sh /tmp/root_install.sh

export NVM_DIR="/home/nodeuser/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

run_as_node() {
    su - nodeuser -s /bin/bash -c "source $NVM_DIR/nvm.sh && $*"
}

run_as_node "sh /tmp/install.sh"
su nodeuser

cd /app/backend


if [ -z "$DONT_RUN" ] || [ "$DONT_RUN" -eq "0" ]; then
    yarn dev
fi

while true; do sleep 5 ; done;