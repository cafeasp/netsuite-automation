/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 * @description Loads saved search 1234, gets first name, sends email for each result
 */
define(['N/search', 'N/email', 'N/runtime'],
    (search, email, runtime) => {
        function getInputData(context) {
            return search.load({ id: 1234 });
        }

        function map(context) {
            var result = JSON.parse(context.value);
            var firstName = result.values[Object.keys(result.values)[0]];
            var currentUser = runtime.getCurrentUser();
            email.send({
                author: currentUser.id,
                recipients: currentUser.email,
                subject: 'First Name from Search',
                body: 'First Name: ' + firstName
            });
        }

        return {
            getInputData: getInputData,
            map: map
        };
    });
