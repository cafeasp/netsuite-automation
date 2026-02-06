# N/record Module

Use the N/record module to work with NetSuite records. You can create, delete, copy, load, or make changes to a record.

## Module Import

```javascript
define(['N/record'], function(record) {
    // Your code here
});
```

## Supported Script Types

- Client Scripts
- Server Scripts (User Event, Scheduled, RESTlet, Suitelet, Map/Reduce, etc.)

## Module Methods

### record.create(options)

Creates a new record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type (use `record.Type` enum) |
| isDynamic | boolean | No | If true, creates record in dynamic mode |
| defaultValues | Object | No | Key-value pairs for initialization |

**Returns:** `record.Record`

**Example:**

```javascript
var customerRecord = record.create({
    type: record.Type.CUSTOMER,
    isDynamic: true
});
customerRecord.setValue({
    fieldId: 'companyname',
    value: 'ABC Company'
});
var customerId = customerRecord.save();
```

### record.load(options)

Loads an existing record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type |
| id | number | Yes | Internal ID of the record |
| isDynamic | boolean | No | If true, loads in dynamic mode |
| defaultValues | Object | No | Key-value pairs for initialization |

**Returns:** `record.Record`

**Example:**

```javascript
var salesOrder = record.load({
    type: record.Type.SALES_ORDER,
    id: 1234,
    isDynamic: false
});
```

### record.copy(options)

Creates a new record by copying an existing record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type |
| id | number | Yes | Internal ID of the record to copy |
| isDynamic | boolean | No | If true, creates in dynamic mode |
| defaultValues | Object | No | Key-value pairs for initialization |

**Returns:** `record.Record`

**Example:**

```javascript
var copiedSO = record.copy({
    type: record.Type.SALES_ORDER,
    id: 1234,
    isDynamic: true
});
copiedSO.setValue({ fieldId: 'memo', value: 'Copied order' });
var newId = copiedSO.save();
```

### record.delete(options)

Deletes a record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type |
| id | number | Yes | Internal ID of the record to delete |

**Returns:** `number` (internal ID of deleted record)

**Example:**

```javascript
var deletedId = record.delete({
    type: record.Type.CUSTOMER,
    id: 5678
});
```

### record.transform(options)

Transforms a record from one type to another.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fromType | string | Yes | Source record type |
| fromId | number | Yes | Source record internal ID |
| toType | string | Yes | Target record type |
| isDynamic | boolean | No | If true, creates in dynamic mode |
| defaultValues | Object | No | Key-value pairs for initialization |

**Returns:** `record.Record`

**Example:**

```javascript
// Transform Sales Order to Item Fulfillment
var fulfillment = record.transform({
    fromType: record.Type.SALES_ORDER,
    fromId: 1234,
    toType: record.Type.ITEM_FULFILLMENT,
    isDynamic: true
});
var fulfillmentId = fulfillment.save();
```

### record.submitFields(options)

Updates and submits one or more body fields on an existing record without loading it.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type |
| id | number | Yes | Internal ID of the record |
| values | Object | Yes | Key-value pairs of fields to update |
| options | Object | No | Additional options |
| options.enableSourcing | boolean | No | Enable sourcing (default: true) |
| options.ignoreMandatoryFields | boolean | No | Ignore mandatory fields |

**Returns:** `number` (internal ID of the record)

**Example:**

```javascript
record.submitFields({
    type: record.Type.SALES_ORDER,
    id: 1234,
    values: {
        memo: 'Updated via submitFields',
        custbody_custom_field: 'New Value'
    },
    options: {
        enableSourcing: false,
        ignoreMandatoryFields: true
    }
});
```

### record.attach(options)

Attaches a record to another record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| record | Object | Yes | Record to attach |
| record.type | string | Yes | Type of record to attach |
| record.id | number | Yes | Internal ID of record to attach |
| to | Object | Yes | Target record |
| to.type | string | Yes | Type of target record |
| to.id | number | Yes | Internal ID of target record |
| attributes | Object | No | Custom attributes |

**Example:**

```javascript
record.attach({
    record: {
        type: record.Type.CONTACT,
        id: 100
    },
    to: {
        type: record.Type.CUSTOMER,
        id: 200
    }
});
```

### record.detach(options)

Detaches a record from another record.

**Parameters:** Same as `record.attach(options)`

## Record Object Methods

### getValue(options) / setValue(options)

Get or set field values.

```javascript
// Get value
var company = rec.getValue({ fieldId: 'companyname' });

// Set value
rec.setValue({
    fieldId: 'companyname',
    value: 'New Company Name'
});
```

### getText(options) / setText(options)

Get or set text representation of field values.

```javascript
// Get text (display value for select fields)
var statusText = rec.getText({ fieldId: 'status' });

// Set by text
rec.setText({
    fieldId: 'salesrep',
    text: 'John Smith'
});
```

### getLineCount(options)

Returns the number of lines in a sublist.

```javascript
var lineCount = rec.getLineCount({ sublistId: 'item' });
```

### getSublistValue(options) / setSublistValue(options)

Get or set sublist field values (standard mode).

```javascript
// Get sublist value
var itemId = rec.getSublistValue({
    sublistId: 'item',
    fieldId: 'item',
    line: 0
});

// Set sublist value
rec.setSublistValue({
    sublistId: 'item',
    fieldId: 'quantity',
    line: 0,
    value: 10
});
```

### Dynamic Mode Sublist Methods

For dynamic mode, use current line methods:

```javascript
// Select a new line
rec.selectNewLine({ sublistId: 'item' });

// Set values on current line
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

// Commit the line
rec.commitLine({ sublistId: 'item' });
```

### insertLine(options)

Inserts a line in a sublist.

```javascript
rec.insertLine({
    sublistId: 'item',
    line: 0
});
```

### removeLine(options)

Removes a line from a sublist.

```javascript
rec.removeLine({
    sublistId: 'item',
    line: 2
});
```

### save(options)

Saves the record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| enableSourcing | boolean | No | Enable sourcing (default: true) |
| ignoreMandatoryFields | boolean | No | Ignore mandatory fields |

**Returns:** `number` (internal ID)

```javascript
var id = rec.save({
    enableSourcing: true,
    ignoreMandatoryFields: false
});
```

### getField(options)

Returns a Field object.

```javascript
var field = rec.getField({ fieldId: 'companyname' });
var label = field.label;
var isMandatory = field.isMandatory;
```

### getFields()

Returns all field IDs on the record.

```javascript
var fields = rec.getFields();
// Returns: ['id', 'companyname', 'email', ...]
```

### getSublists()

Returns all sublist IDs on the record.

```javascript
var sublists = rec.getSublists();
// Returns: ['item', 'partners', 'salesteam', ...]
```

### getSublistFields(options)

Returns all field IDs in a sublist.

```javascript
var itemFields = rec.getSublistFields({ sublistId: 'item' });
```

## Record Object Properties

| Property | Type | Description |
|----------|------|-------------|
| id | number | Internal ID of the record |
| type | string | Record type |
| isDynamic | boolean | Whether record is in dynamic mode |

## record.Type Enum

Common record types:

```javascript
record.Type.ACCOUNT
record.Type.ASSEMBLY_BUILD
record.Type.ASSEMBLY_ITEM
record.Type.BIN
record.Type.CASH_SALE
record.Type.CHECK
record.Type.CONTACT
record.Type.CREDIT_MEMO
record.Type.CUSTOMER
record.Type.CUSTOMER_PAYMENT
record.Type.EMPLOYEE
record.Type.ESTIMATE
record.Type.EXPENSE_REPORT
record.Type.INVENTORY_ADJUSTMENT
record.Type.INVENTORY_ITEM
record.Type.INVENTORY_TRANSFER
record.Type.INVOICE
record.Type.ITEM_FULFILLMENT
record.Type.ITEM_RECEIPT
record.Type.JOURNAL_ENTRY
record.Type.KIT_ITEM
record.Type.LEAD
record.Type.LOT_NUMBERED_ASSEMBLY_ITEM
record.Type.LOT_NUMBERED_INVENTORY_ITEM
record.Type.NON_INVENTORY_ITEM
record.Type.OPPORTUNITY
record.Type.OTHER_CHARGE_ITEM
record.Type.PARTNER
record.Type.PHONE_CALL
record.Type.PRICE_LEVEL
record.Type.PROSPECT
record.Type.PURCHASE_ORDER
record.Type.RETURN_AUTHORIZATION
record.Type.REVENUE_COMMITMENT
record.Type.SALES_ORDER
record.Type.SERIALIZED_ASSEMBLY_ITEM
record.Type.SERIALIZED_INVENTORY_ITEM
record.Type.SERVICE_ITEM
record.Type.TASK
record.Type.TRANSFER_ORDER
record.Type.VENDOR
record.Type.VENDOR_BILL
record.Type.VENDOR_CREDIT
record.Type.VENDOR_PAYMENT
record.Type.WORK_ORDER
```

## Dynamic vs Standard Mode

### Standard Mode
- All fields are accessible immediately
- Use `setSublistValue()` / `getSublistValue()` for sublists
- Must specify line number for all sublist operations
- Better for scripts that know exactly what lines to modify

### Dynamic Mode
- Mimics UI behavior with field sourcing and dependencies
- Use `selectLine()`, `setCurrentSublistValue()`, `commitLine()`
- Required for some field sourcing scenarios
- Better for creating records that need sourcing

## Promise Methods (Client Scripts)

All main methods have promise versions for asynchronous operations:

```javascript
record.load.promise({
    type: record.Type.SALES_ORDER,
    id: 1234
}).then(function(salesOrder) {
    // Work with the loaded record
}).catch(function(error) {
    log.error('Load failed', error);
});
```

## Best Practices

1. **Use submitFields when possible** - More efficient than load/save for simple updates
2. **Choose the right mode** - Use dynamic mode when field sourcing is needed
3. **Batch sublist operations** - Minimize API calls by grouping changes
4. **Check governance** - Record operations consume significant units
5. **Handle errors** - Always wrap record operations in try-catch
6. **Use standard mode for bulk updates** - More predictable and faster

## Related Documentation

- [SuiteScript Records Browser](https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2023_1/script/record/account.html)
- [Official N/record Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4267255811.html)
