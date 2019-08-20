#!/bin/sh -l

set -e

if [ -z $GITHUB_TOKEN ]; then
    echo -e '\033[0;31mGITHUB_TOKEN is not set.'
    exit 1
fi

git config user.name 'flarum-bot'
git config user.email 'bot@flarum.org'

cd js

echo -e '\e[36m\e[1mInstalling dependencies.'

npm i -g npm@6.1.0
npm ci

echo -e '\e[36m\e[1mBuilding JavaScript files.'

npm run build

git add dist/* -f

if [[ -z $(git status -uno --porcelain) ]]; then
    echo -e '\e[36m\e[1mNothing to commit.'
else
    echo -e '\e[36m\e[1mCommitting and pushing.'

    git commit -m "Bundled output for commit $GITHUB_SHA [skip ci]"
    git push "https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git" "HEAD:$GITHUB_REF"
fi