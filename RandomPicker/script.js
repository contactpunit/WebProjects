class RandomPicker {
    constructor() {
        this.textEl = document.querySelector('#textarea');
        this.tagEl = document.querySelector('#tags');
        this.elems = [];
        this.textEl.addEventListener('keyup', this.populateTags.bind(this));
    }

    populateTags(event) {
        if (event.key === 'Enter') {
            const allTags = event.target.value.split(',');
            allTags.forEach(element => {
                if (element.trim()) {
                    const t = document.createElement('span');
                    t.classList.add('tag');
                    t.textContent = element;
                    this.tagEl.appendChild(t)
                    this.elems.push(t)
                }
            })
            this.chooseRandomEl(this.elems)
        }
    }

    chooseRandomEl(allTags) {
        //choose Random element
        //add highlight class to element
        // set Timeout to remove after 200ms
        const highlight = setInterval(() => {
            const r = allTags[Math.floor(Math.random() * allTags.length)];
            r.classList.add('highlight')
            setTimeout(() => { r.classList.remove('highlight') }, 100)
        }, 200)

        setTimeout(() => {
            // remove setInterval highlight
            // choose one element and highlight it
            clearInterval(highlight);
            const elem = allTags[Math.floor(Math.random() * allTags.length)];
            elem.classList.add('highlight')
        }, 3000)
    }
}

new RandomPicker()