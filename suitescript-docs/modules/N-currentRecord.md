# N/currentRecord Module

## Overview

The `N/currentRecord` module provides access to the current record in client-side scripts. It allows you to read and manipulate the record that is currently being viewed or edited in the NetSuite UI without requiring a separate load operation.

## Module Import

```javascript
// SuiteScript 2.0
define(['N/currentRecord'], function(currentRecord) {
    // Your code here
});

// SuiteScript 2.1
import currentRecord from 'N/currentRecord';
```

## Supported Script Types

| Script Type | Supported |
|-------------|-----------|
| Client Script | Yes |
| Portlet Script | Yes |
| Suitelet (client-side) | Yes |
| User Event Script | No |
| Scheduled Script | No |
| Map/Reduce Script | No |
| RESTlet | No |
| Workflow Action Script | No |

## Methods

### currentRecord.get()

Returns the current record object in client-side context.

**Returns:** `record.Record` - The current record object

**Throws:** `error.SuiteScriptError` - SSS_MISSING_REQD_ARGUMENT if called from an unsupported context

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/currentRecord'], function(currentRecord) {

    function pageInit(context) {
        var rec = currentRecord.get();

        log.debug({
            title: 'Current Record',
            details: 'Type: ' + rec.type + ', ID: ' + rec.id
        });
    }

    function fieldChanged(context) {
        var rec = currentRecord.get();
        var fieldId = context.fieldId;

        if (fieldId === 'custbody_discount_code') {
            var discountCode = rec.getValue({
                fieldId: 'custbody_discount_code'
            });

            // Validate or process discount code
            if (discountCode && !isValidDiscountCode(discountCode)) {
                alert('Invalid discount code');
                rec.setValue({
                    fieldId: 'custbody_discount_code',
                    value: ''
                });
            }
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});
```

### currentRecord.get.promise()

Asynchronously returns the current record object. Useful for ensuring the record is fully loaded before accessing it.

**Returns:** `Promise<record.Record>` - Promise resolving to the current record object

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/currentRecord'], function(currentRecord) {

    function pageInit(context) {
        currentRecord.get.promise()
            .then(function(rec) {
                log.debug({
                    title: 'Record Loaded',
                    details: 'Type: ' + rec.type + ', ID: ' + rec.id
                });

                // Perform operations on the record
                initializeCustomFields(rec);
            })
            .catch(function(error) {
                log.error({
                    title: 'Error Loading Record',
                    details: error.message
                });
            });
    }

    function initializeCustomFields(rec) {
        // Custom initialization logic
    }

    return {
        pageInit: pageInit
    };
});
```

## Record Object Methods

Once you obtain the current record via `currentRecord.get()`, you can use all standard record methods:

### getValue(options)

Gets the value of a field on the current record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.fieldId | string | Yes | The internal ID of the field |

**Returns:** `string | number | boolean | Date | Array` - The field value

#### Example

```javascript
var rec = currentRecord.get();

// Get standard field values
var entityId = rec.getValue({ fieldId: 'entity' });
var tranDate = rec.getValue({ fieldId: 'trandate' });
var memo = rec.getValue({ fieldId: 'memo' });

// Get custom field value
var customValue = rec.getValue({ fieldId: 'custbody_custom_field' });
```

### setValue(options)

Sets the value of a field on the current record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.fieldId | string | Yes | The internal ID of the field |
| options.value | string \| number \| boolean \| Date \| Array | Yes | The value to set |
| options.ignoreFieldChange | boolean | No | If true, field change scripts are not triggered (default: false) |
| options.forceSyncSourcing | boolean | No | If true, sourcing is performed synchronously (default: false) |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

// Set a simple field value
rec.setValue({
    fieldId: 'memo',
    value: 'Updated via client script'
});

// Set value without triggering field change
rec.setValue({
    fieldId: 'custbody_status',
    value: 'Processed',
    ignoreFieldChange: true
});

// Set with synchronous sourcing
rec.setValue({
    fieldId: 'entity',
    value: 123,
    forceSyncSourcing: true
});
```

### getText(options)

Gets the display text for a select field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.fieldId | string | Yes | The internal ID of the field |

**Returns:** `string` - The display text of the field

#### Example

```javascript
var rec = currentRecord.get();

var customerName = rec.getText({ fieldId: 'entity' });
var statusText = rec.getText({ fieldId: 'status' });

log.debug('Customer', customerName);
log.debug('Status', statusText);
```

### setText(options)

Sets a select field value by its display text.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.fieldId | string | Yes | The internal ID of the field |
| options.text | string | Yes | The display text to set |
| options.ignoreFieldChange | boolean | No | If true, field change scripts are not triggered |
| options.forceSyncSourcing | boolean | No | If true, sourcing is performed synchronously |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

rec.setText({
    fieldId: 'subsidiary',
    text: 'Parent Company : Child Subsidiary'
});
```

### getField(options)

Returns a field object for the specified field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.fieldId | string | Yes | The internal ID of the field |

**Returns:** `record.Field` - The field object

#### Example

```javascript
var rec = currentRecord.get();

var field = rec.getField({ fieldId: 'entity' });
log.debug('Field Label', field.label);
log.debug('Field Type', field.type);
log.debug('Is Mandatory', field.isMandatory);
log.debug('Is Disabled', field.isDisabled);
```

### getLineCount(options)

Returns the number of lines in a sublist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |

**Returns:** `number` - The number of lines in the sublist

#### Example

```javascript
var rec = currentRecord.get();

var itemCount = rec.getLineCount({ sublistId: 'item' });
log.debug('Number of Items', itemCount);
```

### getSublistValue(options)

Gets the value of a sublist field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |
| options.fieldId | string | Yes | The internal ID of the field |
| options.line | number | Yes | The line number (zero-based) |

**Returns:** `string | number | boolean | Date` - The field value

#### Example

```javascript
var rec = currentRecord.get();

var itemCount = rec.getLineCount({ sublistId: 'item' });

for (var i = 0; i < itemCount; i++) {
    var itemId = rec.getSublistValue({
        sublistId: 'item',
        fieldId: 'item',
        line: i
    });

    var quantity = rec.getSublistValue({
        sublistId: 'item',
        fieldId: 'quantity',
        line: i
    });

    log.debug('Line ' + i, 'Item: ' + itemId + ', Qty: ' + quantity);
}
```

### getCurrentSublistValue(options)

Gets the value of a field on the currently selected sublist line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |
| options.fieldId | string | Yes | The internal ID of the field |

**Returns:** `string | number | boolean | Date` - The field value

#### Example

```javascript
var rec = currentRecord.get();

// Get value from the currently selected line
var currentItem = rec.getCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'item'
});

var currentQty = rec.getCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'quantity'
});
```

### setCurrentSublistValue(options)

Sets the value of a field on the currently selected sublist line.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |
| options.fieldId | string | Yes | The internal ID of the field |
| options.value | string \| number \| boolean \| Date | Yes | The value to set |
| options.ignoreFieldChange | boolean | No | If true, field change scripts are not triggered |
| options.forceSyncSourcing | boolean | No | If true, sourcing is performed synchronously |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

// Select an existing line
rec.selectLine({
    sublistId: 'item',
    line: 0
});

// Modify the quantity
rec.setCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'quantity',
    value: 10
});

// Commit the line
rec.commitLine({
    sublistId: 'item'
});
```

### selectLine(options)

Selects an existing line in a sublist for editing.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |
| options.line | number | Yes | The line number to select (zero-based) |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

rec.selectLine({
    sublistId: 'item',
    line: 2
});
```

### selectNewLine(options)

Selects a new line at the end of the sublist for input.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

// Select new line
rec.selectNewLine({
    sublistId: 'item'
});

// Set values on new line
rec.setCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'item',
    value: 123
});

rec.setCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'quantity',
    value: 5
});

// Commit the new line
rec.commitLine({
    sublistId: 'item'
});
```

### commitLine(options)

Commits the currently selected line to the sublist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

rec.selectNewLine({ sublistId: 'item' });
rec.setCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'item',
    value: 456
});
rec.setCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'quantity',
    value: 2
});
rec.commitLine({ sublistId: 'item' });
```

### cancelLine(options)

Cancels the currently selected line without committing.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

rec.selectLine({
    sublistId: 'item',
    line: 0
});

// Make some changes...

// Decide to cancel
rec.cancelLine({
    sublistId: 'item'
});
```

### removeLine(options)

Removes a line from a sublist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |
| options.line | number | Yes | The line number to remove (zero-based) |
| options.ignoreRecalc | boolean | No | If true, recalculation is skipped |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

// Remove the third line (index 2)
rec.removeLine({
    sublistId: 'item',
    line: 2
});
```

### insertLine(options)

Inserts a new line at a specified position in a sublist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.sublistId | string | Yes | The internal ID of the sublist |
| options.line | number | Yes | The line position to insert at (zero-based) |
| options.ignoreRecalc | boolean | No | If true, recalculation is skipped |

**Returns:** `record.Record` - The current record for method chaining

#### Example

```javascript
var rec = currentRecord.get();

// Insert a new line at position 0 (beginning)
rec.insertLine({
    sublistId: 'item',
    line: 0
});

// Set values on the inserted line
rec.setCurrentSublistValue({
    sublistId: 'item',
    fieldId: 'item',
    value: 789
});

rec.commitLine({
    sublistId: 'item'
});
```

## Record Object Properties

The record object returned by `currentRecord.get()` has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | number | The internal ID of the record (null for unsaved records) |
| type | string | The record type (e.g., 'salesorder', 'customer') |
| isDynamic | boolean | Always true for current record |

#### Example

```javascript
var rec = currentRecord.get();

log.debug('Record ID', rec.id);
log.debug('Record Type', rec.type);
log.debug('Is Dynamic', rec.isDynamic);
```

## Complete Client Script Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/dialog', 'N/runtime'],
    function(currentRecord, dialog, runtime) {

        /**
         * Page initialization
         */
        function pageInit(context) {
            var rec = currentRecord.get();

            if (context.mode === 'create') {
                // Set default values for new records
                rec.setValue({
                    fieldId: 'custbody_created_by_script',
                    value: true
                });

                rec.setValue({
                    fieldId: 'memo',
                    value: 'Created by ' + runtime.getCurrentUser().name
                });
            }

            log.debug({
                title: 'Page Initialized',
                details: 'Mode: ' + context.mode + ', Record Type: ' + rec.type
            });
        }

        /**
         * Field change handler
         */
        function fieldChanged(context) {
            var rec = currentRecord.get();
            var fieldId = context.fieldId;

            if (fieldId === 'entity') {
                var customerId = rec.getValue({ fieldId: 'entity' });
                var customerName = rec.getText({ fieldId: 'entity' });

                if (customerId) {
                    log.debug('Customer Selected', customerName);
                }
            }

            if (fieldId === 'quantity' && context.sublistId === 'item') {
                validateQuantity(rec, context);
            }
        }

        /**
         * Validate quantity on item lines
         */
        function validateQuantity(rec, context) {
            var quantity = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });

            if (quantity < 0) {
                dialog.alert({
                    title: 'Invalid Quantity',
                    message: 'Quantity cannot be negative'
                });

                rec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 0
                });
            }
        }

        /**
         * Save record validation
         */
        function saveRecord(context) {
            var rec = currentRecord.get();

            var itemCount = rec.getLineCount({ sublistId: 'item' });

            if (itemCount === 0) {
                dialog.alert({
                    title: 'Validation Error',
                    message: 'Please add at least one item before saving'
                });
                return false;
            }

            // Validate each line
            for (var i = 0; i < itemCount; i++) {
                var qty = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });

                if (!qty || qty <= 0) {
                    dialog.alert({
                        title: 'Validation Error',
                        message: 'Line ' + (i + 1) + ' has invalid quantity'
                    });
                    return false;
                }
            }

            return true;
        }

        /**
         * Sublist line validation
         */
        function validateLine(context) {
            var rec = currentRecord.get();
            var sublistId = context.sublistId;

            if (sublistId === 'item') {
                var item = rec.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item'
                });

                var qty = rec.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity'
                });

                if (!item) {
                    dialog.alert({
                        title: 'Missing Item',
                        message: 'Please select an item'
                    });
                    return false;
                }

                if (!qty || qty <= 0) {
                    dialog.alert({
                        title: 'Invalid Quantity',
                        message: 'Quantity must be greater than zero'
                    });
                    return false;
                }
            }

            return true;
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            saveRecord: saveRecord,
            validateLine: validateLine
        };
    });
```

## Best Practices

1. **Always use `currentRecord.get()` in client scripts** - Do not try to use `record.load()` for the current record as it creates a separate copy and any changes won't be reflected in the UI.

2. **Check record mode in pageInit** - Use `context.mode` to determine if the record is in 'create', 'edit', or 'view' mode and adjust your logic accordingly.

3. **Use `ignoreFieldChange` wisely** - Setting this to `true` prevents cascading field changes but may skip important validations or sourcing.

4. **Handle sublist operations carefully** - Always `selectLine()` or `selectNewLine()` before using `setCurrentSublistValue()`, and always `commitLine()` after making changes.

5. **Return boolean from validation entry points** - `saveRecord()`, `validateLine()`, and `validateDelete()` must return `true` to allow the operation or `false` to cancel it.

6. **Avoid infinite loops** - When using `setValue()` in `fieldChanged()`, use `ignoreFieldChange: true` if the change would trigger the same field change event.

7. **Use promises for complex operations** - When performing multiple asynchronous operations, use `currentRecord.get.promise()` to ensure proper sequencing.

8. **Test in all modes** - Ensure your client script works correctly in create, edit, and view modes.

## Common Errors

| Error Code | Description | Resolution |
|------------|-------------|------------|
| SSS_MISSING_REQD_ARGUMENT | Required argument is missing | Ensure all required parameters are provided |
| FIELD_NOT_FOUND | The specified field does not exist | Verify the field ID is correct for the record type |
| INVALID_SUBLIST_OPERATION | Invalid operation on sublist | Ensure you've selected a line before setting/getting current sublist values |
| MUTUALLY_EXCLUSIVE_ARGUMENTS | Conflicting arguments provided | Review the method parameters for conflicts |

## Related Modules

- [N/record](./N-record.md) - Server-side record operations
- [N/ui/dialog](./N-ui-dialog.md) - Dialog boxes for user interaction
- [N/runtime](./N-runtime.md) - Runtime information
