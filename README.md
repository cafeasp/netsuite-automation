# NetSuite Automation

A sample NetSuite SuiteScript 2.1 automation project demonstrating Map/Reduce script functionality for processing saved search results and sending emails.

## Overview

This project contains a Map/Reduce script that:
1. Loads a saved search to retrieve records
2. Extracts the first name from each search result
3. Sends a personalized email for each record

## Prerequisites

- NetSuite account with SuiteScript 2.1 support
- Valid employee record (for email author)
- A configured saved search in NetSuite

## Project Structure

```
netsuite-automation/
├── mr_send_firstname_email.js    # Main Map/Reduce script
├── package.json                   # Project metadata
├── README.md                      # This file
└── suitescript-docs/              # SuiteScript 2.x reference documentation
    ├── README.md                  # Documentation overview
    ├── common-patterns.md         # Best practices and patterns
    ├── modules/                   # N/ module API documentation
    └── examples/                  # Script type templates
```

## Script Details

### mr_send_firstname_email.js

| Property | Value |
|----------|-------|
| **Script Type** | Map/Reduce |
| **API Version** | 2.1 |
| **Module Scope** | SameAccount |

**Modules Used:**
- `N/search` - Load and execute saved searches
- `N/email` - Send emails
- `N/runtime` - Get current user information

**Entry Points:**
- `getInputData` - Loads saved search (ID: 1234)
- `map` - Processes each result and sends email

## Installation & Deployment

### 1. Upload Script to NetSuite

1. Navigate to **Customization > Scripting > Scripts > New**
2. Upload `mr_send_firstname_email.js` to the File Cabinet (typically under `SuiteScripts/`)
3. Create a new Script record:
   - **Name:** Send First Name Email
   - **Script File:** Select the uploaded file
   - **Script Type:** Map/Reduce Script

### 2. Create Script Deployment

1. On the Script record, click **Deploy Script**
2. Configure deployment settings:
   - **Status:** Testing (for initial testing) or Released
   - **Log Level:** Debug (for troubleshooting)
   - **Execute As Role:** Choose appropriate role with permissions
3. Save the deployment

### 3. Configure Saved Search

The script expects a saved search with ID `1234`. You'll need to:

1. Create a saved search in NetSuite with your desired criteria
2. Update the script to use your search's internal ID:
   ```javascript
   return search.load({ id: 'YOUR_SEARCH_ID' });
   ```

> **Tip:** Consider making the search ID a script parameter for easier configuration without code changes.

## Usage

### Manual Execution

1. Navigate to **Customization > Scripting > Script Deployments**
2. Find your deployment and click **Execute**

### Scheduled Execution

Configure the deployment with a schedule:
1. Edit the Script Deployment
2. Set **Status** to Released
3. Configure the schedule under the **Schedule** subtab

## Configuration Notes

- **Email Author:** The script uses the current user as both author and recipient. Modify the `email.send()` call to customize recipients.
- **Search ID:** Currently hardcoded as `1234`. Update this value or refactor to use a script parameter.

## Documentation

The `suitescript-docs/` folder contains comprehensive SuiteScript 2.x reference documentation:

- **[Overview](suitescript-docs/README.md)** - Quick start guide and script type reference
- **[Common Patterns](suitescript-docs/common-patterns.md)** - Best practices and reusable code patterns
- **[Module Documentation](suitescript-docs/modules/)** - Detailed API docs for all N/ modules
- **[Script Examples](suitescript-docs/examples/)** - Complete templates for all script types

## Author

**cafeasp**

## License

This project is licensed under the MIT License.
