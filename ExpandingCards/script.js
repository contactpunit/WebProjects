class Cards {
    constructor() {
        this.allPanels = document.querySelectorAll('.panel');
        this.allPanels.forEach(panel => {
            panel.addEventListener('click', this.manageClassList);
        })
    }

    manageClassList() {
        const activePanel = document.querySelector('.panel.active');
        activePanel.classList.remove('active');
        this.classList.add('active');
    }
}

new Cards();