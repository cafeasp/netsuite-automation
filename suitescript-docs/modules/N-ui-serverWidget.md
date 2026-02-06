# N/ui/serverWidget Module

Use the N/ui/serverWidget module to work with the user interface within NetSuite. This module enables you to create custom forms, lists, and other UI components with the NetSuite look and feel.

## Module Import

```javascript
define(['N/ui/serverWidget'], function(serverWidget) {
    // Your code here
});
```

## Supported Script Types

- Server Scripts Only (Suitelet, User Event beforeLoad, Portlet)

## Creating Forms

### serverWidget.createForm(options)

Creates a new form.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | Yes | Form title |
| hideNavBar | boolean | No | Hide navigation bar |

**Returns:** `serverWidget.Form`

**Example:**

```javascript
var form = serverWidget.createForm({
    title: 'Customer Entry Form',
    hideNavBar: false
});
```

## Form Object Methods

### addField(options)

Adds a field to the form.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Field ID (lowercase, no spaces) |
| type | string | Yes | Field type (use `serverWidget.FieldType`) |
| label | string | Yes | Field label |
| source | string | No | Record type for select fields |
| container | string | No | Field group or tab ID |

**Returns:** `serverWidget.Field`

**Example:**

```javascript
// Text field
var nameField = form.addField({
    id: 'custpage_name',
    type: serverWidget.FieldType.TEXT,
    label: 'Customer Name'
});

// Select field (from record type)
var customerField = form.addField({
    id: 'custpage_customer',
    type: serverWidget.FieldType.SELECT,
    label: 'Customer',
    source: 'customer'
});

// Currency field
var amountField = form.addField({
    id: 'custpage_amount',
    type: serverWidget.FieldType.CURRENCY,
    label: 'Amount'
});

// Date field
var dateField = form.addField({
    id: 'custpage_date',
    type: serverWidget.FieldType.DATE,
    label: 'Transaction Date'
});

// Checkbox
var activeField = form.addField({
    id: 'custpage_active',
    type: serverWidget.FieldType.CHECKBOX,
    label: 'Active'
});
```

### addFieldGroup(options)

Adds a field group to organize fields.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Group ID |
| label | string | Yes | Group label |
| tab | string | No | Tab to add group to |

**Returns:** `serverWidget.FieldGroup`

**Example:**

```javascript
var primaryGroup = form.addFieldGroup({
    id: 'custpage_primary',
    label: 'Primary Information'
});

var nameField = form.addField({
    id: 'custpage_name',
    type: serverWidget.FieldType.TEXT,
    label: 'Name',
    container: 'custpage_primary'
});
```

### addTab(options)

Adds a tab to the form.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Tab ID |
| label | string | Yes | Tab label |

**Returns:** `serverWidget.Tab`

**Example:**

```javascript
form.addTab({
    id: 'custpage_main',
    label: 'Main'
});

form.addTab({
    id: 'custpage_details',
    label: 'Details'
});
```

### addSubtab(options)

Adds a subtab to a tab.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Subtab ID |
| label | string | Yes | Subtab label |
| tab | string | Yes | Parent tab ID |

**Returns:** `serverWidget.Tab`

**Example:**

```javascript
form.addSubtab({
    id: 'custpage_items',
    label: 'Items',
    tab: 'custpage_main'
});
```

### addSublist(options)

Adds a sublist to the form.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Sublist ID |
| type | string | Yes | Sublist type (use `serverWidget.SublistType`) |
| label | string | Yes | Sublist label |
| tab | string | No | Tab ID to add sublist to |

**Returns:** `serverWidget.Sublist`

**Example:**

```javascript
var itemSublist = form.addSublist({
    id: 'custpage_items',
    type: serverWidget.SublistType.INLINEEDITOR,
    label: 'Items',
    tab: 'custpage_main'
});

// Add columns to sublist
itemSublist.addField({
    id: 'custpage_item',
    type: serverWidget.FieldType.SELECT,
    label: 'Item',
    source: 'item'
});

itemSublist.addField({
    id: 'custpage_qty',
    type: serverWidget.FieldType.INTEGER,
    label: 'Quantity'
});

itemSublist.addField({
    id: 'custpage_rate',
    type: serverWidget.FieldType.CURRENCY,
    label: 'Rate'
});
```

### addButton(options)

Adds a button to the form.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Button ID |
| label | string | Yes | Button label |
| functionName | string | No | Client script function to call |

**Returns:** `serverWidget.Button`

**Example:**

```javascript
form.addButton({
    id: 'custpage_calculate',
    label: 'Calculate',
    functionName: 'calculateTotal'
});
```

### addSubmitButton(options)

Adds a submit button.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| label | string | No | Button label (default: 'Submit') |

**Example:**

```javascript
form.addSubmitButton({
    label: 'Save Record'
});
```

### addResetButton(options)

Adds a reset button.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| label | string | No | Button label (default: 'Reset') |

**Example:**

```javascript
form.addResetButton({
    label: 'Clear Form'
});
```

### clientScriptModulePath / clientScriptFileId

Associates a client script with the form.

```javascript
// By file path
form.clientScriptModulePath = 'SuiteScripts/client_form.js';

// Or by file ID
form.clientScriptFileId = 123;
```

## Field Object Properties and Methods

### Field Properties

| Property | Type | Description |
|----------|------|-------------|
| id | string | Field ID |
| type | string | Field type |
| label | string | Field label |

### setHelpText(options)

Sets help text for the field.

```javascript
field.setHelpText({
    help: 'Enter the customer name',
    showInlineForAssistant: true
});
```

### updateDisplayType(options)

Updates how the field is displayed.

```javascript
// Make read-only
field.updateDisplayType({
    displayType: serverWidget.FieldDisplayType.INLINE
});

// Hide field
field.updateDisplayType({
    displayType: serverWidget.FieldDisplayType.HIDDEN
});

// Make disabled
field.updateDisplayType({
    displayType: serverWidget.FieldDisplayType.DISABLED
});
```

### updateLayoutType(options)

Updates the layout of the field.

```javascript
field.updateLayoutType({
    layoutType: serverWidget.FieldLayoutType.NORMAL
});
```

### updateBreakType(options)

Sets line break behavior.

```javascript
field.updateBreakType({
    breakType: serverWidget.FieldBreakType.STARTCOL
});
```

### isMandatory

Sets whether the field is required.

```javascript
field.isMandatory = true;
```

### defaultValue

Sets the default value.

```javascript
field.defaultValue = 'Default Text';
// For checkboxes use 'T' or 'F'
checkboxField.defaultValue = 'T';
```

### addSelectOption(options)

Adds an option to a select field.

```javascript
var statusField = form.addField({
    id: 'custpage_status',
    type: serverWidget.FieldType.SELECT,
    label: 'Status'
});

statusField.addSelectOption({
    value: '',
    text: '- Select -'
});

statusField.addSelectOption({
    value: 'pending',
    text: 'Pending',
    isSelected: true  // Default selection
});

statusField.addSelectOption({
    value: 'approved',
    text: 'Approved'
});

statusField.addSelectOption({
    value: 'rejected',
    text: 'Rejected'
});
```

### maxLength

Sets maximum character length for text fields.

```javascript
field.maxLength = 100;
```

### linkText

Sets the link text for URL fields.

```javascript
urlField.linkText = 'Click Here';
```

## Sublist Object Methods

### addField(options)

Adds a column to the sublist.

```javascript
sublist.addField({
    id: 'custpage_col_name',
    type: serverWidget.FieldType.TEXT,
    label: 'Name'
});
```

### setSublistValue(options)

Sets a value in the sublist.

```javascript
sublist.setSublistValue({
    id: 'custpage_item',
    line: 0,
    value: '123'
});

sublist.setSublistValue({
    id: 'custpage_qty',
    line: 0,
    value: '10'
});
```

### addButton(options)

Adds a button to the sublist.

```javascript
sublist.addButton({
    id: 'custpage_add',
    label: 'Add Item',
    functionName: 'addItemLine'
});
```

### addMarkAllButtons()

Adds Mark All / Unmark All buttons for list sublists.

```javascript
sublist.addMarkAllButtons();
```

### addRefreshButton()

Adds a refresh button.

```javascript
sublist.addRefreshButton();
```

## serverWidget.FieldType Enum

```javascript
serverWidget.FieldType.CHECKBOX
serverWidget.FieldType.CURRENCY
serverWidget.FieldType.DATE
serverWidget.FieldType.DATETIME
serverWidget.FieldType.DATETIMETZ
serverWidget.FieldType.EMAIL
serverWidget.FieldType.FILE
serverWidget.FieldType.FLOAT
serverWidget.FieldType.HELP
serverWidget.FieldType.IMAGE
serverWidget.FieldType.INLINEHTML
serverWidget.FieldType.INTEGER
serverWidget.FieldType.LABEL
serverWidget.FieldType.LONGTEXT
serverWidget.FieldType.MULTISELECT
serverWidget.FieldType.PASSWORD
serverWidget.FieldType.PERCENT
serverWidget.FieldType.PHONE
serverWidget.FieldType.RADIO
serverWidget.FieldType.RICHTEXT
serverWidget.FieldType.SELECT
serverWidget.FieldType.TEXT
serverWidget.FieldType.TEXTAREA
serverWidget.FieldType.TIMEOFDAY
serverWidget.FieldType.URL
```

## serverWidget.FieldDisplayType Enum

```javascript
serverWidget.FieldDisplayType.DISABLED    // Shows but can't edit
serverWidget.FieldDisplayType.ENTRY       // Normal editable
serverWidget.FieldDisplayType.HIDDEN      // Not shown
serverWidget.FieldDisplayType.INLINE      // Read-only display
serverWidget.FieldDisplayType.NORMAL      // Standard display
serverWidget.FieldDisplayType.READONLY    // Read-only
```

## serverWidget.SublistType Enum

```javascript
serverWidget.SublistType.EDITOR         // Like UI sublist
serverWidget.SublistType.INLINEEDITOR   // Inline editing
serverWidget.SublistType.LIST           // Display only with checkbox
serverWidget.SublistType.STATICLIST     // Static read-only list
```

## serverWidget.FieldLayoutType Enum

```javascript
serverWidget.FieldLayoutType.NORMAL
serverWidget.FieldLayoutType.OUTSIDE
serverWidget.FieldLayoutType.OUTSIDEBELOW
serverWidget.FieldLayoutType.OUTSIDEABOVE
serverWidget.FieldLayoutType.STARTROW
serverWidget.FieldLayoutType.MIDROW
serverWidget.FieldLayoutType.ENDROW
```

## serverWidget.FieldBreakType Enum

```javascript
serverWidget.FieldBreakType.NONE
serverWidget.FieldBreakType.STARTCOL
serverWidget.FieldBreakType.STARTROW
```

## Creating Lists

### serverWidget.createList(options)

Creates a list (non-form display).

```javascript
var list = serverWidget.createList({
    title: 'Customer List'
});

list.addColumn({
    id: 'custpage_id',
    type: serverWidget.FieldType.TEXT,
    label: 'ID'
});

list.addColumn({
    id: 'custpage_name',
    type: serverWidget.FieldType.TEXT,
    label: 'Name'
});

list.addColumn({
    id: 'custpage_email',
    type: serverWidget.FieldType.EMAIL,
    label: 'Email'
});

// Add rows
list.addRow({
    row: {
        custpage_id: '1',
        custpage_name: 'ABC Company',
        custpage_email: 'contact@abc.com'
    }
});
```

## Creating Assistants

### serverWidget.createAssistant(options)

Creates a multi-step assistant (wizard).

```javascript
var assistant = serverWidget.createAssistant({
    title: 'Setup Wizard',
    hideNavBar: false
});

// Add steps
var step1 = assistant.addStep({
    id: 'custpage_step1',
    label: 'Basic Information'
});

var step2 = assistant.addStep({
    id: 'custpage_step2',
    label: 'Configuration'
});

var step3 = assistant.addStep({
    id: 'custpage_step3',
    label: 'Review'
});

// Add fields to steps
assistant.addField({
    id: 'custpage_company',
    type: serverWidget.FieldType.TEXT,
    label: 'Company Name',
    container: 'custpage_step1'
});
```

## Complete Suitelet Example

```javascript
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search', 'N/redirect'], function(serverWidget, search, redirect) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Create form
            var form = serverWidget.createForm({
                title: 'New Customer Entry'
            });

            // Add client script
            form.clientScriptModulePath = 'SuiteScripts/customer_form_client.js';

            // Add field group
            form.addFieldGroup({
                id: 'custpage_info',
                label: 'Customer Information'
            });

            // Add fields
            var nameField = form.addField({
                id: 'custpage_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Company Name',
                container: 'custpage_info'
            });
            nameField.isMandatory = true;

            var emailField = form.addField({
                id: 'custpage_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email',
                container: 'custpage_info'
            });

            var categoryField = form.addField({
                id: 'custpage_category',
                type: serverWidget.FieldType.SELECT,
                label: 'Category',
                container: 'custpage_info'
            });
            categoryField.addSelectOption({ value: '', text: '' });
            categoryField.addSelectOption({ value: '1', text: 'Corporate' });
            categoryField.addSelectOption({ value: '2', text: 'Individual' });

            // Add sublist
            var contactSublist = form.addSublist({
                id: 'custpage_contacts',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Contacts'
            });

            contactSublist.addField({
                id: 'custpage_contact_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });

            contactSublist.addField({
                id: 'custpage_contact_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });

            contactSublist.addField({
                id: 'custpage_contact_phone',
                type: serverWidget.FieldType.PHONE,
                label: 'Phone'
            });

            // Add buttons
            form.addSubmitButton({
                label: 'Create Customer'
            });

            form.addResetButton({
                label: 'Clear'
            });

            context.response.writePage(form);

        } else {
            // POST - Process form submission
            var name = context.request.parameters.custpage_name;
            var email = context.request.parameters.custpage_email;
            var category = context.request.parameters.custpage_category;

            // Get sublist data
            var lineCount = context.request.getLineCount({
                group: 'custpage_contacts'
            });

            var contacts = [];
            for (var i = 0; i < lineCount; i++) {
                contacts.push({
                    name: context.request.getSublistValue({
                        group: 'custpage_contacts',
                        name: 'custpage_contact_name',
                        line: i
                    }),
                    email: context.request.getSublistValue({
                        group: 'custpage_contacts',
                        name: 'custpage_contact_email',
                        line: i
                    })
                });
            }

            // Process data and redirect
            log.debug('Form Data', { name: name, email: email, contacts: contacts });

            // Redirect to a confirmation page or record
            redirect.toSuitelet({
                scriptId: 'customscript_this_suitelet',
                deploymentId: 'customdeploy_this_suitelet',
                parameters: { success: 'T' }
            });
        }
    }

    return {
        onRequest: onRequest
    };
});
```

## Best Practices

1. **Use meaningful IDs** - Prefix custom field IDs with `custpage_`
2. **Group related fields** - Use field groups and tabs for organization
3. **Add client scripts** - For field validation and UI interactions
4. **Set mandatory fields** - Enforce required data entry
5. **Use appropriate field types** - Match data type to field type
6. **Provide help text** - Guide users on field usage
7. **Handle both GET and POST** - In Suitelets that submit data

## Related Documentation

- [Official N/ui/serverWidget Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4321345532.html)
- [Suitelet Script Type](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4387799858.html)
