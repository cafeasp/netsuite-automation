# N/config Module

Use the N/config module to access NetSuite company configuration and preference settings. This module provides read-only access to setup pages including company information, accounting preferences, and feature settings.

## Module Import

```javascript
define(['N/config'], function(config) {
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

### config.load(options)

Loads a configuration record.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | The configuration type (use `config.Type` enum) |

**Returns:** `config.Record` - A read-only configuration record object

**Throws:** `error.SuiteScriptError` if the type is invalid or access is denied

**Example:**

```javascript
define(['N/config'], function(config) {

    function getCompanyInfo() {
        var companyConfig = config.load({
            type: config.Type.COMPANY_INFORMATION
        });

        var companyName = companyConfig.getValue({ fieldId: 'companyname' });
        var address = companyConfig.getValue({ fieldId: 'mainaddress_text' });
        var phone = companyConfig.getValue({ fieldId: 'phone' });

        return {
            name: companyName,
            address: address,
            phone: phone
        };
    }

    return {
        getCompanyInfo: getCompanyInfo
    };
});
```

## config.Type Enum

| Type | Description |
|------|-------------|
| COMPANY_INFORMATION | Company name, address, logo, and basic info |
| COMPANY_PREFERENCES | General company preferences |
| ACCOUNTING_PREFERENCES | Accounting-related settings |
| ACCOUNTING_PERIODS | Accounting period configuration |
| FEATURES | Enabled NetSuite features |
| USER_PREFERENCES | Current user's preferences |

## Configuration Record Methods

The configuration record object supports these methods:

### getValue(options)

Gets the value of a field.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fieldId | string | Yes | The field ID |

**Returns:** `string | number | boolean | Date` - The field value

### getText(options)

Gets the display text of a select field.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fieldId | string | Yes | The field ID |

**Returns:** `string` - The display text

### getFields()

Gets all available field IDs.

**Returns:** `string[]` - Array of field IDs

## Company Information (config.Type.COMPANY_INFORMATION)

```javascript
define(['N/config', 'N/log'], function(config, log) {

    function loadCompanyInformation() {
        var companyInfo = config.load({
            type: config.Type.COMPANY_INFORMATION
        });

        return {
            companyName: companyInfo.getValue({ fieldId: 'companyname' }),
            legalName: companyInfo.getValue({ fieldId: 'legalname' }),
            employerId: companyInfo.getValue({ fieldId: 'employerid' }),
            address: companyInfo.getValue({ fieldId: 'mainaddress_text' }),
            returnAddress: companyInfo.getValue({ fieldId: 'returnaddress_text' }),
            phone: companyInfo.getValue({ fieldId: 'phone' }),
            fax: companyInfo.getValue({ fieldId: 'fax' }),
            email: companyInfo.getValue({ fieldId: 'email' }),
            url: companyInfo.getValue({ fieldId: 'url' }),
            fiscalYearEnd: companyInfo.getValue({ fieldId: 'fiscalyearend' }),
            taxId: companyInfo.getValue({ fieldId: 'taxidnum' }),
            baseCurrency: companyInfo.getValue({ fieldId: 'basecurrency' }),
            country: companyInfo.getText({ fieldId: 'country' }),
            state: companyInfo.getText({ fieldId: 'state' })
        };
    }

    return {
        getCompanyInfo: loadCompanyInformation
    };
});
```

## Company Preferences (config.Type.COMPANY_PREFERENCES)

```javascript
define(['N/config'], function(config) {

    function loadCompanyPreferences() {
        var prefs = config.load({
            type: config.Type.COMPANY_PREFERENCES
        });

        return {
            dateFormat: prefs.getValue({ fieldId: 'dateformat' }),
            longDateFormat: prefs.getValue({ fieldId: 'longdateformat' }),
            timeFormat: prefs.getValue({ fieldId: 'timeformat' }),
            numberFormat: prefs.getValue({ fieldId: 'numberformat' }),
            negativeNumberFormat: prefs.getValue({ fieldId: 'negativeformat' }),
            currencyFormat: prefs.getValue({ fieldId: 'currencyformat' }),
            timeZone: prefs.getValue({ fieldId: 'timezone' }),
            startDayOfWeek: prefs.getValue({ fieldId: 'startdayofweek' }),
            initialForm: prefs.getValue({ fieldId: 'initialform' })
        };
    }

    return {
        getPreferences: loadCompanyPreferences
    };
});
```

## Accounting Preferences (config.Type.ACCOUNTING_PREFERENCES)

```javascript
define(['N/config'], function(config) {

    function loadAccountingPreferences() {
        var acctPrefs = config.load({
            type: config.Type.ACCOUNTING_PREFERENCES
        });

        return {
            // Number Settings
            allowTransactionNumberChanges: acctPrefs.getValue({ fieldId: 'tranprefixtrans' }),

            // Invoice Settings
            copySalesDescToItem: acctPrefs.getValue({ fieldId: 'copysalesdesc' }),

            // General Ledger
            useDepartments: acctPrefs.getValue({ fieldId: 'deptmandatory' }),
            useClasses: acctPrefs.getValue({ fieldId: 'classmandatory' }),
            useLocations: acctPrefs.getValue({ fieldId: 'locmandatory' }),

            // Costing
            costingMethod: acctPrefs.getText({ fieldId: 'costingmethod' }),

            // Period Close
            allowNonGLChanges: acctPrefs.getValue({ fieldId: 'allownongledits' }),

            // Approval Settings
            requireSOApproval: acctPrefs.getValue({ fieldId: 'autoapproveorders' }),
            requirePOApproval: acctPrefs.getValue({ fieldId: 'purchaseapproval' })
        };
    }

    return {
        getAccountingPrefs: loadAccountingPreferences
    };
});
```

## Feature Detection (config.Type.FEATURES)

Check if specific NetSuite features are enabled.

```javascript
define(['N/config', 'N/log'], function(config, log) {

    function checkFeatures() {
        var features = config.load({
            type: config.Type.FEATURES
        });

        return {
            // SuiteCloud Features
            advancedPrinting: features.getValue({ fieldId: 'advancedprinting' }),
            webServices: features.getValue({ fieldId: 'webservices' }),
            suiteScript: features.getValue({ fieldId: 'customcode' }),
            workflow: features.getValue({ fieldId: 'workflow' }),

            // Transaction Features
            multiCurrency: features.getValue({ fieldId: 'multicurrency' }),
            multiLocation: features.getValue({ fieldId: 'multilocinvt' }),
            multiSub: features.getValue({ fieldId: 'subsidiaries' }),
            advancedBins: features.getValue({ fieldId: 'advancedbins' }),
            serializedInventory: features.getValue({ fieldId: 'serializedinventory' }),
            lotTracking: features.getValue({ fieldId: 'lotnumberedinventory' }),

            // CRM Features
            crm: features.getValue({ fieldId: 'crm' }),
            marketing: features.getValue({ fieldId: 'marketing' }),
            supportCases: features.getValue({ fieldId: 'support' }),

            // Commerce Features
            webStore: features.getValue({ fieldId: 'webstore' }),

            // ERP Features
            advRevRecognition: features.getValue({ fieldId: 'revrec' }),
            fixedAssets: features.getValue({ fieldId: 'fixedassets' }),
            projectManagement: features.getValue({ fieldId: 'jobs' }),
            manufacturing: features.getValue({ fieldId: 'manufacturing' })
        };
    }

    function isFeatureEnabled(featureId) {
        var features = config.load({
            type: config.Type.FEATURES
        });

        return features.getValue({ fieldId: featureId }) === true;
    }

    return {
        checkFeatures: checkFeatures,
        isEnabled: isFeatureEnabled
    };
});
```

## User Preferences (config.Type.USER_PREFERENCES)

```javascript
define(['N/config', 'N/runtime'], function(config, runtime) {

    function getUserPreferences() {
        var userPrefs = config.load({
            type: config.Type.USER_PREFERENCES
        });

        return {
            dateFormat: userPrefs.getValue({ fieldId: 'dateformat' }),
            timeFormat: userPrefs.getValue({ fieldId: 'timeformat' }),
            timeZone: userPrefs.getValue({ fieldId: 'timezone' }),
            language: userPrefs.getValue({ fieldId: 'language' }),
            numberFormat: userPrefs.getValue({ fieldId: 'numberformat' }),
            defaultSubsidiary: userPrefs.getValue({ fieldId: 'subsidiary' }),
            department: userPrefs.getValue({ fieldId: 'department' }),
            location: userPrefs.getValue({ fieldId: 'location' })
        };
    }

    return {
        getUserPrefs: getUserPreferences
    };
});
```

## Practical Example: Feature-Based Script Logic

```javascript
/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/config', 'N/log', 'N/record'], function(config, log, record) {

    var featureCache = null;

    function loadFeatures() {
        if (!featureCache) {
            featureCache = config.load({
                type: config.Type.FEATURES
            });
        }
        return featureCache;
    }

    function isMultiCurrencyEnabled() {
        return loadFeatures().getValue({ fieldId: 'multicurrency' }) === true;
    }

    function isMultiSubsidiaryEnabled() {
        return loadFeatures().getValue({ fieldId: 'subsidiaries' }) === true;
    }

    function beforeSubmit(context) {
        var rec = context.newRecord;

        // Handle multi-currency logic only if feature is enabled
        if (isMultiCurrencyEnabled()) {
            var currency = rec.getValue({ fieldId: 'currency' });
            if (!currency) {
                log.error('Validation Error', 'Currency is required');
                throw new Error('Currency must be specified');
            }
        }

        // Handle subsidiary logic only if OneWorld is enabled
        if (isMultiSubsidiaryEnabled()) {
            var subsidiary = rec.getValue({ fieldId: 'subsidiary' });
            if (!subsidiary) {
                log.error('Validation Error', 'Subsidiary is required');
                throw new Error('Subsidiary must be specified');
            }
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
```

## Complete Example: Configuration Settings Page

```javascript
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/config', 'N/ui/serverWidget', 'N/runtime'], function(config, serverWidget, runtime) {

    function onRequest(context) {
        var form = serverWidget.createForm({
            title: 'System Configuration Overview'
        });

        // Company Information Section
        var companyInfo = config.load({ type: config.Type.COMPANY_INFORMATION });

        var companyGroup = form.addFieldGroup({
            id: 'custpage_company_group',
            label: 'Company Information'
        });

        form.addField({
            id: 'custpage_company_name',
            type: serverWidget.FieldType.TEXT,
            label: 'Company Name',
            container: 'custpage_company_group'
        }).defaultValue = companyInfo.getValue({ fieldId: 'companyname' });

        form.addField({
            id: 'custpage_base_currency',
            type: serverWidget.FieldType.TEXT,
            label: 'Base Currency',
            container: 'custpage_company_group'
        }).defaultValue = companyInfo.getText({ fieldId: 'basecurrency' });

        // Features Section
        var features = config.load({ type: config.Type.FEATURES });

        var featuresGroup = form.addFieldGroup({
            id: 'custpage_features_group',
            label: 'Enabled Features'
        });

        var featureList = [
            { id: 'multicurrency', label: 'Multi-Currency' },
            { id: 'subsidiaries', label: 'OneWorld (Multi-Subsidiary)' },
            { id: 'multilocinvt', label: 'Multi-Location Inventory' },
            { id: 'advancedbins', label: 'Advanced Bin Management' },
            { id: 'serializedinventory', label: 'Serialized Inventory' }
        ];

        featureList.forEach(function(feature) {
            var isEnabled = features.getValue({ fieldId: feature.id });
            form.addField({
                id: 'custpage_feature_' + feature.id,
                type: serverWidget.FieldType.CHECKBOX,
                label: feature.label,
                container: 'custpage_features_group'
            }).defaultValue = isEnabled ? 'T' : 'F';
        });

        // User Preferences Section
        var userPrefs = config.load({ type: config.Type.USER_PREFERENCES });

        var userGroup = form.addFieldGroup({
            id: 'custpage_user_group',
            label: 'User Preferences'
        });

        form.addField({
            id: 'custpage_user_timezone',
            type: serverWidget.FieldType.TEXT,
            label: 'Time Zone',
            container: 'custpage_user_group'
        }).defaultValue = userPrefs.getText({ fieldId: 'timezone' });

        form.addField({
            id: 'custpage_user_dateformat',
            type: serverWidget.FieldType.TEXT,
            label: 'Date Format',
            container: 'custpage_user_group'
        }).defaultValue = userPrefs.getValue({ fieldId: 'dateformat' });

        // Make all fields display only
        form.getFields().forEach(function(field) {
            field.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });
        });

        context.response.writePage(form);
    }

    return {
        onRequest: onRequest
    };
});
```

## Discovering Available Fields

```javascript
define(['N/config', 'N/log'], function(config, log) {

    function listAllConfigFields(configType) {
        var configRecord = config.load({
            type: configType
        });

        var fields = configRecord.getFields();

        log.debug('Config Type: ' + configType, 'Field count: ' + fields.length);

        fields.forEach(function(fieldId) {
            var value = configRecord.getValue({ fieldId: fieldId });
            log.debug(fieldId, value);
        });

        return fields;
    }

    return {
        listFields: listAllConfigFields
    };
});
```

## Best Practices

1. **Cache configuration data** - Configuration rarely changes; cache values for script duration
2. **Use feature detection** - Always check if features are enabled before using related functionality
3. **Handle access errors** - Some config types may require specific permissions
4. **Read-only nature** - Configuration records cannot be modified via this module
5. **Prefer getText for display** - Use getText() for user-facing values on select fields
6. **Validate field existence** - Use try-catch when accessing fields that may not exist
7. **Consider subsidiaries** - In OneWorld accounts, some config may be subsidiary-specific
8. **Document dependencies** - Note which features your script depends on

## Common Field IDs

### Company Information
- `companyname` - Company name
- `legalname` - Legal name
- `mainaddress_text` - Main address (text)
- `phone`, `fax`, `email`, `url` - Contact information
- `basecurrency` - Base currency
- `fiscalyearend` - Fiscal year end month

### Features
- `multicurrency` - Multi-currency enabled
- `subsidiaries` - OneWorld enabled
- `multilocinvt` - Multi-location inventory
- `customcode` - SuiteScript enabled
- `workflow` - SuiteFlow enabled
- `advancedprinting` - Advanced PDF/HTML templates

## Related Documentation

- [Official N/config Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4261394163.html)
- [NetSuite Features List](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4712653131.html)
- [Company Setup](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N532851.html)
