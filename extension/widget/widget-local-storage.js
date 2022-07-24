const defaultConfigKey = 'defaultConfigName';

export class WidgetLocalStorage {

    static getDefaultConfigName() {
        return localStorage.getItem(defaultConfigKey);
    }

    static setDefaultConfigName(name) {
        localStorage.setItem(defaultConfigKey, name);
    }

}
