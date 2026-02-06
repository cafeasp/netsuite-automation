# N/auth Module

Use the N/auth module to change the credentials (email address or password) for the currently logged-in user. This module provides secure methods for updating user authentication information.

## Module Import

```javascript
define(['N/auth'], function(auth) {
    // Your code here
});
```

## Supported Script Types

- Suitelet Scripts
- User Event Scripts
- Client Scripts (limited functionality)

**Note:** This module requires appropriate permissions and is typically used in controlled contexts where users need to update their own credentials.

## Module Methods

### auth.changeEmail(options)

Changes the email address associated with the currently logged-in user's account.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| currentPassword | string | Yes | The user's current password for verification |
| newEmail | string | Yes | The new email address |
| justThisAccount | boolean | No | If true, only changes email for current account (default: false) |

**Returns:** `void`

**Throws:** `error.SuiteScriptError` if the password is incorrect or the email is invalid

**Example:**

```javascript
define(['N/auth', 'N/ui/message'], function(auth, message) {

    function changeUserEmail(currentPassword, newEmail) {
        try {
            auth.changeEmail({
                currentPassword: currentPassword,
                newEmail: newEmail,
                justThisAccount: true
            });

            return {
                success: true,
                message: 'Email successfully updated to ' + newEmail
            };

        } catch (e) {
            return {
                success: false,
                message: 'Failed to change email: ' + e.message
            };
        }
    }

    return {
        changeEmail: changeUserEmail
    };
});
```

### auth.changePassword(options)

Changes the password for the currently logged-in user.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| currentPassword | string | Yes | The user's current password for verification |
| newPassword | string | Yes | The new password |

**Returns:** `void`

**Throws:** `error.SuiteScriptError` if the current password is incorrect or the new password doesn't meet requirements

**Example:**

```javascript
define(['N/auth', 'N/log'], function(auth, log) {

    function changeUserPassword(currentPassword, newPassword) {
        try {
            auth.changePassword({
                currentPassword: currentPassword,
                newPassword: newPassword
            });

            log.audit('Password Changed', 'User password successfully updated');

            return {
                success: true,
                message: 'Password successfully changed'
            };

        } catch (e) {
            log.error('Password Change Failed', e.message);

            return {
                success: false,
                message: 'Failed to change password: ' + e.message
            };
        }
    }

    return {
        changePassword: changeUserPassword
    };
});
```

## Suitelet Example: Password Change Form

A complete example of a Suitelet that provides a form for users to change their password.

```javascript
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/auth', 'N/ui/serverWidget', 'N/log'], function(auth, serverWidget, log) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Display the password change form
            var form = serverWidget.createForm({
                title: 'Change Password'
            });

            form.addCredentialField({
                id: 'custpage_current_password',
                label: 'Current Password',
                restrictToCurrentUser: true,
                restrictToDomains: ['system.netsuite.com']
            });

            form.addCredentialField({
                id: 'custpage_new_password',
                label: 'New Password',
                restrictToCurrentUser: true,
                restrictToDomains: ['system.netsuite.com']
            });

            form.addCredentialField({
                id: 'custpage_confirm_password',
                label: 'Confirm New Password',
                restrictToCurrentUser: true,
                restrictToDomains: ['system.netsuite.com']
            });

            form.addSubmitButton({
                label: 'Change Password'
            });

            context.response.writePage(form);

        } else {
            // Process the password change
            var currentPassword = context.request.parameters.custpage_current_password;
            var newPassword = context.request.parameters.custpage_new_password;
            var confirmPassword = context.request.parameters.custpage_confirm_password;

            try {
                // Validate passwords match
                if (newPassword !== confirmPassword) {
                    throw new Error('New passwords do not match');
                }

                // Validate password strength (example)
                if (newPassword.length < 8) {
                    throw new Error('Password must be at least 8 characters');
                }

                auth.changePassword({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                });

                log.audit('Password Changed', 'User successfully changed password');

                // Display success message
                var form = serverWidget.createForm({
                    title: 'Password Changed'
                });
                form.addField({
                    id: 'custpage_message',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: ' '
                }).defaultValue = '<p style="color: green; font-size: 14px;">Your password has been successfully changed.</p>';

                context.response.writePage(form);

            } catch (e) {
                log.error('Password Change Error', e.message);

                // Display error message
                var form = serverWidget.createForm({
                    title: 'Password Change Failed'
                });
                form.addField({
                    id: 'custpage_error',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: ' '
                }).defaultValue = '<p style="color: red; font-size: 14px;">Error: ' + e.message + '</p>';

                form.addButton({
                    id: 'custpage_back',
                    label: 'Try Again',
                    functionName: 'history.back()'
                });

                context.response.writePage(form);
            }
        }
    }

    return {
        onRequest: onRequest
    };
});
```

## Suitelet Example: Email Change Form

```javascript
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/auth', 'N/ui/serverWidget', 'N/runtime', 'N/log'], function(auth, serverWidget, runtime, log) {

    function onRequest(context) {
        var currentUser = runtime.getCurrentUser();

        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'Change Email Address'
            });

            form.addField({
                id: 'custpage_current_email',
                type: serverWidget.FieldType.TEXT,
                label: 'Current Email'
            }).defaultValue = currentUser.email;

            form.addCredentialField({
                id: 'custpage_password',
                label: 'Current Password',
                restrictToCurrentUser: true,
                restrictToDomains: ['system.netsuite.com']
            });

            form.addField({
                id: 'custpage_new_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'New Email Address'
            });

            form.addCheckBox({
                id: 'custpage_just_this_account',
                label: 'Only change for this account'
            });

            form.addSubmitButton({
                label: 'Update Email'
            });

            context.response.writePage(form);

        } else {
            var password = context.request.parameters.custpage_password;
            var newEmail = context.request.parameters.custpage_new_email;
            var justThisAccount = context.request.parameters.custpage_just_this_account === 'T';

            try {
                auth.changeEmail({
                    currentPassword: password,
                    newEmail: newEmail,
                    justThisAccount: justThisAccount
                });

                log.audit('Email Changed', {
                    user: currentUser.id,
                    newEmail: newEmail,
                    justThisAccount: justThisAccount
                });

                var form = serverWidget.createForm({
                    title: 'Email Updated'
                });
                form.addField({
                    id: 'custpage_message',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: ' '
                }).defaultValue = '<p style="color: green;">Email successfully updated to ' + newEmail + '</p>';

                context.response.writePage(form);

            } catch (e) {
                log.error('Email Change Error', e.message);

                var form = serverWidget.createForm({
                    title: 'Email Change Failed'
                });
                form.addField({
                    id: 'custpage_error',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: ' '
                }).defaultValue = '<p style="color: red;">Error: ' + e.message + '</p>';

                context.response.writePage(form);
            }
        }
    }

    return {
        onRequest: onRequest
    };
});
```

## Security Considerations

### Password Requirements

NetSuite enforces password policies that may include:
- Minimum length requirements
- Complexity requirements (uppercase, lowercase, numbers, special characters)
- Password history restrictions
- Password expiration policies

### Best Practices

1. **Always verify current credentials** - Both methods require the current password for security
2. **Use credential fields** - Use `addCredentialField()` for password inputs to ensure secure handling
3. **Validate on server side** - Never trust client-side validation alone
4. **Log credential changes** - Use `log.audit()` to record credential changes for security auditing
5. **Limit exposure** - Only expose credential change functionality where necessary
6. **Handle errors securely** - Don't reveal whether current password was incorrect vs other errors
7. **Use HTTPS** - Ensure all credential operations occur over secure connections
8. **Consider rate limiting** - Implement controls to prevent brute force attempts

## Error Codes

| Error Code | Description |
|------------|-------------|
| INVALID_PASSWORD | The current password provided is incorrect |
| PASSWORD_COMPLEXITY | The new password doesn't meet complexity requirements |
| PASSWORD_HISTORY | The new password was used recently |
| INVALID_EMAIL | The email address format is invalid |
| EMAIL_IN_USE | The email address is already associated with another user |

## Error Handling Example

```javascript
define(['N/auth', 'N/error', 'N/log'], function(auth, error, log) {

    function safeChangePassword(currentPwd, newPwd) {
        try {
            auth.changePassword({
                currentPassword: currentPwd,
                newPassword: newPwd
            });
            return { success: true };

        } catch (e) {
            var errorMessage;

            switch (e.name) {
                case 'INVALID_PASSWORD':
                    errorMessage = 'The current password you entered is incorrect.';
                    break;
                case 'PASSWORD_COMPLEXITY':
                    errorMessage = 'Your new password does not meet the security requirements.';
                    break;
                case 'PASSWORD_HISTORY':
                    errorMessage = 'You cannot reuse a recent password.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
                    log.error('Password Change Error', e);
            }

            return {
                success: false,
                message: errorMessage
            };
        }
    }

    return {
        changePassword: safeChangePassword
    };
});
```

## Related Documentation

- [Official N/auth Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4296aborv.html)
- [NetSuite Password Policies](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2895935.html)
- [SuiteScript Security Best Practices](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4387236005.html)
