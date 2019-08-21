#!/bin/bash -l

style='\e[47;1;31m'
reset='\e[0;10m'

if [ -z $GITHUB_TOKEN ]; then
    echo -e "\e[0;31mGITHUB_TOKEN is not set."
    exit 1
fi

echo -e "$style - setting up git $reset"

git config user.name 'flarum-bot'
git config user.email 'bot@flarum.org'

echo -e "$style - installing dependencies $reset"

cd js
npm i -g npm@6.1.0
npm ci

echo -e "$style - building JavaScript files $reset"

npm run build

git add dist/* -f

if [[ -z $(git status -uno --porcelain) ]]; then
    echo -e "$style - nothing to commit $reset"
    exit
fi

echo -e "$style - committing and pushing $reset"

git commit -m "Bundled output for commit $GITHUB_SHA [skip ci]"

OUT="$(git push https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git HEAD:$GITHUB_REF 2>&1)"

if grep -q "the remote contains work that you do\|a pushed branch tip is behind its remote" <<< "$OUT"; then
    echo -e "$style - HEAD is behind $reset"
    exit
fi

(>&2 echo $OUT)