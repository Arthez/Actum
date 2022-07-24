const BASE_ACTIONS = {
    wait: () => true,

    open: () => true,

    fill: (actionConfig) => {
        const fn = (actionConfig, htmlElement) => {
            htmlElement.value = actionConfig.value;
            htmlElement.dispatchEvent(new Event('change', { bubbles: true }));
            htmlElement.dispatchEvent(new Event('input', { bubbles: true }));
        };
        return ActionEngine.executeFunctionOnElement(actionConfig, fn);
    },

    fillInnerHtml: (actionConfig) => {
        const fn = (actionConfig, htmlElement) => {
            htmlElement.innerHTML = actionConfig.value;
            htmlElement.dispatchEvent(new Event('change', { bubbles: true }));
            htmlElement.dispatchEvent(new Event('input', { bubbles: true }));
        };
        return ActionEngine.executeFunctionOnElement(actionConfig, fn);
    },

    click: (actionConfig) => {
        const fn = (actionConfig, htmlElement) => {
            htmlElement.click();
        };
        return ActionEngine.executeFunctionOnElement(actionConfig, fn);
    },
};
