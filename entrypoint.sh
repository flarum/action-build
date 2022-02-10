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
    INPUT_GITHUB_TOKEN=$GITHUB_TOKEN
  else
    echo -e "\e[0;31mGITHUB_TOKEN is not set."
    exit 1
  fi
fi

if [ -z "$INPUT_BUILD_SCRIPT" ]; then
  INPUT_BUILD_SCRIPT="build"
fi

if [ -z "$INPUT_PACKAGE_MANAGER" ]; then
  INPUT_PACKAGE_MANAGER="npm"
fi

if [ -z "$INPUT_JS_PATH" ]; then
  INPUT_JS_PATH="./js"
fi

if [ -z "$INPUT_DO_NOT_COMMIT" ]; then
  INPUT_DO_NOT_COMMIT="false"
fi

# script

echo -e "$style - setting up git $reset"

git config user.name 'flarum-bot'
git config user.email 'bot@flarum.org'

echo -e "$style - entering JS path ($INPUT_JS_PATH) $reset"

cd $INPUT_JS_PATH || exit 1

echo -e "$style - installing dependencies with $INPUT_PACKAGE_MANAGER $reset"

npm i -g npm@^7

if [[ "$INPUT_PACKAGE_MANAGER" == "npm" ]]; then
  npm ci
elif [[ "$INPUT_PACKAGE_MANAGER" == "pnpm" ]]; then
  npm i -g pnpm
  pnpm install --frozen-lockfile
else
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

  COMMIT_DESC="Includes transpiled JS/TS, and Typescript declaration files (typings)."
else
  echo -e "$style - not building typings $reset"
  COMMIT_DESC="Includes transpiled JS/TS."
fi

# Only commit if we choose to do so
# Useful for validating that JS is syntactically valid
if [[ "$INPUT_DO_NOT_COMMIT" != "false" ]]; then
  echo -e "$style - DO_NOT_COMMIT is true, so we won't commit these changes $reset"
else
  git add dist/* -f

  if [[ -z $(git status -uno --porcelain) ]]; then
    echo -e "$style - nothing to commit $reset"
    exit
  fi

  echo -e "$style - committing and pushing $reset"

  # Multiple `-m`s are treated as separate paragraphs by git.
  git commit -m "Bundled output for commit $GITHUB_SHA" -m "$COMMIT_DESC" -m "[skip ci]"

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
fi
