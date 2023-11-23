const $result = document.querySelector ('#result');
const $operations = document.querySelectorAll ('.operation');
const $values = document.querySelectorAll ('.values');

const OPERATIONS_FN_MAP = {
    PLUS: (value1, value2) => Number (value1) + Number (value2),
    MINUS: (value1, value2) => Number (value1) - Number (value2),
    MULTIPLY: (value1, value2) => Number (value1) * Number (value2),
    DIVIDE: (value1, value2) => Number (value1) / Number (value2),
};

const state = {
    currentDisplayValue: 0,
    currentOperation: null,
    currentOperationHistory: [],
    lastResult: 0,
};

const clearAll = () => {
    state.currentDisplayValue = 0;
    state.currentOperation = null;
    state.currentOperationHistory = []; // ["2", "PLUS", "3", "MINUS", "1", "DIVIDE", "4"]

    $result.value = 0;
}

const clearLast = () => {
    state.currentOperation = null;
    state.currentOperationHistory = [];
}

const renderDisplay = () => {
    if (state.currentDisplayValue !== 0 && isNaN(state.currentOperationHistory.at(-1))) $result.value = state.currentDisplayValue;
    else $result.value = state.currentOperationHistory.at(-1);
}

const calculateResult = () => {
    state.currentOperationHistory.forEach((operation) => {
        if (!isNaN(operation) && state.currentOperation === null) {
            state.currentDisplayValue = operation;
        } else if (isNaN(operation)) {
            state.currentOperation = operation;
        } else if (!isNaN(operation) && state.currentOperation !== null) {
            state.currentDisplayValue = OPERATIONS_FN_MAP[state.currentOperation](state.currentDisplayValue, operation);
        }
    });

    clearLast();
    renderDisplay();
    
    $result.value = state.currentDisplayValue;
};

$operations.forEach($operation => {
    $operation.addEventListener("click", (e) => {
        const { operation } = e.target.dataset;
        
        if (operation !== "EQUAL" && operation !== "CLEAR_ALL") {
            state.currentOperationHistory.push(operation);
        } else if (operation !== "EQUAL" && operation === "CLEAR_ALL") {
            clearAll();
        } else if (operation === "EQUAL" && operation !== "CLEAR_ALL") {
            calculateResult();
            renderDisplay();
        }
    });
});

$values.forEach($value => {
    $value.addEventListener("click", (e) => {
        const { value } = e.target.dataset;
    
        if (state.currentOperationHistory.length > 0 && (!isNaN(state.currentOperationHistory.at(-1)) || state.currentOperationHistory.at(-1).indexOf(".") !== -1)) {
            state.currentOperationHistory.at(-1) += value;
        } else {
            state.currentOperationHistory.push(value);
        }

        renderDisplay();
    });
});