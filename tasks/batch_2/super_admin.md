# Controller Tasks

## Super Admin Use Cases

### Notes for all assignees

- Super Admin must login in first and use the token must in order to perform the use cases below. SO DO NOT FORGET TO USE `req.user` and its properties.
- You do not need to include the `/super-admin` route in `super_admin.route.js` since it is already declared in `app.js`
- If some steps are already done, just skip it.
- PLEASE. INCLUDE ERROR HANDLINGS. 
- DO NOT COMMIT CHANGES IF YOU HAVE EXISTING ERRORS. NAKAKA-ABALA PO SA IBANG MEMBERS NA GUMAGAWA DIN.

### User Information

#### Get User Information

1. In `controllers/super_admin/info.controller.js`, create a property called `getInfo` that will get the information of the user.

2. In `routes/super_admin.route.js`, use the variable `infoCtrl` to call the property you've been created with appropriate HTTP method and path `/info`

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

1. In `controllers/super_admin/info.controller.js`, create a property called `updateInfo` that will update the information of the user.

2. In `routes/super_admin.route.js`, use the variable `infoCtrl` to call the property you've been created with appropriate HTTP method and path `/update-info`

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

1. In `controllers/representative/accounts.controller.js`, create a property called `getAllAccounts` that will get all the accounts of the logged in user.

2. In `routes/representative.route.js`, use the variable `accountCtlr` to call the property ypu created with appropriate HTTP method and path `/accounts`

3. DO NOT FORGET TO TEST IT! The OUPUT should be this way: 

```
{
    "user_account_ID": '',
    "user_ID": '',
    "details": '',
    "type": '',
    "created_datetime: '',
    "updated_datetime: ''
}
```

#### Add new account

1. In `controllers/super_admin/accounts.controller.js`, create a property called `createAccount` that will create new account of the logged in user.

2. In `routes/super_admin.route.js`, use the variable `accountCtlr` to call the property ypu created with appropriate HTTP method and path `/add-account`

3. DO NOT FORGET TO TEST IT! The OUTPUT should be like previous. The INPUT should be this way: 

```
{
    "details": '',
    "type": ''
}
```

### Verify Account

1. In `controllers/super_admin/accounts.controller.js`, create a property called `verifyAccount` that will verify the account of the logged in user. 

    - If it is already verified, return a response that it is already verified

2. In `routes/super_admin.route.js`, use the variable `accountCtlr` to call the property you've been created with appropriate HTTP method and path `/verify-account/:user_account_ID`. Use the parameter `user_account_ID` in your method.

    - Check also if the account is owned by logged in user before verifying. Return an invalid response if it is the case

3. DO NOT FORGET TO TEST IT! The OUTPUT should be like previous.