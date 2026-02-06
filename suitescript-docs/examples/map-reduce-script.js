/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 * 
 * Map/Reduce Script Template
 * 
 * Designed for processing large datasets with parallel execution.
 * Stages: getInputData -> map -> shuffle (automatic) -> reduce -> summarize
 * 
 * Governance: 10,000 units per stage, automatic yielding
 */
define(['N/search', 'N/record', 'N/email', 'N/runtime', 'N/error'],
function(search, record, email, runtime, error) {

    /**
     * getInputData - Defines the data to be processed
     * Return: Search, array, or object with key-value pairs
     */
    function getInputData() {
        try {
            log.audit('getInputData', 'Starting data retrieval');

            // Option 1: Return a saved search
            return search.load({
                id: 'customsearch_items_to_process'
            });

            // Option 2: Create a search
            /*
            return search.create({
                type: search.Type.SALES_ORDER,
                filters: [
                    ['mainline', 'is', 'T'],
                    'AND',
                    ['status', 'anyof', 'SalesOrd:B']  // Pending Fulfillment
                ],
                columns: ['tranid', 'entity', 'total']
            });
            */

            // Option 3: Return an array
            /*
            return [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' }
            ];
            */

            // Option 4: Return an object (key-value pairs)
            /*
            return {
                'key1': { data: 'value1' },
                'key2': { data: 'value2' }
            };
            */

        } catch (e) {
            log.error('getInputData Error', e.message);
            throw e;
        }
    }

    /**
     * map - Process each input item individually
     * 
     * @param {Object} context
     * @param {string} context.key - The key (record ID for searches)
     * @param {string} context.value - The value (JSON string of search result)
     */
    function map(context) {
        try {
            var key = context.key;
            var value = JSON.parse(context.value);

            log.debug('map', 'Processing key: ' + key);

            // Example: Extract data from search result
            var recordId = value.id;
            var recordType = value.recordType;

            // Do some processing
            var customerGroup = getCustomerGroup(value);

            // Write output for reduce stage
            // Key determines which reduce function processes this data
            context.write({
                key: customerGroup,  // Group by customer category
                value: {
                    recordId: recordId,
                    recordType: recordType,
                    amount: value.values.total || 0
                }
            });

        } catch (e) {
            log.error('map Error', 'Key: ' + context.key + ' - ' + e.message);
            // Don't throw - allow other records to process
        }
    }

    /**
     * reduce - Process grouped data (by key from map stage)
     * 
     * @param {Object} context
     * @param {string} context.key - The group key
     * @param {string[]} context.values - Array of values for this key
     */
    function reduce(context) {
        try {
            var key = context.key;
            var values = context.values;

            log.debug('reduce', 'Processing group: ' + key + ' with ' + values.length + ' items');

            var totalAmount = 0;
            var processedRecords = [];

            values.forEach(function(valueStr) {
                var value = JSON.parse(valueStr);
                totalAmount += parseFloat(value.amount) || 0;
                processedRecords.push(value.recordId);

                // Example: Update each record
                try {
                    record.submitFields({
                        type: value.recordType,
                        id: value.recordId,
                        values: {
                            custbody_processed: true,
                            custbody_processed_date: new Date()
                        }
                    });
                } catch (updateError) {
                    log.error('Update Error', 'Record: ' + value.recordId + ' - ' + updateError.message);
                }
            });

            // Write summary for this group
            context.write({
                key: key,
                value: {
                    count: values.length,
                    totalAmount: totalAmount,
                    records: processedRecords
                }
            });

        } catch (e) {
            log.error('reduce Error', 'Key: ' + context.key + ' - ' + e.message);
        }
    }

    /**
     * summarize - Executes after all processing is complete
     * 
     * @param {Object} summary
     * @param {number} summary.seconds - Total execution time
     * @param {number} summary.usage - Total governance used
     * @param {number} summary.yields - Number of yields
     * @param {Iterator} summary.inputSummary - Input stage errors
     * @param {Iterator} summary.mapSummary - Map stage summary
     * @param {Iterator} summary.reduceSummary - Reduce stage summary
     * @param {Iterator} summary.output - Final output iterator
     */
    function summarize(summary) {
        try {
            log.audit('summarize', 'Script completed');
            log.audit('Statistics', {
                duration: summary.seconds + ' seconds',
                usage: summary.usage + ' units',
                yields: summary.yields
            });

            // Log any input errors
            if (summary.inputSummary.error) {
                log.error('Input Error', summary.inputSummary.error);
            }

            // Log map stage errors
            var mapErrors = [];
            summary.mapSummary.errors.iterator().each(function(key, error) {
                mapErrors.push({ key: key, error: error });
                return true;
            });
            if (mapErrors.length > 0) {
                log.error('Map Errors', JSON.stringify(mapErrors));
            }

            // Log reduce stage errors
            var reduceErrors = [];
            summary.reduceSummary.errors.iterator().each(function(key, error) {
                reduceErrors.push({ key: key, error: error });
                return true;
            });
            if (reduceErrors.length > 0) {
                log.error('Reduce Errors', JSON.stringify(reduceErrors));
            }

            // Process output
            var outputSummary = [];
            summary.output.iterator().each(function(key, value) {
                var data = JSON.parse(value);
                outputSummary.push({
                    group: key,
                    count: data.count,
                    total: data.totalAmount
                });
                return true;
            });

            log.audit('Processing Summary', JSON.stringify(outputSummary));

            // Send completion email
            sendSummaryEmail(summary, outputSummary, mapErrors, reduceErrors);

        } catch (e) {
            log.error('summarize Error', e.message);
        }
    }

    // Helper Functions

    function getCustomerGroup(searchResult) {
        // Example: Categorize by amount
        var amount = parseFloat(searchResult.values.total) || 0;
        if (amount > 10000) return 'large';
        if (amount > 1000) return 'medium';
        return 'small';
    }

    function sendSummaryEmail(summary, outputSummary, mapErrors, reduceErrors) {
        var script = runtime.getCurrentScript();
        var recipientParam = script.getParameter({ name: 'custscript_email_recipient' });

        if (!recipientParam) return;

        var body = '<h2>Map/Reduce Script Summary</h2>';
        body += '<p><strong>Duration:</strong> ' + summary.seconds + ' seconds</p>';
        body += '<p><strong>Usage:</strong> ' + summary.usage + ' units</p>';
        body += '<p><strong>Yields:</strong> ' + summary.yields + '</p>';

        if (outputSummary.length > 0) {
            body += '<h3>Results by Group:</h3><ul>';
            outputSummary.forEach(function(group) {
                body += '<li>' + group.group + ': ' + group.count + ' records, $' + group.total.toFixed(2) + '</li>';
            });
            body += '</ul>';
        }

        if (mapErrors.length > 0 || reduceErrors.length > 0) {
            body += '<h3>Errors:</h3>';
            body += '<p>Map Errors: ' + mapErrors.length + '</p>';
            body += '<p>Reduce Errors: ' + reduceErrors.length + '</p>';
        }

        email.send({
            author: runtime.getCurrentUser().id,
            recipients: [recipientParam],
            subject: 'Map/Reduce Script Completed',
            body: body
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
