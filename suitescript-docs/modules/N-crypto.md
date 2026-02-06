# N/crypto Module

Use the N/crypto module to perform cryptographic operations including hashing, encryption, decryption, and HMAC authentication. This module provides secure methods for protecting sensitive data in your SuiteScript applications.

## Module Import

```javascript
define(['N/crypto'], function(crypto) {
    // Your code here
});
```

## Supported Script Types

- Client Scripts
- User Event Scripts
- Scheduled Scripts
- Map/Reduce Scripts
- RESTlet Scripts
- Suitelet Scripts
- Workflow Action Scripts
- Portlet Scripts
- Bundle Installation Scripts
- Mass Update Scripts

## Module Methods

### crypto.createHash(options)

Creates a hash of input data using a specified algorithm.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| algorithm | string | Yes | Hash algorithm (use `crypto.HashAlg` enum) |

**Returns:** `crypto.Hash` - A Hash object for generating hashes

**Example:**

```javascript
define(['N/crypto', 'N/encode'], function(crypto, encode) {

    function createSHA256Hash(inputString) {
        // Create hash object
        var hashObj = crypto.createHash({
            algorithm: crypto.HashAlg.SHA256
        });

        // Update with input data
        hashObj.update({
            input: inputString
        });

        // Get the digest
        var hashedValue = hashObj.digest({
            outputEncoding: encode.Encoding.HEX
        });

        return hashedValue;
    }

    return {
        hash: createSHA256Hash
    };
});
```

### crypto.createHmac(options)

Creates an HMAC (Hash-based Message Authentication Code) for message authentication.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| algorithm | string | Yes | HMAC algorithm (use `crypto.HashAlg` enum) |
| key | crypto.SecretKey | Yes | Secret key for HMAC generation |

**Returns:** `crypto.Hmac` - An Hmac object for generating HMACs

**Example:**

```javascript
define(['N/crypto', 'N/encode'], function(crypto, encode) {

    function createHmacSignature(message, secretKeyGuid) {
        // Load the secret key
        var secretKey = crypto.createSecretKey({
            guid: secretKeyGuid,
            encoding: encode.Encoding.UTF_8
        });

        // Create HMAC
        var hmacObj = crypto.createHmac({
            algorithm: crypto.HashAlg.SHA256,
            key: secretKey
        });

        // Update with message
        hmacObj.update({
            input: message
        });

        // Get the signature
        var signature = hmacObj.digest({
            outputEncoding: encode.Encoding.BASE_64
        });

        return signature;
    }

    return {
        sign: createHmacSignature
    };
});
```

### crypto.createSecretKey(options)

Creates a secret key object from a stored key in NetSuite.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| guid | string | Yes | GUID of the secret key stored in NetSuite |
| encoding | string | No | Encoding of the key (use `encode.Encoding` enum) |

**Returns:** `crypto.SecretKey` - A SecretKey object

**Example:**

```javascript
define(['N/crypto', 'N/encode'], function(crypto, encode) {

    function loadSecretKey() {
        // The GUID comes from Setup > Company > API Secrets
        var secretKey = crypto.createSecretKey({
            guid: 'YOUR_SECRET_KEY_GUID',
            encoding: encode.Encoding.UTF_8
        });

        return secretKey;
    }

    return {
        getKey: loadSecretKey
    };
});
```

### crypto.createCipher(options)

Creates a cipher object for encryption.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| algorithm | string | Yes | Encryption algorithm (use `crypto.EncryptionAlg` enum) |
| key | crypto.SecretKey | Yes | Secret key for encryption |
| padding | string | No | Padding scheme (use `crypto.Padding` enum) |
| iv | string | No | Initialization vector for CBC mode |

**Returns:** `crypto.Cipher` - A Cipher object for encryption

**Example:**

```javascript
define(['N/crypto', 'N/encode'], function(crypto, encode) {

    function encryptData(plainText, secretKeyGuid) {
        // Load secret key
        var secretKey = crypto.createSecretKey({
            guid: secretKeyGuid,
            encoding: encode.Encoding.UTF_8
        });

        // Create cipher
        var cipher = crypto.createCipher({
            algorithm: crypto.EncryptionAlg.AES,
            key: secretKey,
            padding: crypto.Padding.PKCS5Padding
        });

        // Encrypt
        cipher.update({
            input: plainText,
            inputEncoding: encode.Encoding.UTF_8
        });

        var cipherText = cipher.final({
            outputEncoding: encode.Encoding.BASE_64
        });

        return cipherText;
    }

    return {
        encrypt: encryptData
    };
});
```

### crypto.createDecipher(options)

Creates a decipher object for decryption.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| algorithm | string | Yes | Decryption algorithm (use `crypto.EncryptionAlg` enum) |
| key | crypto.SecretKey | Yes | Secret key for decryption |
| padding | string | No | Padding scheme (use `crypto.Padding` enum) |
| iv | string | No | Initialization vector (must match encryption IV) |

**Returns:** `crypto.Decipher` - A Decipher object for decryption

**Example:**

```javascript
define(['N/crypto', 'N/encode'], function(crypto, encode) {

    function decryptData(cipherText, secretKeyGuid) {
        // Load secret key
        var secretKey = crypto.createSecretKey({
            guid: secretKeyGuid,
            encoding: encode.Encoding.UTF_8
        });

        // Create decipher
        var decipher = crypto.createDecipher({
            algorithm: crypto.EncryptionAlg.AES,
            key: secretKey,
            padding: crypto.Padding.PKCS5Padding
        });

        // Decrypt
        decipher.update({
            input: cipherText,
            inputEncoding: encode.Encoding.BASE_64
        });

        var plainText = decipher.final({
            outputEncoding: encode.Encoding.UTF_8
        });

        return plainText;
    }

    return {
        decrypt: decryptData
    };
});
```

## Enums

### crypto.HashAlg

Hash algorithms available for hashing and HMAC operations.

| Value | Description |
|-------|-------------|
| SHA1 | SHA-1 (160-bit) - Less secure, use for legacy compatibility only |
| SHA256 | SHA-256 (256-bit) - Recommended for most uses |
| SHA384 | SHA-384 (384-bit) - Higher security |
| SHA512 | SHA-512 (512-bit) - Highest security |
| MD5 | MD5 (128-bit) - Not recommended, use for checksums only |

```javascript
crypto.HashAlg.SHA256
crypto.HashAlg.SHA512
crypto.HashAlg.MD5
```

### crypto.EncryptionAlg

Encryption algorithms available.

| Value | Description |
|-------|-------------|
| AES | Advanced Encryption Standard |
| DES | Data Encryption Standard (legacy) |
| DES3 | Triple DES |

```javascript
crypto.EncryptionAlg.AES
```

### crypto.Padding

Padding schemes for block cipher encryption.

| Value | Description |
|-------|-------------|
| NoPadding | No padding |
| PKCS5Padding | PKCS#5 padding (recommended) |

```javascript
crypto.Padding.PKCS5Padding
```

## Hash Object Methods

### hash.update(options)

Adds data to be hashed.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| input | string | Yes | Data to hash |
| inputEncoding | string | No | Encoding of input data |

### hash.digest(options)

Generates the final hash value.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| outputEncoding | string | Yes | Encoding for output (use `encode.Encoding` enum) |

**Returns:** `string` - The hash value

## Cipher/Decipher Object Methods

### update(options)

Adds data to be encrypted/decrypted.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| input | string | Yes | Data to process |
| inputEncoding | string | No | Encoding of input data |

### final(options)

Completes the encryption/decryption and returns the result.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| outputEncoding | string | Yes | Encoding for output |

**Returns:** `string` - The encrypted/decrypted data

## Complete Examples

### Password Hashing for Verification

```javascript
/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/crypto', 'N/encode'], function(crypto, encode) {

    /**
     * Creates a secure hash of a password with a salt
     */
    function hashPassword(password, salt) {
        var hashObj = crypto.createHash({
            algorithm: crypto.HashAlg.SHA256
        });

        // Combine password with salt
        var saltedPassword = salt + password + salt;

        hashObj.update({
            input: saltedPassword,
            inputEncoding: encode.Encoding.UTF_8
        });

        return hashObj.digest({
            outputEncoding: encode.Encoding.HEX
        });
    }

    /**
     * Verifies a password against a stored hash
     */
    function verifyPassword(password, salt, storedHash) {
        var computedHash = hashPassword(password, salt);
        return computedHash === storedHash;
    }

    /**
     * Generates a random salt (for demonstration - use a secure random source)
     */
    function generateSalt() {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var salt = '';
        for (var i = 0; i < 32; i++) {
            salt += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return salt;
    }

    return {
        hashPassword: hashPassword,
        verifyPassword: verifyPassword,
        generateSalt: generateSalt
    };
});
```

### API Request Signing with HMAC

```javascript
/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/crypto', 'N/encode', 'N/https'], function(crypto, encode, https) {

    var SECRET_KEY_GUID = 'YOUR_API_SECRET_KEY_GUID';

    /**
     * Signs an API request using HMAC-SHA256
     */
    function signRequest(method, path, timestamp, body) {
        // Load secret key
        var secretKey = crypto.createSecretKey({
            guid: SECRET_KEY_GUID,
            encoding: encode.Encoding.UTF_8
        });

        // Create message to sign
        var message = method + '\n' + path + '\n' + timestamp;
        if (body) {
            message += '\n' + body;
        }

        // Create HMAC
        var hmacObj = crypto.createHmac({
            algorithm: crypto.HashAlg.SHA256,
            key: secretKey
        });

        hmacObj.update({
            input: message,
            inputEncoding: encode.Encoding.UTF_8
        });

        return hmacObj.digest({
            outputEncoding: encode.Encoding.BASE_64
        });
    }

    /**
     * Makes a signed API request
     */
    function makeSignedRequest(method, url, body) {
        var timestamp = new Date().toISOString();
        var path = url.replace(/^https?:\/\/[^\/]+/, '');

        var signature = signRequest(method, path, timestamp, body);

        var headers = {
            'X-Timestamp': timestamp,
            'X-Signature': signature,
            'Content-Type': 'application/json'
        };

        var response;
        if (method === 'GET') {
            response = https.get({
                url: url,
                headers: headers
            });
        } else if (method === 'POST') {
            response = https.post({
                url: url,
                headers: headers,
                body: body
            });
        }

        return response;
    }

    return {
        signRequest: signRequest,
        makeSignedRequest: makeSignedRequest
    };
});
```

### Encrypting Sensitive Data for Storage

```javascript
/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/crypto', 'N/encode', 'N/log'], function(crypto, encode, log) {

    var ENCRYPTION_KEY_GUID = 'YOUR_ENCRYPTION_KEY_GUID';

    /**
     * Encrypts sensitive data for storage
     */
    function encryptSensitiveData(data) {
        try {
            var secretKey = crypto.createSecretKey({
                guid: ENCRYPTION_KEY_GUID,
                encoding: encode.Encoding.UTF_8
            });

            var cipher = crypto.createCipher({
                algorithm: crypto.EncryptionAlg.AES,
                key: secretKey,
                padding: crypto.Padding.PKCS5Padding
            });

            cipher.update({
                input: data,
                inputEncoding: encode.Encoding.UTF_8
            });

            return cipher.final({
                outputEncoding: encode.Encoding.BASE_64
            });

        } catch (e) {
            log.error('Encryption Error', e.message);
            throw e;
        }
    }

    /**
     * Decrypts stored sensitive data
     */
    function decryptSensitiveData(encryptedData) {
        try {
            var secretKey = crypto.createSecretKey({
                guid: ENCRYPTION_KEY_GUID,
                encoding: encode.Encoding.UTF_8
            });

            var decipher = crypto.createDecipher({
                algorithm: crypto.EncryptionAlg.AES,
                key: secretKey,
                padding: crypto.Padding.PKCS5Padding
            });

            decipher.update({
                input: encryptedData,
                inputEncoding: encode.Encoding.BASE_64
            });

            return decipher.final({
                outputEncoding: encode.Encoding.UTF_8
            });

        } catch (e) {
            log.error('Decryption Error', e.message);
            throw e;
        }
    }

    return {
        encrypt: encryptSensitiveData,
        decrypt: decryptSensitiveData
    };
});
```

### File Integrity Verification

```javascript
/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/crypto', 'N/encode', 'N/file'], function(crypto, encode, file) {

    /**
     * Calculates SHA-256 checksum of a file
     */
    function calculateFileChecksum(fileId) {
        var fileObj = file.load({
            id: fileId
        });

        var contents = fileObj.getContents();

        var hashObj = crypto.createHash({
            algorithm: crypto.HashAlg.SHA256
        });

        hashObj.update({
            input: contents
        });

        return hashObj.digest({
            outputEncoding: encode.Encoding.HEX
        });
    }

    /**
     * Verifies file integrity against expected checksum
     */
    function verifyFileIntegrity(fileId, expectedChecksum) {
        var actualChecksum = calculateFileChecksum(fileId);
        return actualChecksum === expectedChecksum;
    }

    return {
        calculateChecksum: calculateFileChecksum,
        verifyIntegrity: verifyFileIntegrity
    };
});
```

## Setting Up Secret Keys

Secret keys used with the N/crypto module must be stored in NetSuite:

1. Navigate to Setup > Company > API Secrets (Tokens, Keys)
2. Click New API Secret
3. Enter a name and the secret key value
4. Save to generate a GUID
5. Use this GUID in `crypto.createSecretKey()`

**Important:** Never hardcode secret keys in your scripts. Always use the secure key storage.

## Best Practices

1. **Use strong algorithms** - Prefer SHA-256 or SHA-512 for hashing; use AES for encryption
2. **Never store plain passwords** - Always hash passwords with salt before storage
3. **Use NetSuite key storage** - Store secret keys in Setup > Company > API Secrets
4. **Rotate keys periodically** - Implement key rotation procedures
5. **Use appropriate encoding** - Match input/output encodings consistently
6. **Handle errors securely** - Don't expose cryptographic details in error messages
7. **Validate inputs** - Ensure data is properly formatted before cryptographic operations
8. **Use HMAC for authentication** - Verify message integrity with HMAC signatures
9. **Consider performance** - Cryptographic operations can be expensive; cache results when appropriate
10. **Test thoroughly** - Verify encryption/decryption round-trips correctly

## Security Considerations

- **MD5 and SHA-1** are considered weak; use only for legacy compatibility or non-security purposes
- **DES** is deprecated; use AES for new implementations
- **Never transmit** encryption keys in the clear
- **Use initialization vectors (IV)** for CBC mode encryption to prevent pattern analysis
- **Audit access** to scripts using cryptographic operations

## Related Documentation

- [Official N/crypto Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4358549576.html)
- [N/encode Module](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4366575639.html)
- [Managing API Secrets](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4752931688.html)
