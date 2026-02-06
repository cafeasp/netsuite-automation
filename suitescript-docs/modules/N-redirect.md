# N/redirect Module

## Overview

The `N/redirect` module provides methods to redirect users to different pages within NetSuite. This module allows scripts to navigate users to records, Suitelets, task links, search results, and external URLs. It is commonly used in Suitelets, User Event scripts, and Client Scripts to control navigation flow.

## Module Import

```javascript
define(['N/redirect'], function(redirect) {
    // Your code here
});
```

**SuiteScript 2.1:**
```javascript
import redirect from 'N/redirect';
```

## Supported Script Types

| Script Type | Supported | Notes |
|-------------|-----------|-------|
| Client Script | Yes | Limited to certain events |
| User Event Script | Yes | beforeLoad only |
| Scheduled Script | No | |
| Map/Reduce Script | No | |
| Suitelet | Yes | Primary use case |
| RESTlet | No | |
| Workflow Action Script | No | |
| Portlet Script | No | |

## Methods

### redirect.toRecord(options)

Redirects the user to a NetSuite record page.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.type` | string | Yes | Record type (e.g., 'salesorder', 'customer') |
| `options.id` | number | string | Yes | Internal ID of the record |
| `options.isEditMode` | boolean | No | If true, opens record in edit mode (default: false) |
| `options.parameters` | Object | No | URL parameters to pass |

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/record', 'N/log'], function(redirect, record, log) {

    function onRequest(context) {
        if (context.request.method === 'POST') {
            // Create a new sales order
            var salesOrder = record.create({
                type: record.Type.SALES_ORDER,
                isDynamic: true
            });

            salesOrder.setValue({ fieldId: 'entity', value: context.request.parameters.customer });
            salesOrder.setValue({ fieldId: 'memo', value: 'Created via Suitelet' });

            var orderId = salesOrder.save();

            log.audit('Order Created', orderId);

            // Redirect to the new order in view mode
            redirect.toRecord({
                type: record.Type.SALES_ORDER,
                id: orderId
            });
        }
    }

    return { onRequest: onRequest };
});
```

#### Example with Edit Mode

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/record'], function(redirect, record) {

    function onRequest(context) {
        var customerId = context.request.parameters.custid;

        // Redirect to customer record in edit mode
        redirect.toRecord({
            type: record.Type.CUSTOMER,
            id: customerId,
            isEditMode: true,
            parameters: {
                'custparam_source': 'suitelet',
                'custparam_action': 'update_address'
            }
        });
    }

    return { onRequest: onRequest };
});
```

---

### redirect.toSuitelet(options)

Redirects the user to a Suitelet.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.scriptId` | string | Yes | Script ID of the Suitelet |
| `options.deploymentId` | string | Yes | Deployment ID of the Suitelet |
| `options.isExternal` | boolean | No | If true, generates external URL (default: false) |
| `options.parameters` | Object | No | URL parameters to pass |

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/ui/serverWidget'], function(redirect, serverWidget) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Display form
            var form = serverWidget.createForm({ title: 'Step 1: Select Options' });

            form.addField({
                id: 'custpage_option',
                type: serverWidget.FieldType.SELECT,
                label: 'Select Option'
            }).addSelectOption({ value: 'A', text: 'Option A' })
              .addSelectOption({ value: 'B', text: 'Option B' });

            form.addSubmitButton({ label: 'Continue to Step 2' });

            context.response.writePage(form);

        } else {
            // Process and redirect to next step
            var selectedOption = context.request.parameters.custpage_option;

            redirect.toSuitelet({
                scriptId: 'customscript_wizard_step2',
                deploymentId: 'customdeploy_wizard_step2',
                parameters: {
                    'option': selectedOption,
                    'step': '2'
                }
            });
        }
    }

    return { onRequest: onRequest };
});
```

---

### redirect.toTaskLink(options)

Redirects the user to a NetSuite task link (standard NetSuite pages).

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.id` | string | Yes | Task link ID (from `redirect.TaskLink` enum) |
| `options.parameters` | Object | No | URL parameters to pass |

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect'], function(redirect) {

    function onRequest(context) {
        var action = context.request.parameters.action;

        switch (action) {
            case 'calendar':
                // Redirect to calendar
                redirect.toTaskLink({
                    id: 'CARD_-29'  // Calendar task link
                });
                break;

            case 'home':
                // Redirect to home dashboard
                redirect.toTaskLink({
                    id: 'CARD_-10'  // Home task link
                });
                break;

            case 'customers':
                // Redirect to customer list
                redirect.toTaskLink({
                    id: 'LIST_CUSTJOB',
                    parameters: {
                        'whence': ''
                    }
                });
                break;

            default:
                context.response.write('Unknown action');
        }
    }

    return { onRequest: onRequest };
});
```

---

### redirect.toSearch(options)

Redirects the user to a saved search results page.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.id` | number | string | Yes | Internal ID or script ID of saved search |

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/search', 'N/log'], function(redirect, search, log) {

    function onRequest(context) {
        var reportType = context.request.parameters.report;

        switch (reportType) {
            case 'open_orders':
                redirect.toSearch({
                    id: 'customsearch_open_sales_orders'
                });
                break;

            case 'overdue_invoices':
                redirect.toSearch({
                    id: 'customsearch_overdue_invoices'
                });
                break;

            case 'low_stock':
                redirect.toSearch({
                    id: 1234  // Can also use internal ID
                });
                break;

            default:
                log.debug('Unknown Report', reportType);
                context.response.write('Please specify a valid report type');
        }
    }

    return { onRequest: onRequest };
});
```

---

### redirect.toSearchResult(options)

Redirects the user to search results with custom filters applied.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.Search` | search.Search | Yes | A Search object to execute |

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/search'], function(redirect, search) {

    function onRequest(context) {
        var customerId = context.request.parameters.customer;
        var startDate = context.request.parameters.startdate;
        var endDate = context.request.parameters.enddate;

        // Create dynamic search based on parameters
        var invoiceSearch = search.create({
            type: search.Type.INVOICE,
            filters: [
                ['entity', 'anyof', customerId],
                'AND',
                ['trandate', 'within', startDate, endDate],
                'AND',
                ['mainline', 'is', 'T']
            ],
            columns: [
                search.createColumn({ name: 'tranid', sort: search.Sort.DESC }),
                'trandate',
                'entity',
                'status',
                'total',
                'amountremaining'
            ]
        });

        // Redirect to search results
        redirect.toSearchResult({
            Search: invoiceSearch
        });
    }

    return { onRequest: onRequest };
});
```

---

### redirect.toSavedSearchResult(options)

Redirects to a saved search with additional runtime filters.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options.id` | number | string | Yes | Saved search ID |
| `options.filters` | Array | No | Additional filters to apply |

#### Returns

`void`

#### Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/search'], function(redirect, search) {

    function onRequest(context) {
        var subsidiary = context.request.parameters.subsidiary;
        var department = context.request.parameters.department;

        // Load saved search and add runtime filters
        var filters = [];

        if (subsidiary) {
            filters.push(search.createFilter({
                name: 'subsidiary',
                operator: search.Operator.ANYOF,
                values: subsidiary
            }));
        }

        if (department) {
            filters.push(search.createFilter({
                name: 'department',
                operator: search.Operator.ANYOF,
                values: department
            }));
        }

        redirect.toSavedSearchResult({
            id: 'customsearch_sales_report',
            filters: filters
        });
    }

    return { onRequest: onRequest };
});
```

---

## Using Redirect in User Event Scripts

Redirects in User Event scripts work only in the `beforeLoad` entry point.

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/redirect', 'N/runtime'], function(redirect, runtime) {

    function beforeLoad(context) {
        // Only redirect for specific conditions
        if (context.type !== context.UserEventType.VIEW) {
            return;
        }

        var currentUser = runtime.getCurrentUser();
        var record = context.newRecord;

        // Check if record is locked
        if (record.getValue('custbody_locked') === true) {
            // Redirect non-admins to a Suitelet
            if (currentUser.role !== 3) { // 3 = Administrator
                redirect.toSuitelet({
                    scriptId: 'customscript_locked_record_info',
                    deploymentId: 'customdeploy_locked_record_info',
                    parameters: {
                        'recordType': record.type,
                        'recordId': record.id
                    }
                });
            }
        }
    }

    return { beforeLoad: beforeLoad };
});
```

---

## Complete Example: Multi-Step Wizard

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/redirect', 'N/record', 'N/ui/serverWidget', 'N/log', 'N/search'],
function(redirect, record, serverWidget, log, search) {

    function onRequest(context) {
        var step = parseInt(context.request.parameters.step) || 1;

        switch (step) {
            case 1:
                showStep1(context);
                break;
            case 2:
                showStep2(context);
                break;
            case 3:
                showStep3(context);
                break;
            case 4:
                processWizard(context);
                break;
            default:
                showStep1(context);
        }
    }

    function showStep1(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({ title: 'New Order Wizard - Step 1: Customer' });

            // Customer selection
            var customerField = form.addField({
                id: 'custpage_customer',
                type: serverWidget.FieldType.SELECT,
                label: 'Select Customer',
                source: 'customer'
            });
            customerField.isMandatory = true;

            form.addSubmitButton({ label: 'Next' });

            context.response.writePage(form);

        } else {
            // Move to step 2
            redirect.toSuitelet({
                scriptId: runtime.getCurrentScript().id,
                deploymentId: runtime.getCurrentScript().deploymentId,
                parameters: {
                    'step': '2',
                    'customer': context.request.parameters.custpage_customer
                }
            });
        }
    }

    function showStep2(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({ title: 'New Order Wizard - Step 2: Items' });

            // Hidden customer field
            var hiddenCustomer = form.addField({
                id: 'custpage_customer',
                type: serverWidget.FieldType.TEXT,
                label: 'Customer'
            });
            hiddenCustomer.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });
            hiddenCustomer.defaultValue = context.request.parameters.customer;

            // Item sublist
            var itemSublist = form.addSublist({
                id: 'custpage_items',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Order Items'
            });

            itemSublist.addField({
                id: 'custpage_item',
                type: serverWidget.FieldType.SELECT,
                label: 'Item',
                source: 'item'
            });

            itemSublist.addField({
                id: 'custpage_quantity',
                type: serverWidget.FieldType.INTEGER,
                label: 'Quantity'
            });

            form.addSubmitButton({ label: 'Next' });
            form.addButton({
                id: 'custpage_back',
                label: 'Back',
                functionName: 'goBack'
            });

            form.clientScriptModulePath = './wizard_client.js';

            context.response.writePage(form);

        } else {
            // Collect items and move to step 3
            var items = [];
            var lineCount = context.request.getLineCount({ group: 'custpage_items' });

            for (var i = 0; i < lineCount; i++) {
                items.push({
                    item: context.request.getSublistValue({
                        group: 'custpage_items',
                        name: 'custpage_item',
                        line: i
                    }),
                    quantity: context.request.getSublistValue({
                        group: 'custpage_items',
                        name: 'custpage_quantity',
                        line: i
                    })
                });
            }

            redirect.toSuitelet({
                scriptId: runtime.getCurrentScript().id,
                deploymentId: runtime.getCurrentScript().deploymentId,
                parameters: {
                    'step': '3',
                    'customer': context.request.parameters.custpage_customer,
                    'items': JSON.stringify(items)
                }
            });
        }
    }

    function showStep3(context) {
        // Review step - display summary and confirm
        var form = serverWidget.createForm({ title: 'New Order Wizard - Step 3: Review' });

        var customer = context.request.parameters.customer;
        var items = JSON.parse(context.request.parameters.items || '[]');

        // Display customer info
        var customerLookup = search.lookupFields({
            type: search.Type.CUSTOMER,
            id: customer,
            columns: ['companyname', 'email']
        });

        form.addField({
            id: 'custpage_customer_display',
            type: serverWidget.FieldType.TEXT,
            label: 'Customer'
        }).updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE
        }).defaultValue = customerLookup.companyname;

        // Hidden fields for data
        var hiddenCustomer = form.addField({
            id: 'custpage_customer',
            type: serverWidget.FieldType.TEXT,
            label: 'Customer ID'
        });
        hiddenCustomer.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN
        });
        hiddenCustomer.defaultValue = customer;

        var hiddenItems = form.addField({
            id: 'custpage_items',
            type: serverWidget.FieldType.LONGTEXT,
            label: 'Items'
        });
        hiddenItems.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN
        });
        hiddenItems.defaultValue = context.request.parameters.items;

        // Display items summary
        var itemsSummary = form.addSublist({
            id: 'custpage_items_review',
            type: serverWidget.SublistType.LIST,
            label: 'Items to Order'
        });

        itemsSummary.addField({
            id: 'custpage_item_name',
            type: serverWidget.FieldType.TEXT,
            label: 'Item'
        });

        itemsSummary.addField({
            id: 'custpage_qty',
            type: serverWidget.FieldType.INTEGER,
            label: 'Quantity'
        });

        items.forEach(function(item, idx) {
            itemsSummary.setSublistValue({
                id: 'custpage_item_name',
                line: idx,
                value: item.item
            });
            itemsSummary.setSublistValue({
                id: 'custpage_qty',
                line: idx,
                value: item.quantity
            });
        });

        form.addField({
            id: 'custpage_step',
            type: serverWidget.FieldType.INTEGER,
            label: 'Step'
        }).updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN
        }).defaultValue = '4';

        form.addSubmitButton({ label: 'Create Order' });

        context.response.writePage(form);
    }

    function processWizard(context) {
        var customer = context.request.parameters.custpage_customer;
        var items = JSON.parse(context.request.parameters.custpage_items || '[]');

        try {
            // Create the sales order
            var salesOrder = record.create({
                type: record.Type.SALES_ORDER,
                isDynamic: true
            });

            salesOrder.setValue({ fieldId: 'entity', value: customer });
            salesOrder.setValue({ fieldId: 'memo', value: 'Created via Wizard' });

            items.forEach(function(item) {
                salesOrder.selectNewLine({ sublistId: 'item' });
                salesOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: item.item
                });
                salesOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: item.quantity
                });
                salesOrder.commitLine({ sublistId: 'item' });
            });

            var orderId = salesOrder.save();

            log.audit('Order Created via Wizard', orderId);

            // Redirect to the new order
            redirect.toRecord({
                type: record.Type.SALES_ORDER,
                id: orderId
            });

        } catch (e) {
            log.error('Wizard Error', e.message);
            context.response.write('Error creating order: ' + e.message);
        }
    }

    return { onRequest: onRequest };
});
```

---

## Best Practices

1. **Use After Data Operations**: Always perform redirects after completing data operations (saves, updates) to prevent data loss.

   ```javascript
   // Good - save first, then redirect
   var recordId = record.save();
   redirect.toRecord({ type: recordType, id: recordId });

   // Bad - redirect might prevent save
   redirect.toRecord({ type: recordType, id: recordId });
   record.save();
   ```

2. **Pass Minimal Parameters**: Only pass necessary information in URL parameters. For large data, consider using session storage or custom records.

3. **Handle External URLs**: For external URL redirects, use `redirect.toSuitelet` with `isExternal: true` or construct URLs with the `N/url` module.

4. **User Event Restrictions**: Remember that redirect only works in `beforeLoad` for User Event scripts and only in view mode.

5. **Validate Before Redirect**: Always validate that the target record or Suitelet exists before redirecting.

   ```javascript
   if (recordId && recordType) {
       redirect.toRecord({
           type: recordType,
           id: recordId
       });
   } else {
       context.response.write('Invalid record reference');
   }
   ```

6. **Use Script Parameters**: For Suitelet redirects, use script parameters to configure behavior rather than hardcoding values.

7. **Provide Navigation Options**: Give users multiple navigation paths (back buttons, cancel options) in multi-step processes.

---

## Governance

| Method | Governance Units |
|--------|-----------------|
| `redirect.toRecord()` | 0 units |
| `redirect.toSuitelet()` | 0 units |
| `redirect.toTaskLink()` | 0 units |
| `redirect.toSearch()` | 0 units |
| `redirect.toSearchResult()` | 0 units |
| `redirect.toSavedSearchResult()` | 0 units |

---

## Limitations

- Redirects terminate script execution; code after a redirect call will not run
- Cannot redirect in Scheduled Scripts, Map/Reduce Scripts, or RESTlets
- User Event redirects only work in `beforeLoad` entry point
- External redirects require proper URL construction
- Cannot redirect to pages the user does not have permission to access

---

## Related Modules

- [N/url](./N-url.md) - For constructing URLs
- [N/ui/serverWidget](./N-ui-serverWidget.md) - For creating forms in Suitelets
- [N/record](./N-record.md) - For record operations before redirecting
- [N/search](./N-search.md) - For creating searches to redirect to
