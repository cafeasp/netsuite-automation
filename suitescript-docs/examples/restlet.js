/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 * 
 * RESTlet Script Template
 * 
 * Creates custom REST endpoints for external integrations.
 * Supports GET, POST, PUT, DELETE methods.
 * 
 * Governance: 5,000 usage units per request
 */
define(['N/record', 'N/search', 'N/error', 'N/format'],
function(record, search, error, format) {

    /**
     * GET - Retrieve record data
     * 
     * @param {Object} requestParams - URL parameters
     * @returns {Object} Response data
     */
    function doGet(requestParams) {
        try {
            log.debug('GET Request', JSON.stringify(requestParams));

            // Validate required parameters
            if (!requestParams.recordType || !requestParams.recordId) {
                throw error.create({
                    name: 'MISSING_PARAMS',
                    message: 'recordType and recordId are required'
                });
            }

            var recordType = requestParams.recordType;
            var recordId = parseInt(requestParams.recordId);

            // Load the record
            var loadedRecord = record.load({
                type: recordType,
                id: recordId
            });

            // Build response object
            var response = {
                success: true,
                data: {
                    id: loadedRecord.id,
                    type: loadedRecord.type,
                    fields: {}
                }
            };

            // Get requested fields or default fields
            var fields = requestParams.fields ? requestParams.fields.split(',') : ['entityid', 'companyname', 'email'];
            
            fields.forEach(function(fieldId) {
                response.data.fields[fieldId] = loadedRecord.getValue({ fieldId: fieldId });
            });

            return response;

        } catch (e) {
            log.error('GET Error', e.message);
            return {
                success: false,
                error: {
                    code: e.name,
                    message: e.message
                }
            };
        }
    }

    /**
     * POST - Create a new record
     * 
     * @param {Object} requestBody - Request body data
     * @returns {Object} Response data
     */
    function doPost(requestBody) {
        try {
            log.debug('POST Request', JSON.stringify(requestBody));

            // Validate required fields
            if (!requestBody.recordType) {
                throw error.create({
                    name: 'MISSING_RECORD_TYPE',
                    message: 'recordType is required'
                });
            }

            // Create the record
            var newRecord = record.create({
                type: requestBody.recordType,
                isDynamic: true
            });

            // Set field values
            if (requestBody.fields) {
                Object.keys(requestBody.fields).forEach(function(fieldId) {
                    try {
                        newRecord.setValue({
                            fieldId: fieldId,
                            value: requestBody.fields[fieldId]
                        });
                    } catch (fieldError) {
                        log.error('Field Error', fieldId + ': ' + fieldError.message);
                    }
                });
            }

            // Handle sublists if provided
            if (requestBody.sublists) {
                Object.keys(requestBody.sublists).forEach(function(sublistId) {
                    var lines = requestBody.sublists[sublistId];
                    
                    lines.forEach(function(line) {
                        newRecord.selectNewLine({ sublistId: sublistId });
                        
                        Object.keys(line).forEach(function(fieldId) {
                            newRecord.setCurrentSublistValue({
                                sublistId: sublistId,
                                fieldId: fieldId,
                                value: line[fieldId]
                            });
                        });
                        
                        newRecord.commitLine({ sublistId: sublistId });
                    });
                });
            }

            // Save the record
            var recordId = newRecord.save({
                enableSourcing: true,
                ignoreMandatoryFields: false
            });

            return {
                success: true,
                data: {
                    id: recordId,
                    type: requestBody.recordType
                }
            };

        } catch (e) {
            log.error('POST Error', e.message);
            return {
                success: false,
                error: {
                    code: e.name,
                    message: e.message
                }
            };
        }
    }

    /**
     * PUT - Update an existing record
     * 
     * @param {Object} requestBody - Request body data
     * @returns {Object} Response data
     */
    function doPut(requestBody) {
        try {
            log.debug('PUT Request', JSON.stringify(requestBody));

            if (!requestBody.recordType || !requestBody.recordId) {
                throw error.create({
                    name: 'MISSING_PARAMS',
                    message: 'recordType and recordId are required'
                });
            }

            // Use submitFields for simple updates
            if (requestBody.fields && !requestBody.sublists) {
                var recordId = record.submitFields({
                    type: requestBody.recordType,
                    id: requestBody.recordId,
                    values: requestBody.fields
                });

                return {
                    success: true,
                    data: { id: recordId }
                };
            }

            // Full record load for complex updates
            var existingRecord = record.load({
                type: requestBody.recordType,
                id: requestBody.recordId,
                isDynamic: true
            });

            // Update fields
            if (requestBody.fields) {
                Object.keys(requestBody.fields).forEach(function(fieldId) {
                    existingRecord.setValue({
                        fieldId: fieldId,
                        value: requestBody.fields[fieldId]
                    });
                });
            }

            var savedId = existingRecord.save();

            return {
                success: true,
                data: { id: savedId }
            };

        } catch (e) {
            log.error('PUT Error', e.message);
            return {
                success: false,
                error: {
                    code: e.name,
                    message: e.message
                }
            };
        }
    }

    /**
     * DELETE - Delete a record
     * 
     * @param {Object} requestParams - URL parameters
     * @returns {Object} Response data
     */
    function doDelete(requestParams) {
        try {
            log.debug('DELETE Request', JSON.stringify(requestParams));

            if (!requestParams.recordType || !requestParams.recordId) {
                throw error.create({
                    name: 'MISSING_PARAMS',
                    message: 'recordType and recordId are required'
                });
            }

            var deletedId = record.delete({
                type: requestParams.recordType,
                id: parseInt(requestParams.recordId)
            });

            return {
                success: true,
                data: {
                    deletedId: deletedId
                }
            };

        } catch (e) {
            log.error('DELETE Error', e.message);
            return {
                success: false,
                error: {
                    code: e.name,
                    message: e.message
                }
            };
        }
    }

    return {
        get: doGet,
        post: doPost,
        put: doPut,
        'delete': doDelete
    };
});
