# [GitHub Action] Flarum JavaScript Building

A GitHub Action to automatically compile your Flarum extension's Javascript code, and push it to your GitHub repository.

You could set this action up to run whenever a commit is pushed to your main Git branch in order to automate part of your development process.

We use this action extensively within Flarum, including for `core` and all our bundled extensions.

## Example Workflow

```yml
name: Flarum Build

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
      - uses: flarum/action-build@2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          build_script: build # npm run build
          build_typings_script: build-typings # npm run build-typings
          package_manager: npm # Use NPM, not Yarn
          js_path: ./js # JS located in `./js`
          do_not_commit: false # Commit built JS by default
```

## Options

Here is a full list of options available using the `with` syntax:

| Name                   | Required | Description                                                                                                             | Example                       | Default |
|------------------------| -------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| `github_token`         | Yes      | Your Actions GitHub token. The example value should work for this by default.                                           | `${{ secrets.GITHUB_TOKEN }}` | None    |
| `build_script`         | Yes      | The `package.json` script to run to build your extension JS.                                                            | `build`                       | `build` |
| `build_typings_script` | No       | If defined, runs the script of this name in `package.json` to build typings for your extension.                         | `build-typings`               | Unset   |
| `format_script`        | No       | If defined, runs the script of this name in `package.json` to check code formatting of your extension's JS.             | `format-check`                | Unset   |
| `check_typings_script` | No       | If defined, runs the script of this name in `package.json` to typecheck your extension's TypeScript code.               | `check-typings`               | Unset   |
| `type_coverage_script` | No       | If defined, runs the script of this name in `package.json` to assess type coverage in your extension's TypeScript code. | `check-typings-coverage`      | Unset   |
| `package_manager`      | No       | Either `yarn` or `npm` or `pnpm`. Will install dependencies and build using the specified package manager.              | `yarn`                        | `npm`   |
| `js_path`              | No       | Path to your JS folder (where `package.json` is located) from the root of your repository.                              | `./js`                        | `./js`  |
| `do_not_commit`        | No       | Set to `true` to NOT commit the built JS/Typings. Useful for validating JS source.                                      | `false`                       | `false` |
| `checks`               | No       | An array of strings, where each is a script that should be run before committing built js.                              | `false`                       | `false` |
| `commit_all_dirty`     | No       | Set to `true` to commit all file changes, not just files in the dist JS directory.               | `false`                       | `false` |

### Assumptions

Your Javascript must be in a `js` folder, similar to how Flarum core and Flarum's first-party extensions are laid out.

If building typings, we assume that they are built to `js/dist-typings`, as set in the example `tsconfig.json` found on the [flarum-tsconfig](https://github.com/flarum/flarum-tsconfig).

## Only Build on Master

If you only want to run the workflow when commits are pushed to the `master` branch, change `on: push` to the following:

```yml
on:
  push:
    branches:
      - master
```
