# N/format Module

Use the N/format module to convert strings to specific formats and parse formatted data.

## Module Import

```javascript
define(['N/format'], function(format) {
    // Your code here
});
```

## Supported Script Types

- Client and Server Scripts

## Module Methods

### format.format(options)

Formats a value based on type.

```javascript
// Format date
var formattedDate = format.format({
    value: new Date(),
    type: format.Type.DATE
});

// Format currency
var formattedCurrency = format.format({
    value: 1234.56,
    type: format.Type.CURRENCY
});

// Format percentage
var formattedPercent = format.format({
    value: 0.25,
    type: format.Type.PERCENT
});
```

### format.parse(options)

Parses a formatted string to its native value.

```javascript
// Parse date string
var dateValue = format.parse({
    value: '1/15/2024',
    type: format.Type.DATE
});

// Parse currency string
var currencyValue = format.parse({
    value: '$1,234.56',
    type: format.Type.CURRENCY
});
```

## format.Type Enum

```javascript
format.Type.DATE
format.Type.TIME
format.Type.DATETIME
format.Type.DATETIMETZ
format.Type.TIMEOFDAY
format.Type.CURRENCY
format.Type.CURRENCY2
format.Type.FLOAT
format.Type.INTEGER
format.Type.NONNEGCURRENCY
format.Type.NONNEGFLOAT
format.Type.PERCENT
format.Type.POSCURRENCY
format.Type.POSFLOAT
format.Type.POSINTEGER
format.Type.CHECKBOX
format.Type.CCNUMBER
format.Type.PHONE
format.Type.FULLPHONE
format.Type.URL
format.Type.MMYYDATE
format.Type.CCEXPDATE
format.Type.CCVALIDFROM
```

## Example: Date Formatting

```javascript
var today = new Date();

var dateStr = format.format({
    value: today,
    type: format.Type.DATE
});
// Returns: "1/15/2024" (based on user preferences)

var dateTimeStr = format.format({
    value: today,
    type: format.Type.DATETIME
});
// Returns: "1/15/2024 2:30 pm"
```

## Related Documentation

- [Official N/format Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4388721627.html)
