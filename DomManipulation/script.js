var methods = (function () {
    var DomTasks = function (item) {
        this.item = item;
    };

    DomTasks.prototype.getArrayOfItems = function () {
        const items = document.querySelectorAll(this.item);
        return Array.prototype.slice.call(items);
    }

    DomTasks.prototype.getFirst = function () {
        const first = document.querySelector(this.item);
        return first;
    }

    DomTasks.prototype.getLast = function () {
        const last = Array.prototype.slice.call(this.getArrayOfItems(this.item))[this.getArrayOfItems(this.item).length - 1]
    }

    DomTasks.prototype.addClass = function (className) {
        const elems = this.getArrayOfItems(this.item);
        elems.forEach(elem => {
            elem.classList.add(className)
        });
    }

    DomTasks.prototype.removeClass = function (className) {
        const elems = this.getArrayOfItems(this.item);
        elems.forEach(elem => {
            elem.classList.remove(className)
        });
    }

    return DomTasks;
})()

const domMethods = new methods('.btn-blue');
console.log(domMethods.addClass('btn-purple'))
