class EventBus {

    static initReceiver(handler) {
        EventBus.getBrowserObj().runtime.onMessage.addListener(
            (request, sender, sendResponse) => {
                if (handler) {
                    handler(request.content, sendResponse);
                }
                return true;
            });
    }

    static sendEvent(content, callback) {
        EventBus.getBrowserObj().tabs.query({active: true, currentWindow: true}, (tabs) => {
            EventBus.getBrowserObj().tabs.sendMessage(tabs[0].id, {content: content}, callback);
        });
    }

    static getBrowserObj() {
        return window.browser || window.chrome;
    }

}
