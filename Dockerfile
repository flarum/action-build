# LTS version of Node
# All versions: https://hub.docker.com/_/node
FROM node:lts

COPY LICENSE README.md /

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
