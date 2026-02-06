# SuiteScript 2.x Documentation

A comprehensive reference guide for NetSuite SuiteScript 2.x development.

## Overview

SuiteScript 2.x is NetSuite's JavaScript-based API that enables customization and automation of business processes. It uses the Asynchronous Module Definition (AMD) format to load modules, providing:

- **Modularity**: Load only the modules your script needs
- **Encapsulation**: No global variable or method naming conflicts
- **Dependency Management**: Automatic handling of module dependencies
- **Better Performance**: Reduced load time and computing requirements

## Documentation Structure

```
suitescript-docs/
├── README.md                      # This file - Overview and getting started
├── modules/                       # Detailed module documentation
│   ├── N-record.md               # Record operations
│   ├── N-search.md               # Search functionality
│   ├── N-task.md                 # Task scheduling
│   ├── N-ui-serverWidget.md      # Server-side UI components
│   └── ...                       # All other modules
├── examples/                      # Working code examples
│   ├── user-event-script.js      # User Event Script template
│   ├── scheduled-script.js       # Scheduled Script template
│   ├── client-script.js          # Client Script template
│   ├── restlet.js                # RESTlet template
│   ├── suitelet.js               # Suitelet template
│   └── map-reduce-script.js      # Map/Reduce Script template
└── common-patterns.md            # Best practices and patterns
```

## Quick Start

### Basic Script Structure (SuiteScript 2.0)

```javascript
/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'], function(record, search) {

    function beforeSubmit(context) {
        // Your logic here
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
```

### Basic Script Structure (SuiteScript 2.1)

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'], (record, search) => {

    const beforeSubmit = (context) => {
        // Your logic here with ES2019+ features
    };

    return { beforeSubmit };
});
```

## Script Types

| Script Type | Description | Use Cases |
|-------------|-------------|-----------|
| **User Event** | Runs on record create/load/update/delete | Validation, auto-population, real-time sync |
| **Client Script** | Runs in user's browser | Field validation, UI interactions |
| **Scheduled Script** | Runs on schedule or on-demand | Batch processing, maintenance tasks |
| **Map/Reduce** | Parallel processing of large datasets | High-volume data processing |
| **RESTlet** | Custom REST endpoints | External integrations |
| **Suitelet** | Custom NetSuite pages | Custom UI, reports |
| **Portlet** | Dashboard components | Custom dashboard widgets |
| **Workflow Action** | Custom workflow actions | Business process automation |

## Module Categories

### Core Modules
- **N/record** - Create, load, copy, delete, and modify records
- **N/search** - Create and run searches, analyze results
- **N/currentRecord** - Access the current record in client context
- **N/runtime** - Access runtime settings and information

### Data & Files
- **N/file** - Work with files in the File Cabinet
- **N/encode** - Convert strings between encodings
- **N/xml** - Parse and manipulate XML documents
- **N/compress** - Compress and archive files

### Communication
- **N/email** - Send regular, bulk, and campaign emails
- **N/http** / **N/https** - Make HTTP/HTTPS requests
- **N/sftp** - Secure file transfers

### UI Components
- **N/ui/serverWidget** - Create forms, lists, and UI elements
- **N/ui/dialog** - Modal dialogs (client-side)
- **N/ui/message** - Display messages (client-side)

### Task Management
- **N/task** - Schedule scripts, CSV imports, workflows
- **N/workflow** - Initiate and trigger workflows

### Security & Crypto
- **N/crypto** - Hashing, HMAC, encryption
- **N/auth** - Authentication operations

### Analytics
- **N/query** - SuiteAnalytics Workbook queries
- **N/dataset** - Create and manage datasets
- **N/workbook** - Create and manage workbooks

## Version Differences

### SuiteScript 2.0 vs 2.1

| Feature | 2.0 | 2.1 |
|---------|-----|-----|
| ES Version | ES5 | ES2019+ |
| Arrow Functions | ✗ | ✓ |
| async/await | ✗ | ✓ (limited modules) |
| Promises | Limited | Full support |
| Template Literals | ✗ | ✓ |
| Destructuring | ✗ | ✓ |

### Modules Supporting async/await (2.1 only)
- N/http
- N/https
- N/llm
- N/query
- N/search
- N/transaction

## Governance

SuiteScript operations consume usage units. Be mindful of governance limits:

| Script Type | Usage Limit |
|-------------|-------------|
| Client Script | 1,000 units |
| User Event | 1,000 units |
| Scheduled Script | 10,000 units |
| Map/Reduce | 10,000 units per stage |
| RESTlet | 5,000 units |
| Suitelet | 1,000 units |

## Resources

- [Official NetSuite Help Center](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4220488571.html)
- [SuiteScript 2.x API Reference](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4140956840.html)
- [SuiteScript Records Browser](https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2023_1/script/record/account.html)
- [GitHub Code Samples](https://github.com/oracle-samples/netsuite-suitecloud-samples)

## License

This documentation is provided for reference purposes. All SuiteScript APIs are property of Oracle NetSuite.
