class InfiniteScroll {
    constructor() {
        this.postContainer = document.querySelector('#post-container');
        this.loader = document.querySelector('.loader');
        this.filter = document.querySelector('#filter');
        this.limit = 3;
        this.pageNumber = 1;
        this.url = `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.pageNumber}`
    }

    async getPosts() {
        try {
            const response = await fetch(this.url);
            const data = await response.json()
            return data;
        }
        catch (error) {
            console.log('error is :' + error)
        }
    }

    async run() {
        const results = await this.getPosts();
        if (results) {
            results.forEach(element => {
                const elem = document.createElement('div');
                elem.classList.add('post');
                elem.innerHTML = `
                    <div class="number">${element.id}</div>
                    <div class="post-info">
                    <h2 class="post-title">${element.title}</h2>
                    <p class="post-body">${element.body}<p>
                    `;
                this.postContainer.appendChild(elem)
            });
        }
    }
}

const i = new InfiniteScroll();
i.run()