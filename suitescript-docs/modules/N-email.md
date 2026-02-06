# N/email Module

Use the N/email module to send email messages from within NetSuite.

## Module Import

```javascript
define(['N/email'], function(email) {
    // Your code here
});
```

## Supported Script Types

- Client and Server Scripts

## Module Methods

### email.send(options)

Sends an email.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| author | number | Yes | Employee internal ID |
| recipients | number/string/array | Yes | Recipients (IDs, emails, or array) |
| subject | string | Yes | Email subject |
| body | string | Yes | Email body (plain text or HTML) |
| cc | array | No | CC recipients |
| bcc | array | No | BCC recipients |
| replyTo | string | No | Reply-to email address |
| attachments | array | No | Array of file.File objects |
| relatedRecords | Object | No | Related records object |

**Example:**

```javascript
email.send({
    author: 123,  // Employee ID
    recipients: ['customer@example.com'],
    subject: 'Order Confirmation',
    body: '<h1>Thank you for your order!</h1><p>Order #12345</p>',
    cc: ['manager@company.com'],
    attachments: [pdfFile],
    relatedRecords: {
        transactionId: 12345,
        entityId: 678
    }
});
```

### email.sendBulk(options)

Sends bulk email using a campaign template.

```javascript
email.sendBulk({
    author: 123,
    recipients: [101, 102, 103],  // Entity IDs
    subject: 'Special Offer',
    body: 'Check out our new products!'
});
```

### email.sendCampaignEvent(options)

Sends a campaign email event.

```javascript
email.sendCampaignEvent({
    campaignEventId: 456,
    recipientId: 789
});
```

## Best Practices

1. Use employee ID as author (not email address)
2. Handle errors - email sending can fail
3. Use relatedRecords for communication tracking
4. Keep attachments under size limits

## Related Documentation

- [Official N/email Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4358552361.html)
