# Controller Tasks

## Citizen Use Cases

### Notes for all assignees

- Citizen must login in first and use the token must in order to perform the use cases below. SO FO NOT FORGET TO USE `req.user` and its properties.
- You do not need to include the `/citizen` route in `citizen.route.js` since it is already declared in `app.js`
- If some steps are already done, just skip it.
- PLEASE. INCLUDE ERROR HANDLINGS. 
- DO NOT COMMIT CHANGES IF YOU HAVE EXISTING ERRORS. NAKAKA-ABALA PO KAYO SA IBANG MEMBERS NA GUMAGAWA DIN.

### Vaccination Records

#### Get All Vaccination Records of Citizen

1. In `controllers/citizen/vaccination.controller.js`, create a property called `getAllVaccRecord` that will return all vaccination records of the logged in citizen

2. In `routes/citizen.route.js`, use the variable `vaccCtlr` to call the property you've been created with appropriate HTTP method and path `/vaccination-records`

3. DO NOT FORGET TO TEST IT. The OUTPUT should be this way

```
{
    data: [
        {
            "vaccination_record_ID": "",
            "citizen_ID": "",
            "vaccination_date": "",
            "vaccinated_by": "",
            "vaccinated_in": "",
            "remarks": "",
            "vaccine_used": {
                "product_name": "",
                "vaccine_name": "",
                "type": "",
                "manufacturer": "",
                "shots_details": "",
                "description": ""
            }
        },
        ...
    ]
}
```

#### Get One Vaccination Records of Citizen

1. In `controllers/citizen/vaccination.controller.js`, create a property called `getOneVaccRecord` that will return all vaccination records of the logged in citizen

2. In `routes/citizen.route.js`, use the variable `vaccCtlr` to call the property you've been created with appropriate HTTP method and path `/vaccination-records/:vaccination_record_ID`

3. DO NOT FORGET TO TEST IT. The OUTPUT should be the same as previous

### Vaccination Appointment

#### Get All Vaccination Appointments

1. In `controllers/citizen/vaccination.controller.js`, create a property called `getAllVaccAppointments` that will return all appointments of citizen

2. In `routes/citizen.route.js`, use the variable `vaccCtlr` to call the property you've been created with appropriate HTTP method and path `/vaccination-appointments`

3. DO NOT FORGET TO TEST IT. The OUTPUT should be this way

```
{
    data: [
        {
            "vaccination_appointment_ID": "",
            "preferred_date": "",
            "citizen_ID": "",
            "status_approval": "",
            "approved_by": "",
            "approved_datetime": "",
            "vaccine_preferrence": {
                "product_name": "",
                "vaccine_name": "",
                "type": "",
                "manufacturer": "",
                "shots_details": "",
                "description": ""
            }
        },
        ...
    ]
}
```

### Cancel Appointment

1. In `controllers/citizen/vaccination.controller.js`, create a property called `cancelVaccAppointment` that will cancel (remove) the vaccination appointment of the citizen

2. In `routes/citizen.route.js`, use the variable `vaccCtlr` to call the property you've been created with appropriate HTTP method and path `/cancel-vaccination-appointment/:vaccination_record_ID`

    Note:
    - If status approval is not "Pending", it must not remove the appointment. But send a response that this appointment cannot be canceled nor removed.

3. DO NOT FORGET TO TEST IT. The OUTPUT should be a response that it is succesfully deleted. Just check database if the record is truly deleted or removed.

### Account Settings

#### Get all accounts of logged in user

1. In `controllers/citizen/accounts.controller.js`, create a property called `getAllAccounts` that will get all the accounts of the logged in user.

2. In `routes/citizen.route.js`, use the variable `accountCtlr` to call the property you've been created with appropriate HTTP method and path `/accounts`

3. DO NOT FORGET TO TEST IT! The OUPUT should be this way: 

```
{
    data: [
        {
            "user_account_ID": '',
            "user_ID": '',
            "details": '',
            "type": '',
            "verified": '',
            "created_datetime: '',
            "updated_datetime: ''
        }, 
        ...
    ]
}
```

#### Add new account

1. In `controllers/citizen/accounts.controller.js`, create a property called `createAccount` that will create new account of the logged in user.

2. In `routes/citizen.route.js`, use the variable `accountCtlr` to call the property ypu created with appropriate HTTP method and path `/add-account`

3. DO NOT FORGET TO TEST IT! The OUTPUT should be like previous. The INPUT should be this way: 

```
{
    "details": '',
    "type": ''
}
```

### Verify Account

1. In `controllers/citizen/accounts.controller.js`, create a property called `verifyAccount` that will verify the account of the logged in user. 

    - If it is already verified, return an response that is already verified

2. In `routes/citizen.route.js`, use the variable `accountCtlr` to call the property you've been created with appropriate HTTP method and path `/verify-account/:user_account_ID`. Use the parameter `user_account_ID` in your method.

    - Check also if the account is owned by logged in user before verifying. Return an invalid response if it is the case

3. DO NOT FORGET TO TEST IT! The OUTPUT should be like previous.