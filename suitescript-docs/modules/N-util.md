---
module: util_module
sources:
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N000004.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569538303.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_N2807372.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_1502135122.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_8161516336.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4140956840.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4387171685.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4220488571.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4542785226.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4541697371.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4541702994.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434638201.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159485198809.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434638340.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434642842.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434697652.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434771374.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434780923.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434785140.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434798099.html
titles:
  - NetSuite Applications Suite - General Notices
  - NetSuite Applications Suite - N/util Module
  - NetSuite Applications Suite - SuiteCloud Platform
  - NetSuite Applications Suite - SuiteScript
  - NetSuite Applications Suite - SuiteScript 2.x
  - NetSuite Applications Suite - SuiteScript 2.x API Reference
  - NetSuite Applications Suite - SuiteScript 2.x Global Objects
  - NetSuite Applications Suite - SuiteScript 2.x Modules
  - NetSuite Applications Suite - toString()
  - NetSuite Applications Suite - util.each(iterable, callback)
  - NetSuite Applications Suite - util.extend(receiver, contributor)
  - NetSuite Applications Suite - util.isArray(obj)
  - NetSuite Applications Suite - util.isAsyncFunction(obj)
  - NetSuite Applications Suite - util.isBoolean(obj)
  - NetSuite Applications Suite - util.isDate(obj)
  - NetSuite Applications Suite - util.isFunction(obj)
  - NetSuite Applications Suite - util.isNumber(obj)
  - NetSuite Applications Suite - util.isObject(obj)
  - NetSuite Applications Suite - util.isRegExp(obj)
  - NetSuite Applications Suite - util.isString(obj)
---

## util_module: NetSuite Applications Suite - General Notices
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

## util_module: NetSuite Applications Suite - N/util Module
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4569538303.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. N/util Module

# N/util Module

Use the N/util module to manually access methods that verify object and primitive types in a SuiteScript 2.x script. These methods can also be accessed using the global util object. For more information about the global util object, see [SuiteScript 2.x Global Objects](chapter_4387171685.html).

Use the N/util module to access methods that verify object and primitive types in a SuiteScript 2.x script.

Each method (for example, [util.isArray(obj)](section_4434638201.html)) returns a boolean value, based on evaluation of the `obj` parameter.

If you need to identify a type specific to SuiteScript 2.x, use the [toString()](section_4542785226.html) global method.

## In This Help Topic

* [N/util Module Members](#bridgehead_4569540539)

## N/util Module Members

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Method | [util.each(iterable, callback)](section_4541697371.html) | Object or Array | Client and server scripts | Iterates over each member in an Object or Array. |
| [util.extend(receiver, contributor)](section_4541702994.html) | Object | Client and server scripts | Copies the properties in a source object to a destination object. |
| [util.isArray(obj)](section_4434638201.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a JavaScript Array object and false otherwise. |
| [util.isAsyncFunction(obj)](section_159485198809.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is JavaScript Async Function and false otherwise. |
| [util.isBoolean(obj)](section_4434638340.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a JavaScript Boolean and false otherwise. |
| [util.isDate(obj)](section_4434642842.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a JavaScript Date object and false otherwise. |
| [util.isFunction(obj)](section_4434697652.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a JavaScript Function or Async Function and false otherwise. |
| [util.isNumber(obj)](section_4434771374.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a JavaScript Number object or a value that evaluates to a Number object, and false otherwise. |
| [util.isObject(obj)](section_4434780923.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a plain JavaScript object (new Object() or {} for example), and false otherwise. |
| [util.isRegExp(obj)](section_4434785140.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a JavaScript RegExp object or a value that evaluates to a RegExp object, and false otherwise. |
| [util.isString(obj)](section_4434798099.html) | boolean | Client and server scripts | Returns true if the `obj` parameter is a JavaScript String object or a value that evaluates to a String object, and false otherwise. |

### Related Topics

* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - SuiteCloud Platform
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

## util_module: NetSuite Applications Suite - SuiteScript
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

## util_module: NetSuite Applications Suite - SuiteScript 2.x
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

## util_module: NetSuite Applications Suite - SuiteScript 2.x API Reference
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

## util_module: NetSuite Applications Suite - SuiteScript 2.x Global Objects
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4387171685.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. SuiteScript 2.x Global Objects

# SuiteScript 2.x Global Objects

SuiteScript 2.x includes the following global objects. You can use these objects in your scripts without loading them as dependencies.

* [define Object](section_4387811519.html)
* [require Function](section_4387813188.html)
* [log Object](section_4387812838.html)
* [util Object](section_4387813290.html)
* [toString()](section_4542785226.html)
* [JSON object](section_4387812540.html)
* [Promise Object](section_4387812940.html)
* [Iterator](section_0831085754.html)

Note: 

In JavaScript, all functions are objects. The [define Object](section_4387811519.html) and [require Function](section_4387813188.html) topics discuss `define()` and `require()` used by SuiteScript 2.x to load and define modules.

Note: 

Also, to safely use the require object or the N/log and N/util modules, you should specifically import those modules as dependencies of your scripts, especially in your SuiteScript 2.1 scripts.

### Related Topics

* [SuiteScript 2.x](article_8161516336.html)
* [SuiteScript 2.x API Introduction](chapter_4387172221.html)
* [SuiteScript 1.0 to SuiteScript 2.x API Map](chapter_4752722762.html)
* [SuiteScript 2.x Script Types](chapter_4387172495.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x Record Actions and Macros](chapter_1529336272.html)
* [SuiteScript 2.x JSDoc Validation](chapter_4387175355.html)
* [SuiteScript 2.x Entry Point Script Creation and Deployment](chapter_4525001447.html)
* [SuiteScript 2.x Custom Modules](chapter_4704097697.html)
* [SuiteScript 2.x Scripting Records and Subrecords](chapter_4675582755.html)
* [SuiteScript 2.x Custom Pages](chapter_1518456405.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - SuiteScript 2.x Modules
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

## util_module: NetSuite Applications Suite - toString()
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4542785226.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Global Objects](chapter_4387171685.html)
5. toString()

# toString()

|  |  |
| --- | --- |
| **Method Description** | Method used to determine an object's type. This is a global method that is loaded by default for all native SuiteScript 2.x API objects.  Note:  Consider this method a replacement for the instanceOf operator (which is not supported). SuiteScript 2.x members are immutable; you cannot construct or modify a native SuiteScript 2.x member. Consequently, if you attempt to call instanceOf, an undefined error is thrown.  For information about `toString()` as a native JavaScript method, see [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_objects/object/toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString). |
| **Returns** | The object type as a string |
| **Supported Script Types** | Client and server scripts |
| **Governance** | None |
| **Since** | 2015.2 |

## Syntax

The following code snippet shows the syntax for this member. It is not a functional example.

```
          ...
var type = mapContext.toString();     // When called on mapReduce.MapContext, toString returns "mapReduce.MapContext"
...
```

### Related Topics

* [SuiteScript 2.x Global Objects](chapter_4387171685.html)
* [define Object](section_4387811519.html)
* [require Function](section_4387813188.html)
* [log Object](section_4387812838.html)
* [util Object](section_4387813290.html)
* [JSON object](section_4387812540.html)
* [Promise Object](section_4387812940.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.each(iterable, callback)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4541697371.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.each(iterable, callback)

# util.each(iterable, callback)

|  |  |
| --- | --- |
| **Method Description** | Iterates over each member in an Object or Array.  This method calls the `callback` function on each member of the `iterable`. |
| **Returns** | The original collection as an Object | Array |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| iterable | Object | Array | required | The data collection to iterate on. | 2016.1 |
| callback | Function | required | Takes the custom logic that you want to execute on each member of your collection of data. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
// Iterate through the object and set the key-value pairs on the record
util.each(itemList, function(quantity, itemId){
    rec.selectNewLine('item');
    rec.setCurrentSublistValue('item','item',itemId);
    rec.setCurrentSublistValue('item','quantity',quantity);
    rec.commitLine('item');
  });
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.extend(receiver, contributor)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4541702994.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.extend(receiver, contributor)

# util.extend(receiver, contributor)

|  |  |
| --- | --- |
| **Method Description** | Copies the properties in a source object to a destination object.  You can use this method to merge two objects. |
| **Returns** | The destination object. |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Syntax

Important: 

The following code snippets shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

This snippet shows combining two objects without the same keys:

```
          //Add additional code 
...
    var colors = {};
    var firstSet = {'color1':'red',
        'color2':'yellow',
        'color3':'blue'};
    var secondSet = {'color4':'green',
         'color5':'orange',
         'color6':'violet'
    };
  
  // Extends colors object with the information in firstSet
  // Colors will get {'color1':'red','color2':'yellow','color3':'blue'}
  util.extend(colors, firstSet);
  
  // Extends colors object with the information in secondSet 
  // Colors will get {'color1':'red','color2':'yellow','color3':'blue','color4':'green','color5':'orange','color6':'violet'}
  util.extend(colors, secondSet);
});
...
//Add additional code
```

The following snippet shows overriding two objects with a few similar keys:

```
          //Add additional code 
...
    var colors = {};
    var firstSet = {'color1':'red',
        'color2':'yellow',
        'color3':'blue'
    };
    var secondSet = {'color2':'green',
        'color3':'orange',
        'color4':'violet'
    };
  
  // Extends colors object with the information in firstSet
  // Colors will get {'color1':'red','color2':'yellow','color3':'blue'}
  util.extend(colors, firstSet);
  
  // Extends colors object with the information in secondSet and overrides the value if there are similar keys
  // Colors will get {'color1':'red','color2':'green','color3':'orange','color4':'violet'}
  util.extend(colors, secondSet);

  var x = 0;
});
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isArray(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434638201.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isArray(obj)

# util.isArray(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript Array object and false otherwise. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Global object** | [util Object](section_4387813290.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
var records = ["Sales Order", "Invoice", "Item Fulfillment"];
util.isArray(records); // returns true

var record = "Sales Order";
util.isArray(record); // returns false
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isAsyncFunction(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159485198809.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isAsyncFunction(obj)

# util.isAsyncFunction(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript AsyncFunction and false otherwise. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2020.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2020.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

Also note that the `async` keyword is used in this sample, which is only supported in SuiteScript 2.1.

```
          //Add additional code 
...
function func1(){
    var x = 1;
}
var func2 = function(){};
            
async function async1(){
   var x = 2;
}
    
var async2 = async function(){};

var a = util.isAsyncFunction(func1);  // function returns false (a = false)
var b = util.isAsynFunction(func2);   // function returns false (b = false)
var c = util.isAsyncFunction(async1); // function returns true (c = true)
var d = util.isAsyncFunction(async2)  // function returns true (d = true)
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isBoolean(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434638340.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isBoolean(obj)

# util.isBoolean(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript Boolean and false otherwise. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
var flag = true;
util.isBoolean(flag); // returns true
util.isBoolean(true);   // returns true

util.isBoolean(1);      // returns false
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isDate(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434642842.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isDate(obj)

# util.isDate(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript Date object and false otherwise. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
var todaysDate = new Date();
util.isDate(todaysDate);    // returns true
util.isDate(new Date());    // returns true

var today = "September 28, 2015";
util.isDate(today);         // returns false
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isFunction(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434697652.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isFunction(obj)

# util.isFunction(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript Function or AsyncFunction and false otherwise. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
function test() {};
var test2 = function() {};

util.isFunction(test);    // returns true
util.isFunction(test2);   // returns true
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isNumber(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434771374.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isNumber(obj)

# util.isNumber(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript Number object or primitive, and false otherwise. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
util.isNumber(112);                // returns true
util.isNumber("112");              // returns false
util.isNumber(NaN);                // returns true

var testNum = 112;
util.isNumber(testNum.valueOf());  // returns true
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isObject(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434780923.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isObject(obj)

# util.isObject(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a plain JavaScript object (new Object() or {} for example), and false otherwise.  Use this method, for example, to verify that a variable is a JavaScript object and not a JavaScript Function. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
util.isObject({});                // returns true
util.isObject(function() {});     // returns false
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isRegExp(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434785140.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isRegExp(obj)

# util.isRegExp(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript RegExp object, and false otherwise. |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
util.isRegExp(/this is a regexp/);                   // returns true
util.isRegExp(new RegExp('this is another regexp')); // returns true
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## util_module: NetSuite Applications Suite - util.isString(obj)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4434798099.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/util Module](section_4569538303.html)
6. util.isString(obj)

# util.isString(obj)

|  |  |
| --- | --- |
| **Method Description** | Returns true if the `obj` parameter is a JavaScript String object or primitive, and false otherwise |
| **Returns** | boolean |
| **Supported Script Types** | Client and server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/util Module](section_4569538303.html) |
| **Since** | 2016.1 |

## Parameters

| Parameter | Type | Required / Optional | Description | Since |
| --- | --- | --- | --- | --- |
| obj | Object | Primitive | required | Object for which you want to verify the type. | 2016.1 |

## Syntax

Important: 

The following code snippet shows the syntax for this member. It is not a functional example. For a full script sample, see [N/util Module Script Sample](section_0305034417.html).

```
          //Add additional code 
...
util.isString('');                            // returns true
util.isString('a string');                    // returns true

var myString = new String('another string');
util.isString(myString);                      // returns true

util.isString(null);                          // returns false
...
//Add additional code
```

### Related Topics

* [N/util Module](section_4569538303.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)
