/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * 
 * User Event Script Template
 * 
 * Runs on the server when records are created, loaded, updated, copied, deleted, or submitted.
 * Deploy on: Customer, Sales Order, Invoice, or any other supported record type.
 */
define(['N/record', 'N/search', 'N/email', 'N/runtime', 'N/error'],
function(record, search, email, runtime, error) {

    /**
     * beforeLoad - Executes before the record form is displayed
     * Use for: Modifying form, adding fields/buttons, setting field defaults
     * 
     * @param {Object} context
     * @param {Record} context.newRecord - The record being loaded
     * @param {string} context.type - The trigger type (create, edit, view, copy, etc.)
     * @param {Form} context.form - The form object (server widget form)
     */
    function beforeLoad(context) {
        try {
            // Only execute in create or edit mode
            if (context.type !== context.UserEventType.CREATE && 
                context.type !== context.UserEventType.EDIT) {
                return;
            }

            var currentRecord = context.newRecord;
            var form = context.form;

            // Example: Add a custom button
            form.addButton({
                id: 'custpage_custom_button',
                label: 'Custom Action',
                functionName: 'customButtonAction'
            });

            // Example: Set default field value on create
            if (context.type === context.UserEventType.CREATE) {
                currentRecord.setValue({
                    fieldId: 'memo',
                    value: 'Created via script'
                });
            }

            // Example: Make a field mandatory
            var memoField = form.getField({ id: 'memo' });
            if (memoField) {
                memoField.isMandatory = true;
            }

            log.debug('beforeLoad', 'Type: ' + context.type);

        } catch (e) {
            log.error('beforeLoad Error', e.message);
        }
    }

    /**
     * beforeSubmit - Executes before the record is saved to the database
     * Use for: Validation, setting calculated fields, preventing save
     * 
     * @param {Object} context
     * @param {Record} context.newRecord - The new record being submitted
     * @param {Record} context.oldRecord - The old record (for edit/delete)
     * @param {string} context.type - The trigger type
     */
    function beforeSubmit(context) {
        try {
            // Skip for view or delete operations
            if (context.type === context.UserEventType.VIEW || 
                context.type === context.UserEventType.DELETE) {
                return;
            }

            var newRecord = context.newRecord;

            // Example: Validation - check required custom field
            var customField = newRecord.getValue({ fieldId: 'custbody_custom_field' });
            if (!customField) {
                throw error.create({
                    name: 'VALIDATION_ERROR',
                    message: 'Custom field is required.',
                    notifyOff: false
                });
            }

            // Example: Set a calculated field
            var quantity = newRecord.getValue({ fieldId: 'quantity' }) || 0;
            var rate = newRecord.getValue({ fieldId: 'rate' }) || 0;
            newRecord.setValue({
                fieldId: 'custbody_calculated_total',
                value: quantity * rate
            });

            // Example: Compare old vs new values (on edit)
            if (context.type === context.UserEventType.EDIT) {
                var oldRecord = context.oldRecord;
                var oldStatus = oldRecord.getValue({ fieldId: 'status' });
                var newStatus = newRecord.getValue({ fieldId: 'status' });

                if (oldStatus !== newStatus) {
                    log.audit('Status Changed', 'From: ' + oldStatus + ' To: ' + newStatus);
                }
            }

            log.debug('beforeSubmit', 'Record validated successfully');

        } catch (e) {
            log.error('beforeSubmit Error', e.message);
            throw e; // Re-throw to prevent save
        }
    }

    /**
     * afterSubmit - Executes after the record is saved to the database
     * Use for: Creating related records, sending notifications, external integrations
     * 
     * @param {Object} context
     * @param {Record} context.newRecord - The newly saved record
     * @param {Record} context.oldRecord - The old record (for edit/delete)
     * @param {string} context.type - The trigger type
     */
    function afterSubmit(context) {
        try {
            // Only execute on create or edit
            if (context.type !== context.UserEventType.CREATE && 
                context.type !== context.UserEventType.EDIT) {
                return;
            }

            var newRecord = context.newRecord;
            var recordId = newRecord.id;
            var recordType = newRecord.type;

            // Example: Create a follow-up task on new customer
            if (context.type === context.UserEventType.CREATE) {
                var salesRep = newRecord.getValue({ fieldId: 'salesrep' });
                
                if (salesRep) {
                    var taskRecord = record.create({
                        type: record.Type.TASK,
                        isDynamic: true
                    });
                    
                    taskRecord.setValue({ fieldId: 'title', value: 'Follow up with new record' });
                    taskRecord.setValue({ fieldId: 'assigned', value: salesRep });
                    taskRecord.setValue({ fieldId: 'company', value: recordId });
                    
                    var taskId = taskRecord.save();
                    log.audit('Task Created', 'Task ID: ' + taskId);
                }
            }

            // Example: Send email notification on edit
            if (context.type === context.UserEventType.EDIT) {
                var currentUser = runtime.getCurrentUser();
                
                email.send({
                    author: currentUser.id,
                    recipients: ['admin@company.com'],
                    subject: 'Record Updated: ' + recordId,
                    body: 'Record ' + recordType + ' #' + recordId + ' was updated by ' + currentUser.name
                });
            }

            log.debug('afterSubmit', 'Record ID: ' + recordId);

        } catch (e) {
            log.error('afterSubmit Error', e.message);
            // Don't throw - record is already saved
        }
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
});
