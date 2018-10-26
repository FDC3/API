# FDC3 API specifications

[![npm version](https://badge.fury.io/js/yarn.svg)](https://badge.fury.io/js/yarn)
[![Build Status](https://travis-ci.org/fdc3/API.svg?branch=master)](https://travis-ci.org/fdc3/API)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Visit the [documentation website](https://fdc3-api.finos.org) for more info.

## Release
The FDC3 API is released under the [FINOS NPMJS Organisation](npmjs.com/org/finos).

On every commit, [semantic release](https://semantic-release.gitbook.io/semantic-release/) will be executed by Travis CI and - based on the commit message - will decide to trigger a release or not.

Release managers can use [commitizen](http://commitizen.github.io/cz-cli/) to simplify their commit process; simply install `npm install -g commitizen` and use `git cz` (instead of `git commit`) to commit your changes.
![Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png).

It is worth noting that if release managers have the opportunity [squash and merge](https://help.github.com/articles/about-pull-request-merges/#squash-and-merge-your-pull-request-commits) using GitHub merge UI, in order to choose the right commit messages and keep commit log clean.

When a release is performed, Travis CI will do the following:
- Run all build and validation tasks defined by [`.travis.yml`](.travis.yml)
- Create a GitHub tag, labelled after the `version` specified in `package.json`
    + Include a `CHANGELOG.md` file with a recap of all commits added since last release
    + Publish (on `npmjs.org/org/finos`) an updated version of the NPM package defined by `package.json` 
- Increase the the `version` specified in `package.json` and push changes to `master` branch

### Release setup
Travis CI must be configured with the following environment variables:
- `GH_TOKEN`, used to create tags on GitHub
- `NPM_TOKEN`, used to publish the npm package

You can setup variables [using semantic-release-cli](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration#automatic-setup-with-semantic-release-cli), [Travis Repository Settings](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-Settings) or with the [travis CLI](https://github.com/travis-ci/travis.rb#env).

Release configurations can also be [shared across npm projects](https://semantic-release.gitbook.io/semantic-release/usage/shareable-configurations).

### Advanced configurations
Semantic release allows [additional configurations](https://semantic-release.gitbook.io/semantic-release/usage/plugins) to customise the release flow.

## Run locally
To run the website documentation locally, please follow the steps below.

### Install Ruby (MacOS)

It is strongly advised to use RVM or RBenv to install Ruby; below are the steps to install RVM on MacOS.
```
mkdir -p ~/.rvm/src && cd ~/.rvm/src && rm -rf ./rvm && \
git clone --depth 1 https://github.com/rvm/rvm.git && \
cd rvm && ./install
rvm install 2.5.2
which bundle #Should return a .rvm sub-path
which ruby #Should return a .rvm sub-path
```

### Install gems needed for jekyll

```
cd /tmp
git clone https://github.com/pages-themes/slate
cd slate
rm -rf .bundle
./script/bootstrap
gem install jekyll-theme-slate
gem install jekyll-seo-tag
gem install jekyll-watch
```

# Run jekyll on other project
```
cd ../API/docs
jekyll serve --incremental
```