#/bin/bash


if [ ! -f /var/.node_install_done ]; then
echo "Running install..."

  cd /app
  npm i -g @rws-framework/project-creator

  # cd /app/frontend
  # yarn

  touch /var/.node_install_done
fi
