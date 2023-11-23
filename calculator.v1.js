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
    currentValues: {
        first: null,
        second: null,
    },
};

const clearAll = () => {
    state.currentDisplayValue = 0;
    state.currentOperation = null;
    state.currentValues = { first: null, second: null };

    $result.value = 0;
}

const clearLast = () => {
    state.currentOperation = null;
    state.currentValues = { first: null, second: null };
}

const calculateResult = () => {
    state.currentDisplayValue = OPERATIONS_FN_MAP[state.currentOperation](state.currentValues.first, state.currentValues.second);

    clearLast();
    
    $result.value = state.currentDisplayValue;
};

const renderDisplay = () => {
    if (state.currentOperation === null) {
        $result.value = state.currentValues.first;
    } else if (state.currentOperation !== null) {
        $result.value = state.currentValues.second;
    }
}

$operations.forEach($operation => {
    $operation.addEventListener("click", (e) => {
        const { operation } = e.target.dataset;
        
        if (operation !== "EQUAL" && operation !== "CLEAR_ALL") {
            if (state.currentValues.first !== null) state.currentOperation = operation;
        } else if (operation !== "EQUAL" && operation === "CLEAR_ALL") {
            clearAll();
        } else if (operation === "EQUAL" && operation !== "CLEAR_ALL") {
            if (state.currentValues.first !== null && state.currentValues.second !== null && state.currentOperation !== null) calculateResult();
        }
    });
});

$values.forEach($value => {
    $value.addEventListener("click", (e) => {
        const { value } = e.target.dataset;
    
        if (state.currentOperation === null) {
            state.currentValues.first !== null ? state.currentValues.first += value : state.currentValues.first = value;
        } else {
            state.currentValues.second !== null ? state.currentValues.second += value : state.currentValues.second = value;
        } 

        renderDisplay();
    });
});