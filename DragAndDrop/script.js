class DragDrop {
    constructor() {
        this.draggableList = document.querySelector('.draggable-list');
        this.checkBtn = document.querySelector('.check-btn');
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

        this.randomPersons = this.shuffle([...this.richPersons]);
        this.render();
        this.draggables = document.querySelectorAll('.draggable');
        this.dragListItemEl = document.querySelectorAll('.draggable-list li');
        this.draggables.forEach(element => {
            element.addEventListener('dragstart', this.dragStart);
        })
        this.dragListItemEl.forEach(item => {
            item.addEventListener('dragover', this.dragOver);
            item.addEventListener('drop', this.drop);
            item.addEventListener('dragenter', this.dragEnter);
            item.addEventListener('dragleave', this.dragLeave);
        })
    }

    dragStart() {
        console.log('drag started');
    }

    dragOver() {
        console.log('drag over');
    }

    dragEnter() {
        console.log('drag enter');
    }

    dragLeave() {
        console.log('drag leave');
    }

    drop() {
        console.log('drag drop');
    }

    shuffle(randomPersons) {
        var currentIndex = randomPersons.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = randomPersons[currentIndex];
            randomPersons[currentIndex] = randomPersons[randomIndex];
            randomPersons[randomIndex] = temporaryValue;
        }
        return randomPersons;
    }

    render() {
        this.randomPersons.forEach((person, index) => {
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
        });
    }
}

const c = new DragDrop()
// c.render();