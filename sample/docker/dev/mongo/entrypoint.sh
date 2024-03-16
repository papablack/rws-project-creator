#!/bin/bash

mongod --port 27017 --dbpath /data/db --replSet rs0 --bind_ip localhost
