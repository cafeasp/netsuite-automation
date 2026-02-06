# N/cache Module

Use the N/cache module to cache data for improved script performance. The cache module allows you to store and retrieve data that persists across script executions, reducing the need for repeated expensive operations like searches or API calls.

## Module Import

```javascript
define(['N/cache'], function(cache) {
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

### cache.getCache(options)

Gets or creates a named cache object.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | The unique name for the cache (max 60 characters) |
| scope | string | No | The scope of the cache. Use `cache.Scope` enum |

**Returns:** `cache.Cache` - A Cache object

**Example:**

```javascript
define(['N/cache'], function(cache) {

    function getMyCache() {
        var myCache = cache.getCache({
            name: 'MY_CUSTOM_CACHE',
            scope: cache.Scope.PUBLIC
        });

        return myCache;
    }

    return {
        getCache: getMyCache
    };
});
```

## Cache Object Methods

### cache.get(options)

Retrieves a value from the cache.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| key | string | Yes | The key for the cached value (max 60 characters) |
| loader | function | No | Function that returns a value if key is not in cache |
| ttl | number | No | Time-to-live in seconds (max 172800 = 48 hours) |

**Returns:** `string` - The cached value, or null if not found and no loader provided

**Example:**

```javascript
define(['N/cache', 'N/search'], function(cache, search) {

    function getExchangeRates() {
        var myCache = cache.getCache({
            name: 'EXCHANGE_RATES_CACHE',
            scope: cache.Scope.PUBLIC
        });

        // Simple get
        var rates = myCache.get({
            key: 'USD_RATES'
        });

        if (rates) {
            return JSON.parse(rates);
        }

        return null;
    }

    return {
        getRates: getExchangeRates
    };
});
```

### Using the Loader Function

The loader function automatically populates the cache if the key doesn't exist.

```javascript
define(['N/cache', 'N/search', 'N/log'], function(cache, search, log) {

    function getConfigWithLoader() {
        var configCache = cache.getCache({
            name: 'CONFIG_CACHE',
            scope: cache.Scope.PUBLIC
        });

        var config = configCache.get({
            key: 'APP_CONFIG',
            loader: function() {
                log.debug('Cache Miss', 'Loading config from search');

                // This runs only if the key is not in cache
                var configData = {};

                var configSearch = search.create({
                    type: 'customrecord_app_config',
                    columns: ['custrecord_config_key', 'custrecord_config_value']
                });

                configSearch.run().each(function(result) {
                    var key = result.getValue('custrecord_config_key');
                    var value = result.getValue('custrecord_config_value');
                    configData[key] = value;
                    return true;
                });

                // Return as string (cache stores strings)
                return JSON.stringify(configData);
            },
            ttl: 3600 // Cache for 1 hour
        });

        return JSON.parse(config);
    }

    return {
        getConfig: getConfigWithLoader
    };
});
```

### cache.put(options)

Stores a value in the cache.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| key | string | Yes | The key for the value (max 60 characters) |
| value | string | Yes | The value to cache (max 500KB) |
| ttl | number | No | Time-to-live in seconds (default: 172800 = 48 hours) |

**Returns:** `void`

**Example:**

```javascript
define(['N/cache', 'N/https'], function(cache, https) {

    function cacheApiResponse() {
        var apiCache = cache.getCache({
            name: 'API_RESPONSE_CACHE',
            scope: cache.Scope.PUBLIC
        });

        // Fetch from external API
        var response = https.get({
            url: 'https://api.example.com/data'
        });

        // Store in cache for 30 minutes
        apiCache.put({
            key: 'API_DATA',
            value: response.body,
            ttl: 1800
        });

        return JSON.parse(response.body);
    }

    return {
        fetchAndCache: cacheApiResponse
    };
});
```

### cache.remove(options)

Removes a value from the cache.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| key | string | Yes | The key to remove |

**Returns:** `void`

**Example:**

```javascript
define(['N/cache'], function(cache) {

    function invalidateCache() {
        var myCache = cache.getCache({
            name: 'MY_CUSTOM_CACHE',
            scope: cache.Scope.PUBLIC
        });

        // Remove specific key
        myCache.remove({
            key: 'CACHED_DATA'
        });

        log.debug('Cache Invalidated', 'Removed CACHED_DATA from cache');
    }

    return {
        invalidate: invalidateCache
    };
});
```

## cache.Scope Enum

| Value | Description |
|-------|-------------|
| PRIVATE | Cache is visible only to the current user |
| PROTECTED | Cache is visible to all users in the same script |
| PUBLIC | Cache is visible to all users across all scripts |

**Example:**

```javascript
// Private cache - only current user can access
var userCache = cache.getCache({
    name: 'USER_PREFERENCES',
    scope: cache.Scope.PRIVATE
});

// Protected cache - all users running this script
var scriptCache = cache.getCache({
    name: 'SCRIPT_DATA',
    scope: cache.Scope.PROTECTED
});

// Public cache - all users, all scripts
var sharedCache = cache.getCache({
    name: 'SHARED_LOOKUPS',
    scope: cache.Scope.PUBLIC
});
```

## Complete Example: Caching Search Results

```javascript
/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/cache', 'N/search', 'N/log'], function(cache, search, log) {

    var CACHE_NAME = 'ITEM_LOOKUP_CACHE';
    var CACHE_TTL = 7200; // 2 hours

    function getItemCache() {
        return cache.getCache({
            name: CACHE_NAME,
            scope: cache.Scope.PUBLIC
        });
    }

    function getItemDetails(itemId) {
        var itemCache = getItemCache();
        var cacheKey = 'ITEM_' + itemId;

        var itemData = itemCache.get({
            key: cacheKey,
            loader: function() {
                log.debug('Cache Miss', 'Loading item ' + itemId + ' from database');

                var itemSearch = search.lookupFields({
                    type: search.Type.ITEM,
                    id: itemId,
                    columns: ['itemid', 'displayname', 'baseprice', 'custitem_category']
                });

                return JSON.stringify(itemSearch);
            },
            ttl: CACHE_TTL
        });

        return JSON.parse(itemData);
    }

    function invalidateItemCache(itemId) {
        var itemCache = getItemCache();
        itemCache.remove({
            key: 'ITEM_' + itemId
        });
        log.debug('Cache Invalidated', 'Item ' + itemId);
    }

    function beforeLoad(context) {
        // Use cached item data
        var rec = context.newRecord;
        var lineCount = rec.getLineCount({ sublistId: 'item' });

        for (var i = 0; i < lineCount; i++) {
            var itemId = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: i
            });

            var itemDetails = getItemDetails(itemId);
            log.debug('Item Details', itemDetails);
        }
    }

    function afterSubmit(context) {
        // Invalidate cache when item is modified
        if (context.type === context.UserEventType.EDIT) {
            var itemId = context.newRecord.id;
            invalidateItemCache(itemId);
        }
    }

    return {
        beforeLoad: beforeLoad,
        afterSubmit: afterSubmit
    };
});
```

## Caching Complex Objects

Since cache only stores strings, serialize complex objects to JSON.

```javascript
define(['N/cache'], function(cache) {

    function cacheComplexData() {
        var myCache = cache.getCache({
            name: 'COMPLEX_DATA_CACHE',
            scope: cache.Scope.PUBLIC
        });

        var complexObject = {
            settings: {
                enabled: true,
                threshold: 100
            },
            items: [
                { id: 1, name: 'Item A' },
                { id: 2, name: 'Item B' }
            ],
            timestamp: new Date().toISOString()
        };

        // Serialize to JSON string
        myCache.put({
            key: 'COMPLEX_DATA',
            value: JSON.stringify(complexObject),
            ttl: 3600
        });
    }

    function retrieveComplexData() {
        var myCache = cache.getCache({
            name: 'COMPLEX_DATA_CACHE',
            scope: cache.Scope.PUBLIC
        });

        var cachedValue = myCache.get({
            key: 'COMPLEX_DATA'
        });

        if (cachedValue) {
            return JSON.parse(cachedValue);
        }

        return null;
    }

    return {
        cache: cacheComplexData,
        retrieve: retrieveComplexData
    };
});
```

## Cache Management Utility

A reusable utility for cache operations.

```javascript
/**
 * Cache Utility Module
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['N/cache', 'N/log'], function(cache, log) {

    var CacheUtil = {

        /**
         * Get or create a value with automatic serialization
         */
        getOrCreate: function(cacheName, key, loaderFn, ttl) {
            var cacheObj = cache.getCache({
                name: cacheName,
                scope: cache.Scope.PUBLIC
            });

            var value = cacheObj.get({
                key: key,
                loader: function() {
                    var result = loaderFn();
                    return typeof result === 'string' ? result : JSON.stringify(result);
                },
                ttl: ttl || 3600
            });

            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        },

        /**
         * Set a value with automatic serialization
         */
        set: function(cacheName, key, value, ttl) {
            var cacheObj = cache.getCache({
                name: cacheName,
                scope: cache.Scope.PUBLIC
            });

            var stringValue = typeof value === 'string' ? value : JSON.stringify(value);

            cacheObj.put({
                key: key,
                value: stringValue,
                ttl: ttl || 3600
            });
        },

        /**
         * Remove a key from cache
         */
        remove: function(cacheName, key) {
            var cacheObj = cache.getCache({
                name: cacheName,
                scope: cache.Scope.PUBLIC
            });

            cacheObj.remove({
                key: key
            });
        },

        /**
         * Remove multiple keys with a prefix
         */
        removeByPrefix: function(cacheName, prefix, keys) {
            var cacheObj = cache.getCache({
                name: cacheName,
                scope: cache.Scope.PUBLIC
            });

            keys.forEach(function(key) {
                if (key.indexOf(prefix) === 0) {
                    cacheObj.remove({ key: key });
                }
            });
        }
    };

    return CacheUtil;
});
```

## Best Practices

1. **Choose appropriate scope** - Use PRIVATE for user-specific data, PUBLIC for shared data
2. **Set reasonable TTL** - Balance freshness vs performance; don't cache volatile data too long
3. **Handle cache misses gracefully** - Always have fallback logic when cache is empty
4. **Use meaningful key names** - Make keys descriptive and include version if data format changes
5. **Mind the size limits** - Values max 500KB; split large data if needed
6. **Invalidate proactively** - Clear cache when underlying data changes
7. **Monitor cache effectiveness** - Log cache hits/misses to optimize TTL
8. **Use loader functions** - They atomically populate cache on miss, preventing race conditions
9. **Serialize consistently** - Always use JSON.stringify/parse for objects
10. **Avoid caching sensitive data** - Cache is not encrypted; don't store credentials or PII

## Limitations

| Limit | Value |
|-------|-------|
| Cache name length | 60 characters |
| Key length | 60 characters |
| Value size | 500 KB |
| Maximum TTL | 172800 seconds (48 hours) |
| Caches per script | No documented limit |

## Related Documentation

- [Official N/cache Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4642573496.html)
- [SuiteScript Performance Best Practices](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4704089498.html)
