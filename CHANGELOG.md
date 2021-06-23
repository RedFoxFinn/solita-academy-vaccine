# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.6.0](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.9...v0.6.0) (2021-06-23)


### ⚠ BREAKING CHANGES

* new arguments for queries

### Features

* modified resolvers & typedefs: vaccinationCount & vaccinations ([70b746b](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/70b746b72c248dc6a4507c20f0e24cce221d5ff4))

### [0.5.9](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.8...v0.5.9) (2021-06-21)


### Bug Fixes

* config fixes ([216ee75](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/216ee756d4f57673efc5fc175a5cba2c2614af31))

### [0.5.8](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.7...v0.5.8) (2021-06-21)


### Bug Fixes

* removed build from backend ([f7a011f](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/f7a011fbdb282b964a0f0a825a37cb995903f329))

### [0.5.7](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.6...v0.5.7) (2021-06-21)


### Bug Fixes

* fixing backend deployment: not serving build, added engines to package.json ([8de765b](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/8de765b5800616e7c8854876ddf7d6f0c56cf240))

### [0.5.6](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.5...v0.5.6) (2021-06-21)


### Bug Fixes

* removed conditionals from route '/' ([d8c7261](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/d8c7261d84bb357df7e9bc9c82f020e17d09c4c0))

### [0.5.5](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.4...v0.5.5) (2021-06-21)


### Bug Fixes

* fixed route '/' non-production res.send ([3787186](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/3787186ea2387bd611afaf4de206a03e90dc4b35))

### [0.5.4](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.3...v0.5.4) (2021-06-21)


### Features

* added first build of the frontend for heroku ([2cc87c9](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/2cc87c90f09e1279ef2ffd32e485c8fcac4f9ec3))

### [0.5.3](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.2...v0.5.3) (2021-06-21)


### Bug Fixes

* fixed Procfile commands ([ea2e1f9](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/ea2e1f9e1c0d684de8263e6e13cd8f94c9232dc4))

### [0.5.2](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.1...v0.5.2) (2021-06-21)


### Bug Fixes

* added missing Procfile for Heroku ([3fd5ccf](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/3fd5ccf9d73523afe56f56b30c1e399952682e74))

### [0.5.1](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.5.0...v0.5.1) (2021-06-21)


### Bug Fixes

* config.atlas -> config.atlas.toString() ([059aef2](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/059aef2243bec357204a0e7be317b1874e627c06))

## [0.5.0](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.4.0...v0.5.0) (2021-06-17)


### ⚠ BREAKING CHANGES

* two new queries, modified multiple query resolvers

* new queries & resolvers + modified old ones ([84e770e](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/84e770e4f68d160b23a339b2452b293caac98880))

## [0.4.0](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.3.0...v0.4.0) (2021-06-16)


### ⚠ BREAKING CHANGES

* in the resolvers: implemented mongoose model usage instead of direct reading from
source

### Features

* gql_resolvers updated to use mongoose models ([3ea9741](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/3ea974156526d68aec512e9beba5c145ce559a7b))

## [0.3.0](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.2.4...v0.3.0) (2021-06-16)


### ⚠ BREAKING CHANGES

* additional functionalities that were not used in earlier version: mongoose models

### Features

* added mongoose models and used them in 'refreshAtlas' query ([97c63ce](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/97c63ceb621d0dd9a76358fc41e9da0b1c01da20))

### [0.2.4](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.2.3...v0.2.4) (2021-06-16)


### Features

* add new queries to typedefinitions and resolvers ([00e1490](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/00e149089b6c63666cca41173818b1e40fb63a82))

### [0.2.3](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.2.2...v0.2.3) (2021-06-12)


### Features

* added first implementation of graphql server (apollo-server-express) ([328c357](https://github.com/RedFoxFinn/solita-academy-vaccine/commit/328c357d06441ee0ee23866227400befc73896fa))

### [0.2.2](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.2.1...v0.2.2) (2021-06-12)

### [0.2.1](https://github.com/RedFoxFinn/solita-academy-vaccine/compare/v0.2.0...v0.2.1) (2021-06-12)

## 0.2.0 (2021-06-12)


### ⚠ BREAKING CHANGES

* **data_retriever:** strong dependance of data_retriever on backend;

### Features

* **data_retriever:** added tool: data_retriever & test to test its output ffed1ec
