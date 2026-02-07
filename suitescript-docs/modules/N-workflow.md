---
module: workflow_module
sources:
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N000004.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2743465.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4341725558.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_N2807372.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_1502135122.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_8161516336.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4140956840.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4220488571.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4344303916.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4344892270.html
titles:
  - NetSuite Applications Suite - General Notices
  - NetSuite Applications Suite - Initiate Workflow Action
  - NetSuite Applications Suite - N/workflow Module
  - NetSuite Applications Suite - SuiteCloud Platform
  - NetSuite Applications Suite - SuiteScript
  - NetSuite Applications Suite - SuiteScript 2.x
  - NetSuite Applications Suite - SuiteScript 2.x API Reference
  - NetSuite Applications Suite - SuiteScript 2.x Modules
  - NetSuite Applications Suite - workflow.initiate(options)
  - NetSuite Applications Suite - workflow.trigger(options)
---

## workflow_module: NetSuite Applications Suite - General Notices
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N000004.html

1. [Supporting Files](book_4141398842.html)
2. General Notices

# General Notices

## Sample Code

The sample code is provided on an "as is" basis, without warranty of any kind, to the fullest extent permitted by law. Oracle + NetSuite Inc. does not warrant or guarantee the individual success developers may have in implementing the sample code on their development platforms or in using their own Web server configurations.

Oracle + NetSuite Inc. does not warrant, guarantee or make any representations regarding the use, results of use, accuracy, timeliness or completeness of any data or information relating to the sample code. Oracle + NetSuite Inc. disclaims all warranties, express or implied, and in particular, disclaims all warranties of merchantability, fitness for a particular purpose, and warranties related to the code, or any service or software related thereto.

Oracle + NetSuite Inc. shall not be liable for any direct, indirect or consequential damages or costs of any type arising out of any action taken by you or others related to the sample code

## No Excessive Use of the Service

As the Service is a multi-tenant service offering on shared databases, Customer may not use the Service in excess of limits or thresholds that Oracle considers commercially reasonable for the Service. If Oracle reasonably concludes that a Customer's use is excessive and/or will cause immediate or ongoing performance issues for one or more of Oracle's other customers, Oracle may slow down or throttle Customer's excess use until such time that Customer's use stays within reasonable limits. If Customer's particular usage pattern requires a higher limit or threshold, then the Customer should procure a subscription to the Service that accommodates a higher limit and/or threshold that more effectively aligns with the Customer's actual usage pattern.

## Payroll Disclaimer

To ensure compliance with requirements imposed by the IRS, Oracle + NetSuite Inc. informs you that any U.S. federal/state tax advice, unless otherwise specifically stated, was not intended or written to be used, and cannot be used, for the purpose of (1) avoiding penalties under the Internal Revenue Code or (2) promoting, marketing or recommending to another party any matters addressed herein.

These materials do not constitute tax, legal, or accounting advice and neither NetSuite, nor its agents, employees, or representatives are in the business of offering such advice. Please consult your tax, legal, and accounting advisers for tax, legal, or accounting advice.

## Beta Features

For legal notices related to beta features, see [Beta Software Legal Notices](article_159525672685.html).

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - Initiate Workflow Action
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2743465.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteFlow (Workflow)](book_N2723865.html)
3. [SuiteFlow Reference and Examples](chapter_4103690129.html)
4. [Workflow Actions Overview](section_4103695593.html)
5. Initiate Workflow Action

# Initiate Workflow Action

Use the Initiate Workflow action to initiate another workflow instance (child) from the current workflow instance (parent). The child workflow must be active and match the same base record type as the parent workflow. Plus, the child workflow initiated by the parent workflow runs on the same record instance as the parent. For example, if the parent workflow runs on a purchase order, the actions in the child workflow run on the same purchase order instance.

You can also use the completion of a child workflow as a transition trigger in the parent workflow. Select the child workflow on the transition's **Wait for Workflow** field.

For more information about the best practices to follow when using the Initiate Workflow action, see [SuiteFlow Best Practices](section_1540490044.html) and [Specifying States for Child Workflow Transitions](section_4103799214.html).

Note: 

Workflow definitions require a trigger configuration that initiates the workflow, executes an action within a workflow or transitions the workflow from one state to another.

* For more information about which workflow triggers the Initiate Workflow action supports, see [Workflow Triggers Quick Reference](section_4150693781.html).
* To understand when different workflow triggers run and which trigger you should use, see [Workflow Triggers](section_4071954788.html) and the [SuiteFlow Trigger Execution Model](section_4077993199.html).

## Initiate Workflow Action Parameters

The following table describes the Initiate Workflow action parameters:

| Parameters | Description |
| --- | --- |
| Workflow | Name of the workflow definition to initiate when the action executes. |
| Field | A list of workflow fields available in the child workflow. You can pass values from the parent workflow to the workflow fields belonging to the child. These values can be either static or set through a join. |

Note: 

For more information about adding actions to a workflow, including common action properties and conditions, see [Action Conditions](section_4071954161.html#bridgehead_4074297277) and [Creating an Action](section_4103049209.html).

## Initiate Workflow Action Guidelines

Use the following guidelines when working with the Initiate Workflow action.

* The Initiate Workflow action is not available on a Before Record Load trigger for a time entry record.
* For more information about the best practices to follow when using the Initiate Workflow action, see [SuiteFlow Best Practices](section_1540490044.html) and [Specifying States for Child Workflow Transitions](section_4103799214.html).

### Related Topics

* [Workflow Actions Overview](section_4103695593.html)
* [Creating an Action](section_4103049209.html)
* [Workflow Actions](section_4071954161.html)
* [Specifying States for Child Workflow Transitions](section_4103799214.html)
* [Setting Field Values in Action Definitions](section_4103787257.html)

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - N/workflow Module
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4341725558.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. N/workflow Module

# N/workflow Module

Use the N/workflow module to initiate new workflow instances or trigger existing workflow instances.

## In This Help Topic

* [N/workflow Module Members](#bridgehead_4344304062)

## N/workflow Module Members

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Method | [workflow.initiate(options)](section_4344303916.html) | number | Server scripts | Initiates a workflow on-demand. This method is the programmatic equivalent of the [Initiate Workflow Action](section_N2743465.html) action in SuiteFlow.  Returns the internal ID of the workflow instance used to track the workflow against the record. |
| [workflow.trigger(options)](section_4344892270.html) | number | Server scripts | Triggers a workflow on a record. The actions and transitions of the workflow are evaluated for the record in the workflow instance, based on the current state for the workflow instance.  Returns the internal ID of the workflow instance used to track the workflow against the record. |

### Related Topics

* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - SuiteCloud Platform
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_N2807372.html

1. SuiteCloud Platform

# SuiteCloud Platform

* [SuiteCloud Platform Introduction](article_9105332207.html)
* [SuiteCloud Supported Records](preface_3710625923.html)
* [SuiteCloud Customization Tutorials](article_159163143019.html)
* [Records Catalog](book_159368199162.html)
* [Customization](book_N2823893.html)
* [Template Customization](book_5164527716.html)
* [SuiteFlow (Workflow)](book_N2723865.html)
* [SuiteScript](set_1502135122.html)
* [SuiteCloud SDK](set_1502135000.html)
* [SuiteCloud Development Framework](chapter_4702622163.html)
* [Copy to Account](chapter_1544019532.html)
* [SuiteCloud Developer Assistant](book_9144606645.html)
* [SuiteApp Control Center](book_1557425073.html)
* [SuiteApp Marketplace](book_1540487155.html)
* [SuiteBundler](book_N3363377.html)
* [SuiteTalk Web Services](set_22152129.html)
* [NetSuite AI Connector Service](article_7200233106.html)
* [Custom Plug-ins](book_4060648050.html)
* [Core Plug-ins](book_4616046155.html)

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - SuiteScript
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_1502135122.html

1. [SuiteCloud Platform](set_N2807372.html)
2. SuiteScript

# SuiteScript

* [SuiteScript Overview](article_163726005075.html)
* [SuiteScript Developer Guide](book_14946590423.html)
* [SuiteScript Records Guide](book_1494659042.html)
* [SuiteScript 2.x](article_8161516336.html)
* [SuiteScript 2.x API Reference](article_4140956840.html)
* [SuiteScript 2.x Code Samples Catalog](article_6173706700.html)
* [SuiteScript 1.0 Documentation](article_7151939532.html)

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - SuiteScript 2.x
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_8161516336.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. SuiteScript 2.x

# SuiteScript 2.x

You can use SuiteScript to extend and customize, search, and process your NetSuite data. SuiteScript enables full-featured application-level scripting capabilities that support sophisticated procedural logic for both client and server scripts, as well as robust debugging.

The latest major version, SuiteScript 2.0, extends the capabilities provided by the initial SuiteScript version with an API architecture familiar to JavaScript developers. SuiteScript 2.x refers to the latest minor version of SuiteScript. The most recent minor version of SuiteScript is 2.1. For more information about SuiteScript 2.1 and SuiteScript versioning, see [SuiteScript 2.1](chapter_156042690639.html), [Executing Scripts Using SuiteScript 2.1](section_156632003699.html), and [SuiteScript Versioning Guidelines](section_4417231053.html).

The following are the characteristics of SuiteScript 2.x:

* SuiteScript 2.x is a JavaScript API that offers a broad range of options for enhancing and extending NetSuite. You can use SuiteScript to customize the behavior of a page, create custom workflows, schedule tasks, and much more.
* SuiteScript 2.x's modularity supports encapsulation, provides intuitive code organization, and ensures there are no global variable or method naming conflicts. Automatic dependency management enables you to concentrate on logic instead of dependencies and load order.
* SuiteScript 2.x is designed to support all standard JavaScript. The supplied SuiteScript 2.x APIs give you programmatic access to NetSuite functionality. For generic logic, you can use custom modules to load your preferred third party JavaScript APIs.
* SuiteScript 2.x API enhances the APIs supported by the previous SuiteScript version with APIs for SFTP file transfer, data caching, search pagination, flat file streaming, and enhanced encryption, decryption, and hashing.
* SuiteScript 2.x provides asynchronous processing through promises, map/reduce scripts that provide a structured framework for server scripts processing a large number of records, and support for all HTTP content types.

The [SuiteScript 2.x API Introduction](chapter_4387172221.html) topic provides information to help you learn how to use SuiteScript 2.x including a Hello World sample, the script creation process, and a list of developer resources.

Several script types are supported in SuiteScript 2.x including client scripts, user event scripts, scheduled scripts, and more. Using SuiteScript 2.x, you can create custom modules and custom pages and you can script records and subrecords. The following topics provide all the information you need to work with SuiteScript 2.x:

* [SuiteScript 2.x Analytic APIs](article_159524581218.html)
* [SuiteScript 2.x Script Types](chapter_4387172495.html)
* [SuiteScript 2.x Record Actions and Macros](chapter_1529336272.html)
* [SuiteScript 2.x JSDoc Validation](chapter_4387175355.html)
* [SuiteScript 2.x Entry Point Script Creation and Deployment](chapter_4525001447.html)
* [SuiteScript 2.x Custom Modules](chapter_4704097697.html)
* [SuiteScript 2.x Scripting Records and Subrecords](chapter_4675582755.html)
* [SuiteScript 2.x Custom Pages](chapter_1518456405.html)

To help you transition your scripts from SuiteScript 1.0 API to SuiteScript 2.x API, see [Transitioning from SuiteScript 1.0 to SuiteScript 2.x](article_160098544034.html).

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - SuiteScript 2.x API Reference
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4140956840.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. SuiteScript 2.x API Reference

# SuiteScript 2.x API Reference

The SuiteScript 2.x API includes global objects such as the define Object and the require Function, and modules which are organized based on behavior.

* Global objects can be used in your scripts without loading them as dependencies. The global objects in SuiteScript 2.x are: define Object, require Function, log Object, util Object, toString(), JSON object, Promise Object, and Iterator. See [SuiteScript 2.x Global Objects](chapter_4387171685.html) for information about all SuiteScript 2.x global objects.
* SuiteScript 2.x modules provide specific functionality. Each module can be loaded in your script to access its associated functionality. For example, you can load the N/file module to access and use file-related functionality. For a list of all SuiteScript 2.x modules, see [SuiteScript 2.x Modules](chapter_4220488571.html).

If you are converting a SuiteScript 1.0 script to SuiteScript 2.x, the [SuiteScript 1.0 to SuiteScript 2.x API Map](chapter_4752722762.html) topic will be helpful. That topic provides a mapping between SuiteScript 1.0 APIs (both nlapi functions and nlobj objects) and their corresponding SuiteScript 2.x APIs.

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - SuiteScript 2.x Modules
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4220488571.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. SuiteScript 2.x Modules

# SuiteScript 2.x Modules

SuiteScript 2.x APIs are organized into various modules, based on behavior. The following table lists each module and provides a description, the supported script types, and permissions associated with the module. See [Setting Roles and Permissions for SuiteScript](article_0403053450.html) for more information about permissions.

Note: 

As a best practice, you should load only the modules that are needed by your script.

| Module | Description | Supported Script Types\* | Permissions |
| --- | --- | --- | --- |
| [N/action Module](section_1510761537.html) | Load the N/action module to execute business logic to update the state of a record. Action APIs emulate NetSuite user interface buttons. | Client and server scripts | - |
| [N/auth Module](section_4296360422.html) | Load the N/auth module to change your NetSuite login credentials. | Server scripts | - |
| [N/cache Module](section_4642573343.html) | Load the N/cache module to enable the caching of needed data and improve performance. | Server scripts | - |
| [N/certificateControl Module](section_1547247950.html) | Load the N/certificateControl module to enable scripting access to the Digital Certificates list found at Setup > Company > Certificates. You can use this module to find the correct certificate for a subsidiary and check the file type. For more information, see [Digital Signing](chapter_1542656608.html) and [Uploading Digital Certificates](section_1542656620.html). | Server scripts | Certificate Management |
| [N/commerce Modules](section_1532341439.html) | Load modules in the N/commerce namespace to access different assets in the web store context, such as items and shopping cart. The modules within the N/commerce namespace are supported by the latest version of SuiteCommerce and by SuiteCommerce Advanced 2019.2 onwards. | Client and server scripts | - |
| [N/compress Module](section_158584507367.html) | Load the N/compress module to compress, decompress, and archive files. | Server scripts | - |
| [N/config Module](section_4261803800.html) | Load the N/config module to access NetSuite configuration settings. See [config.Type](section_4256772632.html) for a list of supported configuration pages. | Server scripts | - |
| [N/crypto Module](section_4358549582.html) | Load the N/crypto module to work with hashing, hash-based message authentication (hmac), and symmetrical encryption. You can access a set of wrappers for OpenSSL's hash, hmac, cipher, and decipher methods. | Server scripts | - |
| [N/crypto/certificate Module](section_1543432423.html) | Load the N/certificate module to sign XML documents or strings with digital certificates using asymmetric cryptography. In addition to signing XML documents, you can create signer and verifier objects and verify signed documents with this module. | Server scripts | Certificate Access |
| [N/crypto/random Module](section_13113107585.html) | Load the N/crypto/random module to work with cryptographically-secure pseudo-random generator methods. | Client and server scripts; server scripts support SuiteScript 2.1 only | - |
| [N/currency Module](section_4358551775.html) | Load the N/currency module to work with exchange rates within your NetSuite account. You can use this module to find the exchange rate between two currencies based on a certain date. | Client and server scripts | - |
| [N/currentRecord Module](section_4625600928.html) | Load the N/currentRecord module to access the record instance that you are currently working on. You can then use the record instance in a client context. | Client scripts | - |
| [N/dataset Module](article_158946741680.html) | Load the N/dataset module to create and manage datasets in SuiteAnalytics Workbook. Use this module with the N/workbook module to manage all aspects of your datasets and workbooks in SuiteAnalytics Workbook. | Server scripts | SuiteAnalytics Workbook |
| [N/documentCapture Module](article_8134325498.html) | Load the N/documentCapture module to extract text content from supported documents. This module lets you programmatically extract structured content and key information from a variety of document types (such as invoices, receipts, contracts, and so on). | Server scripts  SuiteScript 2.1 only | - |
| [N/email Module](section_4358552361.html) | Load the N/email module to send email messages from within NetSuite. You can use the email module to send regular, bulk, and campaign email. | Client and server scripts | - |
| [N/encode Module](section_4369847722.html) | Load the N/encode module to convert a string to another type of encoding. See [encode.Encoding](section_4369865177.html) for a list of supported character set encoding. | Server scripts | - |
| [N/error Module](section_4243798608.html) | Load the N/error module to create your own custom SuiteScript errors. Use these custom errors in try-catch statements to abort script execution. | Server scripts | - |
| [N/file Module](section_4205693274.html) | Load the N/file module to work with files in NetSuite. | Server scripts | - |
| [N/format Module](section_4388721627.html) | Load the N/format module to convert strings into a specified format and to parse formatted data into strings. | Client and server scripts | - |
| [N/format/i18n Module](section_1543861741.html) | Load the N/format/i18n module to format currency. | Client and server scripts | - |
| [N/http Module](section_4296361104.html) | Load the N/http module to make http calls. | Client and server scripts | - |
| [N/https Module](section_4418229131.html) | Load the N/https module to make https calls. You can also use this module to encode binary content or securely access a handle to the value in a NetSuite credential field. | Client and server scripts | - |
| [N/https/clientCertificate Module](section_1543986321.html) | Load the N/clientCertificate module to send SSL requests with a digital certificate. | Server scripts | Certificate Access |
| [N/keyControl Module](section_1557413213.html) | Load the N/keyControl module to access key storage. | Server scripts | Key Management |
| [N/llm Module](article_9123730083.html) | Load the N/llm module to use generative artificial intelligence (AI) capabilities. You can use this module to send requests to the large language models (LLMs) supported by NetSuite and to receive LLM responses to use in your scripts. | Server scripts  SuiteScript 2.1 only | - |
| [N/log Module](section_4574548135.html) | Load the N/log module to access methods for logging script execution details. Module members are also supported by the global [log Object](section_4387812838.html). | Client and server scripts  Limitations apply to client scripts | - |
| [N/machineTranslation Module](article_3151132758.html) | Load the N/machineTranslation module to translate text into supported languages using generative AI. | Server scripts  SuiteScript 2.1 only | - |
| [N/pgp Module](article_5095832176.html) | Load the N/pgp module to send secure messages to one or multiple receivers. | Server scripts  SuiteScript 2.1 only | - |
| [N/piremoval Module](section_156173791240.html) | Load the N/piremoval module to remove personal information (PI) from system notes, workflow history, and specific field values. | Server scripts | Remove Personal Information Create  Remove Personal Information Run |
| [N/plugin Module](section_4558176297.html) | Load the N/plugin module to load custom plug-in implementations. | Server scripts | - |
| [N/portlet Module](section_4473510730.html) | Load the N/portlet module to resize or refresh a form portlet. | Client scripts | - |
| [N/query Module](section_1510275060.html) | Load the N/query module to create and run searches using the SuiteAnalytics Workbook query process. | Client and server scripts | SuiteAnalytics Workbook |
| [N/record Module](section_4267255811.html) | Load the N/record module to work with NetSuite records. | Client and server scripts | - |
| [N/recordContext Module](section_158627324548.html) | Load the N/recordContext module to get the context type of a record. | Client and server scripts | - |
| [N/redirect Module](section_4424286105.html) | Load the N/redirect module to redirect users to a URL, a Suitelet, a record, a task link, a saved search, or an unsaved search. | Server scripts | - |
| [N/render Module](section_4412042824.html) | Load the N/render module to create forms or email from templates and to print to PDF or HTML. | Server scripts | Advanced PDF/HTML Templates  Custom PDF Layouts |
| [N/runtime Module](section_4296359529.html) | Load the N/runtime module to access runtime settings for company, script, session, system, user, or version. | Client and server scripts |  |
| [N/scriptTypes/restlet Module](article_4130555042.html) | Load the N/scriptTypes/restlet module to create custom handling for your RESTlet script. | RESTlet scripts | - |
| [N/search Module](section_4345764122.html) | Load the N/search module to create and run on-demand or saved searches and analyze and iterate through the search results. You can search for a single record by keywords, create saved searches, search for duplicate records, or return a set of records that match filters you define. | Client and server scripts | Perform Search  Persist Search  Publish Search |
| [N/sftp Module](section_4617004932.html) | Load the N/sftp module to connect to a remote FTP server using SFTP and transfer files. | Server scripts | Key Access (needed when public key authentication is used) |
| N/sso Module | Note:  As of NetSuite 2025.1, the support ended for the SuiteSignOn feature, which means the N/sso module is also no longer supported.  Load the N/sso module to generate outbound single sign-on (SuiteSignOn) tokens. | Client and server scripts | - |
| [N/suiteAppInfo Module](article_160236086332.html) | Load the N/suiteAppInfo module when you want to access information related to SuiteApps and Bundles. | Client and server scripts | - |
| [N/task Module](section_4345787858.html) | Load the N/task module to create tasks and place them in the internal NetSuite scheduling or task queue. Use this module to schedule scripts, run Map/Reduce scripts, import CSV files, merge duplicate records, and execute asynchronous workflows. | Server scripts | Tasks |
| [N/task/accounting/recognition Module](section_1554472720.html) | Load the task/accounting/recognition module to merge revenue arrangements or revenue elements. This module lets you combine revenue arrangements or revenue elements from multiple sources to represent a single contract for revenue allocation and recognition. | Server scripts | (Transactions) Revenue Arrangement |
| [N/transaction Module](section_4413162576.html) | Load the N/transaction module to void transactions. | Client and server scripts | - |
| [N/translation Module](section_1538666156.html) | Load the N/translation module to load NetSuite Translation Collections in SuiteScript. | Client and server scripts | - |
| [N/ui/dialog Module](section_4497725142.html) | Load the N/dialog module to create a modal dialog that is displayed until a button on the dialog is pressed. | Client scripts | - |
| [N/ui/message Module](section_4497735093.html) | Load the N/message module to display a message at the top of the screen under the menu bar. | Client scripts | - |
| [N/ui/serverWidget Module](section_4321345532.html) | Load the N/serverWidget module to work with the user interface within NetSuite. | Server scripts | - |
| [N/url Module](section_4358552918.html) | Load the N/url module to determine URL navigation paths within NetSuite or format URL strings. | Client and server scripts | - |
| [N/util Module](section_4569538303.html) | Load the N/util module to manually access util methods. Module members are also supported by the global [util Object](section_4387813290.html). | Client and server scripts | - |
| [N/workbook Module](article_159006350818.html) | Load the N/workbook module to create and manage workbooks in SuiteAnalytics Workbook. Use this module with the N/dataset module to manage all aspects of your datasets and workbooks in SuiteAnalytics Workbook. | Server scripts | SuiteAnalytics Workbook |
| [N/workflow Module](section_4341725558.html) | Load the N/workflow module to initiate new workflow instances or trigger existing workflow instances. | Server scripts | Workflow |
| [N/xml Module](section_4344917661.html) | Load the N/xml module to validate, parse, read, and modify XML documents. | Client and server scripts | - |
| \* If you include a module in a script that is not a supported script type, an execution error will occur. This error may be UNEXPECTED\_ERROR or INSUFFICIENT\_PERMISSION or another error that indicates the method in the module could not be executed. | | - | |

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - workflow.initiate(options)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4344303916.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/workflow Module](section_4341725558.html)
6. workflow.initiate(options)

# workflow.initiate(options)

|  |  |
| --- | --- |
| **Method Description** | Initiates a workflow on-demand. This method is the programmatic equivalent of the [Initiate Workflow Action](section_N2743465.html) action in SuiteFlow.  Returns the internal ID of the workflow instance used to track the workflow against the record.  To asynchronously initiate a workflow, see [task.WorkflowTriggerTask](section_4345799266.html). |
| **Returns** | number |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html) |
| **Governance** | 20 units |
| **Module** | [N/workflow Module](section_4341725558.html) |
| **Since** | 2015.2 |

## Parameters

Note: 

The `options` parameter is a JavaScript object.

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| `options.defaultValues` | Object | optional | The object that contains key-value pairs to set default values on fields specific to the workflow.  These can include fields on the [Workflow Definition Page](section_4071170616.html) or workflow and state [Workflow Custom Fields](section_4071955161.html). | 2015.2 |
| `options.recordId` | string | number | required | The internal ID of the base record. | 2015.2 |
| `options.recordType` | string | required | The record type ID of the workflow base record. Use values from the [record.Type](section_4273205732.html) enum. This is the **Record Type** field on the [Workflow Definition Page](section_4071170616.html). | 2015.2 |
| `options.workflowId` | string | number | required | The internal ID (number) or script ID (string) for the workflow definition. This is the **ID** field on the [Workflow Definition Page](section_4071170616.html). | 2015.2 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a complete script example, see [N/workflow Module Script Sample](section_0305035055.html).

```
          //Add additional code
...
var workflowInstanceId = workflow.initiate({
    recordType: 'customer',
    recordId: 24,
    workflowId: 'customworkflow_myWorkFlow'
});
...
//Add additional code
```

### Related Topics

* [N/workflow Module](section_4341725558.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## workflow_module: NetSuite Applications Suite - workflow.trigger(options)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4344892270.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/workflow Module](section_4341725558.html)
6. workflow.trigger(options)

# workflow.trigger(options)

|  |  |
| --- | --- |
| **Method Description** | Triggers a workflow on a record. The actions and transitions of the workflow are evaluated for the record in the workflow instance, based on the current state for the workflow instance.  Returns the internal ID of the workflow instance used to track the workflow against the record. |
| **Returns** | number |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html) |
| **Governance** | 20 units |
| **Module** | [N/workflow Module](section_4341725558.html) |
| **Since** | 2015.2 |

## Parameters

Note: 

The `options` parameter is a JavaScript object.

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| `options.actionId` | string | number | optional | The internal ID of a button that appears on the record in the workflow.  Use this parameter to trigger the workflow as if the specified button were clicked. | 2015.2 |
| `options.recordId` | string | required | The record ID of the workflow base record. | 2015.2 |
| `options.recordType` | string | required | The record type ID of the workflow base record. Use values from the [record.Type](section_4273205732.html) enum. This is the **Record Type** field on the [Workflow Definition Page](section_4071170616.html). | 2015.2 |
| `options.stateId` | string | number | optional | The internal ID (number) or script ID (string) of the workflow state that contains the action. | 2015.2 |
| `options.workflowId` | string | number | required | The internal ID (number) or script ID (string) for the workflow definition. This is the **ID** field on the [Workflow Definition Page](section_4071170616.html). | 2015.2 |
| `options.workflowInstanceId` | string | number | optional | The internal ID of the workflow instance. | 2015.2 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a complete script example, see [N/workflow Module Script Sample](section_0305035055.html).

```
          //Add additional code
...
var workflowInstanceId = workflow.trigger({
    recordId: '5', // replace with an actual record id    
    recordType: 'salesorder',
    workflowId: 'custworkflow_name',
    actionId: workflowaction25
});
...
//Add additional code
```

### Related Topics

* [N/workflow Module](section_4341725558.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)
