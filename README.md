# project-planner-be

## Technologies
Project-planner-be is created with:
* express: 4.18.2
* mysql2: 2.3.3
* sequelize: 6.28.0

## Setup
To run this project, install it locally using npm or yarn:

First of all you have to create a .env or rename the .env.example file, and complete the next fields 
```
DB_NAME=project_planner
DB_HOST=
DB_USER=
DB_PASSWORD=
````
with your information.

## Step by Step
You have to run some scripts to create the database.


``` 
1. npm install / yarn install.

2. npm create-database / yarn create-database

3. npm migrate / yarn migrate

4. npm seed / yarn seed
```


Then run `npm start / yarn start` and you should see the next message:

```
Project planner api listening at ${PORT}
```

## SQL

If you want to create the schema and tables with SQL, I added a file with some queries that you can use.

`Go to sql/alter-tables.sql`

## Postman

If you want to test the APIs using postman, I added a collection.json that you can import.

`Go to postman/Project planner - API.postman_collection.json`
