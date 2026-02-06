# SuiteScript 2.x Common Patterns and Best Practices

A collection of proven patterns, best practices, and reusable code snippets for SuiteScript development.

## Table of Contents

1. [Record Operations](#record-operations)
2. [Search Patterns](#search-patterns)
3. [Error Handling](#error-handling)
4. [Governance Management](#governance-management)
5. [Logging Practices](#logging-practices)
6. [Performance Optimization](#performance-optimization)
7. [Script Communication](#script-communication)
8. [Common Utilities](#common-utilities)

---

## Record Operations

### Create Record with Error Handling

```javascript
function createRecord(recordType, fieldValues) {
    try {
        var newRecord = record.create({
            type: recordType,
            isDynamic: true
        });

        Object.keys(fieldValues).forEach(function(fieldId) {
            newRecord.setValue({
                fieldId: fieldId,
                value: fieldValues[fieldId]
            });
        });

        return newRecord.save({
            enableSourcing: true,
            ignoreMandatoryFields: false
        });

    } catch (e) {
        log.error('Create Record Error', {
            type: recordType,
            error: e.message
        });
        throw e;
    }
}
```

### Efficient Field Updates (submitFields)

Use `submitFields` when updating a few fields - it's more efficient than load/save:

```javascript
// Good - efficient for simple updates
record.submitFields({
    type: record.Type.CUSTOMER,
    id: customerId,
    values: {
        comments: 'Updated',
        custentity_last_contact: new Date()
    }
});

// Avoid - loads entire record for simple update
var rec = record.load({ type: record.Type.CUSTOMER, id: customerId });
rec.setValue({ fieldId: 'comments', value: 'Updated' });
rec.save();
```

### Sublist Operations (Standard vs Dynamic)

```javascript
// Standard Mode - direct line access
function addLinesStandard(rec, items) {
    items.forEach(function(item, index) {
        rec.setSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            line: index,
            value: item.id
        });
        rec.setSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            line: index,
            value: item.qty
        });
    });
}

// Dynamic Mode - mimics UI behavior with sourcing
function addLinesDynamic(rec, items) {
    items.forEach(function(item) {
        rec.selectNewLine({ sublistId: 'item' });
        rec.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            value: item.id
        });
        rec.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            value: item.qty
        });
        rec.commitLine({ sublistId: 'item' });
    });
}
```

---

## Search Patterns

### Process All Search Results

```javascript
function getAllSearchResults(searchObj) {
    var allResults = [];
    var pagedData = searchObj.runPaged({ pageSize: 1000 });

    pagedData.pageRanges.forEach(function(pageRange) {
        var page = pagedData.fetch({ index: pageRange.index });
        page.data.forEach(function(result) {
            allResults.push(result);
        });
    });

    return allResults;
}
```

### Search with Callback (Memory Efficient)

```javascript
function processSearchResults(searchObj, callback) {
    var count = 0;
    
    searchObj.run().each(function(result) {
        callback(result, count);
        count++;
        return true; // Continue
    });
    
    return count;
}

// Usage
var processed = processSearchResults(mySearch, function(result, index) {
    log.debug('Processing', result.id);
    // Do something with result
});
```

### Dynamic Filter Building

```javascript
function buildSearchFilters(criteria) {
    var filters = [];

    if (criteria.customer) {
        filters.push(['entity', 'anyof', criteria.customer]);
    }

    if (criteria.dateFrom) {
        if (filters.length > 0) filters.push('AND');
        filters.push(['trandate', 'onorafter', criteria.dateFrom]);
    }

    if (criteria.dateTo) {
        if (filters.length > 0) filters.push('AND');
        filters.push(['trandate', 'onorbefore', criteria.dateTo]);
    }

    if (criteria.statuses && criteria.statuses.length > 0) {
        if (filters.length > 0) filters.push('AND');
        filters.push(['status', 'anyof', criteria.statuses]);
    }

    return filters;
}
```

### Lookup Fields Pattern

```javascript
function getRecordFields(recordType, recordId, fields) {
    var result = search.lookupFields({
        type: recordType,
        id: recordId,
        columns: fields
    });

    // Handle select fields (they return arrays)
    Object.keys(result).forEach(function(key) {
        if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key + '_value'] = result[key][0].value;
            result[key + '_text'] = result[key][0].text;
        }
    });

    return result;
}
```

---

## Error Handling

### Comprehensive Error Handler

```javascript
function handleError(e, context) {
    var errorInfo = {
        name: e.name || 'Unknown',
        message: e.message || 'No message',
        stack: e.stack || 'No stack trace',
        context: context || {}
    };

    log.error('Script Error', errorInfo);

    // Categorize error for appropriate handling
    switch (e.name) {
        case 'RCRD_DSNT_EXIST':
            return { handled: true, message: 'Record not found' };
        case 'INSUFFICIENT_PERMISSION':
            return { handled: true, message: 'Permission denied' };
        case 'SSS_USAGE_LIMIT_EXCEEDED':
            return { handled: false, message: 'Governance exceeded' };
        default:
            return { handled: false, message: e.message };
    }
}
```

### Try-Catch Wrapper

```javascript
function safeExecute(fn, defaultValue) {
    try {
        return fn();
    } catch (e) {
        log.error('Safe Execute Error', e.message);
        return defaultValue;
    }
}

// Usage
var value = safeExecute(function() {
    return record.load({ type: 'customer', id: 123 });
}, null);
```

### Custom Error Creation

```javascript
function throwValidationError(fieldName, message) {
    throw error.create({
        name: 'VALIDATION_ERROR',
        message: 'Field "' + fieldName + '": ' + message,
        notifyOff: false
    });
}
```

---

## Governance Management

### Check Governance Before Operations

```javascript
function checkGovernance(minRequired, script) {
    var remaining = script.getRemainingUsage();
    
    if (remaining < minRequired) {
        log.audit('Governance Low', {
            remaining: remaining,
            required: minRequired
        });
        return false;
    }
    
    return true;
}

// Usage in scheduled script
var script = runtime.getCurrentScript();
mySearch.run().each(function(result) {
    if (!checkGovernance(200, script)) {
        return false; // Stop processing
    }
    // Process result...
    return true;
});
```

### Governance-Aware Batch Processing

```javascript
function processBatch(items, processFunction, governanceBuffer) {
    var script = runtime.getCurrentScript();
    var processed = 0;
    
    for (var i = 0; i < items.length; i++) {
        if (script.getRemainingUsage() < governanceBuffer) {
            log.audit('Batch Stopped', 'Processed: ' + processed + ' of ' + items.length);
            return {
                complete: false,
                processed: processed,
                remaining: items.slice(i)
            };
        }
        
        processFunction(items[i]);
        processed++;
    }
    
    return {
        complete: true,
        processed: processed,
        remaining: []
    };
}
```

---

## Logging Practices

### Structured Logging

```javascript
var Logger = {
    prefix: '',
    
    setPrefix: function(prefix) {
        this.prefix = prefix ? '[' + prefix + '] ' : '';
    },
    
    debug: function(title, details) {
        log.debug(this.prefix + title, details);
    },
    
    audit: function(title, details) {
        log.audit(this.prefix + title, details);
    },
    
    error: function(title, details) {
        log.error(this.prefix + title, details);
    },
    
    startTimer: function(name) {
        this._timers = this._timers || {};
        this._timers[name] = new Date().getTime();
    },
    
    endTimer: function(name) {
        if (this._timers && this._timers[name]) {
            var elapsed = new Date().getTime() - this._timers[name];
            this.debug('Timer: ' + name, elapsed + 'ms');
            return elapsed;
        }
        return 0;
    }
};

// Usage
Logger.setPrefix('CustomerSync');
Logger.startTimer('search');
// ... do search
Logger.endTimer('search');
```

### Conditional Logging

```javascript
var DEBUG_MODE = runtime.getCurrentScript().getParameter({
    name: 'custscript_debug_mode'
}) === 'T';

function debugLog(title, details) {
    if (DEBUG_MODE) {
        log.debug(title, details);
    }
}
```

---

## Performance Optimization

### Caching with N/cache

```javascript
function getCachedData(key, loaderFunction, ttlSeconds) {
    var dataCache = cache.getCache({
        name: 'myScriptCache',
        scope: cache.Scope.PRIVATE
    });

    var cachedValue = dataCache.get({ key: key });
    
    if (cachedValue) {
        return JSON.parse(cachedValue);
    }

    var freshValue = loaderFunction();
    
    dataCache.put({
        key: key,
        value: JSON.stringify(freshValue),
        ttl: ttlSeconds || 300
    });

    return freshValue;
}

// Usage
var exchangeRates = getCachedData('exchange_rates', function() {
    // Expensive operation to get exchange rates
    return fetchExchangeRates();
}, 3600);
```

### Bulk Operations

```javascript
// Instead of multiple submitFields calls
items.forEach(function(item) {
    record.submitFields({
        type: 'inventoryitem',
        id: item.id,
        values: { custitem_processed: true }
    });
});

// Use a Map/Reduce script for large datasets
// Or batch updates with governance checks
```

### Minimize Search Columns

```javascript
// Only request columns you need
var search = search.create({
    type: 'salesorder',
    filters: [...],
    columns: ['tranid', 'entity', 'total']  // Not *all* columns
});
```

---

## Script Communication

### Pass Data via Script Parameters

```javascript
// Scheduled script with parameters
var scheduledTask = task.create({
    taskType: task.TaskType.SCHEDULED_SCRIPT,
    scriptId: 'customscript_process',
    deploymentId: 'customdeploy_process',
    params: {
        custscript_data: JSON.stringify(dataToPass)
    }
});

// Receiving script
var data = JSON.parse(runtime.getCurrentScript().getParameter({
    name: 'custscript_data'
}));
```

### Session Storage (Client Scripts)

```javascript
// Set session data
var session = runtime.getCurrentSession();
session.set({ name: 'selectedItems', value: JSON.stringify([1,2,3]) });

// Get session data
var items = JSON.parse(session.get({ name: 'selectedItems' }));
```

### Suitelet to Client Communication

```javascript
// In Suitelet - add hidden field
var dataField = form.addField({
    id: 'custpage_data',
    type: serverWidget.FieldType.LONGTEXT,
    label: 'Data'
});
dataField.updateDisplayType({
    displayType: serverWidget.FieldDisplayType.HIDDEN
});
dataField.defaultValue = JSON.stringify(serverData);

// In Client Script
function pageInit(context) {
    var rec = context.currentRecord;
    var data = JSON.parse(rec.getValue({ fieldId: 'custpage_data' }));
    // Use data...
}
```

---

## Common Utilities

### Date Utilities

```javascript
var DateUtils = {
    addDays: function(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    getFirstDayOfMonth: function(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    getLastDayOfMonth: function(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },

    formatDate: function(date) {
        return format.format({
            value: date,
            type: format.Type.DATE
        });
    },

    parseDate: function(dateString) {
        return format.parse({
            value: dateString,
            type: format.Type.DATE
        });
    }
};
```

### String Utilities

```javascript
var StringUtils = {
    isEmpty: function(str) {
        return !str || str.trim().length === 0;
    },

    truncate: function(str, maxLength) {
        if (!str || str.length <= maxLength) return str;
        return str.substring(0, maxLength - 3) + '...';
    },

    padLeft: function(str, length, char) {
        str = String(str);
        char = char || '0';
        while (str.length < length) {
            str = char + str;
        }
        return str;
    }
};
```

### Array Utilities

```javascript
var ArrayUtils = {
    chunk: function(array, size) {
        var chunks = [];
        for (var i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },

    unique: function(array) {
        return array.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });
    },

    groupBy: function(array, key) {
        return array.reduce(function(groups, item) {
            var group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    }
};
```

---

## Best Practices Summary

1. **Use submitFields** for simple updates instead of load/save
2. **Check governance** before expensive operations
3. **Handle errors gracefully** - don't let scripts fail silently
4. **Log meaningfully** - include context in error logs
5. **Use pagination** for large search results
6. **Cache expensive lookups** when data doesn't change often
7. **Minimize API calls** - batch operations when possible
8. **Choose the right script type** for your use case
9. **Test in sandbox** before deploying to production
10. **Document your code** - future you will thank you

---

## Related Resources

- [SuiteScript 2.x API Reference](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4140956840.html)
- [SuiteScript Best Practices](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4387172495.html)
- [Governance Guidelines](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1539110591.html)
