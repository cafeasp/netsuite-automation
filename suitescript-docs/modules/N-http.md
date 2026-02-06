# N/http Module

## Overview

The `N/http` module provides methods for making HTTP requests to external services from SuiteScript. This module enables integration with third-party APIs and web services using standard HTTP methods (GET, POST, PUT, DELETE). For secure HTTPS connections, use the `N/https` module instead.

**Note**: This module is for server-side scripts only. For client-side HTTP requests, consider using the `N/https` module in client scripts where supported.

## Module Import

```javascript
define(['N/http'], function(http) {
    // Your code here
});
```

**SuiteScript 2.1:**
```javascript
import http from 'N/http';
```

## Supported Script Types

| Script Type | Supported |
|-------------|-----------|
| Client Script | No |
| User Event Script | Yes |
| Scheduled Script | Yes |
| Map/Reduce Script | Yes |
| Suitelet | Yes |
| RESTlet | Yes |
| Workflow Action Script | Yes |
| Portlet Script | Yes |
| Bundle Installation Script | Yes |
| Mass Update Script | Yes |

## Methods

### http.get(options)

Sends an HTTP GET request to the specified URL.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.url` | string | Yes | The URL to request |
| `options.headers` | Object | No | Request headers as key-value pairs |

#### Returns

`http.ClientResponse` - The response object containing status code, headers, and body.

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/http', 'N/log'], function(http, log) {

    function execute(context) {
        try {
            var response = http.get({
                url: 'http://api.example.com/data',
                headers: {
                    'Accept': 'application/json',
                    'X-API-Key': 'your-api-key'
                }
            });

            log.debug('Response Code', response.code);
            log.debug('Response Headers', JSON.stringify(response.headers));
            log.debug('Response Body', response.body);

            if (response.code === 200) {
                var data = JSON.parse(response.body);
                // Process the data
            }

        } catch (e) {
            log.error('HTTP GET Error', e.message);
        }
    }

    return { execute: execute };
});
```

---

### http.post(options)

Sends an HTTP POST request to the specified URL with a request body.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.url` | string | Yes | The URL to request |
| `options.body` | string | Object | Yes | The request body (string or object) |
| `options.headers` | Object | No | Request headers as key-value pairs |

#### Returns

`http.ClientResponse` - The response object.

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http', 'N/log'], function(http, log) {

    function onRequest(context) {
        // POST JSON data
        var payload = {
            name: 'John Doe',
            email: 'john@example.com',
            orderId: 12345
        };

        var response = http.post({
            url: 'http://api.example.com/orders',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer your-token'
            }
        });

        log.debug('POST Response', {
            code: response.code,
            body: response.body
        });

        if (response.code === 201) {
            context.response.write('Order created successfully');
        } else {
            context.response.write('Error: ' + response.body);
        }
    }

    return { onRequest: onRequest };
});
```

---

### http.put(options)

Sends an HTTP PUT request to the specified URL.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.url` | string | Yes | The URL to request |
| `options.body` | string | Object | Yes | The request body |
| `options.headers` | Object | No | Request headers as key-value pairs |

#### Returns

`http.ClientResponse` - The response object.

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/http', 'N/log'], function(http, log) {

    function afterSubmit(context) {
        if (context.type !== context.UserEventType.EDIT) {
            return;
        }

        var record = context.newRecord;

        // Update external system
        var updateData = {
            id: record.getValue('externalid'),
            name: record.getValue('companyname'),
            phone: record.getValue('phone'),
            lastModified: new Date().toISOString()
        };

        var response = http.put({
            url: 'http://api.example.com/customers/' + updateData.id,
            body: JSON.stringify(updateData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.code === 200) {
            log.audit('External Update', 'Customer synced successfully');
        } else {
            log.error('External Update Failed', response.body);
        }
    }

    return { afterSubmit: afterSubmit };
});
```

---

### http.delete(options)

Sends an HTTP DELETE request to the specified URL.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.url` | string | Yes | The URL to request |
| `options.headers` | Object | No | Request headers as key-value pairs |

#### Returns

`http.ClientResponse` - The response object.

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/http', 'N/log'], function(http, log) {

    function afterSubmit(context) {
        if (context.type !== context.UserEventType.DELETE) {
            return;
        }

        var externalId = context.oldRecord.getValue('externalid');

        if (externalId) {
            var response = http.delete({
                url: 'http://api.example.com/resources/' + externalId,
                headers: {
                    'Authorization': 'Bearer your-token'
                }
            });

            if (response.code === 204 || response.code === 200) {
                log.audit('External Delete', 'Resource deleted from external system');
            } else {
                log.error('External Delete Failed', {
                    code: response.code,
                    body: response.body
                });
            }
        }
    }

    return { afterSubmit: afterSubmit };
});
```

---

### http.request(options)

Sends an HTTP request with a custom method. Use this for methods not covered by get, post, put, or delete.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.method` | string | Yes | HTTP method from `http.Method` enum |
| `options.url` | string | Yes | The URL to request |
| `options.body` | string | Object | No | The request body (for methods that support it) |
| `options.headers` | Object | No | Request headers as key-value pairs |

#### Returns

`http.ClientResponse` - The response object.

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http', 'N/log'], function(http, log) {

    function onRequest(context) {
        // PATCH request example
        var patchData = {
            status: 'active',
            lastUpdated: new Date().toISOString()
        };

        var response = http.request({
            method: http.Method.PATCH,
            url: 'http://api.example.com/items/12345',
            body: JSON.stringify(patchData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        log.debug('PATCH Response', response.code);

        // HEAD request example
        var headResponse = http.request({
            method: http.Method.HEAD,
            url: 'http://api.example.com/files/document.pdf'
        });

        var contentLength = headResponse.headers['Content-Length'];
        log.debug('File Size', contentLength + ' bytes');
    }

    return { onRequest: onRequest };
});
```

---

## ClientResponse Object

The response object returned by all HTTP methods.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `code` | number | HTTP status code (e.g., 200, 404, 500) |
| `headers` | Object | Response headers as key-value pairs |
| `body` | string | Response body as a string |

### Example

```javascript
var response = http.get({ url: 'http://api.example.com/data' });

// Access response properties
var statusCode = response.code;        // e.g., 200
var contentType = response.headers['Content-Type']; // e.g., "application/json"
var responseBody = response.body;      // Response content as string

// Parse JSON response
if (contentType && contentType.indexOf('application/json') !== -1) {
    var jsonData = JSON.parse(response.body);
}
```

---

## Enums

### http.Method

HTTP request methods for use with `http.request()`.

| Value | Description |
|-------|-------------|
| `DELETE` | HTTP DELETE method |
| `GET` | HTTP GET method |
| `HEAD` | HTTP HEAD method |
| `PATCH` | HTTP PATCH method |
| `POST` | HTTP POST method |
| `PUT` | HTTP PUT method |

#### Example

```javascript
define(['N/http'], function(http) {

    var response = http.request({
        method: http.Method.PATCH,
        url: 'http://api.example.com/resource/123',
        body: JSON.stringify({ field: 'value' }),
        headers: { 'Content-Type': 'application/json' }
    });
});
```

---

### http.CacheDuration

Cache duration options for `http.get.promise()` (asynchronous operations).

| Value | Description |
|-------|-------------|
| `LONG` | Long cache duration |
| `MEDIUM` | Medium cache duration |
| `SHORT` | Short cache duration |
| `UNIQUE` | No caching (unique request each time) |

---

## Complete Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/http', 'N/log', 'N/record', 'N/search'], function(http, log, record, search) {

    var API_BASE_URL = 'http://api.inventory-service.com';
    var API_KEY = 'your-api-key';

    function execute(context) {
        log.audit('Script Start', 'Beginning inventory sync');

        // Get items to sync
        var itemSearch = search.create({
            type: search.Type.INVENTORY_ITEM,
            filters: [
                ['isinactive', 'is', 'F'],
                'AND',
                ['custitem_sync_required', 'is', 'T']
            ],
            columns: ['itemid', 'displayname', 'custitem_external_id', 'quantityavailable']
        });

        var syncCount = 0;
        var errorCount = 0;

        itemSearch.run().each(function(result) {
            var itemId = result.id;
            var externalId = result.getValue('custitem_external_id');
            var quantity = result.getValue('quantityavailable') || 0;

            try {
                var success;

                if (externalId) {
                    // Update existing external record
                    success = updateExternalInventory(externalId, {
                        sku: result.getValue('itemid'),
                        name: result.getValue('displayname'),
                        quantity: parseInt(quantity)
                    });
                } else {
                    // Create new external record
                    var newExternalId = createExternalInventory({
                        sku: result.getValue('itemid'),
                        name: result.getValue('displayname'),
                        quantity: parseInt(quantity)
                    });

                    if (newExternalId) {
                        // Save external ID back to NetSuite
                        record.submitFields({
                            type: record.Type.INVENTORY_ITEM,
                            id: itemId,
                            values: {
                                'custitem_external_id': newExternalId
                            }
                        });
                        success = true;
                    }
                }

                if (success) {
                    // Mark as synced
                    record.submitFields({
                        type: record.Type.INVENTORY_ITEM,
                        id: itemId,
                        values: {
                            'custitem_sync_required': false,
                            'custitem_last_sync': new Date()
                        }
                    });
                    syncCount++;
                }

            } catch (e) {
                log.error('Sync Error', {
                    itemId: itemId,
                    error: e.message
                });
                errorCount++;
            }

            return true; // Continue iteration
        });

        log.audit('Script Complete', {
            synced: syncCount,
            errors: errorCount
        });
    }

    function createExternalInventory(itemData) {
        var response = http.post({
            url: API_BASE_URL + '/inventory',
            body: JSON.stringify(itemData),
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
            }
        });

        if (response.code === 201) {
            var responseData = JSON.parse(response.body);
            return responseData.id;
        } else {
            log.error('Create Failed', {
                code: response.code,
                body: response.body
            });
            return null;
        }
    }

    function updateExternalInventory(externalId, itemData) {
        var response = http.put({
            url: API_BASE_URL + '/inventory/' + externalId,
            body: JSON.stringify(itemData),
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
            }
        });

        if (response.code === 200) {
            return true;
        } else {
            log.error('Update Failed', {
                externalId: externalId,
                code: response.code,
                body: response.body
            });
            return false;
        }
    }

    return { execute: execute };
});
```

---

## Best Practices

1. **Use HTTPS When Possible**: For production integrations, always use the `N/https` module instead of `N/http` for secure communications.

2. **Handle Errors Gracefully**: Always wrap HTTP calls in try-catch blocks and handle various response codes appropriately.

   ```javascript
   try {
       var response = http.get({ url: url });

       if (response.code >= 200 && response.code < 300) {
           // Success
       } else if (response.code === 401) {
           log.error('Authentication Failed', 'Check API credentials');
       } else if (response.code === 429) {
           log.warning('Rate Limited', 'Retry after delay');
       } else {
           log.error('HTTP Error', 'Code: ' + response.code);
       }
   } catch (e) {
       log.error('Request Failed', e.message);
   }
   ```

3. **Set Appropriate Headers**: Always include proper Content-Type and Accept headers for API compatibility.

4. **Parse JSON Safely**: Wrap JSON.parse() in try-catch to handle malformed responses.

   ```javascript
   var data;
   try {
       data = JSON.parse(response.body);
   } catch (e) {
       log.error('JSON Parse Error', response.body);
   }
   ```

5. **Implement Retry Logic**: For transient failures, implement exponential backoff retry logic.

6. **Log Requests and Responses**: Log HTTP interactions for debugging, but be careful not to log sensitive data.

7. **URL Encoding**: Use `encodeURIComponent()` for query parameters to ensure proper URL encoding.

   ```javascript
   var searchTerm = encodeURIComponent('hello world');
   var url = 'http://api.example.com/search?q=' + searchTerm;
   ```

8. **Timeout Awareness**: Be aware that HTTP requests have built-in timeouts. Long-running requests may fail.

---

## Governance

| Method | Governance Units |
|--------|-----------------|
| `http.get()` | 10 units |
| `http.post()` | 10 units |
| `http.put()` | 10 units |
| `http.delete()` | 10 units |
| `http.request()` | 10 units |

---

## Limitations

- Maximum response size: 10 MB
- Request timeout: 30 seconds (may vary)
- Not available in Client Scripts
- HTTP (non-secure) requests may be blocked in some environments

---

## Related Modules

- [N/https](./N-https.md) - For secure HTTPS requests with SSL/TLS
- [N/url](./N-url.md) - For URL construction and manipulation
- [N/log](./N-log.md) - For logging HTTP operations
