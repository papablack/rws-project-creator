run_as_node() {
    su - nodeuser -s /bin/bash -c "source $NVM_DIR/nvm.sh && $*"
}

if [ ! -f /var/.node_install_done ]; then
  cd /app
  run_as_node "yarn"

  # cd /app/frontend
  # yarn

  touch /var/.node_install_done
fi
