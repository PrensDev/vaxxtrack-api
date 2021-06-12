# Controller Tasks

<!-- Reperesentative Use Cases -->

## Reperesentative Use Cases

### Note for all assignees
> - Representative must login in first and use the token must in order to perform the use cases below.
> - You do not need to include the `citizen.route.js` since it is already declared in `app.js`
> - If some steps are already done, just skip it.
> - PLEASE. INCLUDE ERROR HANDLINGS. 

### Visiting Log

1. In  `controllers/representative`, create a controller named `visiting_log.controller.js` for these case.

2. In `routes/representative.route.js`, create a controller named `visitingLogController` that requires the previous file created.

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

2. In `routes/representative.route.js`, include the property using `visitingLogController` with appropriate HTTP Method and path `/add_visiting_log`

3. Test it. The output should be this:

```
{
    establishment_ID: '[establishment_ID of the establishment]',
    temperature: '',
    purpose: '',
    citizen: {
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix_name: '',
        sex: '',
        birth_date: '',
        civil_status: '',
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
        },
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
}
```

#### Get all visiting log of an establishment

1. In `visiting_log.controller.js`, create a property `all_visiting_logs` that will output all visiting logs in an establishment. Take note that you must not display all records of visiting logs but only of specific establishment. So `establishment_ID` must be throwned as parameter.

> Hint: Use the `where clause`

2. In `representative.route.js`, include the property using `visitingLogController` with appropriate HTTP Method and path `visiting_logs/:establishment_ID`. Take note that the establishment_ID should be from establishment that represents by logged-in representative, else should throw authorize messsage.

3. Test it. The output should be this way:

```
{
    visiting_log_ID: '',
    citizen_ID: '',
    health_status_log_ID: '',
    temperature: '',
    purpose: '',
    created_datetime: '',
    updated_datetime: '',
    citizen: {
        first_name: '',
        middle_name: '',
        last_name: ''
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

> Take note that the health status should be the today's log.

#### Get one visiting log in an establishment

1. In `visiting_log.controller.js`, create a property called `one_visiting_log` that will output a specific visiting log in a specific establishment. So you must use only `establishment_ID` and `visiting_log_ID` as parameter to the request body.

2. In `routes/representative.route.js`, include the propoerty using `visitingLogController` with appropriate HTTP method and path `/visiting_logs/:establishment_ID/:visiting_log_ID`

3. Test it. The output should be the same as previous, but only specific visiting log.

### Representative Information

#### Get Information

1. In `controller/representative/info.controller.js`, create a property called `get_info` that will return the information of the logged-in citizen.

2. In `routes/representative.route.js`, include the property using the `infoController` with the appropriate HTTP method and path `/info`

3. Test it. The output should be this way: 

```
{
    user_ID: '[citizen_ID of logged-in representative]'
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: ''
}
```

#### Edit/Update Information

2. In `controllers/representative/info.controller.js`, create a property called `update_info` that updates the existing information of the representative, any field must can be update

3. In `routes/representative.route.js`, include the property using the `infoController` with appropriate HTTP Method and path `/update_info`

4. Test it. The output should be this way: 

```
{
    user_ID: '[user_ID of logged-in representative]'
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix_name: ''
}
```

### Account Settings

1. Create a controller named `account.controller.js` in `controllers/representative`

2. In `routes/citizen.route.js`, create a controller variable named `accountController` with the path of the previous controller

#### Change/Update Password

1. In `controllers/citizen/account.controller.js`, create a property named `update_password` that updates the current password of logged-in representative.

2. In `routes/representative.route.js`, include the property using `accountController` with the path `update_password`

3. Test it by login again.