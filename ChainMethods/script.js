var methods = (function () {
    var DomTasks = function (item) {
        this.items = document.querySelectorAll(item);
    };

    DomTasks.prototype.getArrayOfItems = function () {
        return Array.prototype.slice.call(this.items);
    }

    DomTasks.prototype.getFirst = function () {
        return this.items[0];
    }

    DomTasks.prototype.getLast = function () {
        return this.items[this.items.length - 1]
    }

    DomTasks.prototype.addClass = function (className) {
        this.items.forEach(elem => {
            elem.classList.add(className);
        });
        return this;
    }

    DomTasks.prototype.removeClass = function (className) {
        this.items.forEach(elem => {
            elem.classList.remove(className);
        });
        return this;
    }

    return DomTasks;
})()

const domMethods = new methods('li');
console.log(domMethods.addClass('btn-purple').removeClass('btn-purple').addClass('btn-red'))
