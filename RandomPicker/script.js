class RandomPicker {
    constructor() {
        this.textEl = document.querySelector('#textarea');
        this.tagEl = document.querySelector('#tags');
        this.textEl.addEventListener('keyup', this.populateTags.bind(this));
    }

    populateTags(event) {
        const allTags = event.target.value.split(',');
        const tags = allTags.map(element => {
            if (element.trim()) {
                return `<span class="tag">${element}</span>`
            }
        }).join('')
        this.tagEl.innerHTML = tags;
    }
}

new RandomPicker()