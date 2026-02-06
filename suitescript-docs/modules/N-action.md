# N/action Module

Use the N/action module to execute record actions and workflow actions programmatically. This module allows you to trigger business logic that would normally be executed through the UI, such as approving records or running workflow actions.

## Module Import

```javascript
define(['N/action'], function(action) {
    // Your code here
});
```

## Supported Script Types

- User Event Scripts
- Scheduled Scripts
- Map/Reduce Scripts
- RESTlet Scripts
- Suitelet Scripts
- Workflow Action Scripts
- Portlet Scripts
- Mass Update Scripts

**Note:** This module is NOT supported in Client Scripts.

## Module Methods

### action.execute(options)

Executes an action on a specific record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| recordType | string | Yes | The record type (use `record.Type` enum or string) |
| id | number \| string | Yes | The internal ID of the record |
| action | string | Yes | The action ID to execute |
| params | Object | No | Additional parameters for the action |

**Returns:** `Object` - The result of the action execution

**Example:**

```javascript
define(['N/action'], function(action) {

    function executeApproval() {
        var result = action.execute({
            recordType: 'salesorder',
            id: 1234,
            action: 'approve'
        });

        log.debug('Action Result', result);
        return result;
    }

    return {
        execute: executeApproval
    };
});
```

### action.execute.promise(options)

Asynchronously executes an action on a specific record.

**Parameters:** Same as `action.execute(options)`

**Returns:** `Promise<Object>` - Promise resolving to the action result

**Example:**

```javascript
define(['N/action'], function(action) {

    function executeApprovalAsync() {
        return action.execute.promise({
            recordType: 'purchaseorder',
            id: 5678,
            action: 'approve'
        }).then(function(result) {
            log.debug('Approval completed', result);
            return result;
        }).catch(function(error) {
            log.error('Approval failed', error);
        });
    }

    return {
        execute: executeApprovalAsync
    };
});
```

### action.get(options)

Retrieves information about a specific action available for a record type.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| recordType | string | Yes | The record type |
| id | string | Yes | The action ID |

**Returns:** `action.Action` - An Action object with metadata about the action

**Example:**

```javascript
define(['N/action'], function(action) {

    function getActionInfo() {
        var actionInfo = action.get({
            recordType: 'salesorder',
            id: 'approve'
        });

        log.debug('Action Label', actionInfo.label);
        log.debug('Action Description', actionInfo.description);
        log.debug('Action Parameters', JSON.stringify(actionInfo.parameters));

        return actionInfo;
    }

    return {
        execute: getActionInfo
    };
});
```

### action.get.promise(options)

Asynchronously retrieves information about a specific action.

**Parameters:** Same as `action.get(options)`

**Returns:** `Promise<action.Action>` - Promise resolving to an Action object

### action.find(options)

Finds all available actions for a specific record type or record instance.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| recordType | string | Yes | The record type |
| recordId | number \| string | No | The specific record ID (for instance-specific actions) |

**Returns:** `Object` - An object containing action IDs as keys and Action objects as values

**Example:**

```javascript
define(['N/action'], function(action) {

    function findAllActions() {
        // Find all actions for sales orders
        var allActions = action.find({
            recordType: 'salesorder'
        });

        for (var actionId in allActions) {
            var actionObj = allActions[actionId];
            log.debug('Action Found', actionId + ': ' + actionObj.label);
        }

        return allActions;
    }

    function findRecordActions() {
        // Find actions for a specific sales order
        var recordActions = action.find({
            recordType: 'salesorder',
            recordId: 1234
        });

        return recordActions;
    }

    return {
        findAll: findAllActions,
        findRecord: findRecordActions
    };
});
```

### action.find.promise(options)

Asynchronously finds all available actions for a record type or record instance.

**Parameters:** Same as `action.find(options)`

**Returns:** `Promise<Object>` - Promise resolving to an object of actions

## Action Object

The Action object returned by `action.get()` contains the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | string | The action ID |
| label | string | The user-friendly label for the action |
| description | string | Description of what the action does |
| recordType | string | The record type this action applies to |
| parameters | Object | Parameters that can be passed to the action |

## Executing Workflow Actions

You can execute workflow actions using the N/action module by referencing the workflow action's script ID.

**Example:**

```javascript
define(['N/action', 'N/record'], function(action, record) {

    function executeWorkflowAction() {
        // Execute a custom workflow action
        var result = action.execute({
            recordType: record.Type.SALES_ORDER,
            id: 1234,
            action: 'customworkflow_approve_order'
        });

        return result;
    }

    return {
        execute: executeWorkflowAction
    };
});
```

## Executing Bulk Actions

You can execute actions on multiple records by iterating through them.

**Example:**

```javascript
define(['N/action', 'N/search'], function(action, search) {

    function bulkApprove() {
        var results = [];

        // Search for pending approval orders
        var orderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['status', 'anyof', 'SalesOrd:A'] // Pending Approval
            ],
            columns: ['internalid']
        });

        orderSearch.run().each(function(result) {
            try {
                var actionResult = action.execute({
                    recordType: 'salesorder',
                    id: result.id,
                    action: 'approve'
                });
                results.push({
                    id: result.id,
                    status: 'success',
                    result: actionResult
                });
            } catch (e) {
                results.push({
                    id: result.id,
                    status: 'error',
                    message: e.message
                });
            }
            return true; // Continue iteration
        });

        return results;
    }

    return {
        execute: bulkApprove
    };
});
```

## Common Record Actions

Common actions available for various record types include:

| Record Type | Action ID | Description |
|-------------|-----------|-------------|
| Sales Order | approve | Approve the sales order |
| Sales Order | reject | Reject the sales order |
| Purchase Order | approve | Approve the purchase order |
| Purchase Order | close | Close the purchase order |
| Expense Report | approve | Approve the expense report |
| Time Entry | approve | Approve the time entry |

**Note:** Available actions depend on your NetSuite account configuration, workflows, and enabled features.

## Best Practices

1. **Check action availability** - Use `action.find()` to verify actions exist before executing
2. **Handle errors gracefully** - Wrap action executions in try-catch blocks
3. **Monitor governance** - Action executions consume governance units
4. **Use async methods wisely** - Promise methods are useful for non-blocking operations
5. **Validate parameters** - Ensure required action parameters are provided
6. **Test in sandbox** - Always test action scripts in a sandbox environment first
7. **Log results** - Keep detailed logs of action executions for troubleshooting

## Error Handling

```javascript
define(['N/action', 'N/log'], function(action, log) {

    function safeExecute(recordType, recordId, actionId) {
        try {
            // First check if action exists
            var availableActions = action.find({
                recordType: recordType,
                recordId: recordId
            });

            if (!availableActions[actionId]) {
                log.error('Action Not Found',
                    'Action ' + actionId + ' not available for this record');
                return null;
            }

            // Execute the action
            var result = action.execute({
                recordType: recordType,
                id: recordId,
                action: actionId
            });

            log.audit('Action Executed', {
                recordType: recordType,
                recordId: recordId,
                action: actionId,
                result: result
            });

            return result;

        } catch (e) {
            log.error('Action Execution Failed', {
                recordType: recordType,
                recordId: recordId,
                action: actionId,
                error: e.message
            });
            throw e;
        }
    }

    return {
        execute: safeExecute
    };
});
```

## Related Documentation

- [Official N/action Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4424739498.html)
- [SuiteScript 2.x Actions Tutorial](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4424758609.html)
