---
module: datasetlink_module
sources:
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/part_160199594697.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_162627392718.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_158989971922.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_158948063457.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_158948233177.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159354415610.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626675925.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626627810.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626649573.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626666908.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N000004.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_158946741680.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_162609851226.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_N2807372.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/set_1502135122.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4140956840.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4220488571.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/part_160199602236.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159051610759.html
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159008229845.html
titles:
  - NetSuite Applications Suite - Dataset Builder Plug-in
  - NetSuite Applications Suite - Dataset Linking in SuiteAnalytics Workbook
  - NetSuite Applications Suite - dataset.create(options)
  - NetSuite Applications Suite - dataset.Dataset
  - NetSuite Applications Suite - Dataset.getExpressionFromColumn(options)
  - NetSuite Applications Suite - Dataset.save(options)
  - NetSuite Applications Suite - datasetLink.create(options)
  - NetSuite Applications Suite - datasetLink.DatasetLink
  - NetSuite Applications Suite - DatasetLink.datasets
  - NetSuite Applications Suite - DatasetLink.expressions
  - NetSuite Applications Suite - General Notices
  - NetSuite Applications Suite - N/dataset Module
  - NetSuite Applications Suite - N/datasetLink Module
  - NetSuite Applications Suite - SuiteCloud Platform
  - NetSuite Applications Suite - SuiteScript
  - NetSuite Applications Suite - SuiteScript 2.x API Reference
  - NetSuite Applications Suite - SuiteScript 2.x Modules
  - NetSuite Applications Suite - Workbook Builder Plug-in
  - NetSuite Applications Suite - workbook.createPivot(options)
  - NetSuite Applications Suite - workbook.Expression
---

## datasetlink_module: NetSuite Applications Suite - Dataset Builder Plug-in
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/part_160199594697.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [Core Plug-ins](book_4616046155.html)
3. Dataset Builder Plug-in

# Dataset Builder Plug-in

* [Dataset Builder Plug-in Interface Overview](article_160129745465.html)
* [Dataset Builder Plug-in Interface Definition](article_160130249143.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - Dataset Linking in SuiteAnalytics Workbook
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_162627392718.html

## datasetlink_module: NetSuite Applications Suite - dataset.create(options)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_158989971922.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/dataset Module](article_158946741680.html)
6. dataset.create(options)

# dataset.create(options)

|  |  |
| --- | --- |
| **Method Description** | Creates a dataset based on a record type. A dataset can include columns and conditions (criteria). |
| **Returns** | [dataset.Dataset](section_158948063457.html) |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/dataset Module](article_158946741680.html) |
| **Sibling Module Members** | [N/dataset Module Members](article_158946741680.html#subsect_158946757184) |
| **Since** | 2020.2 |

## Parameters

Note: 

The `options` parameter is a JavaScript object.

| Parameter | Type | Required / Optional | Description |
| --- | --- | --- | --- |
| `options.columns` | [dataset.Column](section_158946808345.html)[] | optional | The fields (columns) in the dataset. |
| `options.condition` | [dataset.Condition](section_158946951148.html) | optional | The condition (criteria to be applied to the dataset. A condition can have children which are combined using the appropriate operator (AND or OR) to produce the criteria used. |
| `options.description` | string | optional | The description of the dataset. |
| `options.id` | string | optional | The script ID of the dataset. |
| `options.name` | string | optional | The name of the dataset. |
| `options.type` | string | required | The internal ID for the record type on which to build the dataset.  Use the [Records Catalog](book_159368199162.html) to find the Internal ID of scriptable records. |

## Errors

| Error Code | Thrown If |
| --- | --- |
| `INVALID_SEARCH_TYPE` | The `options.type` parameter is invalid. |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script example, see [N/dataset Module Script Samples](section_0303050851.html). Also see the [Tutorial: Creating a Dataset Using the Workbook API](article_159414513430.html) topic.

```
            / Add additional code
...
// Create a basic Dataset
var myDataset = dataset.create({
    type: 'transaction'
});

// Create a comprehensive (full) Dataset
var myDataset = dataset.create({
    type: 'transaction',
    name: 'My Transaction Dataset',
    id: 'trans_dataset',
    description: 'My comprehensive transaction dataset that includes columns and a condition',
    condition: myCondition,    // Create this using dataset.createCondition
    columns: myColumns         // Create this using dataset.createColumn
});
...
// Add additional code
```

### Related Topics

* [N/dataset Module](article_158946741680.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - dataset.Dataset
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_158948063457.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/dataset Module](article_158946741680.html)
6. dataset.Dataset

# dataset.Dataset

|  |  |
| --- | --- |
| **Object Description** | Encapsulates the entire dataset, including columns, conditions, and joins.  Use [dataset.create(options)](section_158989971922.html) to create this object. |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Module** | [N/dataset Module](article_158946741680.html) |
| **Methods and Properties** | [Dataset Object Members](article_158946741680.html#subsect_158946789261) |
| **Since** | 2020.2 |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script example, see [N/dataset Module Script Samples](section_0303050851.html). Also see the [Tutorial: Creating a Dataset Using the Workbook API](article_159414513430.html) topic.

```
            // Add additional code
...
// Create a basic Dataset
var myDataset = dataset.create({
    type: 'transaction'
});

// Create a comprehensive (full) Dataset
var myDataset = dataset.create({
    type: 'transaction',
    name: 'My Transaction Dataset',
    id: 'custdataset_dataset',
    description: 'My comprehensive transaction dataset that includes columns and a condition',
    condition: myCondition,    // Create this using dataset.createCondition
    columns: [myColumns]       // Create this using dataset.createColumn
});

// Load a dataset and view its Dataset (in the log)
var myDataset = dataset.load({
    id: '1'    // Replace with a valid ID value for your account
});
var myDatasetDataset = myDataset.Dataset;

// Note that some Dataset properties may be empty/null based on the loaded dataset
log.audit({
    title: 'Dataset columns = ',
    details: myDatasetDataset.columns
});
log.audit({
    title: 'Dataset condition = ',
    details: myDatasetDataset.condition
});
log.audit({
    title: 'Dataset description = ',
    details: myDatasetDataset.description
});
log.audit({
    title: 'Dataset id = ',
    details: myDatasetDataset.id
});
log.audit({
    title: 'Dataset name = ',
    details: myDatasetDataset.name
});
log.audit({
    title: 'Dataset type = ',
    details: myDatasetDataset.type
});
...
// Add additional code
```

### Related Topics

* [N/dataset Module](article_158946741680.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - Dataset.getExpressionFromColumn(options)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_158948233177.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/dataset Module](article_158946741680.html)
6. [dataset.Dataset](section_158948063457.html)
7. Dataset.getExpressionFromColumn(options)

# Dataset.getExpressionFromColumn(options)

|  |  |
| --- | --- |
| **Method Description** | Returns an expression which can be used in workbook. |
| **Returns** | [workbook.Expression](section_159008229845.html) |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/dataset Module](article_158946741680.html) |
| **Parent Object** | [dataset.Dataset](section_158948063457.html) |
| **Sibling Object Members** | [Dataset Object Members](article_158946741680.html#subsect_158946789261) |
| **Since** | 2020.2 |

## Parameters

Note: 

The `options` parameter is a JavaScript object.

| Parameter | Type | Required / Optional | Description |
| --- | --- | --- | --- |
| `options.columnId` | number | required if `options.alias` is not specified | The ID of the column. |
| `options.alias` | string | required if `options.columnId` is not specified | The alias of the column. |

## Errors

| Error Code | Thrown If |
| --- | --- |
| `MUTUALLY_EXCLUSIVE_ARGUMENTS` | Both the `options.columnID` and the `options.alias` parameters are specified. |
| `NEITHER_ARGUMENT_DEFINED` | Neither the `options.columnID` or the `options.alias` parameter is specified. |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script example, see [N/dataset Module Script Samples](section_0303050851.html). Also see the [Tutorial: Creating a Dataset Using the Workbook API](article_159414513430.html) topic.

```
            // Add additional code
...
// Load a dataset that includes a column that has an expression
var myDataset = dataset.load({
    id: 'stddataset_mydataset'    // Replace with a valid ID value for your account
});
var myWorkbookExpressionId = myDataset.getExpressionFromColumn({
    columnId: 15
});
var myWorkbookExpressionAlias = myDataset.getExpressionFromColumn({
    columnId: 16
    alias: 'myExpression'
});

log.debug({
    title: "myWorkbookExpression: ",
    details: myWorkbookExpression
});

...
// Add additional code
```

### Related Topics

* [dataset.Dataset](section_158948063457.html)
* [N/dataset Module](article_158946741680.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - Dataset.save(options)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159354415610.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/dataset Module](article_158946741680.html)
6. [dataset.Dataset](section_158948063457.html)
7. Dataset.save(options)

# Dataset.save(options)

|  |  |
| --- | --- |
| **Method Description** | Saves a dataset.  When you save a dataset, you must provide a name, which will appear in the SuiteAnalytics Workbook UI. Optionally, you can provide a description and an ID. If you do not provide an ID, one is generated automatically.  The object returned from this method includes only the `id` property and its value. |
| **Returns** | Object |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | 10 |
| **Module** | [N/dataset Module](article_158946741680.html) |
| **Parent Object** | [dataset.Dataset](section_158948063457.html) |
| **Sibling Object Members** | [Dataset Object Members](article_158946741680.html#subsect_158946789261) |
| **Since** | 2020.2 |

## Parameters

Note: 

The `options` parameter is a JavaScript object.

| Parameter | Type | Required / Optional | Description |
| --- | --- | --- | --- |
| `options.name` | string | [workbook.Expression](section_159008229845.html) | required | The name of the dataset. |
| `options.description` | string | [workbook.Expression](section_159008229845.html) | optional | The description of the dataset. |
| `options.id` | string | optional | The ID of the dataset. |

## Errors

| Error Code | Thrown If |
| --- | --- |
| `INVALID_ID_PREFIX` | The value of the `options.id` parameter does not start with `custdataset`. |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script example, see [N/dataset Module Script Samples](section_0303050851.html). Also see the [Tutorial: Creating a Dataset Using the Workbook API](article_159414513430.html) topic.

```
            // Add additional code
...
// Create and save a new dataset
var myNewDataset = dataset.create({
    type: 'transaction',
    columns: [myDatasetColumns]
});
myNewDataset.save({
    name: 'My Dataset',
    description: 'This is a sample dataset.',
    id: 'custdataset_myDataset'
});

...
// Add additional code
```

### Related Topics

* [dataset.Dataset](section_158948063457.html)
* [N/dataset Module](article_158946741680.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - datasetLink.create(options)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626675925.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/datasetLink Module](article_162609851226.html)
6. datasetLink.create(options)

# datasetLink.create(options)

|  |  |
| --- | --- |
| **Method Description** | Links two datasets using a common column expression.  To link two datasets, both datasets must include a column that shares common data, such as a date. You use [Dataset.getExpressionFromColumn(options)](section_158948233177.html) to obtain expressions for each column, then you specify these expressions (and the datasets they are part of) when you call `datasetLink.create(options)`. |
| **Returns** | [datasetLink.DatasetLink](section_162626627810.html) |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/datasetLink Module](article_162609851226.html) |
| **Sibling Module Members** | [N/datasetLink Module Members](article_162609851226.html#subsect_163103532457) |
| **Since** | 2021.2 |

## Parameters

Note: 

The `options` parameter is a JavaScript object.

| Parameter | Type | Required / Optional | Description |
| --- | --- | --- | --- |
| `options.datasets` | [dataset.Dataset](section_158948063457.html)[] | required | The datasets to link. |
| `options.expressions` | Array<[workbook.Expression](section_159008229845.html)[]> | required | The column expressions to use to link the datasets. |
| `options.id` | string | optional | The ID of the linked dataset.  If you do not provide a value for this parameter, an ID is generated automatically and assigned to the [DatasetLink.id](section_163103980595.html) property of the returned [datasetLink.DatasetLink](section_162626627810.html) object. |

## Errors

| Error Code | Thrown If |
| --- | --- |
| `NO_DATASET_DEFINED` | The value of the `options.datasets` parameter is an empty array. |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script sample, see [N/datasetLink Module Script Sample](section_0303050238.html).

```
            // Add additional code
...
var myDatasetLink = datasetLink.create({
    datasets: [firstDataset, secondDataset],
    expressions: [[columnExpInFirstDataset, columnExpInSecondDataset]],
    id: 'myDatasetLinkId'
});
...
// Add additional code
```

### Related Topics

* [N/dataset Module](article_158946741680.html)
* [Dataset Linking in SuiteAnalytics Workbook](article_162627392718.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - datasetLink.DatasetLink
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626627810.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/datasetLink Module](article_162609851226.html)
6. datasetLink.DatasetLink

# datasetLink.DatasetLink

|  |  |
| --- | --- |
| **Object Description** | A representation of two datasets that are linked using [datasetLink.create(options)](section_162626675925.html). |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Module** | [N/datasetLink Module](article_162609851226.html) |
| **Methods and Properties** | [DatasetLink Object Members](article_162609851226.html#subsect_163103571098) |
| **Since** | 2021.2 |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script sample, see [N/datasetLink Module Script Sample](section_0303050238.html).

```
            // Add additional code
...
var myDatasetLink = datasetLink.create({
    datasets: [firstDataset, secondDataset],
    expressions: [[columnExpInFirstDataset, columnExpInSecondDataset]],
    id: 'myDatasetLinkId'
});
...
// Add additional code
```

### Related Topics

* [N/dataset Module](article_158946741680.html)
* [Dataset Linking in SuiteAnalytics Workbook](article_162627392718.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - DatasetLink.datasets
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626649573.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/datasetLink Module](article_162609851226.html)
6. [datasetLink.DatasetLink](section_162626627810.html)
7. DatasetLink.datasets

# DatasetLink.datasets

|  |  |
| --- | --- |
| **Property Description** | The linked datasets that the [datasetLink.DatasetLink](section_162626627810.html) object represents. |
| **Type** | [dataset.Dataset](section_158948063457.html)[] |
| **Module** | [N/datasetLink Module](article_162609851226.html) |
| **Parent Object** | [datasetLink.DatasetLink](section_162626627810.html) |
| **Sibling Object Members** | [DatasetLink Object Members](article_162609851226.html#subsect_163103571098) |
| **Since** | 2021.2 |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script sample, see [N/datasetLink Module Script Sample](section_0303050238.html).

```
            // Add additional code
...
var myDatasetLink = datasetLink.create({
    datasets: [firstDataset, secondDataset],
    expressions: [[columnExpInFirstDataset, columnExpInSecondDataset]],
    id: 'myDatasetLinkId'
});

var theDatasets = myDatasetLink.datasets;
...
// Add additional code
```

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - DatasetLink.expressions
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162626666908.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/datasetLink Module](article_162609851226.html)
6. [datasetLink.DatasetLink](section_162626627810.html)
7. DatasetLink.expressions

# DatasetLink.expressions

|  |  |
| --- | --- |
| **Property Description** | The column expressions for the [datasetLink.DatasetLink](section_162626627810.html) object. |
| **Type** | Array<[workbook.Expression](section_159008229845.html)[]> |
| **Module** | [N/datasetLink Module](article_162609851226.html) |
| **Parent Object** | [datasetLink.DatasetLink](section_162626627810.html) |
| **Sibling Object Members** | [DatasetLink Object Members](article_162609851226.html#subsect_163103571098) |
| **Since** | 2021.2 |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script sample, see [N/datasetLink Module Script Sample](section_0303050238.html).

```
            // Add additional code
...
var myDatasetLink = datasetLink.create({
    datasets: [firstDataset, secondDataset],
    expressions: [[columnExpInFirstDataset, columnExpInSecondDataset]],
    id: 'myDatasetLinkId'
});

var theExpressions = myDatasetLink.expressions;
...
// Add additional code
```

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - General Notices
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

## datasetlink_module: NetSuite Applications Suite - N/dataset Module
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_158946741680.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. N/dataset Module

# N/dataset Module

Use the N/dataset module to create, load, list, or save datasets. You can only use this module in server scripts.

With this module, you can do things like:

* Create columns, joins, and conditions within a dataset.
* Delete a dataset using the [N/query Module](section_1510275060.html).
* Execute a dataset and obtain results-similar to running a query definition with the [N/query Module](section_1510275060.html).
* Use string aliasing to identify columns, which is helpful when linking dataset columns to a workbook.
* Apply column labels, which are the string descriptions shown in the UI.
* Save a dataset.

Datasets are the foundation for workbooks and their components. In a dataset, you combine record type fields and filters to make a query. You can use the results as source data for any workbook, and you can use one dataset in several workbooks.

To learn more about datasets in SuiteAnalytics, see [Defining a Dataset](section_1544122173.html). For details on workbooks, see [N/workbook Module](article_159006350818.html).

Important: 

The N/dataset module doesn't work in unauthenticated client-side contexts. For details, see the SuiteAnswers [Outbound HTTPs in an unauthenticated client-side context](https://suiteanswers.custhelp.com/app/answers/detail/a_id/1013055).

## In This Help Topic

* [N/dataset Module Members](#subsect_158946757184)
* [Column Object Members](#subsect_158946772914)
* [Condition Object Members](#subsect_158946780094)
* [Dataset Object Members](#subsect_158946789261)
* [Join Object Members](#subsect_158946792222)

## N/dataset Module Members

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Object | [dataset.Column](section_158946808345.html) | Object | Server scripts | A column in the dataset, which usually represents a record field. |
| [dataset.Condition](section_158946951148.html) | Object | Server scripts | A condition or set of conditions to apply to a column. |
| [dataset.Dataset](section_158948063457.html) | Object | Server scripts | A representation of the entire dataset, including columns, conditions, and joins. |
| [dataset.Join](section_158948390739.html) | Object | Server scripts | A joined record used in the dataset. |
| Method | [dataset.create(options)](section_158989971922.html) | [dataset.Dataset](section_158948063457.html) | Server scripts | Creates a dataset. |
| [dataset.createColumn(options)](section_158990102328.html) | [dataset.Column](section_158946808345.html) | Server scripts | Creates a dataset column. |
| [dataset.createCondition(options)](section_158990217350.html) | [dataset.Condition](section_158946951148.html) | Server scripts | Creates a dataset condition (criteria). A condition is applied to a dataset column and includes an operator. |
| [dataset.createJoin(options)](section_158990279568.html) | [dataset.Join](section_158948390739.html) | Server scripts | Creates a dataset join. |
| [dataset.createTranslation(options)](section_162853138869.html) | [workbook.Expression](section_159008229845.html) | Server scripts | Creates a translation expression based on a Translation Collection. |
| [dataset.describe(options)](section_162853496011.html) | Object[] | Server scripts | Retrieves descriptive information about a dataset, including name, description, and a list of columns or formulas with their labels and types. |
| [dataset.describe.promise(options)](section_0507043830.html) | Promise Object | Server scripts | Asynchronously retrieves descriptive information about a dataset, including name, description, and a list of columns or formulas with their labels and types.. |
| [dataset.list()](section_158990317009.html) | Object[] | Server scripts | Lists all existing datasets. |
| [dataset.listPaged(options)](section_162853512391.html) | `PagedInfoData` | Server scripts | Returns metadata about datasets as a set of paged results. |
| [dataset.loadDataset(options)](section_158990335776.html) | [dataset.Dataset](section_158948063457.html) | Server scripts | Loads an existing dataset. |
| [dataset.loadDataset.promise(options)](section_0507050454.html) | Promise Object | Server scripts | Asynchronously loads an existing dataset. |

## Column Object Members

This object encapsulates the record fields in the dataset. Columns are equivalent to the fields you use when you build a dataset in SuiteAnalytics. For more information about datasets in SuiteAnalytics, see [Custom Workbooks and Datasets](chapter_1544122127.html).

The following members are available for a [dataset.Column](section_158946808345.html) object.

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Property | [Column.alias](section_158946930657.html) | string (read-only) | Server scripts | The alias of the column. |
| [Column.fieldId](section_158946870976.html) | string (read-only) | Server scripts | The ID of the record field associated with the column. |
| [Column.formula](section_158946906503.html) | string (read-only) | Server scripts | The formula of the column. |
| [Column.id](section_158946901670.html) | number (read-only) | Server Scripts | The ID of the column. |
| [Column.join](section_159310457176.html) | [dataset.Join](section_158948390739.html) (read-only) | Server scripts | The join for the column. Used only when the column is from a joined record. |
| [Column.label](section_158946922873.html) | string (read-only) | Server scripts | The label of the column. |
| [Column.type](section_158946914278.html) | string (read-only) | Server scripts | The return type of the formula. |

## Condition Object Members

This object encapsulates the criteria in the dataset. Conditions are equivalent to the criteria you use when you build a dataset in SuiteAnalytics. For more information about criteria used in datasets in SuiteAnalytics, see [Dataset Criteria Filters](section_1544211200.html).

The following members are available for a [dataset.Condition](section_158946951148.html) object.

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Property | [Condition.caseSensitive](section_0507040252.html) | boolean | Server scripts | Indicates whether the condition in a sort is case sensitive. |
| [Condition.children](section_158946962310.html) | [dataset.Condition](section_158946951148.html)[] (read-only) | Server scripts | The children of the condition (for example, subconditions AND'd or OR'd). |
| [Condition.column](section_158948010876.html) | [dataset.Column](section_158946808345.html) (read-only) | Server scripts | The column on which the condition is placed. |
| [Condition.operator](section_158948026629.html) | string (read-only) | Server scripts | The operator of the condition. |
| [Condition.values](section_158948048117.html) | string[] | number[] | boolean[] | Date[] | Object[] (read-only) | Server scripts | The values for the condition. |

## Dataset Object Members

This object encapsulates the entire dataset. For more information about datasets in SuiteAnalytics, see [Custom Workbooks and Datasets](chapter_1544122127.html).

The following members are available for a [dataset.Dataset](section_158948063457.html) object.

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Method | [Dataset.getExpressionFromColumn(options)](section_158948233177.html) | [workbook.Expression](section_159008229845.html) | Server scripts | Returns an expression which can be used in a workbook. |
| [Dataset.run()](section_158948330969.html) | [query.ResultSet](section_1510779235.html) | Server scripts | Executes the dataset and returns the result set (the same as in [N/query Module](section_1510275060.html)). |
| [Dataset.run.promise()](section_0507044927.html) | Promise Object | Server scripts | Asynchronously executes the dataset and returns the result set (the same as in [N/query Module](section_1510275060.html)). |
| [Dataset.runPaged(options)](section_158948363823.html) | [query.PagedData](section_1510779273.html) | Server scripts | Executes the dataset and returns the result set in paginated data form (the same as in [N/query Module](section_1510275060.html)). |
| [Dataset.save(options)](section_159354415610.html) | Object | Server scripts | Saves a dataset. |
| Property | [Dataset.columns](section_158948083358.html) | [dataset.Column](section_158946808345.html)[] | Server scripts | The columns in the dataset. |
| [Dataset.condition](section_158948103219.html) | [dataset.Condition](section_158946951148.html) | Server scripts | The condition (criteria) for the entire dataset. |
| [Dataset.description](section_158948114518.html) | string | Server scripts | The description of the dataset. |
| [Dataset.id](section_158948123704.html) | string | Server scripts | The ID of the dataset. |
| [Dataset.name](section_158948129533.html) | string | Server scripts | The name of the dataset. |
| [Dataset.type](section_158948136837.html) | string | Server scripts | The internal ID for the base record type for the dataset. |

## Join Object Members

Encapsulates a joined record used in the dataset. For more information about using joins in a dataset, see [Joining Record Types in a Dataset](section_1544129148.html).

The following members are available for a [dataset.Join](section_158948390739.html) object.

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Property | [Join.fieldId](section_158948402464.html) | string (read-only) | Server scripts | The ID of the field on which the join is performed. |
| [Join.join](section_158948412223.html) | [dataset.Join](section_158948390739.html) (read-only) | Server scripts | The child join, if the join is a multilevel join. |
| [Join.source](section_158948418068.html) | string (read-only) | Server scripts | The internal ID for the source record type of the join. |
| [Join.target](section_158948426433.html) | string (read-only) | Server scripts | The polymorphic target of the join. |

### Related Topics

* [N/workbook Module](article_159006350818.html)
* [Custom Workbooks and Datasets](chapter_1544122127.html)
* [Defining a Dataset](section_1544122173.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - N/datasetLink Module
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_162609851226.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. N/datasetLink Module

# N/datasetLink Module

Use the N/datasetLink module to link datasets. When you link two datasets, you can use data from both datasets in your workbooks.

The N/datasetLink module lets you logically link two datasets and use data from both datasets in your workbook visualizations (such as pivots). Linking datasets is useful when you cannot use joins in the SuiteAnalytics Workbook UI or the Workbook API to join record types explicitly. Linking datasets does not merge or join the datasets. Instead, you specify an expression (which usually represents a column that shares common data between the two datasets, such as a date), and this expression is used to link the datasets.

After datasets are linked, you can access all of the data in both datasets to use in workbook visualizations. For example, when you create a pivot in a workbook, you can specify a linked dataset (as a [datasetLink.DatasetLink](section_162626627810.html) object) to use as the data source for the pivot. You can use fields in both datasets to create data dimensions, data measures, sections, and other elements of the pivot.

For more information about linking datasets in SuiteAnalytics Workbook, see [Dataset Linking in SuiteAnalytics Workbook](article_162627392718.html).

To link two datasets, you must do the following:

1. **Create the datasets that you want to link.**

   You can use [dataset.create(options)](section_158989971922.html) to create a dataset in a script. If you use this method to create a dataset, you must also use [Dataset.save(options)](section_159354415610.html) to save the dataset before you can link it with another dataset. Alternatively, you can use the Dataset Builder Plug-in to create datasets. For more information, see [Dataset Builder Plug-in](part_160199594697.html).

   ```
                 // In this example, period, department, and total are dataset.Column objects that
   // represent fields on the budgets record type (or a joined record type)
   var myDataset1 = dataset.create({
       type: 'budgets',
       columns: [period, department, total],
       name: 'Example Dataset 1'
   });

   myDataset1.save();
   ```

   ```
                 // In this example, postingperiod, department, and amount are dataset.Column
   // objects that represent fields on the salesinvoiced record type (or a
   // joined record type)
   var myDataset2 = dataset.create({
       type: 'salesinvoiced',
       columns: [postingperiod, department, amount],
       name: 'Example Dataset 2'
   });

   myDataset2.save();
   ```
2. **Load the datasets that you want to link, if necessary.**

   In general, you can create datasets in one script, then load and link them in another script. If you are creating a workbook visualization (such as a pivot) in a script, you can create and link datasets directly in the same script, then use the linked dataset in your visualization. However, if you are creating a visualization using the Workbook Builder Plug-in, you must load the datasets in the plug-in script before you can link them. For more information, see [Workbook Builder Plug-in](part_160199602236.html).

   ```
                 // In this example, the id parameter values represent the script IDs of
   // plug-in scripts that create datasets using the Dataset Builder Plug-in
   var budgetDataset = dataset.load({
       id: 'customscript1772'
   });

   var salesDataset = dataset.load({
       id: 'customscript1773'
   });
   ```
3. **Create expressions from columns in each dataset.**

   In a dataset, a column represents a field on a record type (or a field on a joined record type, if the base record type of the dataset is joined with other record types). Datasets are linked using a column that shares common data (for example, a date), and you must use [Dataset.getExpressionFromColumn(options)](section_158948233177.html) to create expressions for this common column in each dataset.

   ```
                 // In this example, the alias parameter value represents the alias set
   // on the associated column in the dataset
   var budgetMachinePeriodExp = budgetDataset.getExpressionFromColumn({
       alias: 'budgetmachineperiod'
   });

   var postingPeriodExp = salesDataset.getExpressionFromColumn({
       alias: 'postingperiod'
   });
   ```
4. **Link the datasets.**

   Use [datasetLink.create(options)](section_162626675925.html) to link your datasets. You must specify the original datasets (as [dataset.Dataset](section_158948063457.html) objects), the expressions for the common column (as [workbook.Expression](section_159008229845.html) objects), and an ID for the linked dataset.

   ```
                 var myDatasetLink = datasetLink.create({
       datasets: [budgetDataset, salesDataset],
       expressions: [[budgetMachinePeriodExp, postingPeriodExp]],
       id: 'myLinkedDatasetId'
   });
   ```
5. **Use the linked dataset to create a visualization.**

   For example, if you are creating a pivot, you can use [workbook.createPivot(options)](section_159051610759.html) and specify the linked dataset (as a [datasetLink.DatasetLink](section_162626627810.html) object).

   ```
                 // In this example, rowSection and columnSection are workbook.Section
   // objects that represent sections in a pivot
   var myPivot = workbook.createPivot({
       id: 'myPivotId',
       rowAxis: workbook.createPivotAxis({
           root: rowSection
       }),
       columnAxis: workbook.createPivotAxis({
           root: columnSection
       }),
       name: 'My Pivot',
       datasetLink: myDatasetLink
   });
   ```

## In This Help Topic

* [N/datasetLink Module Members](#subsect_163103532457)
* [DatasetLink Object Members](#subsect_163103571098)

## N/datasetLink Module Members

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Object | [datasetLink.DatasetLink](section_162626627810.html) | Object | Server scripts | A representation of two datasets that are linked using [datasetLink.create(options)](section_162626675925.html). |
| Method | [datasetLink.create(options)](section_162626675925.html) | [datasetLink.DatasetLink](section_162626627810.html) | Server scripts | Links two datasets using a common column expression. |

## DatasetLink Object Members

The following members are available for a [datasetLink.DatasetLink](section_162626627810.html) object.

| Member Type | Name | Return Type / Value Type | Supported Script Types | Description |
| --- | --- | --- | --- | --- |
| Property | [DatasetLink.datasets](section_162626649573.html) | [dataset.Dataset](section_158948063457.html)[] | Server scripts | The linked datasets that the [datasetLink.DatasetLink](section_162626627810.html) object represents. |
| [DatasetLink.expressions](section_162626666908.html) | Array<[workbook.Expression](section_159008229845.html)[]> | Server scripts | The column expressions for the [datasetLink.DatasetLink](section_162626627810.html) object. |

### Related Topics

* [N/dataset Module](article_158946741680.html)
* [Dataset Linking in SuiteAnalytics Workbook](article_162627392718.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - SuiteCloud Platform
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

## datasetlink_module: NetSuite Applications Suite - SuiteScript
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

## datasetlink_module: NetSuite Applications Suite - SuiteScript 2.x API Reference
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

## datasetlink_module: NetSuite Applications Suite - SuiteScript 2.x Modules
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

## datasetlink_module: NetSuite Applications Suite - Workbook Builder Plug-in
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/part_160199602236.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [Core Plug-ins](book_4616046155.html)
3. Workbook Builder Plug-in

# Workbook Builder Plug-in

* [Workbook Builder Plug-in Interface Overview](article_160130871855.html)
* [Workbook Builder Plug-in Interface Definition](article_160131032594.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - workbook.createPivot(options)
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159051610759.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/workbook Module](article_159006350818.html)
6. workbook.createPivot(options)

# workbook.createPivot(options)

|  |  |
| --- | --- |
| **Method Description** | Creates a pivot.  A pivot is a workbook component that enables you to pivot your dataset query results by defining measures and dimensions, so that you can analyze different subsets of data. A pivot definition is based on an underlying dataset and can include an ID, a name, a row axis, a column axis, conditional/limiting filters, and filter expressions. |
| **Returns** | [workbook.Pivot](section_159008434619.html) |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Governance** | None |
| **Module** | [N/workbook Module](article_159006350818.html) |
| **Sibling Module Members** | [N/workbook Module Members](article_159006350818.html#subsect_159006379904) |
| **Since** | 2020.2 |

## Parameters

Note: 

The `options` parameter is a JavaScript object.

| Parameter | Type | Required / Optional | Description |
| --- | --- | --- | --- |
| `options.aggregationFilters` | Array<[workbook.ConditionalFilter](section_159008152586.html) |[workbook.LimitingFilter](section_159008328944.html)> | optional | The set of conditional filters or limiting filters that are applied to the pivot. When multiple filters are defined, they are aggregated together to form a single compounded filter. |
| `options.columnAxis` | [workbook.PivotAxis](section_159008441105.html) | required | The column axis (X-axis) for the pivot. This includes the fields and measures that are used on the column axis, as well as sorting behavior that is applied to the axis fields and measures. |
| `options.dataset` | [dataset.Dataset](section_158948063457.html) | required | The underlying dataset that the pivot is based on. A pivot can include only the data (fields) that are included in the dataset. |
| `options.filterExpressions` | [workbook.Expression](section_159008229845.html)[] | optional | The simple, non-aggregated value-based filters for the pivot. |
| `options.id` | string | required | The ID of the pivot. |
| `options.name` | string | required | The name of the pivot. |
| `options.reportStyles` | [workbook.ReportStyle](section_163171063813.html) | required | The report styles for the pivot. |
| `options.rowAxis` | [workbook.PivotAxis](section_159008441105.html) | required | The row axis (Y-axis) for the pivot. This includes the fields and measures that are used on the column axis, as well as sorting behavior that is applied to the axis fields and measures. |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script example, see [N/workbook Module Script Samples](section_0303053727.html). Also see [Full scripts](section_163336512698.html) in the [Tutorial: Creating a Workbook Using the Workbook API](article_163336268431.html) topic.

```
            // Add additional code
...
// Create a basic Pivot
var myPivot = workbook.createPivot({
    name: 'My Pivot',
    id: '_myPivot',
    rowAxis: myRowPivotAxis,
    columnAxis: myColumnPivotAxis,
    dataset: myDataset
});

// Create a comprehensive Pivot with Expressions
var myPivot = workbook.createPivot({
    name: 'My Pivot',
    id: '_myPivot',
    rowAxis: myRowPivotAxis,
    columnAxis: myColumnPivotAxis,
    dataset: myDataset,
    filterExpressions: [myExpression]
});

// Create a comprehensive Pivot with LimitingFilters
var myPivot = workbook.createPivot({
    name: 'My Pivot',
    id: '_myPivot',
    rowAxis: myRowPivotAxis,
    columnAxis: myColumnPivotAxis,
    dataset: myDataset,
    filterExpressions: [myExpression],
    aggregationFilters: [myLimitingFilter]
});

// Create a comprehensive Pivot with ConditionalFilters
var myPivot = workbook.createPivot({
    name: 'My Pivot,
    id: '_myPivot',
    rowAxis: myRowPivotAxis,
    columnAxis: myColumnPivotAxis,
    dataset: myDataset,
    filterExpressions: [myExpression],
    aggregationFilters: [myConditionalFilter]
});
...
// Add additional code
```

### Related Topics

* [N/workbook Module](article_159006350818.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)

## datasetlink_module: NetSuite Applications Suite - workbook.Expression
Source: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_159008229845.html

1. [SuiteCloud Platform](set_N2807372.html)
2. [SuiteScript](set_1502135122.html)
3. [SuiteScript 2.x API Reference](article_4140956840.html)
4. [SuiteScript 2.x Modules](chapter_4220488571.html)
5. [N/workbook Module](article_159006350818.html)
6. workbook.Expression

# workbook.Expression

|  |  |
| --- | --- |
| **Object Description** | An expression object which can be used when you create a pivot definition, a data dimension item, a measure, a conditional filter, or a constant.  Use [workbook.createExpression(options)](section_159051315304.html) to create this object.  An expression object is used as a parameter in these methods: [workbook.createCalculatedMeasure(options)](section_162861792485.html), [workbook.createConditionalFilter(options)](section_159050988221.html), [workbook.createDataDimensionItem(options)](section_159051228123.html), [workbook.createDataMeasure(options)](section_162861945807.html), [workbook.createPivot(options)](section_159051610759.html), [workbook.createReportStyleRule(options)](section_162886077520.html), [workbook.createTable(options)](section_163344854839.html), and [workbook.createTableColumn(options)](section_159051899414.html). |
| **Supported Script Types** | Server scripts  For more information, see [SuiteScript 2.x Script Types](chapter_4387172495.html). |
| **Module** | [N/workbook Module](article_159006350818.html) |
| **Methods and Properties** | [Expression Object Members](article_159006350818.html#subsect_159007324638) |
| **Since** | 2020.2 |

## Syntax

Important: 

The following code sample shows the syntax for this member. It is not a functional example. For a complete script example, see [N/workbook Module Script Samples](section_0303053727.html). Also see [Full scripts](section_163336512698.html) in the [Tutorial: Creating a Workbook Using the Workbook API](article_163336268431.html) topic.

```
            // Add additional code
...
var myExpression = workbook.createExpression({
    functionId: workbook.ExpressionType.AND,
    parameters: {
        expressions: [expression1, expression2]
    }
});
...
// Add additional code
```

### Related Topics

* [N/workbook Module](article_159006350818.html)
* [SuiteScript 2.x Modules](chapter_4220488571.html)
* [SuiteScript 2.x](article_8161516336.html)

[General Notices](chapter_N000004.html)
