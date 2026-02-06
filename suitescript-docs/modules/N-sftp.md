# N/sftp Module

## Overview

The N/sftp module provides secure file transfer capabilities using the SFTP (SSH File Transfer Protocol) protocol. It enables SuiteScript to connect to external SFTP servers, upload files, download files, list directory contents, and manage remote directories.

## Module Import

```javascript
define(['N/sftp'], function(sftp) {
    // Your code here
});
```

**SuiteScript 2.1:**
```javascript
import sftp from 'N/sftp';
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
| Portlet Script | No |

## Prerequisites

Before using the N/sftp module, you must:

1. **Create an SFTP Connection**: Navigate to Setup > Company > Keys > SFTP Connection and create a connection record.

2. **Generate SSH Keys**: Create a key pair for authentication:
   - Navigate to Setup > Company > Keys > Create SSH Key Pair
   - Upload the public key to the SFTP server
   - Store the private key in NetSuite

3. **Store Host Key**: Capture and store the host key fingerprint in the SFTP connection record.

## Methods

### sftp.createConnection(options)

Creates a connection to an SFTP server.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.username | string | Yes | SFTP username |
| options.passwordGuid | string | Conditional | Password GUID from secret key storage |
| options.url | string | Yes | SFTP server hostname/IP |
| options.port | number | No | SFTP port (default: 22) |
| options.directory | string | No | Initial directory path |
| options.timeout | number | No | Connection timeout in seconds |
| options.hostKey | string | Yes | Host key fingerprint |
| options.keyId | string | Conditional | SSH private key ID (for key-based auth) |
| options.hostKeyType | string | No | Host key algorithm type |

**Returns:** `sftp.Connection`

**Example - Password Authentication:**
```javascript
define(['N/sftp', 'N/file'], function(sftp, file) {

    function connectWithPassword() {
        var connection = sftp.createConnection({
            username: 'myuser',
            passwordGuid: 'abc123def456ghi789jkl012',
            url: 'sftp.example.com',
            port: 22,
            directory: '/home/myuser/uploads',
            timeout: 30,
            hostKey: 'AAAAB3NzaC1yc2EAAAADAQABAAABAQDOHt...'
        });

        return connection;
    }

    return {
        connectWithPassword: connectWithPassword
    };
});
```

**Example - Key-Based Authentication:**
```javascript
define(['N/sftp'], function(sftp) {

    function connectWithKey() {
        var connection = sftp.createConnection({
            username: 'myuser',
            keyId: 'custkey_sftp_private_key',
            url: 'sftp.example.com',
            port: 22,
            directory: '/data',
            hostKey: 'AAAAB3NzaC1yc2EAAAADAQABAAABAQDOHt...',
            hostKeyType: 'rsa'
        });

        return connection;
    }

    return {
        connectWithKey: connectWithKey
    };
});
```

---

## Connection Object

The Connection object is returned by `sftp.createConnection()` and provides methods for file operations.

### Connection Methods

#### upload(options)

Uploads a file to the SFTP server.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.file | file.File | Yes | File object to upload |
| options.filename | string | No | Target filename (defaults to file.name) |
| options.directory | string | No | Target directory path |
| options.replaceExisting | boolean | No | Overwrite if exists (default: true) |
| options.timeout | number | No | Operation timeout in seconds |

**Example:**
```javascript
define(['N/sftp', 'N/file', 'N/record'], function(sftp, file, record) {

    function uploadInvoice(invoiceId) {
        // Create connection
        var connection = sftp.createConnection({
            username: 'netsuite',
            passwordGuid: 'abc123def456',
            url: 'sftp.partner.com',
            directory: '/incoming',
            hostKey: 'AAAAB3NzaC1yc2EAAA...'
        });

        // Load file from File Cabinet
        var invoiceFile = file.load({
            id: 12345 // File Cabinet ID
        });

        // Upload file
        connection.upload({
            file: invoiceFile,
            filename: 'invoice_' + invoiceId + '.pdf',
            directory: '/incoming/invoices',
            replaceExisting: true
        });

        log.audit('File Uploaded', 'Invoice ' + invoiceId + ' uploaded successfully');

        return true;
    }

    return {
        uploadInvoice: uploadInvoice
    };
});
```

---

#### download(options)

Downloads a file from the SFTP server.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.filename | string | Yes | Name of file to download |
| options.directory | string | No | Directory containing the file |
| options.timeout | number | No | Operation timeout in seconds |

**Returns:** `file.File` - Downloaded file object

**Example:**
```javascript
define(['N/sftp', 'N/file'], function(sftp, file) {

    function downloadReport(filename) {
        // Create connection
        var connection = sftp.createConnection({
            username: 'netsuite',
            keyId: 'custkey_sftp_key',
            url: 'sftp.vendor.com',
            directory: '/reports',
            hostKey: 'AAAAB3NzaC1yc2EAAA...'
        });

        // Download file
        var downloadedFile = connection.download({
            filename: filename,
            directory: '/reports/daily'
        });

        // Save to File Cabinet
        downloadedFile.folder = 456; // Target folder ID
        downloadedFile.name = 'downloaded_' + filename;
        var fileId = downloadedFile.save();

        log.audit('File Downloaded', 'File saved with ID: ' + fileId);

        return fileId;
    }

    return {
        downloadReport: downloadReport
    };
});
```

---

#### list(options)

Lists files and directories in a specified path.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.path | string | No | Directory path (default: current directory) |
| options.sort | sftp.Sort | No | Sort order for results |
| options.timeout | number | No | Operation timeout in seconds |

**Returns:** `sftp.FileInfo[]` - Array of file information objects

**Example:**
```javascript
define(['N/sftp'], function(sftp) {

    function listRemoteFiles(directoryPath) {
        var connection = sftp.createConnection({
            username: 'netsuite',
            passwordGuid: 'abc123def456',
            url: 'sftp.partner.com',
            hostKey: 'AAAAB3NzaC1yc2EAAA...'
        });

        // List files sorted by date (newest first)
        var fileList = connection.list({
            path: directoryPath || '/data',
            sort: sftp.Sort.DATE_DESC
        });

        // Process file list
        fileList.forEach(function(fileInfo) {
            log.debug('Remote File', {
                name: fileInfo.name,
                size: fileInfo.size,
                isDirectory: fileInfo.directory,
                lastModified: fileInfo.lastModified
            });
        });

        return fileList;
    }

    return {
        listRemoteFiles: listRemoteFiles
    };
});
```

---

#### makeDirectory(options)

Creates a new directory on the SFTP server.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.path | string | Yes | Path for new directory |
| options.timeout | number | No | Operation timeout in seconds |

**Example:**
```javascript
define(['N/sftp'], function(sftp) {

    function createRemoteDirectory(dirPath) {
        var connection = sftp.createConnection({
            username: 'netsuite',
            passwordGuid: 'abc123def456',
            url: 'sftp.partner.com',
            hostKey: 'AAAAB3NzaC1yc2EAAA...'
        });

        // Create directory
        connection.makeDirectory({
            path: dirPath
        });

        log.audit('Directory Created', 'Created: ' + dirPath);

        return true;
    }

    return {
        createRemoteDirectory: createRemoteDirectory
    };
});
```

---

#### removeDirectory(options)

Removes a directory from the SFTP server.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.path | string | Yes | Path of directory to remove |
| options.timeout | number | No | Operation timeout in seconds |

**Example:**
```javascript
define(['N/sftp'], function(sftp) {

    function removeRemoteDirectory(dirPath) {
        var connection = sftp.createConnection({
            username: 'netsuite',
            passwordGuid: 'abc123def456',
            url: 'sftp.partner.com',
            hostKey: 'AAAAB3NzaC1yc2EAAA...'
        });

        // Remove directory (must be empty)
        connection.removeDirectory({
            path: dirPath
        });

        log.audit('Directory Removed', 'Removed: ' + dirPath);

        return true;
    }

    return {
        removeRemoteDirectory: removeRemoteDirectory
    };
});
```

---

#### removeFile(options)

Deletes a file from the SFTP server.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.path | string | Yes | Path of file to delete |
| options.timeout | number | No | Operation timeout in seconds |

**Example:**
```javascript
define(['N/sftp'], function(sftp) {

    function deleteRemoteFile(filePath) {
        var connection = sftp.createConnection({
            username: 'netsuite',
            passwordGuid: 'abc123def456',
            url: 'sftp.partner.com',
            hostKey: 'AAAAB3NzaC1yc2EAAA...'
        });

        // Delete file
        connection.removeFile({
            path: filePath
        });

        log.audit('File Deleted', 'Deleted: ' + filePath);

        return true;
    }

    return {
        deleteRemoteFile: deleteRemoteFile
    };
});
```

---

#### move(options)

Moves or renames a file on the SFTP server.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options.from | string | Yes | Source file path |
| options.to | string | Yes | Destination file path |
| options.timeout | number | No | Operation timeout in seconds |

**Example:**
```javascript
define(['N/sftp'], function(sftp) {

    function moveRemoteFile(sourcePath, destPath) {
        var connection = sftp.createConnection({
            username: 'netsuite',
            passwordGuid: 'abc123def456',
            url: 'sftp.partner.com',
            hostKey: 'AAAAB3NzaC1yc2EAAA...'
        });

        // Move file
        connection.move({
            from: sourcePath,
            to: destPath
        });

        log.audit('File Moved', 'Moved from ' + sourcePath + ' to ' + destPath);

        return true;
    }

    return {
        moveRemoteFile: moveRemoteFile
    };
});
```

---

## FileInfo Object

The FileInfo object is returned by the `list()` method and contains information about remote files.

### FileInfo Properties

| Property | Type | Description |
|----------|------|-------------|
| name | string | File or directory name |
| size | number | File size in bytes |
| directory | boolean | True if item is a directory |
| lastModified | Date | Last modification timestamp |

---

## Enums

### sftp.Sort

| Value | Description |
|-------|-------------|
| DATE | Sort by date ascending |
| DATE_DESC | Sort by date descending |
| NAME | Sort by name ascending |
| NAME_DESC | Sort by name descending |
| SIZE | Sort by size ascending |
| SIZE_DESC | Sort by size descending |

**Example:**
```javascript
var fileList = connection.list({
    path: '/reports',
    sort: sftp.Sort.DATE_DESC
});
```

---

## Complete Example: SFTP Integration Workflow

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/sftp', 'N/file', 'N/record', 'N/search', 'N/runtime', 'N/email'],
    function(sftp, file, record, search, runtime, email) {

    const SFTP_CONFIG = {
        username: 'netsuite_integration',
        passwordGuid: 'guid_stored_in_script_param',
        url: 'sftp.partner.com',
        port: 22,
        hostKey: 'AAAAB3NzaC1yc2EAAAADAQABAAABAQ...',
        incomingDir: '/incoming',
        outgoingDir: '/outgoing',
        archiveDir: '/archive',
        errorDir: '/error'
    };

    function execute(context) {
        var script = runtime.getCurrentScript();
        SFTP_CONFIG.passwordGuid = script.getParameter({
            name: 'custscript_sftp_password_guid'
        });

        var connection;

        try {
            // Create connection
            connection = sftp.createConnection({
                username: SFTP_CONFIG.username,
                passwordGuid: SFTP_CONFIG.passwordGuid,
                url: SFTP_CONFIG.url,
                port: SFTP_CONFIG.port,
                directory: SFTP_CONFIG.incomingDir,
                hostKey: SFTP_CONFIG.hostKey,
                timeout: 60
            });

            log.audit('SFTP Connected', 'Connected to ' + SFTP_CONFIG.url);

            // Process incoming files
            processIncomingFiles(connection);

            // Export outgoing files
            exportOutgoingFiles(connection);

            log.audit('SFTP Integration Complete', 'All operations completed');

        } catch (e) {
            log.error('SFTP Error', e.message);
            sendErrorNotification(e.message);
        }
    }

    function processIncomingFiles(connection) {
        // List files in incoming directory
        var files = connection.list({
            path: SFTP_CONFIG.incomingDir,
            sort: sftp.Sort.DATE
        });

        files.forEach(function(fileInfo) {
            // Skip directories
            if (fileInfo.directory) {
                return;
            }

            // Only process CSV files
            if (!fileInfo.name.endsWith('.csv')) {
                return;
            }

            log.debug('Processing File', fileInfo.name);

            try {
                // Download file
                var downloadedFile = connection.download({
                    filename: fileInfo.name,
                    directory: SFTP_CONFIG.incomingDir
                });

                // Process file content
                var content = downloadedFile.getContents();
                processCSVContent(content, fileInfo.name);

                // Move to archive
                connection.move({
                    from: SFTP_CONFIG.incomingDir + '/' + fileInfo.name,
                    to: SFTP_CONFIG.archiveDir + '/' + getTimestamp() + '_' + fileInfo.name
                });

                log.audit('File Processed', fileInfo.name);

            } catch (e) {
                log.error('File Processing Error', {
                    file: fileInfo.name,
                    error: e.message
                });

                // Move to error directory
                try {
                    connection.move({
                        from: SFTP_CONFIG.incomingDir + '/' + fileInfo.name,
                        to: SFTP_CONFIG.errorDir + '/' + fileInfo.name
                    });
                } catch (moveError) {
                    log.error('Move to Error Dir Failed', moveError.message);
                }
            }
        });
    }

    function processCSVContent(content, filename) {
        var lines = content.split('\n');
        var headers = lines[0].split(',');

        for (var i = 1; i < lines.length; i++) {
            var values = lines[i].split(',');
            if (values.length !== headers.length) continue;

            // Create record from CSV data
            var itemReceipt = record.create({
                type: record.Type.ITEM_RECEIPT,
                isDynamic: true
            });

            // Set field values based on CSV data
            // ... processing logic ...

            log.debug('Processed Row', i);
        }
    }

    function exportOutgoingFiles(connection) {
        // Search for records to export
        var invoiceSearch = search.create({
            type: search.Type.INVOICE,
            filters: [
                ['custbody_exported_sftp', 'is', 'F'],
                'AND',
                ['mainline', 'is', 'T'],
                'AND',
                ['status', 'anyof', 'CustInvc:A'] // Open invoices
            ],
            columns: ['tranid', 'entity', 'total', 'trandate']
        });

        var exportData = 'InvoiceNumber,CustomerID,Total,Date\n';
        var invoiceIds = [];

        invoiceSearch.run().each(function(result) {
            exportData += result.getValue('tranid') + ',';
            exportData += result.getValue('entity') + ',';
            exportData += result.getValue('total') + ',';
            exportData += result.getValue('trandate') + '\n';
            invoiceIds.push(result.id);
            return true;
        });

        if (invoiceIds.length === 0) {
            log.debug('No Invoices to Export', 'Skipping export');
            return;
        }

        // Create export file
        var exportFile = file.create({
            name: 'invoices_' + getTimestamp() + '.csv',
            fileType: file.Type.CSV,
            contents: exportData
        });

        // Ensure outgoing directory exists
        try {
            connection.makeDirectory({
                path: SFTP_CONFIG.outgoingDir
            });
        } catch (e) {
            // Directory may already exist
            log.debug('Directory exists or error', e.message);
        }

        // Upload file
        connection.upload({
            file: exportFile,
            directory: SFTP_CONFIG.outgoingDir,
            replaceExisting: true
        });

        // Mark invoices as exported
        invoiceIds.forEach(function(id) {
            record.submitFields({
                type: record.Type.INVOICE,
                id: id,
                values: {
                    custbody_exported_sftp: true,
                    custbody_export_date: new Date()
                }
            });
        });

        log.audit('Export Complete', invoiceIds.length + ' invoices exported');
    }

    function getTimestamp() {
        var now = new Date();
        return now.getFullYear() +
            padZero(now.getMonth() + 1) +
            padZero(now.getDate()) +
            padZero(now.getHours()) +
            padZero(now.getMinutes()) +
            padZero(now.getSeconds());
    }

    function padZero(num) {
        return num < 10 ? '0' + num : String(num);
    }

    function sendErrorNotification(errorMessage) {
        var script = runtime.getCurrentScript();
        var notifyEmail = script.getParameter({
            name: 'custscript_notify_email'
        });

        if (notifyEmail) {
            email.send({
                author: -5, // System user
                recipients: notifyEmail,
                subject: 'SFTP Integration Error',
                body: 'An error occurred during SFTP integration:\n\n' + errorMessage
            });
        }
    }

    return {
        execute: execute
    };
});
```

---

## Best Practices

1. **Store Credentials Securely**: Use NetSuite's secret key storage for passwords and SSH keys. Never hardcode credentials.

2. **Use Key-Based Authentication**: When possible, use SSH key authentication instead of passwords for enhanced security.

3. **Handle Connection Errors**: Implement robust error handling for connection failures and timeouts.

```javascript
try {
    var connection = sftp.createConnection({...});
} catch (e) {
    if (e.name === 'SFTP_CONNECTION_ERROR') {
        log.error('Connection Failed', e.message);
        // Implement retry logic or notification
    }
    throw e;
}
```

4. **Set Appropriate Timeouts**: Configure timeout values based on expected file sizes and network conditions.

5. **Validate Host Keys**: Always verify host key fingerprints to prevent man-in-the-middle attacks.

6. **Archive Processed Files**: Move processed files to archive directories rather than deleting them immediately.

7. **Implement Logging**: Log all SFTP operations for audit trails and troubleshooting.

8. **Check Governance**: Monitor script governance when processing multiple files.

9. **Use Unique Filenames**: Include timestamps or unique identifiers in filenames to prevent overwrites.

10. **Test in Sandbox**: Always test SFTP integrations thoroughly in sandbox environments before deployment.

11. **Error Recovery**: Implement mechanisms to handle partial failures and resume operations.

12. **File Validation**: Validate file contents before processing to handle malformed data gracefully.

---

## Common Issues and Solutions

### Connection Timeout
- Increase the `timeout` parameter
- Check network connectivity and firewall rules
- Verify server availability

### Authentication Failure
- Verify username and password/key
- Check that the public key is properly installed on the server
- Ensure the GUID references the correct stored credential

### Host Key Verification Failed
- Obtain the correct host key from the server administrator
- Update the `hostKey` parameter with the correct fingerprint

### Permission Denied
- Verify the SFTP user has appropriate permissions
- Check directory permissions on the remote server
- Ensure the specified path exists
