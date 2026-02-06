# N/url Module

## Overview

The N/url module provides utilities for generating URLs to various NetSuite resources including records, Suitelets, RESTlets, scripts, and external resources. It enables dynamic URL construction with proper encoding and parameter handling.

## Module Import

```javascript
define(['N/url'], function(url) {
    // Your code here
});
```

**SuiteScript 2.1:**
```javascript
import url from 'N/url';
```

## Supported Script Types

| Script Type | Supported |
|-------------|-----------|
| Client Script | Yes |
| User Event Script | Yes |
| Scheduled Script | Yes |
| Map/Reduce Script | Yes |
| Suitelet | Yes |
| RESTlet | Yes |
| Workflow Action Script | Yes |
| Bundle Installation Script | Yes |
| Portlet Script | Yes |

## Methods

### url.resolveRecord(options)

Generates a URL to a NetSuite record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.recordType | string | Yes | Record type (e.g., 'salesorder', 'customer') |
| options.recordId | number | No | Internal ID of the record |
| options.isEditMode | boolean | No | Open in edit mode (default: false) |
| options.params | Object | No | Additional URL parameters |

**Returns:** `string` - Generated URL

**Example:**
```javascript
define(['N/url'], function(url) {

    function getRecordUrls() {
        // View mode URL
        var viewUrl = url.resolveRecord({
            recordType: 'salesorder',
            recordId: 12345
        });
        // Result: /app/accounting/transactions/salesord.nl?id=12345

        // Edit mode URL
        var editUrl = url.resolveRecord({
            recordType: 'salesorder',
            recordId: 12345,
            isEditMode: true
        });
        // Result: /app/accounting/transactions/salesord.nl?id=12345&e=T

        // New record URL
        var newUrl = url.resolveRecord({
            recordType: 'customer'
        });
        // Result: /app/common/entity/custjob.nl

        // With additional parameters
        var paramUrl = url.resolveRecord({
            recordType: 'salesorder',
            recordId: 12345,
            params: {
                custparam_source: 'custom_report',
                custparam_view: 'summary'
            }
        });

        return {
            viewUrl: viewUrl,
            editUrl: editUrl,
            newUrl: newUrl,
            paramUrl: paramUrl
        };
    }

    return {
        getRecordUrls: getRecordUrls
    };
});
```

---

### url.resolveScript(options)

Generates a URL to a Suitelet or other script deployment.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.scriptId | string | number | Yes | Script ID or internal ID |
| options.deploymentId | string | number | Yes | Deployment ID or internal ID |
| options.returnExternalUrl | boolean | No | Return full external URL (default: false) |
| options.params | Object | No | Additional URL parameters |

**Returns:** `string` - Generated URL

**Example:**
```javascript
define(['N/url'], function(url) {

    function getSuiteletUrls() {
        // Internal URL (relative)
        var internalUrl = url.resolveScript({
            scriptId: 'customscript_my_suitelet',
            deploymentId: 'customdeploy_my_suitelet'
        });
        // Result: /app/site/hosting/scriptlet.nl?script=123&deploy=1

        // External URL (full)
        var externalUrl = url.resolveScript({
            scriptId: 'customscript_my_suitelet',
            deploymentId: 'customdeploy_my_suitelet',
            returnExternalUrl: true
        });
        // Result: https://1234567.app.netsuite.com/app/site/hosting/scriptlet.nl?script=123&deploy=1

        // With parameters
        var paramUrl = url.resolveScript({
            scriptId: 'customscript_report_suitelet',
            deploymentId: 'customdeploy_report_suitelet',
            params: {
                reportType: 'sales',
                startDate: '01/01/2024',
                endDate: '12/31/2024',
                format: 'pdf'
            }
        });

        return {
            internalUrl: internalUrl,
            externalUrl: externalUrl,
            paramUrl: paramUrl
        };
    }

    return {
        getSuiteletUrls: getSuiteletUrls
    };
});
```

---

### url.resolveTaskLink(options)

Generates a URL to a NetSuite task or page.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.id | string | Yes | Task identifier |
| options.params | Object | No | Additional URL parameters |

**Returns:** `string` - Generated URL

**Example:**
```javascript
define(['N/url'], function(url) {

    function getTaskLinks() {
        // Customer list
        var customerList = url.resolveTaskLink({
            id: 'LIST_CUSTJOB'
        });

        // Sales order list
        var salesOrderList = url.resolveTaskLink({
            id: 'LIST_SALESORD'
        });

        // Item list
        var itemList = url.resolveTaskLink({
            id: 'LIST_ITEM'
        });

        // Create sales order
        var createSalesOrder = url.resolveTaskLink({
            id: 'TRAN_SALESORD'
        });

        // Saved search with parameters
        var savedSearch = url.resolveTaskLink({
            id: 'LIST_SEARCHRESULTS',
            params: {
                searchid: 456
            }
        });

        return {
            customerList: customerList,
            salesOrderList: salesOrderList,
            itemList: itemList,
            createSalesOrder: createSalesOrder,
            savedSearch: savedSearch
        };
    }

    return {
        getTaskLinks: getTaskLinks
    };
});
```

---

### url.resolveDomain(options)

Returns the domain for a specific type of NetSuite page.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.hostType | url.HostType | Yes | Type of host/domain |
| options.accountId | string | No | Account ID (required for some host types) |

**Returns:** `string` - Domain name

**Example:**
```javascript
define(['N/url', 'N/runtime'], function(url, runtime) {

    function getDomains() {
        // Application domain
        var appDomain = url.resolveDomain({
            hostType: url.HostType.APPLICATION
        });
        // Result: 1234567.app.netsuite.com

        // Form domain (customer center, online forms)
        var formDomain = url.resolveDomain({
            hostType: url.HostType.FORM
        });
        // Result: 1234567.extforms.netsuite.com

        // REST domain
        var restDomain = url.resolveDomain({
            hostType: url.HostType.RESTLET
        });
        // Result: 1234567.restlets.api.netsuite.com

        // SuiteScript domain
        var suiteletDomain = url.resolveDomain({
            hostType: url.HostType.SUITELET
        });
        // Result: 1234567.suitelets.api.netsuite.com

        // Customer center domain
        var customerDomain = url.resolveDomain({
            hostType: url.HostType.CUSTOMER_CENTER
        });

        return {
            appDomain: appDomain,
            formDomain: formDomain,
            restDomain: restDomain,
            suiteletDomain: suiteletDomain,
            customerDomain: customerDomain
        };
    }

    return {
        getDomains: getDomains
    };
});
```

---

### url.format(options)

Formats a URL string with domain, path, and parameters.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.domain | string | Yes | Domain name |
| options.params | Object | No | Query string parameters |

**Returns:** `string` - Formatted URL

**Example:**
```javascript
define(['N/url'], function(url) {

    function formatExternalUrl() {
        // Basic URL formatting
        var basicUrl = url.format({
            domain: 'https://api.example.com/v1/orders'
        });
        // Result: https://api.example.com/v1/orders

        // URL with parameters
        var paramUrl = url.format({
            domain: 'https://api.example.com/v1/search',
            params: {
                query: 'widget',
                page: 1,
                limit: 50,
                sort: 'date_desc'
            }
        });
        // Result: https://api.example.com/v1/search?query=widget&page=1&limit=50&sort=date_desc

        // URL with special characters (auto-encoded)
        var encodedUrl = url.format({
            domain: 'https://api.example.com/search',
            params: {
                q: 'hello world',
                filter: 'status=active&type=new'
            }
        });
        // Result: https://api.example.com/search?q=hello%20world&filter=status%3Dactive%26type%3Dnew

        return {
            basicUrl: basicUrl,
            paramUrl: paramUrl,
            encodedUrl: encodedUrl
        };
    }

    return {
        formatExternalUrl: formatExternalUrl
    };
});
```

---

## Enums

### url.HostType

| Value | Description |
|-------|-------------|
| APPLICATION | Main NetSuite application domain |
| FORM | External forms domain |
| RESTLET | RESTlet API domain |
| SUITELET | Suitelet domain |
| CUSTOMER_CENTER | Customer center domain |

**Example:**
```javascript
var restDomain = url.resolveDomain({
    hostType: url.HostType.RESTLET
});
```

---

## Common Task IDs

| Task ID | Description |
|---------|-------------|
| LIST_CUSTJOB | Customer/Job list |
| LIST_SALESORD | Sales Order list |
| LIST_PURCHORD | Purchase Order list |
| LIST_ITEM | Item list |
| LIST_VENDOR | Vendor list |
| LIST_EMPLOYEE | Employee list |
| LIST_CONTACT | Contact list |
| LIST_SEARCHRESULTS | Saved Search results |
| TRAN_SALESORD | Create Sales Order |
| TRAN_INVOICE | Create Invoice |
| TRAN_PURCHORD | Create Purchase Order |
| TRAN_ITEMSHIP | Create Item Fulfillment |
| TRAN_ITEMRCPT | Create Item Receipt |
| TRAN_JOURNAL | Create Journal Entry |
| EDIT_CUSTOMER | Edit Customer |
| EDIT_ITEM | Edit Item |

---

## Complete Example: Dynamic Navigation Suitelet

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/url', 'N/ui/serverWidget', 'N/record', 'N/search', 'N/runtime'],
    function(url, serverWidget, record, search, runtime) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            showNavigationForm(context);
        } else {
            handleFormSubmission(context);
        }
    }

    function showNavigationForm(context) {
        var form = serverWidget.createForm({
            title: 'Quick Navigation Hub'
        });

        // Get current script URL for self-reference
        var currentScript = runtime.getCurrentScript();
        var selfUrl = url.resolveScript({
            scriptId: currentScript.id,
            deploymentId: currentScript.deploymentId
        });

        // Add informational field
        var infoField = form.addField({
            id: 'custpage_info',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'Information'
        });

        var html = buildNavigationHtml();
        infoField.defaultValue = html;

        // Customer dropdown
        var customerField = form.addField({
            id: 'custpage_customer',
            type: serverWidget.FieldType.SELECT,
            label: 'Select Customer',
            source: 'customer'
        });

        // Record type dropdown
        var recordTypeField = form.addField({
            id: 'custpage_recordtype',
            type: serverWidget.FieldType.SELECT,
            label: 'Create Transaction'
        });
        recordTypeField.addSelectOption({ value: '', text: '' });
        recordTypeField.addSelectOption({ value: 'salesorder', text: 'Sales Order' });
        recordTypeField.addSelectOption({ value: 'invoice', text: 'Invoice' });
        recordTypeField.addSelectOption({ value: 'estimate', text: 'Estimate' });
        recordTypeField.addSelectOption({ value: 'returnauthorization', text: 'Return Authorization' });

        form.addSubmitButton({ label: 'Navigate' });

        context.response.writePage(form);
    }

    function buildNavigationHtml() {
        var html = '<style>';
        html += '.nav-section { margin-bottom: 20px; }';
        html += '.nav-title { font-weight: bold; font-size: 14px; margin-bottom: 10px; }';
        html += '.nav-links { display: flex; flex-wrap: wrap; gap: 10px; }';
        html += '.nav-link { padding: 8px 16px; background: #607799; color: white; text-decoration: none; border-radius: 4px; }';
        html += '.nav-link:hover { background: #4a5f7a; }';
        html += '</style>';

        // Common Lists Section
        html += '<div class="nav-section">';
        html += '<div class="nav-title">Common Lists</div>';
        html += '<div class="nav-links">';

        var lists = [
            { id: 'LIST_CUSTJOB', label: 'Customers' },
            { id: 'LIST_SALESORD', label: 'Sales Orders' },
            { id: 'LIST_INVOICE', label: 'Invoices' },
            { id: 'LIST_ITEM', label: 'Items' },
            { id: 'LIST_VENDOR', label: 'Vendors' },
            { id: 'LIST_PURCHORD', label: 'Purchase Orders' }
        ];

        lists.forEach(function(list) {
            var listUrl = url.resolveTaskLink({ id: list.id });
            html += '<a class="nav-link" href="' + listUrl + '">' + list.label + '</a>';
        });

        html += '</div></div>';

        // Quick Create Section
        html += '<div class="nav-section">';
        html += '<div class="nav-title">Quick Create</div>';
        html += '<div class="nav-links">';

        var createLinks = [
            { type: 'customer', label: 'New Customer' },
            { type: 'salesorder', label: 'New Sales Order' },
            { type: 'invoice', label: 'New Invoice' },
            { type: 'purchaseorder', label: 'New Purchase Order' },
            { type: 'journalentry', label: 'New Journal Entry' }
        ];

        createLinks.forEach(function(link) {
            var createUrl = url.resolveRecord({ recordType: link.type });
            html += '<a class="nav-link" href="' + createUrl + '">' + link.label + '</a>';
        });

        html += '</div></div>';

        // External API Links Section
        html += '<div class="nav-section">';
        html += '<div class="nav-title">API Endpoints</div>';
        html += '<div class="nav-links">';

        var restDomain = url.resolveDomain({ hostType: url.HostType.RESTLET });
        var suiteletDomain = url.resolveDomain({ hostType: url.HostType.SUITELET });

        html += '<span style="padding: 8px;">REST Domain: ' + restDomain + '</span>';
        html += '<span style="padding: 8px;">Suitelet Domain: ' + suiteletDomain + '</span>';

        html += '</div></div>';

        return html;
    }

    function handleFormSubmission(context) {
        var customerId = context.request.parameters.custpage_customer;
        var recordType = context.request.parameters.custpage_recordtype;

        var redirectUrl;

        if (customerId && recordType) {
            // Create new transaction for customer
            redirectUrl = url.resolveRecord({
                recordType: recordType,
                params: {
                    entity: customerId
                }
            });
        } else if (customerId) {
            // View customer record
            redirectUrl = url.resolveRecord({
                recordType: 'customer',
                recordId: customerId
            });
        } else if (recordType) {
            // Create new transaction
            redirectUrl = url.resolveRecord({
                recordType: recordType
            });
        }

        if (redirectUrl) {
            context.response.sendRedirect({
                type: 'SUITELET',
                identifier: redirectUrl
            });
        }
    }

    return {
        onRequest: onRequest
    };
});
```

---

## Complete Example: RESTlet URL Generator

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/url', 'N/ui/serverWidget', 'N/runtime', 'N/https'],
    function(url, serverWidget, runtime, https) {

    function onRequest(context) {
        var form = serverWidget.createForm({
            title: 'API URL Generator'
        });

        // RESTlet Configuration
        var restletGroup = form.addFieldGroup({
            id: 'restlet_group',
            label: 'RESTlet URL Generation'
        });

        var scriptIdField = form.addField({
            id: 'custpage_script_id',
            type: serverWidget.FieldType.TEXT,
            label: 'Script ID',
            container: 'restlet_group'
        });
        scriptIdField.defaultValue = 'customscript_my_restlet';

        var deployIdField = form.addField({
            id: 'custpage_deploy_id',
            type: serverWidget.FieldType.TEXT,
            label: 'Deployment ID',
            container: 'restlet_group'
        });
        deployIdField.defaultValue = 'customdeploy_my_restlet';

        // Generate URLs
        var urlOutputField = form.addField({
            id: 'custpage_url_output',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'Generated URLs'
        });

        var htmlOutput = generateUrlExamples();
        urlOutputField.defaultValue = htmlOutput;

        context.response.writePage(form);
    }

    function generateUrlExamples() {
        var html = '<div style="padding: 20px; font-family: monospace;">';

        // Domain information
        html += '<h3>Domain Information</h3>';
        html += '<table border="1" cellpadding="10" style="border-collapse: collapse;">';

        var hostTypes = [
            { type: url.HostType.APPLICATION, name: 'Application' },
            { type: url.HostType.FORM, name: 'Form' },
            { type: url.HostType.RESTLET, name: 'RESTlet' },
            { type: url.HostType.SUITELET, name: 'Suitelet' }
        ];

        hostTypes.forEach(function(host) {
            try {
                var domain = url.resolveDomain({ hostType: host.type });
                html += '<tr><td><strong>' + host.name + '</strong></td><td>' + domain + '</td></tr>';
            } catch (e) {
                html += '<tr><td><strong>' + host.name + '</strong></td><td>N/A</td></tr>';
            }
        });

        html += '</table>';

        // Example RESTlet URLs
        html += '<h3>Example RESTlet URLs</h3>';

        var externalRestletUrl = url.resolveScript({
            scriptId: 'customscript_api_restlet',
            deploymentId: 'customdeploy_api_restlet',
            returnExternalUrl: true
        });

        html += '<p><strong>Full External URL:</strong><br/>';
        html += '<code>' + externalRestletUrl + '</code></p>';

        // With parameters
        var paramRestletUrl = url.resolveScript({
            scriptId: 'customscript_api_restlet',
            deploymentId: 'customdeploy_api_restlet',
            returnExternalUrl: true,
            params: {
                action: 'getOrders',
                customerId: 12345,
                status: 'pending'
            }
        });

        html += '<p><strong>With Query Parameters:</strong><br/>';
        html += '<code>' + paramRestletUrl + '</code></p>';

        // cURL examples
        html += '<h3>cURL Examples</h3>';

        html += '<pre style="background: #f4f4f4; padding: 10px; overflow-x: auto;">';
        html += '# GET Request\n';
        html += 'curl -X GET "' + paramRestletUrl + '" \\\n';
        html += '  -H "Authorization: OAuth ..." \\\n';
        html += '  -H "Content-Type: application/json"\n\n';

        html += '# POST Request\n';
        html += 'curl -X POST "' + externalRestletUrl + '" \\\n';
        html += '  -H "Authorization: OAuth ..." \\\n';
        html += '  -H "Content-Type: application/json" \\\n';
        html += '  -d \'{"action": "createOrder", "data": {...}}\'';
        html += '</pre>';

        html += '</div>';

        return html;
    }

    return {
        onRequest: onRequest
    };
});
```

---

## Complete Example: Email with Dynamic Links

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/url', 'N/email', 'N/runtime', 'N/record', 'N/render'],
    function(url, email, runtime, record, render) {

    function afterSubmit(context) {
        if (context.type !== context.UserEventType.CREATE) {
            return;
        }

        var salesOrder = context.newRecord;
        var customerId = salesOrder.getValue('entity');
        var salesOrderId = salesOrder.id;

        // Get customer email
        var customer = record.load({
            type: record.Type.CUSTOMER,
            id: customerId
        });
        var customerEmail = customer.getValue('email');
        var customerName = customer.getValue('companyname') || customer.getValue('altname');

        if (!customerEmail) {
            log.debug('No Email', 'Customer has no email address');
            return;
        }

        // Generate URLs for the email
        var viewOrderUrl = url.resolveRecord({
            recordType: 'salesorder',
            recordId: salesOrderId
        });

        var printOrderUrl = url.resolveScript({
            scriptId: 'customscript_print_order',
            deploymentId: 'customdeploy_print_order',
            returnExternalUrl: true,
            params: {
                orderId: salesOrderId,
                format: 'pdf'
            }
        });

        var trackingUrl = url.resolveScript({
            scriptId: 'customscript_order_tracking',
            deploymentId: 'customdeploy_order_tracking',
            returnExternalUrl: true,
            params: {
                orderId: salesOrderId
            }
        });

        // Build email body with links
        var appDomain = url.resolveDomain({
            hostType: url.HostType.APPLICATION
        });
        var fullViewUrl = 'https://' + appDomain + viewOrderUrl;

        var emailBody = buildEmailBody({
            customerName: customerName,
            orderNumber: salesOrder.getValue('tranid'),
            orderTotal: salesOrder.getValue('total'),
            viewUrl: fullViewUrl,
            printUrl: printOrderUrl,
            trackingUrl: trackingUrl
        });

        // Send email
        email.send({
            author: runtime.getCurrentUser().id,
            recipients: customerEmail,
            subject: 'Order Confirmation - ' + salesOrder.getValue('tranid'),
            body: emailBody
        });

        log.audit('Email Sent', 'Order confirmation sent to ' + customerEmail);
    }

    function buildEmailBody(data) {
        var body = '<html><body style="font-family: Arial, sans-serif;">';

        body += '<h2>Order Confirmation</h2>';
        body += '<p>Dear ' + data.customerName + ',</p>';
        body += '<p>Thank you for your order. Below are your order details:</p>';

        body += '<table style="border-collapse: collapse; width: 100%; max-width: 500px;">';
        body += '<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Order Number:</strong></td>';
        body += '<td style="padding: 8px; border: 1px solid #ddd;">' + data.orderNumber + '</td></tr>';
        body += '<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Order Total:</strong></td>';
        body += '<td style="padding: 8px; border: 1px solid #ddd;">$' + data.orderTotal + '</td></tr>';
        body += '</table>';

        body += '<p style="margin-top: 20px;">Quick Links:</p>';
        body += '<ul>';
        body += '<li><a href="' + data.viewUrl + '">View Order Details</a></li>';
        body += '<li><a href="' + data.printUrl + '">Download PDF Invoice</a></li>';
        body += '<li><a href="' + data.trackingUrl + '">Track Your Order</a></li>';
        body += '</ul>';

        body += '<p>If you have any questions, please contact our support team.</p>';
        body += '<p>Best regards,<br/>The Sales Team</p>';

        body += '</body></html>';

        return body;
    }

    return {
        afterSubmit: afterSubmit
    };
});
```

---

## Best Practices

1. **Use Script IDs**: Prefer script IDs over internal IDs for better code maintainability and portability across environments.

2. **External URLs for External Use**: Use `returnExternalUrl: true` only when generating URLs for external systems, emails, or external users.

3. **Parameter Encoding**: The `url.format()` method automatically encodes parameters. Don't double-encode.

4. **Secure URLs**: For sensitive operations, verify user permissions even when using generated URLs.

5. **Domain Consistency**: Use `url.resolveDomain()` to get the correct domain rather than hardcoding.

6. **Error Handling**: Handle cases where URL generation might fail (e.g., invalid script IDs).

```javascript
try {
    var suiteletUrl = url.resolveScript({
        scriptId: 'customscript_unknown',
        deploymentId: 'customdeploy_unknown'
    });
} catch (e) {
    log.error('URL Generation Failed', e.message);
    // Handle gracefully
}
```

7. **Avoid Hardcoding Domains**: Always use module methods to resolve domains as they may differ between accounts and environments.

8. **Use Task IDs**: For navigation to standard NetSuite pages, use `resolveTaskLink()` with task IDs rather than constructing URLs manually.

9. **Test in Sandbox**: URLs may differ between sandbox and production environments. Test thoroughly.

10. **Document URLs**: When generating URLs for external systems, document the expected format and parameters.
