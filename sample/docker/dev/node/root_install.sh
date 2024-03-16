#/bin/bash

if [ ! -f /var/.node_install_done ]; then
    # mkdir /app/frontend/node_modules
    # chown -R node:nodegroup /app/frontend/node_modules
    # chmod -R 777 /app/frontend/node_modules

    # mkdir /app/backend/node_modules
    # chown -R node:nodegroup /app/backend/node_modules
    # chmod -R 777 /app/backend/node_modules    

    chown -R nodeuser:nodegroup /app
    chmod -R 777 /app

    rm -rf /app/frontend/node_modules
    rm -rf /app/backend/node_modules

    if [ ! -d /var/keyz ]; then

        mkdir -p /var/keyz
        chmod 777 /var/keyz
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /var/keyz/localhost.key -out /var/keyz/localhost.crt -config /var/.startup/.ca.cnf
        echo "Generated SSL keys in /var/keyz directory."
    fi
fi