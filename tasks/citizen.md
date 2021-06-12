# Controller Tasks

<!-- Citizen Use Cases -->

## Citizen Use Cases

### Note for all assignees
> - Citizen must login in first and use the token must in order to perform the use cases below.
> - You do not need to include the `citizen.route.js` since it is already declared in `app.js`
> - If some steps are already done, just skip it.
> - PLEASE. INCLUDE ERROR HANDLINGS. 

### Health Status Logs

1. Create a controller named `health_status_log.controller.js` in `controllers/citizen` for these case.

2. In `routes/citizen.route.js`, create a controller named `healthStatusLogController` that requires the previous file created.

#### Log a health status

1. In `health_status_log.controller.js`, create a property named `create` that will create a new health status log of a citizen. The input and output should be

```
{
    citizen_ID: '[user_ID of the citizen]',
    temperature: '',
    fever: '',
    dry_cough: '',
    sore_throat: '',
    breath_shortness: '',
    smell_taste_loss: '',
    fatigue: '',
    aches_pain: '',
    runny_nose: '',
    diarrhea: '',
    headache: ''
}
```

2. In `routes/citizen.route.js`, include the property using `healthStatusLogController` with appropriate HTTP Method and path `/citizen/add_health_status_log`

3. Test it. The output should be the same as input. Do not forget to include error and message

#### Get all health status logs

1. In `controllers/citizen/health_status_log.controller.js`, create a property named `all_health_status_logs` that will return all of the status logs of the logged-in citizen

2. In `route/citizen.route.js`, include the property using the `healthStatusLogController` with appropriate HTTP method and path `/health_status_logs`

3. Test it. The output should be the same as the previous.

> Take Note:
> - You should return only the health status logs of the logged-in citizen. He/She cannot view the health status logs of the other citizens.

#### Get one health status log

1. In `controllers/citizen/health_status_log.controller.js`, create a property named `one_health_status_log` that will return all of the status logs of the logged-in citizen

2. In `route/citizen.route.js`, include the property using the `healthStatusLogController` with appropriate HTTP method and path `/health_status_logs/:health_status_log_ID`

3. Test it. The output should be the same as the previous.

> Take Note:
> - You should return only the health status log of the logged-in citizen. He/She cannot view the health status log of the other citizens.

#### Update a health status log

1. In `health_status_log.controller.js`, create a property named `update` that will create a new health status log of a citizen.The input should be:

```
{
    citizen_ID: '[user_ID of the citizen]',
    temperature: '',
    fever: '',
    dry_cough: '',
    sore_throat: '',
    breath_shortness: '',
    smell_taste_loss: '',
    fatigue: '',
    aches_pain: '',
    runny_nose: '',
    diarrhea: '',
    headache: ''
}
```

> Notes:
> - Make sure that the status log ID will be throwned in request body is owned by the citizen. He/She cannot update the health status log of other citizens. 
> - You should update the today's health status log of a citizen. If not exist of course you have to log before update.

2. In `routes/citizen.route.js`, include the property using `healthStatusLogController` with appropriate HTTP Method and path `/update_health_status_log`

3. Test it. The output should be the same as input. Do not forget to include error and message

### Visiting Logs

1. In  `controllers/citizen`, create a controller named `visiting_log.controller.js` for these case.

2. In `routes/citizen.route.js`, create a controller named `visitingLogController` that requires the previous file created.

#### Record a Visiting Log

1. In `visiting_log.controller.js`, create a property named `create` that will create a new visiting log of a citizen to an establishment, including his/her health status. The input should be:

```
{
    citizen_ID: '[user_ID of the citizen]',
    establishment_ID: '[establishment_ID of the establishment]',
    temperature: '',
    health_status_log_ID: '[health_status_log_ID of the citizen]',
    purpose: ''
}
```

2. In `routes/citizen.route.js`, include the property using `visitingLogController` with appropriate HTTP Method and path `/add_visiting_log`

3. Test it. The output should be this:

```
{
    visiting_log_ID: ''
    establishment_ID: '[establishment_ID of the establishment]',
    temperature: '',
    purpose: '',
    created_datetime: '',
    establishment: {
        name: '',
        type: '',
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
    health_status: {
        temperature: '',
        fever: '',
        dry_cough: '',
        sore_throat: '',
        breath_shortness: '',
        smell_taste_loss: '',
        fatigue: '',
        aches_pain: '',
        runny_nose: '',
        diarrhea: '',
        headache: ''
    }
}
```

#### Get all visiting logs

 1. In `controllers/citizen/visiting_log.controller.js`, create a propoerty named `all_visiting_logs` that will return all visiting logs of the logged-in citizen. So you should take the ID of the citizen from the token and return only his/her visiting logs. 

 2. In `routes/citizen.route.js`, include the property using `visitingLogController`  with appropriate HTTP method and path `/visiting_logs`

3. Test it. The output shoud be the same as the previous.

#### Get one visiting log

1. In `controllers/citizen/visiting_log.controller.js`, create a property called `one_visiting_log` that will return a specific visiting log. Take note that you should only return the specific visiting log of the citizen so use the `visiting_log_ID` as parameter in the request body.

2. In `routes/citizen.route.js`, include the property using `visitingLogController` variable with approrpiate HTTP method and path `/visiting_log/:visiting_log_ID`

3. Test it. The output should be the same as previous

### Citizen Information

1. Create a controller named `information.controller.js` in `controllers/citizen` for this case

2. In `routes.controller.js`, create a variable `infoController` that requires the previous file that created

#### Get Information

1. In `controller/citizen/info.controller.js`, create a property called `get_info` that will return the information of the logged-in citizen.

2. In `routes/citizen.route.js`, include the property using the `infoController` with the appropriate HTTP method and path `/info`

3. Test it. The output should be this way: 

```
{
    user_ID: '[user_ID of logged-in citizen]'
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: '',
    sex: '',
    birth_date: '',
    civil_status: ''
}
```

#### Edit/Update Information

2. In `controllers/citizen/info.controller.js`, create a property called `update_info` that updates the existing information of the citizen, any field must can be update

3. In `routes/citizen.route.js`, include the property using the `infoController` with appropriate HTTP Method and path `/edit_info`

4. Test it. The output should be this way: 

```
{
    user_ID: '[user_IDtizen_ID of logged-in citizen]'
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: '',
    sex: '',
    birth_date: '',
    civil_status: ''
}
```

### Account Settings

1. Create a controller named `account.controller.js` in `controllers/citizen`

2. In `routes/citizen.route.js`, create a controller variable named `accountController` with the path of the previous controller

#### Change Password

1. In `controllers/citizen/account.controller.js`, create a property named `update_password` that updates the current password of a citizen.

2. In `routes/citizen.route.js`, include the property using `accountController` with the path `update_password`

3. Test it by login again.