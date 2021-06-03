# Helpers

Helpers are used because of 3 reasons:

1. Eliminates repetitive block of codes
2. It makes the code shorter, thus faster coding process
3. Consistency and better error handlings

## Controller Helpers

This are helpers made for controllers. To use it, just import this in your controllers

```
const helper = require('../../helpers/controller.helper')
```

### Methods

#### `.checkAuthorization(req, res, userTypes)`

This method is used to check the authorization of user. It return authorized response if invalid.

The old way:

```
// Check if user is not logged in or logged in but not citizen
if(req.user == null || req.user.user_type !== 'Citizen') {

    // Send unauthorized response
    res.sendStatus(401);
} else {

    // Some db methods ...

}
```

Using Helper:

```
// Check authorization first
helper.checkAuthorization(req, res, 'Citizen');

// Some db methods ...

```

#### `.errResponse(res, err)`

This method is used to send error (500 Internal Server Error) response. This is used in `.catch()` promise

The old way:

```
db.Users
    .findAll()
    .then(() => {

        // Some block of code ...
    
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            message: `${err}`
        })
    });

```

Using helper:

```
db.Users
    .findAll()
    .then(() => {

        // Some block of code ...
    
    })
    .catch((err) => helper.errResponse(res, err));
```

#### `.dataResponse(res, data, withDataMessage, nullDataMessage)`

This method is used to return an OK (200) response and will include data with message given in `withDataMessage` if has data, but not include data with message given in `nullDataMessage` if no data

The old way:

```
db.Users
    .findAll()
    .then((data) => {
        if(data) {
            res.send({
                error: false,
                data: data,
                message: 'Users retrieved successfully'
            });
        } else {
            res.send({
                error: false,
                data: data,
                message: 'No users has been identified'
            });
        }
    })
```

Using helper

```
db.Users
    .findAll()
    .then((data) => helper.dataResponse(res, data, 'Users retrieved successfully', 'No users has been identified'))
```

#### `.errResponse(res, errMessage)`

There will be instance that you have to check only if there is no data then return an error response. 

The old way:

```
db.Establishments
    .findByPk(req.params.establishment_ID)
    .then((result) => {
        if(result) {

            // Update method ...
        
        } else {
            res.send({
                error: true,
                message: 'No establishment has been identified'
            })
        }
    })
```

Using helper:

```
db.Establishments
    .findByPk(req.params.establishment_ID)
    .then((result) => {

        // Check if no result then return error response
        if(result == null) helper.errResponse(res, 'No establishment has been identified');

        // Update method
    })
```

For more examples related to methods of controller helpers. Please go to this files

- `controllers/representative/establishment.controller.js`
- `controllers/super_admin/admin.controller.js`
- `controllers/super_admin/vaccine.controller.js`