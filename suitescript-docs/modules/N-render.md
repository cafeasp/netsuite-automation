# N/render Module

## Overview

The N/render module provides functionality for generating PDF documents and HTML content from templates in NetSuite. It supports Advanced PDF/HTML Templates, BFO (Big Faceless Organization) rendering engine, and transaction printing capabilities.

## Module Import

```javascript
define(['N/render'], function(render) {
    // Your code here
});
```

**SuiteScript 2.1:**
```javascript
import render from 'N/render';
```

## Supported Script Types

| Script Type | Supported |
|-------------|-----------|
| Client Script | No |
| User Event Script | Yes |
| Scheduled Script | Yes |
| Map/Reduce Script | Yes |
| Suitelet | Yes |
| RESTlet | Yes |
| Workflow Action Script | Yes |
| Bundle Installation Script | Yes |
| Portlet Script | Yes |

## Methods

### render.create(options)

Creates a render.TemplateRenderer object for generating PDF or HTML content from templates.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.templateId | number | No | Internal ID of the Advanced PDF/HTML template |
| options.templateContent | string | No | String containing the template content (Freemarker/BFO) |

**Returns:** `render.TemplateRenderer`

**Example:**
```javascript
define(['N/render', 'N/record'], function(render, record) {

    function generatePdfFromTemplate() {
        // Create renderer with template ID
        var renderer = render.create();
        renderer.setTemplateById(98); // Template internal ID

        // Load record to use as data source
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: 12345
        });

        // Add record as data source
        renderer.addRecord({
            templateName: 'record',
            record: salesOrder
        });

        // Generate PDF
        var pdfFile = renderer.renderAsPdf();

        return pdfFile;
    }

    return {
        generatePdfFromTemplate: generatePdfFromTemplate
    };
});
```

---

### render.transaction(options)

Renders a transaction record as a PDF using the transaction's print template.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.entityId | number | Yes | Internal ID of the transaction to render |
| options.printMode | render.PrintMode | No | The print mode (default: PDF) |
| options.formId | number | No | Internal ID of the Advanced PDF/HTML Template to use |
| options.inCustLocale | boolean | No | Use customer locale for rendering |

**Returns:** `file.File` - PDF file object

**Example:**
```javascript
define(['N/render', 'N/email', 'N/runtime'], function(render, email, runtime) {

    function emailInvoicePdf(invoiceId, recipientEmail) {
        // Render invoice as PDF
        var pdfFile = render.transaction({
            entityId: invoiceId,
            printMode: render.PrintMode.PDF
        });

        // Send email with PDF attachment
        email.send({
            author: runtime.getCurrentUser().id,
            recipients: recipientEmail,
            subject: 'Your Invoice',
            body: 'Please find attached your invoice.',
            attachments: [pdfFile]
        });

        return true;
    }

    return {
        emailInvoicePdf: emailInvoicePdf
    };
});
```

---

### render.statement(options)

Renders a customer statement as a PDF.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.entityId | number | Yes | Internal ID of the customer |
| options.printMode | render.PrintMode | No | The print mode (default: PDF) |
| options.formId | number | No | Internal ID of the statement template |
| options.startDate | Date | No | Start date for statement period |
| options.statementDate | Date | No | Statement date (determines due dates) |
| options.openTransactionsOnly | boolean | No | Include only open transactions |
| options.inCustLocale | boolean | No | Use customer locale |
| options.consolidateStatements | boolean | No | Consolidate subsidiaries (OneWorld) |

**Returns:** `file.File` - PDF file object

**Example:**
```javascript
define(['N/render', 'N/file'], function(render, file) {

    function generateCustomerStatement(customerId) {
        var today = new Date();
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        var statementPdf = render.statement({
            entityId: customerId,
            printMode: render.PrintMode.PDF,
            startDate: thirtyDaysAgo,
            statementDate: today,
            openTransactionsOnly: true
        });

        // Save to File Cabinet
        statementPdf.folder = 123; // Folder ID
        statementPdf.name = 'Statement_' + customerId + '.pdf';
        var fileId = statementPdf.save();

        return fileId;
    }

    return {
        generateCustomerStatement: generateCustomerStatement
    };
});
```

---

### render.packingSlip(options)

Renders a packing slip for an item fulfillment record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.entityId | number | Yes | Internal ID of the item fulfillment |
| options.printMode | render.PrintMode | No | The print mode (default: PDF) |
| options.formId | number | No | Internal ID of the packing slip template |
| options.inCustLocale | boolean | No | Use customer locale |

**Returns:** `file.File` - PDF file object

**Example:**
```javascript
define(['N/render'], function(render) {

    function printPackingSlip(fulfillmentId) {
        var packingSlipPdf = render.packingSlip({
            entityId: fulfillmentId,
            printMode: render.PrintMode.PDF
        });

        return packingSlipPdf;
    }

    return {
        printPackingSlip: printPackingSlip
    };
});
```

---

### render.pickingTicket(options)

Renders a picking ticket for a sales order.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.entityId | number | Yes | Internal ID of the sales order |
| options.printMode | render.PrintMode | No | The print mode (default: PDF) |
| options.formId | number | No | Internal ID of the picking ticket template |
| options.inCustLocale | boolean | No | Use customer locale |

**Returns:** `file.File` - PDF file object

**Example:**
```javascript
define(['N/render'], function(render) {

    function printPickingTicket(salesOrderId) {
        var pickingTicketPdf = render.pickingTicket({
            entityId: salesOrderId,
            printMode: render.PrintMode.PDF
        });

        return pickingTicketPdf;
    }

    return {
        printPickingTicket: printPickingTicket
    };
});
```

---

### render.bom(options)

Renders a Bill of Materials (BOM) as a PDF.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.entityId | number | Yes | Internal ID of the BOM or assembly item |
| options.printMode | render.PrintMode | No | The print mode (default: PDF) |

**Returns:** `file.File` - PDF file object

**Example:**
```javascript
define(['N/render'], function(render) {

    function printBillOfMaterials(assemblyId) {
        var bomPdf = render.bom({
            entityId: assemblyId,
            printMode: render.PrintMode.PDF
        });

        return bomPdf;
    }

    return {
        printBillOfMaterials: printBillOfMaterials
    };
});
```

---

### render.xmlToPdf(options)

Converts XML content (BFO format) directly to a PDF file.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.xmlString | string | Yes | BFO-compliant XML string |

**Returns:** `file.File` - PDF file object

**Example:**
```javascript
define(['N/render'], function(render) {

    function createSimplePdf() {
        var xmlContent = '<?xml version="1.0"?>\n' +
            '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n' +
            '<pdf>\n' +
            '  <head>\n' +
            '    <style type="text/css">\n' +
            '      body { font-family: Arial, sans-serif; font-size: 12pt; }\n' +
            '      h1 { color: #333366; }\n' +
            '      table { border-collapse: collapse; width: 100%; }\n' +
            '      td, th { border: 1px solid #ccc; padding: 8px; }\n' +
            '    </style>\n' +
            '  </head>\n' +
            '  <body>\n' +
            '    <h1>Sales Report</h1>\n' +
            '    <p>Generated on: ' + new Date().toDateString() + '</p>\n' +
            '    <table>\n' +
            '      <tr><th>Product</th><th>Quantity</th><th>Total</th></tr>\n' +
            '      <tr><td>Widget A</td><td>100</td><td>$1,000</td></tr>\n' +
            '      <tr><td>Widget B</td><td>50</td><td>$750</td></tr>\n' +
            '    </table>\n' +
            '  </body>\n' +
            '</pdf>';

        var pdfFile = render.xmlToPdf({
            xmlString: xmlContent
        });

        return pdfFile;
    }

    return {
        createSimplePdf: createSimplePdf
    };
});
```

---

### render.mergeEmail(options)

Merges an email template with record data to create personalized email content.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.templateId | number | Yes | Internal ID of the email template |
| options.entity | Object | No | Entity record reference (type and id) |
| options.recipient | Object | No | Recipient record reference (type and id) |
| options.supportCaseId | number | No | Internal ID of support case |
| options.transactionId | number | No | Internal ID of transaction |
| options.customRecord | Object | No | Custom record reference (type and id) |

**Returns:** `render.EmailMergeResult` - Object with subject and body properties

**Example:**
```javascript
define(['N/render', 'N/email', 'N/runtime', 'N/record'], function(render, email, runtime, record) {

    function sendMergedEmail(templateId, customerId, salesOrderId) {
        // Merge email template with record data
        var mergeResult = render.mergeEmail({
            templateId: templateId,
            entity: {
                type: 'customer',
                id: customerId
            },
            transactionId: salesOrderId
        });

        // Get customer email
        var customer = record.load({
            type: record.Type.CUSTOMER,
            id: customerId
        });
        var recipientEmail = customer.getValue('email');

        // Send merged email
        email.send({
            author: runtime.getCurrentUser().id,
            recipients: recipientEmail,
            subject: mergeResult.subject,
            body: mergeResult.body
        });

        return true;
    }

    return {
        sendMergedEmail: sendMergedEmail
    };
});
```

---

## TemplateRenderer Object

The TemplateRenderer object is returned by `render.create()` and provides methods for template-based rendering.

### TemplateRenderer Methods

#### setTemplateById(id)

Sets the template using an Advanced PDF/HTML Template internal ID.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Internal ID of the template |

---

#### setTemplateByScriptId(scriptId)

Sets the template using its script ID.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| scriptId | string | Yes | Script ID of the template |

---

#### addRecord(options)

Adds a record as a data source for the template.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.templateName | string | Yes | Variable name to use in template |
| options.record | record.Record | Yes | Record object to use as data |

---

#### addSearchResults(options)

Adds search results as a data source for the template.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.templateName | string | Yes | Variable name to use in template |
| options.searchResult | search.Result[] | Yes | Array of search results |

---

#### addCustomDataSource(options)

Adds custom JSON data as a data source for the template.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.alias | string | Yes | Variable name to use in template |
| options.format | render.DataSource | Yes | Data format (JSON, XML) |
| options.data | string or Object | Yes | Data to add |

---

#### renderAsString()

Renders the template as an HTML string.

**Returns:** `string` - Rendered HTML content

---

#### renderAsPdf()

Renders the template as a PDF file.

**Returns:** `file.File` - PDF file object

---

### Complete TemplateRenderer Example

```javascript
define(['N/render', 'N/record', 'N/search', 'N/file'], function(render, record, search, file) {

    function generateCustomReport(customerId) {
        // Create renderer
        var renderer = render.create();

        // Set template
        renderer.setTemplateById(101);

        // Load and add customer record
        var customer = record.load({
            type: record.Type.CUSTOMER,
            id: customerId
        });
        renderer.addRecord({
            templateName: 'customer',
            record: customer
        });

        // Add search results
        var orderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['entity', 'anyof', customerId],
                'AND',
                ['mainline', 'is', 'T']
            ],
            columns: ['tranid', 'trandate', 'total', 'status']
        });

        var searchResults = orderSearch.run().getRange({ start: 0, end: 100 });
        renderer.addSearchResults({
            templateName: 'orders',
            searchResult: searchResults
        });

        // Add custom data
        var customData = {
            reportDate: new Date().toISOString(),
            companyName: 'Acme Corporation',
            reportTitle: 'Customer Order History'
        };

        renderer.addCustomDataSource({
            alias: 'custom',
            format: render.DataSource.OBJECT,
            data: customData
        });

        // Generate PDF
        var pdfFile = renderer.renderAsPdf();
        pdfFile.folder = 456;
        pdfFile.name = 'CustomerReport_' + customerId + '.pdf';

        var fileId = pdfFile.save();
        return fileId;
    }

    return {
        generateCustomReport: generateCustomReport
    };
});
```

---

## Enums

### render.PrintMode

| Value | Description |
|-------|-------------|
| PDF | Render as PDF document |
| HTML | Render as HTML content |
| DEFAULT | Use default print mode |

**Example:**
```javascript
var pdfFile = render.transaction({
    entityId: 12345,
    printMode: render.PrintMode.PDF
});
```

---

### render.DataSource

| Value | Description |
|-------|-------------|
| OBJECT | JavaScript object data source |
| JSON | JSON string data source |
| XML_DOC | XML document data source |
| XML_STRING | XML string data source |

**Example:**
```javascript
renderer.addCustomDataSource({
    alias: 'data',
    format: render.DataSource.OBJECT,
    data: { key: 'value' }
});
```

---

## Template Syntax (Freemarker)

NetSuite templates use Freemarker syntax for dynamic content.

### Basic Variable Output
```html
<p>Customer: ${customer.companyname}</p>
<p>Amount: ${record.total}</p>
```

### Iteration
```html
<#list orders as order>
    <tr>
        <td>${order.tranid}</td>
        <td>${order.trandate}</td>
        <td>${order.total}</td>
    </tr>
</#list>
```

### Conditionals
```html
<#if customer.balance gt 0>
    <p>Outstanding Balance: ${customer.balance}</p>
<#else>
    <p>No outstanding balance</p>
</#if>
```

### Date Formatting
```html
<p>Date: ${record.trandate?string("MM/dd/yyyy")}</p>
```

### Number Formatting
```html
<p>Total: ${record.total?string.currency}</p>
<p>Quantity: ${line.quantity?string("#,##0")}</p>
```

---

## Best Practices

1. **Use Advanced PDF/HTML Templates**: Create reusable templates in the NetSuite UI rather than embedding XML strings in scripts.

2. **Handle Large Documents**: For documents with many pages, consider breaking them into smaller chunks to avoid memory issues.

3. **Template Caching**: Templates are cached by NetSuite. Make changes to templates through the UI when possible.

4. **Error Handling**: Wrap rendering operations in try-catch blocks to handle template errors gracefully.

```javascript
try {
    var pdfFile = render.transaction({
        entityId: recordId,
        printMode: render.PrintMode.PDF
    });
} catch (e) {
    log.error('PDF Generation Error', e.message);
    // Handle error appropriately
}
```

5. **Governance**: Rendering operations consume governance units. Plan for this in scheduled scripts.

6. **Testing Templates**: Test templates with various data scenarios to ensure proper handling of edge cases.

7. **CSS for PDFs**: Use inline CSS or style tags within templates. External stylesheets are not supported.

8. **Image Handling**: Use absolute URLs or File Cabinet paths for images in PDF templates.

```html
<img src="https://system.netsuite.com/core/media/media.nl?id=123" />
```

9. **Page Breaks**: Control page breaks in PDFs using CSS:

```css
.page-break { page-break-before: always; }
```

10. **Fonts**: Use web-safe fonts or embed custom fonts using the @font-face directive for consistent rendering.
