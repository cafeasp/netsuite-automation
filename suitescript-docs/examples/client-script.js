/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 * 
 * Client Script Template
 * 
 * Runs in the user's browser during record editing.
 * Use for: Field validation, UI interactions, real-time calculations.
 * 
 * Governance: 1,000 usage units per page load
 */
define(['N/currentRecord', 'N/search', 'N/dialog', 'N/runtime'],
function(currentRecord, search, dialog, runtime) {

    /**
     * pageInit - Executes when the form is loaded
     * Only runs in edit/create mode, not view mode
     * 
     * @param {Object} context
     * @param {string} context.mode - The mode: create, copy, edit
     */
    function pageInit(context) {
        try {
            var rec = context.currentRecord;
            var mode = context.mode;

            console.log('Page initialized in mode: ' + mode);

            // Set default values on create
            if (mode === 'create') {
                rec.setValue({
                    fieldId: 'memo',
                    value: 'Created on ' + new Date().toLocaleDateString()
                });
            }

            // Disable field based on condition
            var status = rec.getValue({ fieldId: 'status' });
            if (status === 'Closed') {
                var field = rec.getField({ fieldId: 'custbody_custom_field' });
                if (field) {
                    field.isDisabled = true;
                }
            }

        } catch (e) {
            console.error('pageInit Error: ' + e.message);
        }
    }

    /**
     * validateField - Validates a field value before it is accepted
     * Return false to reject the value
     * 
     * @param {Object} context
     * @param {string} context.fieldId - The field being changed
     * @param {number} context.line - Line number (for sublist fields)
     * @param {string} context.sublistId - Sublist ID (for sublist fields)
     * @returns {boolean} True to accept, false to reject
     */
    function validateField(context) {
        var rec = context.currentRecord;
        var fieldId = context.fieldId;

        // Validate email format
        if (fieldId === 'email') {
            var email = rec.getValue({ fieldId: 'email' });
            if (email && !isValidEmail(email)) {
                dialog.alert({
                    title: 'Invalid Email',
                    message: 'Please enter a valid email address.'
                });
                return false;
            }
        }

        // Validate quantity in sublist
        if (context.sublistId === 'item' && fieldId === 'quantity') {
            var quantity = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            
            if (quantity <= 0) {
                dialog.alert({
                    title: 'Invalid Quantity',
                    message: 'Quantity must be greater than 0.'
                });
                return false;
            }
        }

        return true;
    }

    /**
     * fieldChanged - Executes after a field value changes
     * Use for: Sourcing data, showing/hiding fields, calculations
     * 
     * @param {Object} context
     * @param {string} context.fieldId - The field that changed
     */
    function fieldChanged(context) {
        var rec = context.currentRecord;
        var fieldId = context.fieldId;
        var sublistId = context.sublistId;

        try {
            // Body field change
            if (!sublistId) {
                if (fieldId === 'entity') {
                    // Customer changed - update related fields
                    var customerId = rec.getValue({ fieldId: 'entity' });
                    if (customerId) {
                        lookupCustomerData(customerId, rec);
                    }
                }
            }

            // Sublist field change
            if (sublistId === 'item' && fieldId === 'quantity') {
                calculateLineTotal(rec);
            }

        } catch (e) {
            console.error('fieldChanged Error: ' + e.message);
        }
    }

    /**
     * postSourcing - Executes after a sourcing operation completes
     * Use when you need sourced values to be available
     * 
     * @param {Object} context
     */
    function postSourcing(context) {
        var rec = context.currentRecord;
        var fieldId = context.fieldId;
        var sublistId = context.sublistId;

        if (sublistId === 'item' && fieldId === 'item') {
            // Item was selected and sourcing completed
            var rate = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate'
            });
            console.log('Item sourced with rate: ' + rate);
        }
    }

    /**
     * validateLine - Validates a line before it is committed
     * Return false to prevent the line from being added
     * 
     * @param {Object} context
     * @returns {boolean}
     */
    function validateLine(context) {
        var rec = context.currentRecord;
        var sublistId = context.sublistId;

        if (sublistId === 'item') {
            var item = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });
            var quantity = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });

            if (!item || !quantity) {
                dialog.alert({
                    title: 'Missing Required Fields',
                    message: 'Item and Quantity are required.'
                });
                return false;
            }
        }

        return true;
    }

    /**
     * saveRecord - Executes when the user clicks Save
     * Return false to prevent saving
     * 
     * @param {Object} context
     * @returns {boolean}
     */
    function saveRecord(context) {
        var rec = context.currentRecord;

        try {
            // Check if at least one line item exists
            var lineCount = rec.getLineCount({ sublistId: 'item' });
            if (lineCount === 0) {
                dialog.alert({
                    title: 'No Items',
                    message: 'Please add at least one item before saving.'
                });
                return false;
            }

            // Confirm large orders
            var total = rec.getValue({ fieldId: 'total' });
            if (total > 10000) {
                return confirm('This order is over $10,000. Are you sure you want to proceed?');
            }

            return true;

        } catch (e) {
            console.error('saveRecord Error: ' + e.message);
            return false;
        }
    }

    // Helper Functions

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function lookupCustomerData(customerId, rec) {
        var customerData = search.lookupFields({
            type: search.Type.CUSTOMER,
            id: customerId,
            columns: ['email', 'phone', 'salesrep']
        });

        if (customerData.salesrep && customerData.salesrep.length > 0) {
            rec.setValue({
                fieldId: 'salesrep',
                value: customerData.salesrep[0].value
            });
        }
    }

    function calculateLineTotal(rec) {
        var quantity = rec.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity'
        }) || 0;

        var rate = rec.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'rate'
        }) || 0;

        var amount = quantity * rate;
        rec.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'amount',
            value: amount
        });
    }

    return {
        pageInit: pageInit,
        validateField: validateField,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        validateLine: validateLine,
        saveRecord: saveRecord
    };
});
