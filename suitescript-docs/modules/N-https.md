# N/https Module

Use the N/https module to make HTTPS calls to external web services.

## Module Import

```javascript
define(['N/https'], function(https) {
    // Your code here
});
```

## Supported Script Types

- Client and Server Scripts

## Module Methods

### https.get(options)

Sends an HTTP GET request.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| url | string | Yes | Target URL |
| headers | Object | No | Request headers |

```javascript
var response = https.get({
    url: 'https://api.example.com/data',
    headers: {
        'Authorization': 'Bearer token123',
        'Content-Type': 'application/json'
    }
});

log.debug('Response Code', response.code);
log.debug('Response Body', response.body);
```

### https.post(options)

Sends an HTTP POST request.

```javascript
var response = https.post({
    url: 'https://api.example.com/create',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Test',
        value: 123
    })
});
```

### https.put(options)

Sends an HTTP PUT request.

```javascript
var response = https.put({
    url: 'https://api.example.com/update/123',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Updated' })
});
```

### https.delete(options)

Sends an HTTP DELETE request.

```javascript
var response = https.delete({
    url: 'https://api.example.com/delete/123'
});
```

### https.request(options)

Sends a custom HTTP request.

```javascript
var response = https.request({
    method: https.Method.PATCH,
    url: 'https://api.example.com/patch/123',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ field: 'value' })
});
```

## Response Object Properties

| Property | Type | Description |
|----------|------|-------------|
| body | string | Response body |
| code | number | HTTP status code |
| headers | Object | Response headers |

## https.Method Enum

```javascript
https.Method.GET
https.Method.POST
https.Method.PUT
https.Method.DELETE
https.Method.HEAD
https.Method.PATCH
```

## Promise Methods (SuiteScript 2.1)

```javascript
https.get.promise({
    url: 'https://api.example.com/data'
}).then(function(response) {
    log.debug('Success', response.body);
}).catch(function(error) {
    log.error('Failed', error);
});
```

## Related Documentation

- [Official N/https Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4418229131.html)
