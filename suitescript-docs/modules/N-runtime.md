# N/runtime Module

Use the N/runtime module to access runtime settings for company, script, session, system, user, or version.

## Module Import

```javascript
define(['N/runtime'], function(runtime) {
    // Your code here
});
```

## Supported Script Types

- Client and Server Scripts

## Module Methods

### runtime.getCurrentScript()

Returns the currently executing script.

```javascript
var script = runtime.getCurrentScript();
log.debug('Script ID', script.id);
log.debug('Deployment ID', script.deploymentId);
log.debug('Remaining Usage', script.getRemainingUsage());
```

### runtime.getCurrentSession()

Returns the current session object.

```javascript
var session = runtime.getCurrentSession();
session.set({ name: 'myKey', value: 'myValue' });
var value = session.get({ name: 'myKey' });
```

### runtime.getCurrentUser()

Returns the current user object.

```javascript
var user = runtime.getCurrentUser();
log.debug('User ID', user.id);
log.debug('User Role', user.role);
log.debug('User Email', user.email);
log.debug('User Name', user.name);
log.debug('Subsidiary', user.subsidiary);
log.debug('Department', user.department);
log.debug('Location', user.location);
```

## Script Object Properties

| Property | Type | Description |
|----------|------|-------------|
| id | string | Script ID |
| deploymentId | string | Deployment ID |
| bundleIds | string[] | Bundle IDs |
| percentComplete | number | Completion percentage |

### getRemainingUsage()

Returns remaining governance units.

```javascript
var remaining = script.getRemainingUsage();
if (remaining < 100) {
    // Yield or stop processing
}
```

### getParameter(options)

Gets a script parameter value.

```javascript
var paramValue = script.getParameter({
    name: 'custscript_my_param'
});
```

## User Object Properties

| Property | Type | Description |
|----------|------|-------------|
| id | number | User internal ID |
| name | string | User name |
| email | string | User email |
| role | number | Role internal ID |
| roleId | string | Role script ID |
| roleCenter | string | Role center type |
| department | number | Department ID |
| location | number | Location ID |
| subsidiary | number | Subsidiary ID |

## runtime Enums

### runtime.EnvType

```javascript
runtime.EnvType.SANDBOX
runtime.EnvType.PRODUCTION
runtime.EnvType.BETA
runtime.EnvType.INTERNAL
```

### runtime.ContextType

```javascript
runtime.ContextType.USER_INTERFACE
runtime.ContextType.WEBSERVICES
runtime.ContextType.WEBSTORE
runtime.ContextType.SCHEDULED
runtime.ContextType.MAP_REDUCE
runtime.ContextType.SUITELET
runtime.ContextType.RESTLET
```

## Example: Check Environment

```javascript
var envType = runtime.envType;
if (envType === runtime.EnvType.PRODUCTION) {
    // Production-specific logic
} else {
    // Sandbox/testing logic
}
```

## Related Documentation

- [Official N/runtime Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4296359529.html)
