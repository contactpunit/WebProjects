class DragDrop {
    constructor() {
        this.draggableList = document.querySelector('.draggable-list');
        this.checkBtn = document.querySelector('.check-btn');
        this.randomPersons = [];
        this.richPersons = [
            'Jeff Bezos',
            'Bill Gates',
            'Warren Buffett',
            'Bernard Arnault',
            'Carlos Slim Helu',
            'Amancio Ortega',
            'Larry Ellison',
            'Mark Zuckerberg',
            'Michael Bloomberg',
            'Larry Page'
        ];

        const persons = this.shuffle([...this.richPersons]);
        this.render(persons);
        this.draggables = document.querySelectorAll('.draggable');
        this.dragListItemEl = document.querySelectorAll('.draggable-list li');
        this.draggables.forEach(element => {
            element.addEventListener('dragstart', this.dragStart.bind(element));
        })
        this.dragListItemEl.forEach(item => {
            item.addEventListener('dragover', this.dragOver.bind(item));
            item.addEventListener('drop', this.drop.bind(item, this.randomPersons));
            item.addEventListener('dragenter', this.dragEnter.bind(item));
            item.addEventListener('dragleave', this.dragLeave.bind(item));
        })
        this.checkBtn.addEventListener('click', this.verifyOrderAndRender.bind(this));
    }

    verifyOrderAndRender() {
        this.randomPersons.forEach((person, index) => {
            const personName = person.textContent.trim().split('\n')[2].trim();
            if (personName === this.richPersons[index]) {
                person.classList.remove('wrong');
                person.classList.add('right');
            }
            else {
                person.classList.remove('right');
                person.classList.add('wrong');
            }
        })
    }

    dragStart() {
        DragDrop.startIndex = +this.closest('li').getAttribute('data-index');
    }

    dragOver(e) {
        e.preventDefault();
    }

    dragEnter() {
        this.classList.add('over');
    }

    dragLeave() {
        this.classList.remove('over');
    }

    drop(persons) {
        this.classList.remove('over');
        DragDrop.endIndex = +this.closest('li').getAttribute('data-index');
        const movedItem = persons[DragDrop.startIndex].querySelector('.draggable');
        const replacedItem = persons[DragDrop.endIndex].querySelector('.draggable');
        persons[DragDrop.startIndex].appendChild(replacedItem);
        persons[DragDrop.endIndex].appendChild(movedItem);
    }

    shuffle(persons) {
        var currentIndex = persons.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = persons[currentIndex];
            persons[currentIndex] = persons[randomIndex];
            persons[randomIndex] = temporaryValue;
        }
        return persons;
    }

    render(persons) {
        persons.forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `
            this.draggableList.appendChild(listItem);
            this.randomPersons.push(listItem);
        });
    }
}

new DragDrop()