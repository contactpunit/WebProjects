const helper = (function () {
    const methods = {};

    methods.nodeListToArray = nodelist => {
        return Array.prototype.slice.call(nodelist);
    }
    methods.findFirstElement = (element) => document.querySelector(element)
    methods.findAllElements = (element) => Array.prototype.slice.call(document.querySelectorAll(element))
    methods.addClass = (className, elements) => {
        elements.forEach(element => {
            element.classList.add(className);
        });
    }
    methods.removeClass = (className, elements) => {
        elements.forEach(element => {
            element.classList.remove(className);
        });
    }

    return methods;
})();

helper.findAllElements('button')
const bs = document.querySelectorAll('button')

helper.removeClass('btn-blue', Array.prototype.slice.call(bs))
helper.addClass('btn-blue', Array.prototype.slice.call(bs))