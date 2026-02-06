# N/search Module

Use the N/search module to create and run on-demand or saved searches, then analyze and work through the results.

## Module Import

```javascript
define(['N/search'], function(search) {
    // Your code here
});
```

## Supported Script Types

- Client Scripts
- Server Scripts (User Event, Scheduled, RESTlet, Suitelet, Map/Reduce, etc.)

**Note:** The N/search module doesn't work in unauthenticated client-side contexts.

## Module Methods

### search.create(options)

Creates a new search.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type to search (use `search.Type` enum) |
| filters | array | No | Array of filter objects or filter expressions |
| columns | array | No | Array of column objects or column names |
| title | string | No | Name for the search (if saving) |
| id | string | No | Script ID for saved search (customsearch_*) |
| isPublic | boolean | No | Whether search is public |
| settings | array | No | Search settings |

**Returns:** `search.Search`

**Example:**

```javascript
var customerSearch = search.create({
    type: search.Type.CUSTOMER,
    filters: [
        ['isinactive', 'is', 'F'],
        'AND',
        ['balance', 'greaterthan', 1000]
    ],
    columns: [
        'entityid',
        'companyname',
        'email',
        'balance'
    ]
});
```

### search.load(options)

Loads an existing saved search.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string/number | Yes | Script ID or internal ID of saved search |
| type | string | No | Record type (optional, for validation) |

**Returns:** `search.Search`

**Example:**

```javascript
var savedSearch = search.load({
    id: 'customsearch_open_sales_orders'
});

// Or by internal ID
var savedSearch = search.load({
    id: 123
});
```

### search.delete(options)

Deletes an existing saved search.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string/number | Yes | Script ID or internal ID of saved search |

**Example:**

```javascript
search.delete({
    id: 'customsearch_temp_search'
});
```

### search.lookupFields(options)

Performs a field lookup on a record without loading it.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type |
| id | number | Yes | Internal ID of the record |
| columns | array | Yes | Array of field IDs to retrieve |

**Returns:** `Object` with field values

**Example:**

```javascript
var fieldValues = search.lookupFields({
    type: search.Type.CUSTOMER,
    id: 1234,
    columns: ['companyname', 'email', 'salesrep']
});

log.debug('Company', fieldValues.companyname);
log.debug('Email', fieldValues.email);
// Select fields return array: [{value: '123', text: 'John Smith'}]
log.debug('Sales Rep', fieldValues.salesrep[0].text);
```

### search.global(options)

Performs a global search against keywords.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keywords | string | Yes | Search keywords |

**Returns:** `search.Result[]`

**Example:**

```javascript
var results = search.global({
    keywords: 'ABC Company'
});

results.forEach(function(result) {
    log.debug('Result', result.id + ' - ' + result.recordType);
});
```

### search.duplicates(options)

Searches for duplicate records based on account configuration.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Record type |
| fields | array | No | Fields to check for duplicates |
| id | number | No | Record ID to find duplicates of |

**Returns:** `search.Result[]`

**Example:**

```javascript
var duplicates = search.duplicates({
    type: search.Type.CUSTOMER,
    fields: ['email', 'companyname'],
    id: 1234
});
```

### search.createColumn(options)

Creates a search column object.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Field ID |
| join | string | No | Join ID for related record fields |
| summary | string | No | Summary type (use `search.Summary` enum) |
| formula | string | No | Formula for calculated columns |
| function | string | No | Function to apply |
| label | string | No | Custom label |
| sort | string | No | Sort direction (use `search.Sort` enum) |

**Example:**

```javascript
var columns = [
    search.createColumn({ name: 'entityid' }),
    search.createColumn({
        name: 'amount',
        summary: search.Summary.SUM
    }),
    search.createColumn({
        name: 'email',
        join: 'customer'
    }),
    search.createColumn({
        name: 'formulanumeric',
        formula: '{quantity} * {rate}'
    })
];
```

### search.createFilter(options)

Creates a search filter object.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Field ID |
| operator | string | Yes | Operator (use `search.Operator` enum) |
| values | string/array | No | Filter value(s) |
| join | string | No | Join ID for related record fields |
| formula | string | No | Formula for calculated filters |
| summary | string | No | Summary type |

**Example:**

```javascript
var filters = [
    search.createFilter({
        name: 'mainline',
        operator: search.Operator.IS,
        values: 'T'
    }),
    search.createFilter({
        name: 'trandate',
        operator: search.Operator.WITHIN,
        values: ['lastmonth']
    }),
    search.createFilter({
        name: 'amount',
        operator: search.Operator.GREATERTHAN,
        values: 1000
    })
];
```

## Search Object Methods

### run()

Runs the search and returns a ResultSet.

```javascript
var resultSet = mySearch.run();

resultSet.each(function(result) {
    var id = result.id;
    var name = result.getValue('entityid');
    log.debug('Result', id + ': ' + name);
    return true; // Continue iteration
});
```

### runPaged(options)

Runs the search with pagination.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| pageSize | number | No | Results per page (5-1000, default 50) |

**Returns:** `search.PagedData`

**Example:**

```javascript
var pagedData = mySearch.runPaged({
    pageSize: 100
});

log.debug('Total results', pagedData.count);

pagedData.pageRanges.forEach(function(pageRange) {
    var page = pagedData.fetch({ index: pageRange.index });

    page.data.forEach(function(result) {
        log.debug('Result', result.getValue('entityid'));
    });
});
```

### save()

Saves the search.

```javascript
mySearch.title = 'My Custom Search';
mySearch.id = 'customsearch_my_search';
mySearch.isPublic = true;

var searchId = mySearch.save();
```

## ResultSet Methods

### each(callback)

Iterates through results (up to 4000 at a time).

```javascript
mySearch.run().each(function(result) {
    // Process result
    log.debug('ID', result.id);

    // Return true to continue, false to stop
    return true;
});
```

### getRange(options)

Returns a slice of results.

```javascript
var results = mySearch.run().getRange({
    start: 0,
    end: 100
});

results.forEach(function(result) {
    log.debug('Result', result.id);
});
```

## Result Object Methods

### getValue(options)

Gets the value of a column.

```javascript
var amount = result.getValue({ name: 'amount' });

// With join
var customerName = result.getValue({
    name: 'companyname',
    join: 'customer'
});

// With summary
var totalAmount = result.getValue({
    name: 'amount',
    summary: search.Summary.SUM
});
```

### getText(options)

Gets the text (display) value of a column.

```javascript
var statusText = result.getText({ name: 'status' });
```

## Result Object Properties

| Property | Type | Description |
|----------|------|-------------|
| id | string | Internal ID of the record |
| recordType | string | Type of the record |
| columns | array | Array of Column objects |

## search.Type Enum

Common search types:

```javascript
search.Type.ACCOUNT
search.Type.BILLING_SCHEDULE
search.Type.CONTACT
search.Type.CUSTOMER
search.Type.EMPLOYEE
search.Type.ENTITY
search.Type.INVENTORY_ITEM
search.Type.INVOICE
search.Type.ITEM
search.Type.JOURNAL_ENTRY
search.Type.LOCATION
search.Type.OPPORTUNITY
search.Type.PARTNER
search.Type.PROJECT_TASK
search.Type.PURCHASE_ORDER
search.Type.SALES_ORDER
search.Type.SUBSIDIARY
search.Type.TASK
search.Type.TRANSACTION
search.Type.VENDOR
search.Type.VENDOR_BILL
search.Type.WORK_ORDER
```

## search.Operator Enum

Common operators:

```javascript
search.Operator.AFTER
search.Operator.ALLOF
search.Operator.ANY
search.Operator.ANYOF
search.Operator.BEFORE
search.Operator.BETWEEN
search.Operator.CONTAINS
search.Operator.DOESNOTCONTAIN
search.Operator.DOESNOTSTARTWITH
search.Operator.EQUALTO
search.Operator.GREATERTHAN
search.Operator.GREATERTHANOREQUALTO
search.Operator.HASKEYWORDS
search.Operator.IS
search.Operator.ISEMPTY
search.Operator.ISNOT
search.Operator.ISNOTEMPTY
search.Operator.LESSTHAN
search.Operator.LESSTHANOREQUALTO
search.Operator.NONEOF
search.Operator.NOTAFTER
search.Operator.NOTALLOF
search.Operator.NOTBEFORE
search.Operator.NOTBETWEEN
search.Operator.NOTEQUALTO
search.Operator.NOTON
search.Operator.NOTONORAFTER
search.Operator.NOTONORBEFORE
search.Operator.NOTWITHIN
search.Operator.ON
search.Operator.ONORAFTER
search.Operator.ONORBEFORE
search.Operator.STARTSWITH
search.Operator.WITHIN
```

## search.Summary Enum

```javascript
search.Summary.GROUP
search.Summary.COUNT
search.Summary.SUM
search.Summary.AVG
search.Summary.MIN
search.Summary.MAX
```

## search.Sort Enum

```javascript
search.Sort.ASC
search.Sort.DESC
search.Sort.NONE
```

## Filter Expressions

Filter expressions use arrays with AND/OR logic:

```javascript
// Simple expression
var filters = [
    ['isinactive', 'is', 'F']
];

// Multiple filters with AND
var filters = [
    ['isinactive', 'is', 'F'],
    'AND',
    ['balance', 'greaterthan', 0]
];

// Multiple filters with OR
var filters = [
    ['email', 'contains', '@example.com'],
    'OR',
    ['email', 'contains', '@test.com']
];

// Nested expressions
var filters = [
    ['isinactive', 'is', 'F'],
    'AND',
    [
        ['balance', 'greaterthan', 0],
        'OR',
        ['overduebalance', 'greaterthan', 0]
    ]
];
```

## Joined Searches

Access related record fields using joins:

```javascript
var invoiceSearch = search.create({
    type: search.Type.INVOICE,
    filters: [
        ['mainline', 'is', 'T'],
        'AND',
        ['customer.category', 'anyof', [1, 2, 3]]  // Filter by customer field
    ],
    columns: [
        'tranid',
        'entity',
        search.createColumn({
            name: 'email',
            join: 'customer'  // Get customer's email
        }),
        search.createColumn({
            name: 'companyname',
            join: 'customer'
        })
    ]
});
```

## Summary/Group Searches

```javascript
var salesByRep = search.create({
    type: search.Type.TRANSACTION,
    filters: [
        ['type', 'anyof', ['SalesOrd', 'CustInvc']],
        'AND',
        ['mainline', 'is', 'T']
    ],
    columns: [
        search.createColumn({
            name: 'salesrep',
            summary: search.Summary.GROUP
        }),
        search.createColumn({
            name: 'amount',
            summary: search.Summary.SUM
        }),
        search.createColumn({
            name: 'internalid',
            summary: search.Summary.COUNT
        })
    ]
});
```

## Formula Columns

```javascript
var columns = [
    search.createColumn({
        name: 'formulatext',
        formula: "CONCAT({firstname}, ' ', {lastname})",
        label: 'Full Name'
    }),
    search.createColumn({
        name: 'formulanumeric',
        formula: '{quantity} * {rate}',
        label: 'Line Total'
    }),
    search.createColumn({
        name: 'formuladate',
        formula: "ADD_MONTHS({trandate}, 1)",
        label: 'Due Date'
    }),
    search.createColumn({
        name: 'formulapercent',
        formula: '{amount} / {total}',
        label: 'Percentage'
    })
];
```

## Promise Methods (Client Scripts)

```javascript
search.create.promise({
    type: search.Type.CUSTOMER,
    filters: [['isinactive', 'is', 'F']]
}).then(function(searchObj) {
    return searchObj.run().getRange.promise({
        start: 0,
        end: 100
    });
}).then(function(results) {
    // Process results
}).catch(function(error) {
    log.error('Search failed', error);
});
```

## Best Practices

1. **Use lookupFields for single records** - More efficient than creating a search
2. **Limit columns to what you need** - Improves performance
3. **Use pagination for large result sets** - `runPaged()` is more memory-efficient
4. **Index your filter fields** - Work with your NetSuite admin for optimal performance
5. **Avoid deeply nested filter expressions** - Can impact performance
6. **Use saved searches when appropriate** - Reusable and can be modified in UI
7. **Return false to stop iteration** - In `each()` callback when done processing

## Common Patterns

### Process All Results

```javascript
var allResults = [];
var search = search.create({ ... });

search.run().each(function(result) {
    allResults.push({
        id: result.id,
        name: result.getValue('entityid')
    });
    return true;
});
```

### Paginate Through Large Results

```javascript
var pagedData = mySearch.runPaged({ pageSize: 1000 });

for (var i = 0; i < pagedData.pageRanges.length; i++) {
    var page = pagedData.fetch({ index: i });

    page.data.forEach(function(result) {
        // Process result
    });
}
```

### Add Filters to Loaded Search

```javascript
var loadedSearch = search.load({ id: 'customsearch_base' });

// Add additional filters
loadedSearch.filters.push(
    search.createFilter({
        name: 'trandate',
        operator: search.Operator.WITHIN,
        values: ['thismonth']
    })
);
```

## Related Documentation

- [Official N/search Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4345764122.html)
- [Search Filter Expression Syntax](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4619180858.html)
