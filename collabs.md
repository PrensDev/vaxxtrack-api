# API

## Initialize Project
> $ npm init

## Install the following
### Express
> npm install express --save

### Sequelize
> $ npm install --save sequelize

### Sequelize-cli
> $ npm install -g sequelize-cli

### MySQL Driver
> $ npm install --save mysql2

### Nodemon
> $ npm i -D nodemon

## Dotenv
> $ npm install dotenv

## brcypt
> $ npm install bcrypt

## jsonwebtoken
> $ npm install jsonwebtoken

## Initialize Sequelize
> $ sequelize init

## Enter the following script in package.json
```
"scripts" : {
    "start" : "node index",
    "dev"   : "nodemon index"
}
```
## Edit config.json in config folder
```
{
  "development": {
    ...
    "database": "YOUR DATABASE NAME",
    ...
  },
  ...
}

```

## Run app by development
> $ npm run dev

## To create database
> $ sequelize db:create

## To drop database
> $ sequelize db:drop

## To create model
> $ sequelize model:generate --name Model_Name --attributes column:string