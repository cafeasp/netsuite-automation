# N/error Module

## Overview

The `N/error` module enables you to create and throw custom errors in SuiteScript. Custom errors provide meaningful error messages to users, enable better error handling, and help with debugging. This module is essential for implementing robust error handling strategies in your scripts.

## Module Import

```javascript
// SuiteScript 2.0
define(['N/error'], function(error) {
    // Your code here
});

// SuiteScript 2.1
import error from 'N/error';
```

## Supported Script Types

| Script Type | Supported |
|-------------|-----------|
| Client Script | Yes |
| User Event Script | Yes |
| Scheduled Script | Yes |
| Map/Reduce Script | Yes |
| RESTlet | Yes |
| Suitelet | Yes |
| Workflow Action Script | Yes |
| Portlet Script | Yes |
| Bundle Installation Script | Yes |
| Mass Update Script | Yes |

## Methods

### error.create(options)

Creates a custom error object that can be thrown to halt script execution and display an error message.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.name | string | Yes | The error name/code (appears in error logs) |
| options.message | string | Yes | The error message (displayed to users) |
| options.notifyOff | boolean | No | If true, suppresses email notifications (default: false) |
| options.cause | Error | No | The underlying error that caused this error |

**Returns:** `error.SuiteScriptError` - A custom error object

**Governance:** None

#### Basic Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/error'], function(error) {

    function beforeSubmit(context) {
        var record = context.newRecord;
        var quantity = record.getValue({ fieldId: 'quantity' });

        if (quantity <= 0) {
            throw error.create({
                name: 'INVALID_QUANTITY',
                message: 'Quantity must be greater than zero.',
                notifyOff: false
            });
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
```

#### Error with Cause

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/error', 'N/https'], function(error, https) {

    function execute(context) {
        try {
            var response = https.get({
                url: 'https://api.example.com/data'
            });

            if (response.code !== 200) {
                throw error.create({
                    name: 'API_ERROR',
                    message: 'Failed to fetch data from external API. Status: ' + response.code
                });
            }

        } catch (e) {
            // Wrap the original error with additional context
            throw error.create({
                name: 'DATA_SYNC_FAILED',
                message: 'Unable to synchronize data with external system.',
                cause: e
            });
        }
    }

    return {
        execute: execute
    };
});
```

#### Suppressing Email Notifications

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/error'], function(error) {

    function beforeSubmit(context) {
        var record = context.newRecord;
        var status = record.getValue({ fieldId: 'custbody_status' });

        // Validation error - no need to notify admins
        if (status === 'INVALID') {
            throw error.create({
                name: 'VALIDATION_ERROR',
                message: 'The selected status is not valid for this transaction.',
                notifyOff: true // Don't send error notification emails
            });
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
```

## Error Object Properties

The error object returned by `error.create()` has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier for the error instance |
| name | string | The error name/code |
| message | string | The error message |
| cause | Error | The underlying cause (if provided) |
| stack | string | Stack trace information |

#### Accessing Error Properties

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/error'], function(error) {

    function onRequest(context) {
        try {
            processData();
        } catch (e) {
            log.error({
                title: 'Error Caught',
                details: {
                    id: e.id,
                    name: e.name,
                    message: e.message,
                    stack: e.stack,
                    cause: e.cause ? e.cause.message : 'N/A'
                }
            });

            context.response.write('Error: ' + e.message);
        }
    }

    function processData() {
        throw error.create({
            name: 'PROCESSING_ERROR',
            message: 'Failed to process data'
        });
    }

    return {
        onRequest: onRequest
    };
});
```

## SuiteScript Error Types

NetSuite has built-in error types that you may encounter:

| Error Type | Description |
|------------|-------------|
| error.SuiteScriptError | Custom errors created with error.create() |
| error.UserEventError | Errors specific to User Event scripts |
| SSS_MISSING_REQD_ARGUMENT | Required argument not provided |
| SSS_INVALID_RECORD_TYPE | Invalid record type specified |
| RCRD_DSNT_EXIST | Record does not exist |
| INSUFFICIENT_PERMISSION | User lacks required permission |
| UNEXPECTED_ERROR | Unexpected system error |

## Use Cases

### Form Validation

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/error', 'N/search'], function(error, search) {

    function beforeSubmit(context) {
        var newRecord = context.newRecord;

        // Validate required custom fields
        validateRequiredFields(newRecord);

        // Validate business rules
        validateBusinessRules(newRecord);

        // Validate against existing records
        validateDuplicates(newRecord);
    }

    function validateRequiredFields(record) {
        var requiredFields = [
            { id: 'custbody_project_code', label: 'Project Code' },
            { id: 'custbody_approval_date', label: 'Approval Date' }
        ];

        var missingFields = [];

        requiredFields.forEach(function(field) {
            var value = record.getValue({ fieldId: field.id });
            if (!value) {
                missingFields.push(field.label);
            }
        });

        if (missingFields.length > 0) {
            throw error.create({
                name: 'MISSING_REQUIRED_FIELDS',
                message: 'Please fill in the following required fields: ' + missingFields.join(', '),
                notifyOff: true
            });
        }
    }

    function validateBusinessRules(record) {
        var startDate = record.getValue({ fieldId: 'startdate' });
        var endDate = record.getValue({ fieldId: 'enddate' });

        if (startDate && endDate && startDate > endDate) {
            throw error.create({
                name: 'INVALID_DATE_RANGE',
                message: 'Start Date cannot be after End Date.',
                notifyOff: true
            });
        }
    }

    function validateDuplicates(record) {
        var projectCode = record.getValue({ fieldId: 'custbody_project_code' });
        var recordId = record.id;

        var duplicateSearch = search.create({
            type: record.type,
            filters: [
                ['custbody_project_code', 'is', projectCode],
                'AND',
                ['internalid', 'noneof', recordId || '@NONE@']
            ]
        });

        var resultCount = duplicateSearch.runPaged().count;

        if (resultCount > 0) {
            throw error.create({
                name: 'DUPLICATE_PROJECT_CODE',
                message: 'A record with Project Code "' + projectCode + '" already exists.',
                notifyOff: true
            });
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
```

### RESTlet Error Handling

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType RESTlet
 */
define(['N/error', 'N/record'], function(error, record) {

    function post(requestBody) {
        try {
            validateRequest(requestBody);

            var customerId = createCustomer(requestBody);

            return {
                success: true,
                customerId: customerId
            };

        } catch (e) {
            // Return structured error response
            return {
                success: false,
                error: {
                    code: e.name || 'UNKNOWN_ERROR',
                    message: e.message,
                    details: e.cause ? e.cause.message : null
                }
            };
        }
    }

    function validateRequest(data) {
        if (!data) {
            throw error.create({
                name: 'INVALID_REQUEST',
                message: 'Request body is required.'
            });
        }

        if (!data.companyName) {
            throw error.create({
                name: 'MISSING_COMPANY_NAME',
                message: 'Company name is required.'
            });
        }

        if (!data.email) {
            throw error.create({
                name: 'MISSING_EMAIL',
                message: 'Email address is required.'
            });
        }

        // Validate email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw error.create({
                name: 'INVALID_EMAIL',
                message: 'Please provide a valid email address.'
            });
        }
    }

    function createCustomer(data) {
        try {
            var customerRecord = record.create({
                type: record.Type.CUSTOMER,
                isDynamic: true
            });

            customerRecord.setValue({
                fieldId: 'companyname',
                value: data.companyName
            });

            customerRecord.setValue({
                fieldId: 'email',
                value: data.email
            });

            return customerRecord.save();

        } catch (e) {
            throw error.create({
                name: 'CUSTOMER_CREATION_FAILED',
                message: 'Failed to create customer record.',
                cause: e
            });
        }
    }

    return {
        post: post
    };
});
```

### Map/Reduce Error Handling

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/error', 'N/record', 'N/search'], function(error, record, search) {

    function getInputData() {
        return search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['mainline', 'is', 'T'],
                'AND',
                ['status', 'anyof', 'SalesOrd:B'] // Pending Fulfillment
            ],
            columns: ['internalid', 'tranid', 'entity']
        });
    }

    function map(context) {
        var searchResult = JSON.parse(context.value);
        var orderId = searchResult.id;

        try {
            validateOrderForProcessing(orderId);

            context.write({
                key: orderId,
                value: searchResult
            });

        } catch (e) {
            // Log error but continue processing other records
            log.error({
                title: 'Map Error - Order ' + orderId,
                details: e.message
            });

            // Optionally, write to error queue for later review
            context.write({
                key: 'ERROR_' + orderId,
                value: {
                    orderId: orderId,
                    error: e.name,
                    message: e.message
                }
            });
        }
    }

    function reduce(context) {
        var key = context.key;

        // Skip error entries
        if (key.indexOf('ERROR_') === 0) {
            return;
        }

        var orderId = key;

        try {
            processOrder(orderId);

        } catch (e) {
            log.error({
                title: 'Reduce Error - Order ' + orderId,
                details: {
                    name: e.name,
                    message: e.message,
                    cause: e.cause ? e.cause.message : null
                }
            });
        }
    }

    function summarize(summary) {
        var mapErrors = [];
        var reduceErrors = [];

        summary.mapSummary.errors.iterator().each(function(key, error) {
            mapErrors.push({
                key: key,
                error: error
            });
            return true;
        });

        summary.reduceSummary.errors.iterator().each(function(key, error) {
            reduceErrors.push({
                key: key,
                error: error
            });
            return true;
        });

        if (mapErrors.length > 0 || reduceErrors.length > 0) {
            log.error({
                title: 'Processing Errors',
                details: {
                    mapErrors: mapErrors,
                    reduceErrors: reduceErrors
                }
            });
        }

        log.audit({
            title: 'Processing Complete',
            details: {
                inputKeyCount: summary.inputSummary.keyCount,
                mapErrors: mapErrors.length,
                reduceErrors: reduceErrors.length
            }
        });
    }

    function validateOrderForProcessing(orderId) {
        var orderRecord = record.load({
            type: record.Type.SALES_ORDER,
            id: orderId
        });

        var itemCount = orderRecord.getLineCount({ sublistId: 'item' });
        if (itemCount === 0) {
            throw error.create({
                name: 'NO_ITEMS',
                message: 'Order has no items to process.'
            });
        }

        var total = orderRecord.getValue({ fieldId: 'total' });
        if (total <= 0) {
            throw error.create({
                name: 'INVALID_TOTAL',
                message: 'Order total must be greater than zero.'
            });
        }
    }

    function processOrder(orderId) {
        try {
            record.submitFields({
                type: record.Type.SALES_ORDER,
                id: orderId,
                values: {
                    'custbody_processed': true,
                    'custbody_processed_date': new Date()
                }
            });
        } catch (e) {
            throw error.create({
                name: 'UPDATE_FAILED',
                message: 'Failed to update order ' + orderId,
                cause: e
            });
        }
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
```

### Client Script Validation

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/error', 'N/currentRecord', 'N/ui/dialog'], function(error, currentRecord, dialog) {

    function saveRecord(context) {
        var rec = currentRecord.get();

        try {
            validateForm(rec);
            return true;
        } catch (e) {
            dialog.alert({
                title: 'Validation Error',
                message: e.message
            });
            return false;
        }
    }

    function validateForm(rec) {
        // Validate main fields
        var tranDate = rec.getValue({ fieldId: 'trandate' });
        if (!tranDate) {
            throw error.create({
                name: 'MISSING_DATE',
                message: 'Please enter a transaction date.'
            });
        }

        // Validate future date
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (tranDate > today) {
            throw error.create({
                name: 'FUTURE_DATE',
                message: 'Transaction date cannot be in the future.'
            });
        }

        // Validate line items
        var itemCount = rec.getLineCount({ sublistId: 'item' });
        if (itemCount === 0) {
            throw error.create({
                name: 'NO_ITEMS',
                message: 'Please add at least one item to the transaction.'
            });
        }

        // Validate each line
        for (var i = 0; i < itemCount; i++) {
            var qty = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: i
            });

            if (qty <= 0) {
                throw error.create({
                    name: 'INVALID_QUANTITY',
                    message: 'Line ' + (i + 1) + ': Quantity must be greater than zero.'
                });
            }
        }
    }

    return {
        saveRecord: saveRecord
    };
});
```

## Complete Example: Error Handling Utility

```javascript
/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(['N/error', 'N/email', 'N/runtime', 'N/record'],
    function(error, email, runtime, record) {

        /**
         * Error handling utility module
         */
        var ErrorHandler = {};

        /**
         * Error severity levels
         */
        ErrorHandler.Severity = {
            INFO: 'INFO',
            WARNING: 'WARNING',
            ERROR: 'ERROR',
            CRITICAL: 'CRITICAL'
        };

        /**
         * Create and throw a custom error
         */
        ErrorHandler.throwError = function(options) {
            var errorObj = error.create({
                name: options.name || 'CUSTOM_ERROR',
                message: options.message,
                notifyOff: options.notifyOff !== false
            });

            // Log the error
            log.error({
                title: options.name || 'CUSTOM_ERROR',
                details: options.message
            });

            throw errorObj;
        };

        /**
         * Create error without throwing
         */
        ErrorHandler.createError = function(name, message, cause) {
            return error.create({
                name: name,
                message: message,
                cause: cause
            });
        };

        /**
         * Log error with context
         */
        ErrorHandler.logError = function(e, context) {
            var errorDetails = {
                name: e.name,
                message: e.message,
                stack: e.stack,
                cause: e.cause ? e.cause.message : null,
                context: context,
                user: runtime.getCurrentUser().name,
                script: runtime.getCurrentScript().id,
                timestamp: new Date().toISOString()
            };

            log.error({
                title: 'Error: ' + e.name,
                details: JSON.stringify(errorDetails)
            });

            return errorDetails;
        };

        /**
         * Handle error with notification
         */
        ErrorHandler.handleError = function(e, options) {
            options = options || {};

            var errorDetails = this.logError(e, options.context);

            // Send notification if critical
            if (options.severity === this.Severity.CRITICAL) {
                this.sendErrorNotification(errorDetails, options);
            }

            // Create error log record if enabled
            if (options.createLogRecord) {
                this.createErrorLogRecord(errorDetails);
            }

            return errorDetails;
        };

        /**
         * Send error notification email
         */
        ErrorHandler.sendErrorNotification = function(errorDetails, options) {
            var recipients = options.recipients || [];

            if (recipients.length === 0) {
                return;
            }

            try {
                var subject = '[' + errorDetails.name + '] Error in ' + errorDetails.script;

                var body = '<h2>Error Notification</h2>' +
                    '<p><strong>Error:</strong> ' + errorDetails.name + '</p>' +
                    '<p><strong>Message:</strong> ' + errorDetails.message + '</p>' +
                    '<p><strong>Script:</strong> ' + errorDetails.script + '</p>' +
                    '<p><strong>User:</strong> ' + errorDetails.user + '</p>' +
                    '<p><strong>Time:</strong> ' + errorDetails.timestamp + '</p>';

                if (errorDetails.context) {
                    body += '<p><strong>Context:</strong> ' + JSON.stringify(errorDetails.context) + '</p>';
                }

                if (errorDetails.stack) {
                    body += '<h3>Stack Trace</h3><pre>' + errorDetails.stack + '</pre>';
                }

                email.send({
                    author: runtime.getCurrentUser().id,
                    recipients: recipients,
                    subject: subject,
                    body: body
                });

            } catch (emailError) {
                log.error({
                    title: 'Failed to send error notification',
                    details: emailError.message
                });
            }
        };

        /**
         * Create error log record
         */
        ErrorHandler.createErrorLogRecord = function(errorDetails) {
            try {
                var logRecord = record.create({
                    type: 'customrecord_error_log'
                });

                logRecord.setValue({
                    fieldId: 'custrecord_error_name',
                    value: errorDetails.name
                });

                logRecord.setValue({
                    fieldId: 'custrecord_error_message',
                    value: errorDetails.message
                });

                logRecord.setValue({
                    fieldId: 'custrecord_error_script',
                    value: errorDetails.script
                });

                logRecord.setValue({
                    fieldId: 'custrecord_error_user',
                    value: errorDetails.user
                });

                logRecord.setValue({
                    fieldId: 'custrecord_error_details',
                    value: JSON.stringify(errorDetails)
                });

                return logRecord.save();

            } catch (recordError) {
                log.error({
                    title: 'Failed to create error log record',
                    details: recordError.message
                });
                return null;
            }
        };

        /**
         * Wrap a function with error handling
         */
        ErrorHandler.wrap = function(fn, options) {
            var self = this;
            options = options || {};

            return function() {
                try {
                    return fn.apply(this, arguments);
                } catch (e) {
                    self.handleError(e, options);

                    if (options.rethrow !== false) {
                        throw e;
                    }

                    return options.defaultValue;
                }
            };
        };

        return ErrorHandler;
    });
```

## Best Practices

1. **Use descriptive error names** - Error names should be uppercase with underscores (e.g., `INVALID_QUANTITY`, `MISSING_REQUIRED_FIELD`).

2. **Write user-friendly messages** - Error messages should be clear and actionable for end users.

3. **Use `notifyOff: true` for validation errors** - Validation errors are expected; don't flood admins with notifications.

4. **Include context in error handling** - When catching and re-throwing errors, include additional context about what was happening.

5. **Log errors appropriately** - Use `log.error()` for errors and `log.audit()` for successful recoveries.

6. **Don't swallow errors silently** - Always log errors even if you handle them gracefully.

7. **Use the `cause` parameter** - When wrapping errors, preserve the original error as the cause for debugging.

8. **Create an error handling utility** - Centralize error handling logic in a reusable module.

9. **Handle errors at appropriate levels** - Let errors bubble up to where they can be properly handled.

10. **Test error scenarios** - Ensure your error handling works correctly by testing edge cases.

## Common NetSuite Errors

| Error Code | Description |
|------------|-------------|
| SSS_MISSING_REQD_ARGUMENT | A required argument was not provided |
| SSS_INVALID_RECORD_TYPE | The specified record type is invalid |
| SSS_INVALID_SUBLIST | The specified sublist does not exist |
| RCRD_DSNT_EXIST | The requested record does not exist |
| INSUFFICIENT_PERMISSION | The user lacks required permissions |
| SSS_USAGE_LIMIT_EXCEEDED | Script governance limit exceeded |
| UNEXPECTED_ERROR | An unexpected error occurred |
| INVALID_FLD_VALUE | Invalid value for the field |

## Governance

The `N/error` module methods have no governance cost.

## Related Modules

- [N/log](./N-log.md) - Logging functionality
- [N/runtime](./N-runtime.md) - Runtime information
- [N/email](./N-email.md) - Error notification emails
