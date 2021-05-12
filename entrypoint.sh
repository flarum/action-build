#!/bin/bash -l

# exit on error
set -e

style='\e[47;1;31m'
reset='\e[0;10m'

# log commands run, useful when debugging
trap 'log "$BASH_COMMAND"' DEBUG

log() {
  # ignore echo commands
  if [[ $1 != echo* ]]; then
    echo "##[command]$1"
  fi
}

if [ -z "$INPUT_GITHUB_TOKEN" ]; then
  # Backwards compatibility with `env` options method
  if [ -v GITHUB_TOKEN ]; then
    $INPUT_GITHUB_TOKEN=$GITHUB_TOKEN
  else
    echo -e "\e[0;31mGITHUB_TOKEN is not set."
    exit 1
  fi
fi

if [ -z "$INPUT_BUILD_SCRIPT" ]; then
  INPUT_BUILD_SCRIPT = "build"
fi

if [ -z "$INPUT_PACKAGE_MANAGER" ]; then
  INPUT_BUILD_SCRIPT = "npm"
fi

# script

echo -e "$style - setting up git $reset"

git config user.name 'flarum-bot'
git config user.email 'bot@flarum.org'

echo -e "$style - installing dependencies with $INPUT_PACKAGE_MANAGER $reset"

cd js || exit 1

npm i -g npm@^7

if [[ "$INPUT_PACKAGE_MANAGER" == "npm" ]]; then
  npm ci
else
  npm i -g yarn
  yarn install --frozen-lockfile
fi

echo -e "$style - building Javascript/Typescript files $reset"

# Equivalent to npm run xxx or yarn run xxx
$INPUT_PACKAGE_MANAGER run $INPUT_BUILD_SCRIPT

# Build and add typings to staged files
if [ -v INPUT_TYPINGS_SCRIPT ]; then
  echo -e "$style - building typings $reset"

  # Typings build often has errors -- let's not exit if we have any issues
  set +e
  $INPUT_PACKAGE_MANAGER run $INPUT_TYPINGS_SCRIPT
  set -e

  git add dist-typings/* -f
else
  echo -e "$style - not building typings $reset"
fi

git add dist/* -f

if [[ -z $(git status -uno --porcelain) ]]; then
  echo -e "$style - nothing to commit $reset"
  exit
fi

echo -e "$style - committing and pushing $reset"

git commit -m "Bundled output for commit $GITHUB_SHA [skip ci]"

# no longer exit on error
set +e

OUT="$(git push https://"$GITHUB_ACTOR":"$GITHUB_TOKEN"@github.com/"$GITHUB_REPOSITORY".git HEAD:"$GITHUB_REF" 2>&1 >/dev/null)"

if grep -q "the remote contains work that you do\|a pushed branch tip is behind its remote" <<<"$OUT"; then
  echo -e "$style - HEAD is behind $reset"
  exit
elif grep -q "fatal:\|error:" <<<"$OUT"; then
  echo -e "$style - error $reset"
  echo "$OUT"
  exit 1
else
  echo -e "$style - success $reset"
  echo "$OUT"
fi
