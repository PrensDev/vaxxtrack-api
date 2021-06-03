# Controller Tasks

## Health Official Use Cases

### Notes for all assignees

- Health Official must login in first and use the token must in order to perform the use cases below. SO DO NOT FORGET TO USE `req.user` and its properties.
- You do not need to include the `/health-official` route in `health_official.route.js` since it is already declared in `app.js`
- If some steps are already done, just skip it.
- PLEASE. INCLUDE ERROR HANDLINGS. 
- DO NOT COMMIT CHANGES IF YOU HAVE EXISTING ERRORS. NAKAKA-ABALA PO SA IBANG MEMBERS NA GUMAGAWA DIN.

### Vaccination Record of Citizen

#### Add Vaccination Record of Citizen

1. In `controllers/health_official/vaccination.controller.js`, create a property called `createVaccRecord` that will create new vaccination record of a citizen.

2. In `routes/health_official.route.js`, use the variable `vaccCtrl` to call the property you've been created with appropriate HTTP method and path `/add-vaccination-record`

3. DO NOT FORGET TO TEST IT. The INPUT should be this way:

```
{
    "citizen_ID": '',
    "vaccine_ID": '',
    "vaccination_date": '',
    "vaccinated_by": '',
    "vaccinated_in": '',
    "remarks": ''
}
```

#### Update Vaccination Record of Citizen

1. In `controllers/health_official/vaccination.controller.js`, create a property called `updateVaccRecord` that will create new vaccination record of a citizen.

2. In `routes/health_official.route.js`, use the variable `vaccCtrl` to call the property you've been created with appropriate HTTP method and path `/update-vaccination-record/:vaccination_record_ID`. Note: Use the parameter to update a specific vaccination record

3. DO NOT FORGET TO TEST IT. The INPUT should be this way:

```
{
    "vaccine_ID": '',
    "vaccination_date": '',
    "vaccinated_by": '',
    "vaccinated_in": '',
    "remarks": ''
}
```

### User Information

#### Get User Information

1. In `controllers/health_official/info.controller.js`, create a property called `getInfo` that will get the information of the user.

2. In `routes/health_official.route.js`, use the variable `infoCtrl` to call the property you've been created with appropriate HTTP method and path `/info`

3. DO NOT FORGET TO TEST IT! The OUTPUT should be ONLY this way:

```
{
    "first_name": '',
    "middle_name": '',
    "last_name": '',
    "suffix_name: '',
    "user_type": ''
}
```

Note:
> No other fields should be included but only what is in the output.

### Update User Informtation

1. In `controllers/health_official/info.controller.js`, create a property called `updateInfo` that will update the information of the user.

2. In `routes/health_official.route.js`, use the variable `infoCtrl` to call the property you've been created with appropriate HTTP method and path `/update-info`

3. DO NOT FORGET TO TEST IT! The OUTPUT should be the same as previous. The INPUT should be this way:

```
{
    "first_name": '',
    "middle_name": '',
    "last_name": '',
    "suffix_name: ''
}
```

### Account Settings

#### Get all accounts of logged in user

1. In `controllers/health_official/accounts.controller.js`, create a property called `getAllAccounts` that will get all the accounts of the logged in user.

2. In `routes/health_official.route.js`, use the variable `accountCtlr` to call the property you've been created with appropriate HTTP method and path `/accounts`

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

1. In `controllers/health_official/accounts.controller.js`, create a property called `createAccount` that will create new account of the logged in user.

2. In `routes/health_official.route.js`, use the variable `accountCtlr` to call the property ypu created with appropriate HTTP method and path `/add-account`

3. DO NOT FORGET TO TEST IT! The OUTPUT should be like previous. The INPUT should be this way: 

```
{
    "details": '',
    "type": '',
    "verified": ''
}
```