
# Tracer.io

This user-friendly platform allows users to record and store data related to harvests, strains, and plants securely. The system's interactive dashboard offers insightful analytics, enabling users to visualize trends, compare performance, and make data-driven decisions.


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`HOST_URL`

## Pre-requisites

- Node.js v19
- Nest.js cli

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

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

## TODO

Environment:

- [x] Setup environment (Backend: Nest.js and Prisma ORM with PostgreSQL)

- [ ] Configure Tracer.io API

Create Tracer API

- [ ] Create Plant Router (TDD)
- [ ] Create Strain Router (TDD)
- [ ] Create Harvest Router (TDD)

Create Data Models

- [ ] Configure Prisma ORM
- [ ] Create Strain Data Model
- [ ] Create Harvest Data Model
- [ ] Create Plant Data Model

Create Repositories and Services

- [ ] Create Strain Repository (TDD)
- [ ] Create Harvest Repository (TDD)
- [ ] Create Plant Repository (TDD)
- [ ] Create Harvest Service (TDD)
- [ ] Create Strain Service (TDD)
- [ ] Create Plant Service (TDD)

## License

Nest is [MIT licensed](LICENSE).
