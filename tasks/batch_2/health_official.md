# Controller Tasks

## Health Official Use Cases

### Notes for all assignees

- Health Official must login in first and use the token must in order to perform the use cases below. SO DO NOT FORGET TO USE `req.user` and its properties.
- You do not need to include the `/health-official` route in `health_official.route.js` since it is already declared in `app.js`
- If some steps are already done, just skip it.
- PLEASE. INCLUDE ERROR HANDLINGS. 
- DO NOT COMMIT CHANGES IF YOU HAVE EXISTING ERRORS. NAKAKA-ABALA PO SA IBANG MEMBERS NA GUMAGAWA DIN.

### Vaccination Records of Citizen

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

And the output should be this way:

```
{
    "first_name": "",
    "middle_name": "",
    "last_name": "",
    "suffix_name": "",
    "sex": "",
    "birth_date": "",
    "civil_status": "",
    "address": {
        "region": "",
        "province": "",
        "city_municipality": "",
        "barangay_district": "",
        "street": "",
        "specific_location": "",
        "zip_code": "",
        "latitude": "",
        "longitude": ""
    },
    "vaccination_records": {
        "vaccination_record_ID": ""
        "vaccination_date": "",
        "vaccinated_by": "",
        "vaccinated_in": "",
        "remarks": "",
        "vaccine": {
            "product_name": "",
            "vaccine_name": "",
            "type": "",
            "manufacturer": ""
        }
    }
}
```

#### Update Vaccination Record of Citizen

1. In `controllers/health_official/vaccination.controller.js`, create a property called `updateVaccRecord` that will update the vaccination record of a citizen.

2. In `routes/health_official.route.js`, use the variable `vaccCtrl` to call the property you've been created with appropriate HTTP method and path `/update-vaccination-record/:vaccination_record_ID`. Note: Use the parameter to update a specific vaccination record

3. DO NOT FORGET TO TEST IT. The OUTPUT should be like the previous. The INPUT should be this way:

```
{
    "vaccine_ID": '',
    "vaccination_date": '',
    "vaccinated_by": '',
    "vaccinated_in": '',
    "remarks": ''
}
```

### Vaccination Appointment

#### Get All Vaccination Appointments

1. In `controllers/health_official/vaccination.controller.js`, create a property called `getAllVaccAppointments` that will return all vaccination appointments of all citizens

2. In `routes/health_official.route.js`, use the variable `vaccCtlr` to call the property you've been created with appropriate HTTP method and path `/vaccination-appointments`

3. DO NOT FORGET TO TEST IT. The OUTPUT should be like this way

```
{
    data: [
        {
            "vaccination_appointment_ID": "",
            "preferred_vaccine": "",
            "preferred_date": "",
            "status_approval": "",
            "approved_by": "",
            "approved_datetime": "",
            "appointed_by": {
                "first_name": "",
                "middle_name": "",
                "last_name": "",
                "suffix_name": "",
                "sex": "",
                "birth_date": "",
                "civil_status": ""
            }
        },
        ...
    ]
}
```

#### Change/Update Status Approval of Citizen's Vaccination Appointment

1. In `controllers/health_official/vaccination.controller.js`, create a property called `updateVaccAppointmentStatusApproval` that will change the status approval of the citizen's appointment

2. In `routes/health_official.route.js`, use the variable `vaccCtlr` to call the property you've been created with appropriate HTTP method and path `/vaccination-appointments/change-status-approval/:vaccination_record_ID`

3. DO NOT FORGET TO TEST IT. The OUTPUT should be like the previous. The INPUT should be only this way

```
{
    "status_approval": "",
    "approved_by: "",
    "approved_datetime": ""
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

#### Update User Informtation

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
}
```

### Verify Account

1. In `controllers/health_official/accounts.controller.js`, create a property called `verifyAccount` that will verify the account of the logged in user. 

    - If it is already verified, return a response that it is already verified

2. In `routes/health_official.route.js`, use the variable `accountCtlr` to call the property you've been created with appropriate HTTP method and path `/verify-account/:user_account_ID`. Use the parameter `user_account_ID` in your method.

    - Check also if the account is owned by logged in user before verifying. Return an invalid response if it is the case

3. DO NOT FORGET TO TEST IT! The OUTPUT should be like previous.