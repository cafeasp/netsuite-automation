# N/log Module

## Overview

The `N/log` module provides methods for logging messages during script execution in NetSuite. Log entries are written to the Script Execution Log and can be viewed in the NetSuite UI under Customization > Scripting > Script Execution Log. This module is essential for debugging, monitoring, and auditing script behavior.

## Module Import

```javascript
define(['N/log'], function(log) {
    // Your code here
});
```

**SuiteScript 2.1:**
```javascript
import log from 'N/log';
```

## Supported Script Types

| Script Type | Supported |
|-------------|-----------|
| Client Script | Yes |
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

### log.debug(options)

Logs a message at the DEBUG level. Use for detailed diagnostic information useful during development and troubleshooting.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.title` | string | Yes | Title of the log entry (max 99 characters) |
| `options.details` | any | No | Additional details (string, number, object, array) |

**Alternative signature:**
```javascript
log.debug(title, details)
```

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log'], function(log) {

    function beforeSubmit(context) {
        // Simple debug message
        log.debug('beforeSubmit', 'Script started');

        // Debug with object details
        log.debug({
            title: 'Record Info',
            details: {
                type: context.newRecord.type,
                id: context.newRecord.id,
                mode: context.type
            }
        });

        // Debug with string details
        var fieldValue = context.newRecord.getValue('companyname');
        log.debug('Company Name', fieldValue);

        // Debug array data
        var items = [];
        var lineCount = context.newRecord.getLineCount({ sublistId: 'item' });
        for (var i = 0; i < lineCount; i++) {
            items.push({
                line: i,
                item: context.newRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i
                })
            });
        }
        log.debug('Line Items', JSON.stringify(items));
    }

    return { beforeSubmit: beforeSubmit };
});
```

---

### log.audit(options)

Logs a message at the AUDIT level. Use for recording significant business events, successful operations, and important state changes.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.title` | string | Yes | Title of the log entry |
| `options.details` | any | No | Additional details |

**Alternative signature:**
```javascript
log.audit(title, details)
```

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/runtime'], function(log, runtime) {

    function afterSubmit(context) {
        if (context.type === context.UserEventType.CREATE) {
            // Audit successful record creation
            log.audit({
                title: 'Record Created',
                details: {
                    recordType: context.newRecord.type,
                    recordId: context.newRecord.id,
                    user: runtime.getCurrentUser().name,
                    timestamp: new Date().toISOString()
                }
            });
        }

        if (context.type === context.UserEventType.EDIT) {
            // Track field changes for audit purposes
            var oldValue = context.oldRecord.getValue('status');
            var newValue = context.newRecord.getValue('status');

            if (oldValue !== newValue) {
                log.audit('Status Changed', {
                    from: oldValue,
                    to: newValue,
                    recordId: context.newRecord.id,
                    changedBy: runtime.getCurrentUser().id
                });
            }
        }
    }

    return { afterSubmit: afterSubmit };
});
```

---

### log.error(options)

Logs a message at the ERROR level. Use for recording errors, exceptions, and failure conditions that require attention.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.title` | string | Yes | Title of the log entry |
| `options.details` | any | No | Additional details |

**Alternative signature:**
```javascript
log.error(title, details)
```

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/log', 'N/record', 'N/search'], function(log, record, search) {

    function execute(context) {
        var processedCount = 0;
        var errorCount = 0;

        var orderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [['status', 'anyof', 'SalesOrd:A']],
            columns: ['entity', 'total']
        });

        orderSearch.run().each(function(result) {
            try {
                // Process order
                processOrder(result.id);
                processedCount++;

            } catch (e) {
                errorCount++;

                // Log error with full context
                log.error({
                    title: 'Order Processing Error',
                    details: {
                        orderId: result.id,
                        errorName: e.name,
                        errorMessage: e.message,
                        errorStack: e.stack,
                        customer: result.getValue('entity')
                    }
                });
            }

            return true;
        });

        if (errorCount > 0) {
            log.error('Script Completed with Errors', {
                processed: processedCount,
                errors: errorCount
            });
        }
    }

    function processOrder(orderId) {
        // Order processing logic
    }

    return { execute: execute };
});
```

---

### log.emergency(options)

Logs a message at the EMERGENCY level. Use sparingly for critical system failures or conditions requiring immediate attention.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.title` | string | Yes | Title of the log entry |
| `options.details` | any | No | Additional details |

**Alternative signature:**
```javascript
log.emergency(title, details)
```

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/log', 'N/https', 'N/email', 'N/runtime'], function(log, https, email, runtime) {

    function execute(context) {
        try {
            // Critical integration check
            var response = https.get({
                url: 'https://api.critical-service.com/health'
            });

            if (response.code !== 200) {
                // System is down - emergency level
                log.emergency({
                    title: 'CRITICAL: Integration Service Down',
                    details: {
                        service: 'critical-service',
                        responseCode: response.code,
                        responseBody: response.body,
                        timestamp: new Date().toISOString(),
                        impact: 'All order processing halted'
                    }
                });

                // Send emergency notification
                notifyAdministrators();
            }

        } catch (e) {
            log.emergency('CRITICAL: Health Check Failed', {
                error: e.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    function notifyAdministrators() {
        // Emergency notification logic
    }

    return { execute: execute };
});
```

---

## Log Levels

NetSuite supports four log levels, listed from most to least verbose:

| Level | Method | Use Case | Color in UI |
|-------|--------|----------|-------------|
| DEBUG | `log.debug()` | Detailed diagnostic info | Gray |
| AUDIT | `log.audit()` | Business events, successful operations | Blue |
| ERROR | `log.error()` | Errors and failures | Red |
| EMERGENCY | `log.emergency()` | Critical system failures | Red (highlighted) |

### Log Level Filtering

In the Script Deployment, you can set the **Log Level** parameter to filter which messages are recorded:

- **DEBUG**: All levels logged (DEBUG, AUDIT, ERROR, EMERGENCY)
- **AUDIT**: AUDIT, ERROR, EMERGENCY logged
- **ERROR**: ERROR, EMERGENCY logged
- **EMERGENCY**: Only EMERGENCY logged

---

## Complete Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/record', 'N/search', 'N/runtime', 'N/email'],
function(log, record, search, runtime, email) {

    function getInputData() {
        log.audit('Map/Reduce Started', {
            scriptId: runtime.getCurrentScript().id,
            deploymentId: runtime.getCurrentScript().deploymentId,
            timestamp: new Date().toISOString()
        });

        return search.create({
            type: search.Type.CUSTOMER,
            filters: [
                ['isinactive', 'is', 'F'],
                'AND',
                ['custentity_needs_sync', 'is', 'T']
            ],
            columns: ['companyname', 'email', 'phone']
        });
    }

    function map(context) {
        var searchResult = JSON.parse(context.value);

        log.debug('Processing Customer', {
            id: searchResult.id,
            name: searchResult.values.companyname
        });

        try {
            // Validate data
            if (!searchResult.values.email) {
                log.debug('Skipping Customer', 'No email address: ' + searchResult.id);
                return;
            }

            context.write({
                key: searchResult.id,
                value: searchResult.values
            });

        } catch (e) {
            log.error('Map Error', {
                customerId: searchResult.id,
                error: e.message
            });
        }
    }

    function reduce(context) {
        var customerId = context.key;

        log.debug('Reduce Processing', 'Customer ID: ' + customerId);

        try {
            // Perform sync operation
            var success = syncCustomer(customerId);

            if (success) {
                // Mark as synced
                record.submitFields({
                    type: record.Type.CUSTOMER,
                    id: customerId,
                    values: {
                        'custentity_needs_sync': false,
                        'custentity_last_sync_date': new Date()
                    }
                });

                log.audit('Customer Synced', customerId);
            }

        } catch (e) {
            log.error('Reduce Error', {
                customerId: customerId,
                error: e.message,
                stack: e.stack
            });

            // Re-throw to mark as failed in summary
            throw e;
        }
    }

    function summarize(summary) {
        // Log overall statistics
        log.audit('Map/Reduce Summary', {
            totalInputs: summary.inputSummary.totalRecords,
            mapErrors: summary.mapSummary.errors.length,
            reduceErrors: summary.reduceSummary.errors.length
        });

        // Log timing information
        log.debug('Execution Times', {
            total: summary.seconds + ' seconds',
            mapTime: summary.mapSummary.seconds + ' seconds',
            reduceTime: summary.reduceSummary.seconds + ' seconds'
        });

        // Log governance usage
        log.debug('Governance Usage', {
            unitsUsed: summary.usage,
            concurrency: summary.concurrency,
            yields: summary.yields
        });

        // Handle errors
        var errorCount = 0;

        summary.mapSummary.errors.iterator().each(function(key, error) {
            log.error('Map Error Summary', {
                key: key,
                error: error
            });
            errorCount++;
            return true;
        });

        summary.reduceSummary.errors.iterator().each(function(key, error) {
            log.error('Reduce Error Summary', {
                key: key,
                error: error
            });
            errorCount++;
            return true;
        });

        // Send completion notification
        if (errorCount > 0) {
            log.error('Script Completed with Errors', {
                totalErrors: errorCount,
                timestamp: new Date().toISOString()
            });

            notifyAdmin(summary, errorCount);
        } else {
            log.audit('Script Completed Successfully', {
                processed: summary.inputSummary.totalRecords,
                timestamp: new Date().toISOString()
            });
        }
    }

    function syncCustomer(customerId) {
        // Sync logic here
        return true;
    }

    function notifyAdmin(summary, errorCount) {
        email.send({
            author: -5,
            recipients: ['admin@company.com'],
            subject: 'Customer Sync Completed with Errors',
            body: 'The customer sync script completed with ' + errorCount + ' errors. ' +
                  'Please review the Script Execution Log for details.'
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
```

---

## Best Practices

1. **Use Appropriate Log Levels**: Choose the right level for each message.
   - DEBUG: Development and detailed diagnostics
   - AUDIT: Business events and successful operations
   - ERROR: Failures and exceptions
   - EMERGENCY: Critical system failures only

2. **Include Contextual Information**: Always provide enough context to understand the log entry.

   ```javascript
   // Good - includes context
   log.error('Order Processing Failed', {
       orderId: orderId,
       customerId: customerId,
       errorMessage: e.message,
       step: 'payment_validation'
   });

   // Bad - lacks context
   log.error('Error', e.message);
   ```

3. **Avoid Logging Sensitive Data**: Never log passwords, credit card numbers, or other sensitive information.

   ```javascript
   // Bad - logs sensitive data
   log.debug('User Login', { password: userPassword });

   // Good - masks sensitive data
   log.debug('User Login', { username: username, authenticated: true });
   ```

4. **Use Structured Logging**: Pass objects for details to enable easier searching and filtering.

   ```javascript
   log.audit('Transaction Completed', {
       transactionId: txnId,
       amount: amount,
       currency: 'USD',
       customer: customerId
   });
   ```

5. **Set Log Level in Deployments**: Use AUDIT or ERROR level in production to reduce noise and governance impact.

6. **Handle Object Stringification**: For complex objects, explicitly stringify to ensure proper logging.

   ```javascript
   log.debug('Complex Object', JSON.stringify(complexObject, null, 2));
   ```

7. **Log Entry and Exit Points**: For complex operations, log when functions start and complete.

   ```javascript
   function processOrder(orderId) {
       log.debug('processOrder Start', orderId);

       // Processing logic...

       log.debug('processOrder Complete', { orderId: orderId, success: true });
   }
   ```

8. **Limit Log Volume**: Avoid logging inside tight loops; aggregate information instead.

   ```javascript
   // Bad - logs every iteration
   for (var i = 0; i < 1000; i++) {
       log.debug('Processing item', i);
   }

   // Good - aggregated logging
   var processedCount = 0;
   for (var i = 0; i < 1000; i++) {
       processedCount++;
   }
   log.debug('Items Processed', processedCount);
   ```

---

## Governance

| Method | Governance Units |
|--------|-----------------|
| `log.debug()` | 0 units |
| `log.audit()` | 0 units |
| `log.error()` | 0 units |
| `log.emergency()` | 0 units |

**Note**: While logging has no direct governance cost, excessive logging can impact script performance and fill up the execution log.

---

## Limitations

- **Title Length**: Maximum 99 characters
- **Details Length**: Maximum 3,999 characters (longer content is truncated)
- **Log Retention**: Execution logs are retained for a limited period (typically 30 days)
- **Rate Limiting**: Excessive logging may be throttled in some scenarios

---

## Viewing Logs

1. Navigate to **Customization > Scripting > Script Execution Log**
2. Filter by:
   - Script
   - Deployment
   - Date range
   - Log level
   - User
3. Use the search functionality to find specific log entries

---

## Related Modules

- [N/runtime](./N-runtime.md) - For getting script and user context
- [N/error](./N-error.md) - For creating and handling errors
- [N/email](./N-email.md) - For sending alert notifications
