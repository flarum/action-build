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

git fetch origin

behind=$(git log --oneline HEAD..origin | wc -l)

if [[ $behind -gt 0 ]]; then
    echo -e "$style - HEAD is behind by $behind commit(s) $reset"
    exit
elif [[ -z $(git status -uno --porcelain) ]]; then
    echo -e "$style - nothing to commit $reset"
    exit
fi


echo -e "$style - committing and pushing $reset"

git commit -m "Bundled output for commit $GITHUB_SHA [skip ci]"
git push "https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git" "HEAD:$GITHUB_REF"
