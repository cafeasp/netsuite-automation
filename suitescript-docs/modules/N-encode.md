# N/encode Module

## Overview

The `N/encode` module provides methods for encoding and decoding strings using various encoding schemes. It supports conversions between string formats such as Base64, UTF-8, hex, and URL encoding. This module is essential for data transformation, cryptographic operations, and API integrations.

## Module Import

```javascript
// SuiteScript 2.0
define(['N/encode'], function(encode) {
    // Your code here
});

// SuiteScript 2.1
import encode from 'N/encode';
```

## Supported Script Types

| Script Type | Supported |
|-------------|-----------|
| Client Script | Yes |
| User Event Script | Yes |
| Scheduled Script | Yes |
| Map/Reduce Script | Yes |
| RESTlet | Yes |
| Suitelet | Yes |
| Workflow Action Script | Yes |
| Portlet Script | Yes |
| Bundle Installation Script | Yes |
| Mass Update Script | Yes |

## Methods

### encode.convert(options)

Converts a string from one encoding to another.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| options.string | string | Yes | The string to convert |
| options.inputEncoding | encode.Encoding | Yes | The encoding of the input string |
| options.outputEncoding | encode.Encoding | Yes | The desired encoding for the output |

**Returns:** `string` - The converted string

**Governance:** None

#### Basic Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/encode'], function(encode) {

    function onRequest(context) {
        // Convert UTF-8 string to Base64
        var originalString = 'Hello, NetSuite!';

        var base64Encoded = encode.convert({
            string: originalString,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64
        });

        log.debug('Base64 Encoded', base64Encoded);
        // Output: SGVsbG8sIE5ldFN1aXRlIQ==

        // Convert Base64 back to UTF-8
        var decoded = encode.convert({
            string: base64Encoded,
            inputEncoding: encode.Encoding.BASE_64,
            outputEncoding: encode.Encoding.UTF_8
        });

        log.debug('Decoded', decoded);
        // Output: Hello, NetSuite!

        context.response.write('Original: ' + originalString + '<br>');
        context.response.write('Encoded: ' + base64Encoded + '<br>');
        context.response.write('Decoded: ' + decoded);
    }

    return {
        onRequest: onRequest
    };
});
```

#### Hex Encoding Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/encode'], function(encode) {

    function onRequest(context) {
        var text = 'ABC123';

        // Convert UTF-8 to Hex
        var hexEncoded = encode.convert({
            string: text,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.HEX
        });

        log.debug('Hex Encoded', hexEncoded);
        // Output: 414243313233

        // Convert Hex back to UTF-8
        var hexDecoded = encode.convert({
            string: hexEncoded,
            inputEncoding: encode.Encoding.HEX,
            outputEncoding: encode.Encoding.UTF_8
        });

        log.debug('Hex Decoded', hexDecoded);
        // Output: ABC123

        context.response.write('Hex: ' + hexEncoded);
    }

    return {
        onRequest: onRequest
    };
});
```

#### URL Encoding Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType RESTlet
 */
define(['N/encode'], function(encode) {

    function get(requestParams) {
        var url = 'https://example.com/api?name=John Doe&city=New York';

        // URL encode the string
        var urlEncoded = encode.convert({
            string: url,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.URL_COMPONENT
        });

        log.debug('URL Encoded', urlEncoded);
        // Output: https%3A%2F%2Fexample.com%2Fapi%3Fname%3DJohn%20Doe%26city%3DNew%20York

        // URL decode the string
        var urlDecoded = encode.convert({
            string: urlEncoded,
            inputEncoding: encode.Encoding.URL_COMPONENT,
            outputEncoding: encode.Encoding.UTF_8
        });

        log.debug('URL Decoded', urlDecoded);

        return {
            original: url,
            encoded: urlEncoded,
            decoded: urlDecoded
        };
    }

    return {
        get: get
    };
});
```

#### Base32 Encoding Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/encode'], function(encode) {

    function onRequest(context) {
        var secret = 'MySecretKey123';

        // Convert to Base32 (commonly used for TOTP secrets)
        var base32Encoded = encode.convert({
            string: secret,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_32
        });

        log.debug('Base32 Encoded', base32Encoded);

        // Decode Base32
        var base32Decoded = encode.convert({
            string: base32Encoded,
            inputEncoding: encode.Encoding.BASE_32,
            outputEncoding: encode.Encoding.UTF_8
        });

        log.debug('Base32 Decoded', base32Decoded);

        context.response.write('Base32: ' + base32Encoded);
    }

    return {
        onRequest: onRequest
    };
});
```

## Enums

### encode.Encoding

Specifies the encoding type for string conversion.

| Value | Description |
|-------|-------------|
| encode.Encoding.UTF_8 | UTF-8 encoding (standard text) |
| encode.Encoding.BASE_16 | Base16 (hexadecimal) encoding |
| encode.Encoding.BASE_32 | Base32 encoding |
| encode.Encoding.BASE_64 | Base64 encoding |
| encode.Encoding.BASE_64_URL_SAFE | Base64 URL-safe encoding (replaces + with - and / with _) |
| encode.Encoding.HEX | Hexadecimal encoding (same as BASE_16) |
| encode.Encoding.URL_COMPONENT | URL component encoding |

#### Enum Usage Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/encode'], function(encode) {

    function onRequest(context) {
        var testString = 'Test+Data/With=Special';

        // Demonstrate different encodings
        var results = {};

        // Base64 standard
        results.base64 = encode.convert({
            string: testString,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64
        });

        // Base64 URL-safe (no + or / characters)
        results.base64UrlSafe = encode.convert({
            string: testString,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64_URL_SAFE
        });

        // Hex encoding
        results.hex = encode.convert({
            string: testString,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.HEX
        });

        // Base32
        results.base32 = encode.convert({
            string: testString,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_32
        });

        context.response.write(JSON.stringify(results, null, 2));
    }

    return {
        onRequest: onRequest
    };
});
```

## Use Cases

### API Authentication Headers

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/encode', 'N/https'], function(encode, https) {

    function execute(context) {
        var username = 'api_user';
        var password = 'api_password';

        // Create Basic Auth header
        var credentials = username + ':' + password;
        var base64Credentials = encode.convert({
            string: credentials,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64
        });

        var response = https.get({
            url: 'https://api.example.com/data',
            headers: {
                'Authorization': 'Basic ' + base64Credentials,
                'Content-Type': 'application/json'
            }
        });

        log.debug('API Response', response.body);
    }

    return {
        execute: execute
    };
});
```

### JWT Token Handling

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType RESTlet
 */
define(['N/encode'], function(encode) {

    function parseJWT(token) {
        // JWT has three parts: header.payload.signature
        var parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }

        // Decode header and payload (Base64 URL-safe encoded)
        var header = JSON.parse(encode.convert({
            string: parts[0],
            inputEncoding: encode.Encoding.BASE_64_URL_SAFE,
            outputEncoding: encode.Encoding.UTF_8
        }));

        var payload = JSON.parse(encode.convert({
            string: parts[1],
            inputEncoding: encode.Encoding.BASE_64_URL_SAFE,
            outputEncoding: encode.Encoding.UTF_8
        }));

        return {
            header: header,
            payload: payload,
            signature: parts[2]
        };
    }

    function get(requestParams) {
        var token = requestParams.token;

        if (!token) {
            return { error: 'Token required' };
        }

        try {
            var decoded = parseJWT(token);
            return decoded;
        } catch (e) {
            return { error: e.message };
        }
    }

    return {
        get: get
    };
});
```

### File Content Encoding

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/encode', 'N/file'], function(encode, file) {

    function onRequest(context) {
        if (context.request.method === 'POST') {
            // Receive Base64 encoded file content
            var base64Content = context.request.parameters.fileContent;
            var fileName = context.request.parameters.fileName;

            // Decode the content
            var decodedContent = encode.convert({
                string: base64Content,
                inputEncoding: encode.Encoding.BASE_64,
                outputEncoding: encode.Encoding.UTF_8
            });

            // Create file in File Cabinet
            var newFile = file.create({
                name: fileName,
                fileType: file.Type.PLAINTEXT,
                contents: decodedContent,
                folder: -15 // SuiteScripts folder
            });

            var fileId = newFile.save();

            context.response.write(JSON.stringify({
                success: true,
                fileId: fileId
            }));
        }
    }

    return {
        onRequest: onRequest
    };
});
```

### Query String Encoding

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/encode'], function(encode) {

    function buildQueryString(params) {
        var queryParts = [];

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var encodedKey = encode.convert({
                    string: key,
                    inputEncoding: encode.Encoding.UTF_8,
                    outputEncoding: encode.Encoding.URL_COMPONENT
                });

                var encodedValue = encode.convert({
                    string: String(params[key]),
                    inputEncoding: encode.Encoding.UTF_8,
                    outputEncoding: encode.Encoding.URL_COMPONENT
                });

                queryParts.push(encodedKey + '=' + encodedValue);
            }
        }

        return queryParts.join('&');
    }

    function onRequest(context) {
        var params = {
            name: 'John Doe',
            city: 'New York',
            'special chars': 'a+b=c&d'
        };

        var queryString = buildQueryString(params);

        log.debug('Query String', queryString);
        // Output: name=John%20Doe&city=New%20York&special%20chars=a%2Bb%3Dc%26d

        context.response.write('Query String: ' + queryString);
    }

    return {
        onRequest: onRequest
    };
});
```

### Webhook Signature Verification

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType RESTlet
 */
define(['N/encode', 'N/crypto'], function(encode, crypto) {

    function post(requestBody) {
        var payload = JSON.stringify(requestBody);
        var secret = 'webhook_secret_key';
        var receivedSignature = requestBody.signature;

        // Create HMAC signature
        var secretKey = crypto.createSecretKey({
            secret: secret,
            encoding: encode.Encoding.UTF_8
        });

        var hmac = crypto.createHmac({
            algorithm: crypto.HashAlg.SHA256,
            key: secretKey
        });

        hmac.update({
            input: payload,
            inputEncoding: encode.Encoding.UTF_8
        });

        var computedSignature = hmac.digest({
            outputEncoding: encode.Encoding.HEX
        });

        if (computedSignature === receivedSignature) {
            log.debug('Signature Valid', 'Webhook authenticated');
            return { status: 'accepted' };
        } else {
            log.error('Signature Invalid', 'Webhook authentication failed');
            return { status: 'rejected' };
        }
    }

    return {
        post: post
    };
});
```

### Binary Data Handling

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/encode', 'N/file'], function(encode, file) {

    function onRequest(context) {
        // Create binary-like data represented as hex
        var hexData = '48656c6c6f20576f726c64'; // "Hello World" in hex

        // Convert hex to Base64 for storage/transmission
        var base64Data = encode.convert({
            string: hexData,
            inputEncoding: encode.Encoding.HEX,
            outputEncoding: encode.Encoding.BASE_64
        });

        log.debug('Base64 from Hex', base64Data);

        // Convert Base64 back to hex
        var backToHex = encode.convert({
            string: base64Data,
            inputEncoding: encode.Encoding.BASE_64,
            outputEncoding: encode.Encoding.HEX
        });

        log.debug('Back to Hex', backToHex);

        // Convert to readable text
        var text = encode.convert({
            string: hexData,
            inputEncoding: encode.Encoding.HEX,
            outputEncoding: encode.Encoding.UTF_8
        });

        context.response.write('Text: ' + text);
    }

    return {
        onRequest: onRequest
    };
});
```

## Complete Example: Secure API Integration

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/encode', 'N/https', 'N/crypto', 'N/runtime', 'N/record'],
    function(encode, https, crypto, runtime, record) {

        function execute(context) {
            var apiConfig = getAPIConfig();

            // Prepare request payload
            var payload = {
                timestamp: new Date().toISOString(),
                action: 'sync_orders',
                accountId: runtime.accountId
            };

            var payloadString = JSON.stringify(payload);

            // Create signature for payload
            var signature = createSignature(payloadString, apiConfig.secretKey);

            // Encode payload for transmission
            var encodedPayload = encode.convert({
                string: payloadString,
                inputEncoding: encode.Encoding.UTF_8,
                outputEncoding: encode.Encoding.BASE_64
            });

            // Create Basic Auth header
            var authString = apiConfig.apiKey + ':' + apiConfig.apiSecret;
            var authHeader = encode.convert({
                string: authString,
                inputEncoding: encode.Encoding.UTF_8,
                outputEncoding: encode.Encoding.BASE_64
            });

            try {
                var response = https.post({
                    url: apiConfig.endpoint,
                    headers: {
                        'Authorization': 'Basic ' + authHeader,
                        'Content-Type': 'application/json',
                        'X-Signature': signature,
                        'X-Timestamp': payload.timestamp
                    },
                    body: JSON.stringify({
                        data: encodedPayload
                    })
                });

                processResponse(response);

            } catch (e) {
                log.error('API Call Failed', e.message);
            }
        }

        function getAPIConfig() {
            // In production, retrieve from custom record or script parameters
            return {
                endpoint: 'https://api.example.com/v1/orders',
                apiKey: 'your_api_key',
                apiSecret: 'your_api_secret',
                secretKey: 'your_signing_secret'
            };
        }

        function createSignature(payload, secretKey) {
            var key = crypto.createSecretKey({
                secret: secretKey,
                encoding: encode.Encoding.UTF_8
            });

            var hmac = crypto.createHmac({
                algorithm: crypto.HashAlg.SHA256,
                key: key
            });

            hmac.update({
                input: payload,
                inputEncoding: encode.Encoding.UTF_8
            });

            return hmac.digest({
                outputEncoding: encode.Encoding.BASE_64
            });
        }

        function processResponse(response) {
            if (response.code === 200) {
                var responseBody = JSON.parse(response.body);

                // Decode response data if encoded
                if (responseBody.encodedData) {
                    var decodedData = encode.convert({
                        string: responseBody.encodedData,
                        inputEncoding: encode.Encoding.BASE_64,
                        outputEncoding: encode.Encoding.UTF_8
                    });

                    var data = JSON.parse(decodedData);
                    log.audit('Response Data', data);
                }
            } else {
                log.error('API Error', 'Status: ' + response.code);
            }
        }

        return {
            execute: execute
        };
    });
```

## Best Practices

1. **Choose the right encoding** - Use Base64 for binary data transmission, URL encoding for query strings, and Hex for cryptographic operations.

2. **Use URL-safe Base64 for URLs** - When including Base64 data in URLs, use `BASE_64_URL_SAFE` to avoid issues with `+`, `/`, and `=` characters.

3. **Handle encoding chains carefully** - When converting through multiple encodings, ensure you track the correct input encoding for each step.

4. **Validate input before conversion** - Invalid input for the specified encoding will cause errors; validate data before converting.

5. **Consider character sets** - UTF-8 is the standard for text; ensure your source data uses the expected character set.

6. **Use for API integrations** - The encode module is essential for API authentication headers, signed requests, and data payloads.

7. **Avoid double encoding** - Be careful not to encode data that's already encoded, which can cause decoding issues.

8. **Test with special characters** - Always test encoding with special characters, Unicode, and edge cases.

## Common Errors

| Error Code | Description | Resolution |
|------------|-------------|------------|
| SSS_MISSING_REQD_ARGUMENT | Required argument is missing | Provide string, inputEncoding, and outputEncoding |
| INVALID_ENCODING | Invalid encoding type specified | Use values from encode.Encoding enum |
| INVALID_INPUT | Input string is not valid for the specified encoding | Verify input matches the declared inputEncoding |

## Governance

The `N/encode` module methods have no governance cost.

## Related Modules

- [N/crypto](./N-crypto.md) - Cryptographic operations (hashing, HMAC, encryption)
- [N/https](./N-https.md) - HTTPS requests
- [N/file](./N-file.md) - File operations
