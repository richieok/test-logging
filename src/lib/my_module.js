// Singleton module
export const mySingleton = (function () {
    let instance; // Private variable to hold the single instance

    function init() {
        // Private method
        let myVariable = 'Initialized';

        function getVariable() {
            return myVariable;
        }

        function setVariable(newValue) {
            myVariable = newValue;
        }

        return {
            getVariable,
            setVariable
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

