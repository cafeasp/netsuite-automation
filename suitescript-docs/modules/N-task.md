# N/task Module

Use the N/task module to create tasks and place them in the internal NetSuite scheduling or task queue.

## Module Import

```javascript
define(['N/task'], function(task) {
    // Your code here
});
```

## Supported Script Types

- Server Scripts Only (Scheduled, Map/Reduce, RESTlet, Suitelet, User Event, Bundle Installation)

**Note:** Tasks are always triggered asynchronously, regardless of task type.

## Task Types

| Task Type | Description |
|-----------|-------------|
| SCHEDULED_SCRIPT | Submit a scheduled script for execution |
| MAP_REDUCE | Run a map/reduce script |
| CSV_IMPORT | Import CSV files |
| ENTITY_DEDUPLICATION | Merge duplicate records |
| SEARCH | Execute asynchronous searches |
| QUERY | Execute constructed queries |
| SUITE_QL | Execute SuiteQL queries |
| WORKFLOW_TRIGGER | Execute asynchronous workflows |
| RECORD_ACTION | Execute record actions |
| DOCUMENT_CAPTURE | Extract content from documents |

## Module Methods

### task.create(options)

Creates a task object.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| taskType | string | Yes | Type of task (use `task.TaskType` enum) |
| scriptId | number/string | Depends | Script ID for script-based tasks |
| deploymentId | string | No | Deployment ID |
| params | Object | No | Script parameters |

**Returns:** Task object (type depends on taskType)

### task.checkStatus(options)

Returns the status of a submitted task.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| taskId | string | Yes | Task ID returned from submit() |

**Returns:** TaskStatus object

## Scheduled Script Task

### Creating and Submitting

```javascript
var scheduledTask = task.create({
    taskType: task.TaskType.SCHEDULED_SCRIPT,
    scriptId: 'customscript_my_scheduled',
    deploymentId: 'customdeploy_my_deployment',
    params: {
        custscript_param1: 'value1',
        custscript_param2: 123
    }
});

var taskId = scheduledTask.submit();
log.audit('Task submitted', 'Task ID: ' + taskId);
```

### Checking Status

```javascript
var status = task.checkStatus({
    taskId: taskId
});

log.debug('Status', status.status);
// Possible values: PENDING, PROCESSING, COMPLETE, FAILED
```

### ScheduledScriptTask Properties

| Property | Type | Description |
|----------|------|-------------|
| id | string | Task ID |
| scriptId | number/string | Script ID |
| deploymentId | string | Deployment ID |
| params | Object | Script parameters |

### ScheduledScriptTaskStatus Properties

| Property | Type | Description |
|----------|------|-------------|
| taskId | string | Task ID |
| status | string | Task status |
| scriptId | number | Script internal ID |
| deploymentId | string | Deployment ID |

## Map/Reduce Script Task

### Creating and Submitting

```javascript
var mrTask = task.create({
    taskType: task.TaskType.MAP_REDUCE,
    scriptId: 'customscript_my_mapreduce',
    deploymentId: 'customdeploy_mr_deployment',
    params: {
        custscript_search_id: 'customsearch_items'
    }
});

var taskId = mrTask.submit();
```

### Checking Status with Progress

```javascript
var mrStatus = task.checkStatus({
    taskId: taskId
});

log.debug('Stage', mrStatus.stage);
log.debug('Status', mrStatus.status);
log.debug('Percent Complete', mrStatus.getPercentageCompleted());
log.debug('Pending Map', mrStatus.getPendingMapCount());
log.debug('Pending Reduce', mrStatus.getPendingReduceCount());
```

### MapReduceScriptTaskStatus Methods

| Method | Returns | Description |
|--------|---------|-------------|
| getPercentageCompleted() | number | Current completion percentage |
| getPendingMapCount() | number | Records pending map stage |
| getPendingReduceCount() | number | Records pending reduce stage |
| getTotalMapCount() | number | Total records for map |
| getTotalReduceCount() | number | Total records for reduce |
| getCurrentTotalSize() | number | Total size in bytes |

### MapReduceScriptTaskStatus Properties

| Property | Type | Description |
|----------|------|-------------|
| stage | string | Current stage (GET_INPUT, MAP, SHUFFLE, REDUCE, SUMMARIZE) |
| status | string | Task status |

## CSV Import Task

### Creating and Submitting

```javascript
var csvTask = task.create({
    taskType: task.TaskType.CSV_IMPORT
});

csvTask.mappingId = 'custimport_my_import_map';  // Import map ID
csvTask.importFile = fileObj;  // file.File object
csvTask.name = 'My CSV Import';
csvTask.queueId = 1;  // Optional queue number

var taskId = csvTask.submit();
```

### Using File Path

```javascript
var csvTask = task.create({
    taskType: task.TaskType.CSV_IMPORT
});

csvTask.mappingId = 123;  // Internal ID of import map
csvTask.importFile = file.load({
    id: 'SuiteScripts/imports/data.csv'
});

var taskId = csvTask.submit();
```

### Linked Files (Multi-file Import)

```javascript
var csvTask = task.create({
    taskType: task.TaskType.CSV_IMPORT
});

csvTask.mappingId = 'custimport_multifile';
csvTask.importFile = primaryFileObj;
csvTask.linkedFiles = {
    'addressfile': addressFileObj,
    'contactfile': contactFileObj
};

var taskId = csvTask.submit();
```

### CsvImportTask Properties

| Property | Type | Description |
|----------|------|-------------|
| id | string | Task ID |
| mappingId | number/string | Import map ID |
| importFile | file.File/string | CSV file or CSV text |
| linkedFiles | Object | Linked files for multi-file imports |
| name | string | Task name |
| queueId | number | Queue number |

## Entity Deduplication Task

### Creating and Submitting

```javascript
var dedupeTask = task.create({
    taskType: task.TaskType.ENTITY_DEDUPLICATION
});

dedupeTask.entityType = task.DedupeEntityType.CUSTOMER;
dedupeTask.dedupeMode = task.DedupeMode.MERGE;
dedupeTask.masterRecordId = 1000;  // Keep this record
dedupeTask.masterSelectionMode = task.MasterSelectionMode.SELECT_BY_ID;
dedupeTask.recordIds = [1001, 1002, 1003];  // Merge these into master

var taskId = dedupeTask.submit();
```

### DedupeEntityType Enum

```javascript
task.DedupeEntityType.CUSTOMER
task.DedupeEntityType.CONTACT
task.DedupeEntityType.VENDOR
task.DedupeEntityType.PARTNER
task.DedupeEntityType.LEAD
task.DedupeEntityType.PROSPECT
```

### DedupeMode Enum

```javascript
task.DedupeMode.MERGE        // Merge duplicates into master
task.DedupeMode.DELETE       // Delete duplicates
task.DedupeMode.MAKE_MASTER_PARENT  // Make master the parent
task.DedupeMode.MARK_AS_NOT_DUPES   // Mark as not duplicates
```

### MasterSelectionMode Enum

```javascript
task.MasterSelectionMode.SELECT_BY_ID
task.MasterSelectionMode.MOST_RECENT_ACTIVITY
task.MasterSelectionMode.MOST_RECENT_CREATION
task.MasterSelectionMode.MOST_ORDERS
task.MasterSelectionMode.MOST_BALANCE
```

## Search Task (Asynchronous)

### Creating and Submitting

```javascript
var searchTask = task.create({
    taskType: task.TaskType.SEARCH
});

searchTask.savedSearchId = 123;  // Saved search internal ID
searchTask.filePath = 'SuiteScripts/exports/results.csv';  // Output file path

// Or use file ID
// searchTask.fileId = 456;

var taskId = searchTask.submit();
```

### Adding Dependent Scripts

```javascript
var searchTask = task.create({
    taskType: task.TaskType.SEARCH
});

searchTask.savedSearchId = 123;
searchTask.filePath = 'SuiteScripts/exports/results.csv';

// Run this script when search completes
searchTask.addInboundDependency({
    taskType: task.TaskType.SCHEDULED_SCRIPT,
    scriptId: 'customscript_process_results',
    deploymentId: 'customdeploy_process'
});

var taskId = searchTask.submit();
```

## Query Task (N/query)

### Creating and Submitting

```javascript
var queryTask = task.create({
    taskType: task.TaskType.QUERY
});

queryTask.query = myQueryObject;  // N/query Query object
queryTask.filePath = 'SuiteScripts/exports/query_results.csv';

var taskId = queryTask.submit();
```

## SuiteQL Task

### Creating and Submitting

```javascript
var suiteQLTask = task.create({
    taskType: task.TaskType.SUITE_QL
});

suiteQLTask.query = "SELECT id, companyname FROM customer WHERE isinactive = 'F'";
suiteQLTask.params = [];  // Query parameters
suiteQLTask.filePath = 'SuiteScripts/exports/suiteql_results.csv';

var taskId = suiteQLTask.submit();
```

### With Parameters

```javascript
var suiteQLTask = task.create({
    taskType: task.TaskType.SUITE_QL
});

suiteQLTask.query = "SELECT id, companyname FROM customer WHERE balance > ? AND category = ?";
suiteQLTask.params = [1000, 'Corporate'];
suiteQLTask.filePath = 'SuiteScripts/exports/filtered.csv';

var taskId = suiteQLTask.submit();
```

## Workflow Trigger Task

### Creating and Submitting

```javascript
var workflowTask = task.create({
    taskType: task.TaskType.WORKFLOW_TRIGGER
});

workflowTask.workflowId = 'customworkflow_approval';  // Workflow ID
workflowTask.recordType = 'salesorder';
workflowTask.recordId = 12345;
workflowTask.params = {
    custworkflow_param: 'value'
};

var taskId = workflowTask.submit();
```

## Record Action Task

### Creating and Submitting

```javascript
var actionTask = task.create({
    taskType: task.TaskType.RECORD_ACTION
});

actionTask.recordType = 'salesorder';
actionTask.action = 'approve';  // Action ID
actionTask.condition = task.ActionCondition.ALL_QUALIFIED_INSTANCES;

// Or specify specific records
actionTask.params = [
    { recordId: 1001 },
    { recordId: 1002 },
    { recordId: 1003 }
];

var taskId = actionTask.submit();
```

## Document Capture Task

### Creating and Submitting

```javascript
var docTask = task.create({
    taskType: task.TaskType.DOCUMENT_CAPTURE
});

docTask.inputFile = fileObj;  // Document file
docTask.documentType = 'INVOICE';
docTask.features = ['fields', 'tables', 'text'];
docTask.language = 'en';
docTask.outputFilePath = 'SuiteScripts/captured/output.json';

var taskId = docTask.submit();
```

## task.TaskType Enum

```javascript
task.TaskType.SCHEDULED_SCRIPT
task.TaskType.MAP_REDUCE
task.TaskType.CSV_IMPORT
task.TaskType.ENTITY_DEDUPLICATION
task.TaskType.SEARCH
task.TaskType.QUERY
task.TaskType.SUITE_QL
task.TaskType.WORKFLOW_TRIGGER
task.TaskType.RECORD_ACTION
task.TaskType.DOCUMENT_CAPTURE
```

## task.TaskStatus Enum

```javascript
task.TaskStatus.PENDING     // Task is queued
task.TaskStatus.PROCESSING  // Task is running
task.TaskStatus.COMPLETE    // Task finished successfully
task.TaskStatus.FAILED      // Task failed
```

## task.MapReduceStage Enum

```javascript
task.MapReduceStage.GET_INPUT
task.MapReduceStage.MAP
task.MapReduceStage.SHUFFLE
task.MapReduceStage.REDUCE
task.MapReduceStage.SUMMARIZE
```

## Best Practices

1. **Store task IDs** - Save them to check status later
2. **Use deployments wisely** - Each deployment has its own queue
3. **Check for available processors** - Tasks wait if queue is full
4. **Handle task failures** - Implement retry logic or notifications
5. **Use dependent scripts** - Chain tasks together with addInboundDependency
6. **Consider governance** - Task submission consumes units

## Common Patterns

### Submit and Wait for Completion

```javascript
function submitAndWait(taskId, maxWaitSeconds) {
    var startTime = new Date().getTime();
    var maxWait = maxWaitSeconds * 1000;

    while (true) {
        var status = task.checkStatus({ taskId: taskId });

        if (status.status === task.TaskStatus.COMPLETE) {
            return { success: true, status: status };
        }

        if (status.status === task.TaskStatus.FAILED) {
            return { success: false, status: status };
        }

        var elapsed = new Date().getTime() - startTime;
        if (elapsed > maxWait) {
            return { success: false, error: 'Timeout' };
        }

        // Note: This approach may not work in all contexts
        // Consider checking status in a separate scheduled script
    }
}
```

### Chain Multiple Tasks

```javascript
var searchTask = task.create({
    taskType: task.TaskType.SEARCH
});
searchTask.savedSearchId = 123;
searchTask.filePath = 'exports/data.csv';

// Process results after search completes
searchTask.addInboundDependency({
    taskType: task.TaskType.MAP_REDUCE,
    scriptId: 'customscript_process_data',
    deploymentId: 'customdeploy_process'
});

var taskId = searchTask.submit();
```

## Error Handling

```javascript
try {
    var mrTask = task.create({
        taskType: task.TaskType.MAP_REDUCE,
        scriptId: 'customscript_my_mapreduce'
    });

    var taskId = mrTask.submit();
    log.audit('Task Submitted', taskId);

} catch (e) {
    if (e.name === 'NO_DEPLOYMENT_AVAILABLE') {
        log.error('No Deployment', 'All deployments are in use');
    } else {
        log.error('Task Error', e.message);
    }
}
```

## Related Documentation

- [Official N/task Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4345787858.html)
- [SuiteCloud Processors](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1539110591.html)
