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
          build_script: build # npm run build
          build_typings_script: build-typings # npm run build-typings
          test_script: test # npm run test
          package_manager: npm # Use NPM, not Yarn
          js_path: ./js # JS located in `./js`
          do_not_commit: false # Commit built JS by default
          commit_all_dirty: false
```

## Options

Here is a full list of options available using the `with` syntax:

| Name                   | Required | Description                                                                                                             | Example                       | Default |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| `build_script`         | Yes      | The `package.json` script to run to build your extension JS.                                                            | `build`                       | `build` |
| `build_typings_script` | No       | If defined, runs the script of this name in `package.json` to build typings for your extension.                         | `build-typings`               | Unset   |
| `format_script`        | No       | If defined, runs the script of this name in `package.json` to check code formatting of your extension's JS.             | `format-check`                | Unset   |
| `check_typings_script` | No       | If defined, runs the script of this name in `package.json` to typecheck your extension's TypeScript code.               | `check-typings`               | Unset   |
| `type_coverage_script` | No       | If defined, runs the script of this name in `package.json` to assess type coverage in your extension's TypeScript code. | `check-typings-coverage`      | Unset   |
| `test_script`          | No       | If defined, runs the script of this name in `package.json` to run the test suite.                                       | `test`                        | Unset   |
| `package_manager`      | No       | Either `yarn` or `npm` or `pnpm`. Will install dependencies and build using the specified package manager.              | `yarn`                        | `npm`   |
| `js_path`              | No       | Path to your JS folder (where `package.json` is located) from the root of your repository.                              | `./js`                        | `./js`  |
| `do_not_commit`        | No       | Set to `true` to NOT commit the built JS/Typings. Useful for validating JS source.                                      | `false`                       | `false` |
| `checks`               | No       | An array of strings, where each is a script that should be run before committing built js.                              | `false`                       | `false` |
| `commit_all_dirty`     | No       | Set to `true` to commit all file changes, not just files in the dist JS directory.                                      | `false`                       | `false` |
| `git_actor_name`       | No       | Allows to set a different username (normally `flarum-bot`) for the actor which commits the bundles JS.                  | `acme-bot`                    | Unset   |
| `git_actor_email`      | No       | Allows to set a different email for the actor which commits the bundled JS.                                             | `acme-bot@example.org`        | Unset   |

### Assumptions

Your Javascript must be in a `js` folder, similar to how Flarum core and Flarum's first-party extensions are laid out.

If building typings, we assume that they are built to `js/dist-typings`, as set in the example `tsconfig.json` found on the [flarum-tsconfig](https://github.com/flarum/flarum-tsconfig).

## Setting Up Custom Git Actor for Frontend Workflow

This guide helps you configure a custom Git actor in your extension's frontend workflow, specifically useful if your organization enforces branch protection rules requiring pull requests for changes to the default branch.

### Basic Configuration (Light Version)

To change the actor committing bundled JS in your workflow:

1. Add `git_actor_name` and `git_actor_email` inputs to your workflow file.
2. These values can represent either a real GitHub user or a fictional one.
3. If using a real user, it's recommended to use the GitHub-provided email for privacy-enabled accounts.

Example:

```yaml
name: ACME Foobar JS

on: [workflow_dispatch, push, pull_request]

jobs:
  run:
    uses: flarum/framework/.github/workflows/REUSABLE_frontend.yml@1.x
    with:
      enable_prettier: true
      ...
      git_actor_name: acme-bot
      git_actor_email: 12345678+acme-bot@users.noreply.github.com
```

### Advanced Configuration (With Branch Protection Rules)

If you also want to enforce branch protection and allow a custom actor to bypass pull requests:

1. Create a dedicated CI GitHub account with admin permissions in your organization.
2. Generate a Personal Access Token for the CI account:

   - Go to [GitHub Tokens](https://github.com/settings/tokens/new) and create a new token with repo and workflow scopes.

3. Add the token as a secret in your repository.
4. Use the real CI account's username and email in your workflow.

When setting branch protection rules, make sure not to enable "Do not allow bypassing the above settings" as this would block automated commits from the CI actor.

```yml
name: ACME Foobar JS

on: [workflow_dispatch, push, pull_request]

jobs:
  run:
    uses: flarum/framework/.github/workflows/REUSABLE_frontend.yml@1.x
    with:
      enable_prettier: true
      ..
      git_actor_name: ci-bot
      git_actor_email: ci-bot@users.noreply.github.com

    secrets:
      git_actor_token: ${{ secrets.GIT_ACTOR_TOKEN }}
```

### Important Notes

- Avoid the "Do not allow bypassing the above settings" option when setting up branch protection, or your CI actor won’t be able to commit the bundled JS.
- Make sure other rules or permissions don't block the CI account from making automated commits.

## Only Build on Master

If you only want to run the workflow when commits are pushed to the `master` branch, change `on: push` to the following:

```yml
on:
  push:
    branches:
      - master
```
