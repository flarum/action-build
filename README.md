# [GitHub Action] Flarum JavaScript Building

You must be in the GitHub Actions beta to be able to use GitHub Actions in your repositories and/or organizations.

This action automatically compiles & commits yours JavaScript extension files on every commit.

## Example Workflow

```yml
name: Flarum Build

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
      - uses: flarum/action-build@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Only Build on Master

If you only want to run the workflow when commits are pushed to the `master` branch, add the following to the workflow file:

```yml
push:
  branches:
    - master
```