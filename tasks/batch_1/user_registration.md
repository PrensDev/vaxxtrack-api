# Controller Tasks

## Notes for all assigneees
> Please include error handlings

## User Registration

### For Citizen

1. In `controllers/main/register.controller.js`, create a property named `citizen` that registers a citizen. The input must be the citizen's account, information, and address. The input should be this way:

```
{
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: '',
    sex: '',
    birth_date: '',
    civil_status: '',
    user_type: '',
    password: '',
    user_accounts: {
        details: '',
        type: '',
        verified: ''
    },
    address: {
        region: '',
        province: '',
        city_municipality: '',
        barangay_district: '',
        street: '',
        specific_location: '',
        zip_code: '',
        latitude: '',
        longitude: ''
    }
}
```

2. In `routes/main.route.js`, include the property in `registerController` with apporpriate HTTP Method and path `/register/citizen`

3. Test it. The output should be the same as input. Do not forget to include error and message

### For Super Admin

1. In `controllers/main/register.controller.js`, create a property called `super_admin` that registers a new super admin by an existing super admin. The input should be this way:

```
{
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: '',
    user_type: '',
    password: '',
    added_by: '[user_ID of existing super admin]',
    user_accounts: {
        details: '',
        type: '',
        verified: ''
    }
}
```

2. In `routes/main.route.js`, include the property in `registerController` with apporpriate HTTP Method and path `/register/super_admin`

3. Test it. The output should be the same as input. Do not forget to include error and message

### For Health Official

1. In `controllers/main/register.controller.js`, create a property called `health_official` that registers a new health official by an existing super admin. The input and output should be this way:

```
{
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: '',
    user_type: '',
    password: '',
    added_by: '[user_ID of existing super admin]',
    user_accounts: {
        details: '',
        type: '',
        verified: ''
    }
}
```

2. In `routes/main.route.js`, include the property in `registerController` with apporpriate HTTP Method and path `/register/health_official`

3. Test it. The output should be the same as input. Do not forget to include error and message

### Notes:
> You don't needed to include the `main.route` in `app.js` since it is already declared.
