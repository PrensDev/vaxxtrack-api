# Controller Tasks

## Representative Use Cases

### Notes for all assignees

- Representative must login in first and use the token must in order to perform the use cases below. SO DO NOT FORGET TO USE `req.user` and its properties.
- You do not need to include the `/citizen` route in `citizen.route.js` since it is already declared in `app.js`
- If some steps are already done, just skip it.
- PLEASE. INCLUDE ERROR HANDLINGS. 
- DO NOT COMMIT CHANGES IF YOU HAVE EXISTING ERRORS. NAKAKA-ABALA PO SA IBANG MEMBERS NA GUMAGAWA DIN.

### Account Settings

#### Get all accounts of logged in user

1. In `controllers/representative/accounts.controller.js`, create a property called `getAllAccounts` that will get all the accounts of the logged in user.

2. In `routes/representative.route.js`, use the variable `accountCtlr` to call the property ypu created with appropriate HTTP method and path `/accounts`

3. DO NOT FORGET TO TEST IT! The OUPUT should be this way: 

```
{
    "user_account_ID": '',
    "user_ID": '',
    "details": '',
    "type": '',
    "verified": '',
    "created_datetime: '',
    "updated_datetime: ''
}
```

#### Add new account

1. In `controllers/representative/accounts.controller.js`, create a property called `createAccount` that will create new account of the logged in user.

2. In `routes/representative.route.js`, use the variable `accountCtlr` to call the property ypu created with appropriate HTTP method and path `/add-account`

3. DO NOT FORGET TO TEST IT! The OUTPUT should be like previous. The INPUT should be this way: 

```
{
    "details": '',
    "type": '',
    "verified": ''
}
```