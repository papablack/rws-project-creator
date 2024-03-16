#!/bin/bash
# Script to change permissions of the MongoDB data directory

# Change permissions of the MongoDB data directory
# chmod -R 777 /bitnami/mongodb/data
mkdir -p /bitnami/mongodb/data && chmod -R 777 /bitnami/mongodb/data