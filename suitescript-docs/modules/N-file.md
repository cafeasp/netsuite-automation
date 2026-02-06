# N/file Module

Use the N/file module to work with files in NetSuite's File Cabinet.

## Module Import

```javascript
define(['N/file'], function(file) {
    // Your code here
});
```

## Supported Script Types

- Server Scripts Only

## Module Methods

### file.create(options)

Creates a new file.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | File name with extension |
| fileType | string | Yes | File type (use `file.Type` enum) |
| contents | string | Yes | File contents |
| folder | number | No | Folder internal ID |
| encoding | string | No | Character encoding |
| isOnline | boolean | No | Available without login |

**Returns:** `file.File`

```javascript
var csvFile = file.create({
    name: 'export.csv',
    fileType: file.Type.CSV,
    contents: 'Name,Email\nJohn,john@example.com',
    folder: 123
});

var fileId = csvFile.save();
```

### file.load(options)

Loads an existing file.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number/string | Yes | File ID or path |

```javascript
// By ID
var myFile = file.load({ id: 456 });

// By path
var myFile = file.load({ id: 'SuiteScripts/data/config.json' });
```

### file.delete(options)

Deletes a file.

```javascript
file.delete({ id: 456 });
```

## File Object Properties

| Property | Type | Description |
|----------|------|-------------|
| id | number | Internal ID |
| name | string | File name |
| folder | number | Folder ID |
| fileType | string | File type |
| size | number | Size in bytes |
| url | string | File URL |
| path | string | Full path |
| isOnline | boolean | Publicly available |
| isText | boolean | Is text-based |

## File Object Methods

### getContents()

Returns file contents as a string.

```javascript
var contents = myFile.getContents();
```

### save()

Saves the file and returns its ID.

```javascript
var fileId = myFile.save();
```

### appendLine(options)

Appends a line to the file.

```javascript
myFile.appendLine({ value: 'New line of text' });
```

### getReader()

Returns a Reader for large files.

```javascript
var reader = myFile.getReader();
var line;
while ((line = reader.readChars(1000)) !== '') {
    // Process chunk
}
```

## file.Type Enum

```javascript
file.Type.CSV
file.Type.EXCEL
file.Type.HTMLDOC
file.Type.JAVASCRIPT
file.Type.JSON
file.Type.PDF
file.Type.PLAINTEXT
file.Type.XMLDOC
file.Type.ZIP
```

## Example: Create and Save CSV

```javascript
var csvContent = 'ID,Name,Amount\n';
csvContent += '1,Customer A,1000\n';
csvContent += '2,Customer B,2500\n';

var csvFile = file.create({
    name: 'customers.csv',
    fileType: file.Type.CSV,
    contents: csvContent,
    folder: 123
});

var fileId = csvFile.save();
log.audit('File Created', fileId);
```

## Related Documentation

- [Official N/file Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4205693274.html)
