class $ {

    static id(id) {
        return document.getElementById(id);
    }

    static class(className) {
        return document.getElementsByClassName(className);
    }

    static name(name) {
        return document.getElementsByName(name);
    }

    static tag(tag) {
        return document.getElementsByTagName(tag);
    }

    static getElement(element) {
        if (typeof element === 'string') {
            return $.id(element);
        }
        return element;
    }

    static render(element, template) {
        $.getElement(element).innerHTML = template;
    }

    static clear(element) {
        $.getElement(element).innerHTML = '';
    }

    static hide(element) {
        $.getElement(element).classList.add('hide');
    }

    static show(element) {
        $.getElement(element).classList.remove('hide');
    }

}
