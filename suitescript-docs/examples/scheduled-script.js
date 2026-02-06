/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 * 
 * Scheduled Script Template
 * 
 * Runs on a schedule or on-demand. Best for batch processing tasks.
 * For large datasets, consider using Map/Reduce scripts instead.
 * 
 * Governance: 10,000 usage units per execution
 */
define(['N/search', 'N/record', 'N/email', 'N/runtime', 'N/file'],
function(search, record, email, runtime, file) {

    /**
     * Main entry point
     * 
     * @param {Object} context
     * @param {string} context.type - Invocation type (SCHEDULED, ON_DEMAND, USER_INTERFACE, ABORTED, SKIPPED)
     */
    function execute(context) {
        try {
            log.audit('Script Started', 'Invocation Type: ' + context.type);

            var script = runtime.getCurrentScript();
            
            // Get script parameters
            var searchId = script.getParameter({ name: 'custscript_search_id' });
            var emailRecipient = script.getParameter({ name: 'custscript_email_recipient' });

            if (!searchId) {
                log.error('Missing Parameter', 'Search ID is required');
                return;
            }

            // Track processing statistics
            var processedCount = 0;
            var errorCount = 0;
            var errors = [];

            // Load and run the saved search
            var mySearch = search.load({ id: searchId });
            
            mySearch.run().each(function(result) {
                // Check remaining governance
                var remainingUsage = script.getRemainingUsage();
                if (remainingUsage < 200) {
                    log.audit('Governance Warning', 'Stopping due to low governance: ' + remainingUsage);
                    return false; // Stop iteration
                }

                try {
                    // Process each result
                    var recordId = result.id;
                    var recordType = result.recordType;

                    // Example: Update each record
                    record.submitFields({
                        type: recordType,
                        id: recordId,
                        values: {
                            custbody_processed_date: new Date(),
                            custbody_processed_by: 'Scheduled Script'
                        }
                    });

                    processedCount++;
                    log.debug('Processed', 'Record ID: ' + recordId);

                } catch (recordError) {
                    errorCount++;
                    errors.push({
                        id: result.id,
                        error: recordError.message
                    });
                    log.error('Record Error', 'ID: ' + result.id + ' - ' + recordError.message);
                }

                return true; // Continue iteration
            });

            // Log summary
            log.audit('Script Completed', {
                processed: processedCount,
                errors: errorCount,
                remainingUsage: script.getRemainingUsage()
            });

            // Send summary email if configured
            if (emailRecipient && (processedCount > 0 || errorCount > 0)) {
                sendSummaryEmail(emailRecipient, processedCount, errorCount, errors);
            }

        } catch (e) {
            log.error('Script Error', e.message);
            throw e;
        }
    }

    /**
     * Send summary email
     */
    function sendSummaryEmail(recipient, processed, errors, errorDetails) {
        var body = '<h2>Scheduled Script Summary</h2>';
        body += '<p>Records Processed: ' + processed + '</p>';
        body += '<p>Errors: ' + errors + '</p>';

        if (errorDetails.length > 0) {
            body += '<h3>Error Details:</h3><ul>';
            errorDetails.forEach(function(err) {
                body += '<li>ID: ' + err.id + ' - ' + err.error + '</li>';
            });
            body += '</ul>';
        }

        email.send({
            author: runtime.getCurrentUser().id,
            recipients: [recipient],
            subject: 'Scheduled Script Completed',
            body: body
        });
    }

    return {
        execute: execute
    };
});
