# NetSuite SuiteScript Development Agent Instructions

This workspace contains comprehensive documentation for NetSuite SuiteScript 2.x development. Use this reference when building, debugging, or optimizing SuiteScript solutions.

## Documentation Structure

- **[suitescript-docs/modules/](suitescript-docs/modules/)** - Detailed API documentation for all N/ modules
- **[suitescript-docs/examples/](suitescript-docs/examples/)** - Complete script templates for all script types
- **[suitescript-docs/common-patterns.md](suitescript-docs/common-patterns.md)** - Best practices and reusable patterns
- **[suitescript-docs/README.md](suitescript-docs/README.md)** - Overview and quick start guide

---

## Script Types Reference

When asked to create a script, use the appropriate type:

| Script Type | Entry Point(s) | Use Cases | Governance |
|------------|----------------|-----------|------------|
| **User Event** | `beforeLoad`, `beforeSubmit`, `afterSubmit` | Validation, auto-population, sync on record operations | 1,000 units |
| **Client Script** | `pageInit`, `validateField`, `fieldChanged`, `postSourcing`, `saveRecord`, `lineInit`, `validateLine`, `sublistChanged` | UI interactions, field validation, real-time calculations | 1,000 units |
| **Scheduled Script** | `execute` | Batch processing, maintenance tasks | 10,000 units |
| **Map/Reduce** | `getInputData`, `map`, `reduce`, `summarize` | Large dataset processing with parallelization | 10,000 units/stage |
| **RESTlet** | `get`, `post`, `put`, `delete` | External integrations, custom API endpoints | 5,000 units |
| **Suitelet** | `onRequest` | Custom UI pages, reports, data entry forms | 1,000 units |

---

## Script Header Format

Always include proper JSDoc headers:

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * @description Brief description of script purpose
 */
```

**@NApiVersion options:**
- `2.0` - Standard ES5 syntax
- `2.1` - ES2019+ features (arrow functions, const/let, async/await, template literals)

---

## Core Modules Quick Reference

### N/record - Record Operations
```javascript
// Create
record.create({ type: record.Type.CUSTOMER, isDynamic: true });

// Load
record.load({ type: record.Type.SALES_ORDER, id: 123 });

// Update fields efficiently (without loading entire record)
record.submitFields({
    type: record.Type.CUSTOMER,
    id: 123,
    values: { comments: 'Updated', custentity_field: 'value' }
});

// Transform (e.g., Sales Order → Invoice)
record.transform({ fromType: record.Type.SALES_ORDER, fromId: 123, toType: record.Type.INVOICE });

// Delete
record.delete({ type: record.Type.CUSTOMER, id: 123 });
```

### N/search - Search Operations
```javascript
// Create search
search.create({
    type: search.Type.TRANSACTION,
    filters: [
        ['mainline', 'is', 'T'],
        'AND',
        ['status', 'anyof', ['SalesOrd:B', 'SalesOrd:D']]
    ],
    columns: ['tranid', 'entity', 'total']
});

// Load saved search
search.load({ id: 'customsearch_my_search' });

// Lookup fields (efficient for getting few fields)
search.lookupFields({
    type: search.Type.CUSTOMER,
    id: 123,
    columns: ['companyname', 'email', 'salesrep']
});
```

### N/runtime - Runtime Information
```javascript
var script = runtime.getCurrentScript();
script.getRemainingUsage();  // Check governance
script.getParameter({ name: 'custscript_param' });  // Get script parameters

var user = runtime.getCurrentUser();
user.id;  // Current user ID
user.role;  // Current role
```

### N/email - Send Emails
```javascript
email.send({
    author: employeeId,
    recipients: ['email@example.com'],
    subject: 'Subject',
    body: '<p>HTML body</p>',
    attachments: [fileObject],
    relatedRecords: { transactionId: 123 }
});
```

### N/file - File Cabinet Operations
```javascript
// Create file
var csvFile = file.create({
    name: 'export.csv',
    fileType: file.Type.CSV,
    contents: 'data',
    folder: folderId
});
csvFile.save();

// Load file
file.load({ id: 'SuiteScripts/config.json' });
```

### N/task - Asynchronous Tasks
```javascript
var scheduledTask = task.create({
    taskType: task.TaskType.SCHEDULED_SCRIPT,
    scriptId: 'customscript_my_script',
    deploymentId: 'customdeploy_my_deploy',
    params: { custscript_param: 'value' }
});
var taskId = scheduledTask.submit();
```

### N/ui/serverWidget - Custom UI
```javascript
var form = serverWidget.createForm({ title: 'My Form' });

form.addField({
    id: 'custpage_customer',
    type: serverWidget.FieldType.SELECT,
    label: 'Customer',
    source: 'customer'
});

form.addSubmitButton({ label: 'Submit' });
```

---

## Common Patterns to Use

### 1. Governance Check (Scheduled/Map-Reduce Scripts)
```javascript
var script = runtime.getCurrentScript();
if (script.getRemainingUsage() < 200) {
    log.audit('Stopping', 'Low governance: ' + script.getRemainingUsage());
    return false;
}
```

### 2. Process All Search Results
```javascript
function getAllResults(searchObj) {
    var results = [];
    var pagedData = searchObj.runPaged({ pageSize: 1000 });
    pagedData.pageRanges.forEach(function(range) {
        pagedData.fetch({ index: range.index }).data.forEach(function(result) {
            results.push(result);
        });
    });
    return results;
}
```

### 3. Error Handling Pattern
```javascript
try {
    // Your code
} catch (e) {
    log.error('Error', {
        name: e.name,
        message: e.message,
        stack: e.stack
    });
    throw e;  // Re-throw if needed to stop execution
}
```

### 4. Sublist Operations (Dynamic Mode)
```javascript
items.forEach(function(item) {
    rec.selectNewLine({ sublistId: 'item' });
    rec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: item.id });
    rec.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: item.qty });
    rec.commitLine({ sublistId: 'item' });
});
```

### 5. Compare Old vs New Values (User Event)
```javascript
function beforeSubmit(context) {
    if (context.type === context.UserEventType.EDIT) {
        var oldValue = context.oldRecord.getValue({ fieldId: 'status' });
        var newValue = context.newRecord.getValue({ fieldId: 'status' });
        if (oldValue !== newValue) {
            // Status changed
        }
    }
}
```

---

## Best Practices

1. **Use `submitFields` for simple updates** - More efficient than load/save
2. **Always check governance** before expensive operations
3. **Use Dynamic mode** when you need field sourcing/validation
4. **Use Standard mode** for direct line access (faster for bulk operations)
5. **Minimize API calls** - batch operations when possible
6. **Log structured data** - `log.debug('Title', { key: 'value' })`
7. **Use saved searches** for complex queries
8. **Cache expensive lookups** with N/cache module
9. **Handle select field values** - They return `[{value, text}]` arrays
10. **Test in sandbox** before production deployment

---

## Record Type Enums

Use `record.Type` enum for type-safety:
- `record.Type.CUSTOMER`
- `record.Type.SALES_ORDER`
- `record.Type.INVOICE`
- `record.Type.PURCHASE_ORDER`
- `record.Type.ITEM_FULFILLMENT`
- `record.Type.INVENTORY_ITEM`
- `record.Type.EMPLOYEE`
- `record.Type.VENDOR`
- `record.Type.TASK`

---

## When Building Scripts

### Ask These Clarifying Questions:
1. What **record type(s)** are involved?
2. What **trigger/event** should execute the logic?
3. What **fields** need to be accessed or modified?
4. Are there **sublists** involved?
5. What **error handling** is needed?
6. Are there **governance considerations** (large data volumes)?
7. What **script parameters** should be configurable?

### Script Selection Guide:
- **Real-time on record save?** → User Event Script
- **UI validation/interaction?** → Client Script
- **Process batch data on schedule?** → Scheduled Script or Map/Reduce
- **Large dataset (1000+ records)?** → Map/Reduce Script
- **External system integration?** → RESTlet
- **Custom UI/report?** → Suitelet

---

## File Naming Convention

```
[type]_[purpose].js
```

Examples:
- `ue_customer_validation.js` - User Event for customer validation
- `cs_salesorder_calculations.js` - Client Script for SO calculations
- `mr_invoice_processing.js` - Map/Reduce for invoice processing
- `rl_api_orders.js` - RESTlet for order API
- `sl_customer_report.js` - Suitelet for customer report
- `ss_daily_cleanup.js` - Scheduled Script for daily cleanup
