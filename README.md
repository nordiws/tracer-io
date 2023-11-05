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

- [x] Configure Tracer.io API

Create Data Models

- [x] Configure TypeORM
- [x] Create Strain Data Model
- [x] Create Harvest Data Model
- [x] Create Plant Data Model
- [ ] Create User Data Model

Create Repositories

- [x] Create Harvest Service (TDD)
- [x] Create Strain Service (TDD)
- [x] Create Plant Service (TDD)
- [ ] Create User Service (TDD)

Create Tracer API

- [x] Create Plant Controller (TDD)
- [x] Create Strain Controller (TDD)
- [x] Create Harvest Controller (TDD)
- [ ] Create User Controller (TDD)

### Historic

Backend: Nest.js and Prisma ORM with PostgreSQL
crud strain, harvest, plant
Entities:

```JSON

strain: id PK: uuid, active: boolean, name: string, description: string, origin: string, genetic_origin: string, created: datetime, updated: datetime, deleted: datetime.
harvest: id PK: uuid, active: boolean, name: string, observations: string, created: datetime, updated: datetime,
plants: list [
  {
    strain_id: FK string,
    plant_id: FK string
  }
]
plant: id PK, date_planted: datetime, flower_period: datetime, date_harvest: datetime, date_stored: datetime, plants_qty: integer, products: array
user: id PK, authProvider: string, name: string, email: string, phone: string, strainId: string (FK), harvestId: string (FK), plantId: string (FK)

```

Frontend: Vue-3 with Vite
MVP
Strain crud screens. (Individual strain screen with related harvests)?
Harvest crud screens (Generate QR code to detailed strain view on harvest).
User screen.
Login screen
MVP 2.0
Financial module, to track expenses.

## License

Nest is [MIT licensed](LICENSE).
