# NestJS + MongoDB Starter

## Description

This repository is used to base for all projects using NestJS + MongoDB with Clean Architecture

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# Server listen at address http://localhost:3000
```

## Using Docker

```bash
# Copy file .env
$ cp .env env/local.env

# Install dependencies
$ yarn install --pure-lockfile

# Start docker
$ docker-compose up -d

# Create new database
$ docker exec -it mongodb sh
$ mongo # Start mongo shell
> use admin
> db.auth(<username>, <password>) #usr: root, pwd: password
> db.createUser({
  user: <username>,
  pwd: <password>,
  roles: [{"role":"readWrite", "db":"test"}],
})

# Server listen at address http://localhost:3000

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## API Design Documentation

```bash
# Server listen at http://localhost:3000/api/v2/docs
```

## Stacks
**Framework**

|Tech|Use|Reason|
|----|---|---------|
|NestJS|Backend framework|NestJS is a framework for building efficient and scalable Node.js server-side applications built with and fully supporting TypeScript. This gives great ease to split applications into microservices.|
|NextJS|Frontend framework|Easy to render user views on server. Very large ecosystem, but perhaps too heavyweight|
|TypeScript||TypeScript simplifies JavaScript code, making it easier to read and debug|

**Database**
|Tech|Use|Reason|
|----|---|---------|
|MongoDB|NoSQL database|Its flexible schema makes it easy to evolve and store data in a way that is easy for programmers to work with. MongoDB is also built to scale up quickly and supports all the main features of modern databases such as transactions|
|Mongoose|A Node.js-based Object Data Modeling (ODM) library for MongoDB||

**Package management**
|Tech|Use|Reason|
|----|---|---------|
|Yarn|javascript artifact repository|Faster and more progressive than NPM 4/5|
|npm|javascript artifact repository|Migrated to yarn|

**Platform develop**
|Tech|Use|Reason|
|----|---|---------|
|Docker|Used in builds and dev/test environments - being assessed for production usage||

## Architecture
### Clean Architecture
There are 3 main packages: domain, usecases and infrastructure. These packages have to respect these rules:
* `domain` contains the business code and its logic and has no outward dependency: nor on frameworks (NestJS in our case), nor on use_cases or infrastructure packages.
* `usecases` is like a conductor. It will depend only on domain package to execute business logic. use_cases should not have any dependencies on infrastructure (including framework or npm module).
* `infrastructure` contains all the technical details, configuration, implementations (database, web services, npm module, etc.), and must not contain any business logic. infrastructure has dependencies on domain, use_cases and frameworks.

## Inspiration
A LOT of this has been shameless taken from [jonathanPretre/clean-architecture-nestjs](https://github.com/jonathanPretre/clean-architecture-nestjs).
## References

## License
