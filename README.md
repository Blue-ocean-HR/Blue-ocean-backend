# WasteNot-Backend


## Table of Contents
- [Tech Stack](#tech-stack)
- [Schema](#schema)
- [Product Features](#product-features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Documentation](#documentation)
- [Contributors](#contributors)


## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
## Schema

Created with DrawSQL 
https://drawsql.app/teams/blue-ocean-1/diagrams/blue-ocean
![image](https://user-images.githubusercontent.com/24787921/204449009-03b43f18-4df5-49b1-844f-1516d85186ed.png)

## Raw Dataset

We used a dataset from https://clickhouse.com/docs/en/getting-started/example-datasets/recipes/

Our idea was to implement an api from scratch without using a third-party api.  The purpose here is to make it easy for our client to gather and add data in the future without the cost of third-party API fees.

The data was intially 'dirty' and had to be 'cleaned' up with a fsNode read/write script to correct the format. 

Here is a link to the fsNode script https://github.com/Blue-ocean-HR/etl-process

## Getting Started
### Download Dataset

Download the dataset from https://clickhouse.com/docs/en/getting-started/example-datasets/recipes/

### FileCleanup

Follow the instruction in the fsNode cleanup script found here to clean the data into a csv

https://github.com/Blue-ocean-HR/etl-process

### Installation
1. `npm install`
2. Configure your .env file like the example provided in the repo or copy/paste/edit this code into a new .env

```
PORT = yourServerPort
USER = "yourUserName"
HOST = 'yourAddress'
DB = "yourDatabase"
PASSWORD = "yourDatabasePW"
DBPORT = yourDatabasePort
IDLE_SESSION_TIMEOUT = 0
```

### Seeding

1. Change the path of copy statements in the db/blueOcean.sql file to match the current location of your .csv after running the cleanup process

```
COPY recipes (id, title, recipes_ingredients, directions, link)

FROM '/Users/andrewarsenault/Desktop/BOcsvs/recipes1.csv'

DELIMITER ',' CSV QUOTE '"';
```
2. Start the seeding script `npm run seed`

3. Successful install should result in the follow message

![image](https://user-images.githubusercontent.com/24787921/204452255-1cb74947-ce50-4721-a80d-e5f36fe1cb26.png)


## Documentation
### API

https://cooing-nightshade-a1d.notion.site/WasteNot-API-144a48308904476aa9421475bc0b4981

## Contributors

<a href="https://github.com/Blue-ocean-HR/Blue-ocean-backend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Blue-ocean-HR/Blue-ocean-backend" />
</a>
