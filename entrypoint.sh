#!/bin/sh -l

set -e

if [ -z $GITHUB_TOKEN ]; then
    echo -e '\033[0;31mGITHUB_TOKEN is not set.'
    exit 1
fi

git config user.name 'flarum-bot'
git config user.email 'bot@flarum.org'

cd js

npm i -g npm@6.1.0
npm ci
npm run build

git add dist/* -f
git commit -m "Bundled output for commit $GITHUB_SHA [skip ci]"

git remote set-url origin "https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git"
git push
