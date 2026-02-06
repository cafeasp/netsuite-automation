/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 * 
 * Suitelet Script Template
 * 
 * Creates custom NetSuite pages and handles form submissions.
 * Use for: Custom UIs, reports, data entry forms, integration endpoints.
 * 
 * Governance: 1,000 usage units per request
 */
define(['N/ui/serverWidget', 'N/search', 'N/record', 'N/redirect', 'N/runtime', 'N/url'],
function(serverWidget, search, record, redirect, runtime, url) {

    /**
     * Main entry point - handles both GET and POST
     * 
     * @param {Object} context
     * @param {ServerRequest} context.request
     * @param {ServerResponse} context.response
     */
    function onRequest(context) {
        if (context.request.method === 'GET') {
            showForm(context);
        } else {
            processForm(context);
        }
    }

    /**
     * Display the form (GET request)
     */
    function showForm(context) {
        try {
            // Create the form
            var form = serverWidget.createForm({
                title: 'Customer Lookup'
            });

            // Add client script for UI interactions
            form.clientScriptModulePath = 'SuiteScripts/client_suitelet.js';

            // Add field group
            form.addFieldGroup({
                id: 'custpage_filters',
                label: 'Search Filters'
            });

            // Add filter fields
            var customerField = form.addField({
                id: 'custpage_customer',
                type: serverWidget.FieldType.SELECT,
                label: 'Customer',
                source: 'customer',
                container: 'custpage_filters'
            });

            var dateFromField = form.addField({
                id: 'custpage_date_from',
                type: serverWidget.FieldType.DATE,
                label: 'Date From',
                container: 'custpage_filters'
            });

            var dateToField = form.addField({
                id: 'custpage_date_to',
                type: serverWidget.FieldType.DATE,
                label: 'Date To',
                container: 'custpage_filters'
            });

            // Add buttons
            form.addSubmitButton({
                label: 'Search'
            });

            form.addResetButton({
                label: 'Clear'
            });

            form.addButton({
                id: 'custpage_export',
                label: 'Export to CSV',
                functionName: 'exportResults'
            });

            // Check if this is a search result display
            var customerId = context.request.parameters.custpage_customer;
            if (customerId) {
                addResultsSublist(form, customerId, context.request.parameters);
            }

            context.response.writePage(form);

        } catch (e) {
            log.error('showForm Error', e.message);
            context.response.write('Error: ' + e.message);
        }
    }

    /**
     * Process form submission (POST request)
     */
    function processForm(context) {
        try {
            var customerId = context.request.parameters.custpage_customer;
            var dateFrom = context.request.parameters.custpage_date_from;
            var dateTo = context.request.parameters.custpage_date_to;

            // Validate input
            if (!customerId) {
                // Redirect back with error message
                redirect.toSuitelet({
                    scriptId: runtime.getCurrentScript().id,
                    deploymentId: runtime.getCurrentScript().deploymentId,
                    parameters: {
                        error: 'Please select a customer'
                    }
                });
                return;
            }

            // Redirect back to GET with search parameters
            redirect.toSuitelet({
                scriptId: runtime.getCurrentScript().id,
                deploymentId: runtime.getCurrentScript().deploymentId,
                parameters: {
                    custpage_customer: customerId,
                    custpage_date_from: dateFrom,
                    custpage_date_to: dateTo
                }
            });

        } catch (e) {
            log.error('processForm Error', e.message);
        }
    }

    /**
     * Add results sublist to the form
     */
    function addResultsSublist(form, customerId, params) {
        // Create sublist for results
        var sublist = form.addSublist({
            id: 'custpage_results',
            type: serverWidget.SublistType.LIST,
            label: 'Transaction Results'
        });

        // Add columns
        sublist.addField({
            id: 'custpage_tranid',
            type: serverWidget.FieldType.TEXT,
            label: 'Transaction #'
        });

        sublist.addField({
            id: 'custpage_date',
            type: serverWidget.FieldType.DATE,
            label: 'Date'
        });

        sublist.addField({
            id: 'custpage_type',
            type: serverWidget.FieldType.TEXT,
            label: 'Type'
        });

        sublist.addField({
            id: 'custpage_amount',
            type: serverWidget.FieldType.CURRENCY,
            label: 'Amount'
        });

        sublist.addField({
            id: 'custpage_status',
            type: serverWidget.FieldType.TEXT,
            label: 'Status'
        });

        // Build and run search
        var filters = [
            ['mainline', 'is', 'T'],
            'AND',
            ['entity', 'anyof', customerId]
        ];

        if (params.custpage_date_from) {
            filters.push('AND');
            filters.push(['trandate', 'onorafter', params.custpage_date_from]);
        }

        if (params.custpage_date_to) {
            filters.push('AND');
            filters.push(['trandate', 'onorbefore', params.custpage_date_to]);
        }

        var transactionSearch = search.create({
            type: search.Type.TRANSACTION,
            filters: filters,
            columns: [
                search.createColumn({ name: 'tranid' }),
                search.createColumn({ name: 'trandate', sort: search.Sort.DESC }),
                search.createColumn({ name: 'type' }),
                search.createColumn({ name: 'amount' }),
                search.createColumn({ name: 'status' })
            ]
        });

        var lineNum = 0;
        transactionSearch.run().each(function(result) {
            sublist.setSublistValue({
                id: 'custpage_tranid',
                line: lineNum,
                value: result.getValue('tranid') || ''
            });

            sublist.setSublistValue({
                id: 'custpage_date',
                line: lineNum,
                value: result.getValue('trandate') || ''
            });

            sublist.setSublistValue({
                id: 'custpage_type',
                line: lineNum,
                value: result.getText('type') || ''
            });

            sublist.setSublistValue({
                id: 'custpage_amount',
                line: lineNum,
                value: result.getValue('amount') || '0'
            });

            sublist.setSublistValue({
                id: 'custpage_status',
                line: lineNum,
                value: result.getText('status') || ''
            });

            lineNum++;
            return lineNum < 100; // Limit to 100 results
        });

        // Add summary field
        var summaryField = form.addField({
            id: 'custpage_summary',
            type: serverWidget.FieldType.INLINEHTML,
            label: ' '
        });
        summaryField.defaultValue = '<p><strong>Total Results: ' + lineNum + '</strong></p>';
    }

    return {
        onRequest: onRequest
    };
});
