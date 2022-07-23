const ALL_ACTIONS = { ...BASE_ACTIONS, ...CUSTOM_ACTIONS };

class ActionEngine {

    static run(payload, sendResponse) {
        const { scenario } = payload;
        if (scenario && scenario.actions && scenario.actions.length) {
            ActionEngine.executeAction(payload, sendResponse, 0);
        } else {
            sendResponse({ error: 'Error: There was nothing to execute!' });
        }
    }

    static executeAction(payload, sendResponse) {
        const action = payload.scenario.actions[payload.actionIndex];
        const method = ALL_ACTIONS[action.type];

        if (!action || !action.type) {
            sendResponse({ error: `Error: incorrect action!` });
            return;
        }
        if (!method) {
            sendResponse({ error: `Error: Method "${action.type}" is not implemented!` });
            return;
        }
        const isPromise = (p) => p !== null &&
            typeof p === 'object' &&
            typeof p.then === 'function' &&
            typeof p.catch === 'function';
        const handleMethodResponse = (executionResponse) => {
            if (executionResponse === true) {
                sendResponse(payload);
            } else {
                const errorDetails = executionResponse.errorMsg ? ` ${executionResponse.errorMsg};` : '';
                sendResponse({ error: `Error: action "${payload.scenario.title}" step ${payload.actionIndex + 1} (${action.type});${errorDetails}` });
            }
        }

        const executionResponse = method(action.config);
        if (isPromise(executionResponse)) {
            executionResponse.then(response => {
                handleMethodResponse(response);
            });
        } else {
            handleMethodResponse(executionResponse);
        }
    }

    static executeFunctionOnElement(actionConfig, fn) {
        const htmlElement = document.querySelector(actionConfig.selector);

        if (htmlElement) {
            fn(actionConfig, htmlElement);
            return true;
        }
        return actionConfig.optional || { errorMsg: `could not find HTML element with selector "${actionConfig.selector}"` };
    }

}

EventBus.initReceiver(ActionEngine.run);
