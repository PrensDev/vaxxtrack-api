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