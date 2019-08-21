#!/bin/bash -l

style='\e[47;1;31m'
reset='\e[0;10m'

if [ -z $GITHUB_TOKEN ]; then
    echo -e "\e[0;31mGITHUB_TOKEN is not set."
    exit 1
fi

git config user.name 'flarum-bot'
git config user.email 'bot@flarum.org'

cd js

echo -e "$style - installing dependencies $reset"

npm i -g npm@6.1.0
npm ci

echo -e "$style - building JavaScript files $reset"

npm run build

git add dist/* -f

echo -e "$style - checking remote $reset"

# check if latest commit, if not exit
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
BASE=$(git merge-base @ "$UPSTREAM")

if [[ -z $(git status -uno --porcelain) ]]; then
    echo -e "$style - nothing to commit $reset"
    exit
elif [ $LOCAL = $BASE ]; then
    echo -e "$style - HEAD is behind $reset"
    exit
fi

echo -e "$style - committing $reset"

git commit -m "Bundled output for commit $GITHUB_SHA [skip ci]"

# push
echo -e "$style - pushing $reset"

git push "https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git" "HEAD:$GITHUB_REF"
