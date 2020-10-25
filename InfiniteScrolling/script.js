class InfiniteScroll {
    constructor() {
        this.postContainer = document.querySelector('#post-container');
        this.loader = document.querySelector('.loader');
        this.filter = document.querySelector('#filter');
        this.limit = 5;
        this.pageNumber = 1;
        this.url = `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.pageNumber}`
        window.addEventListener('scroll', this.fetchNewPosts.bind(this));
        this.filter.addEventListener('input', this.filterPosts.bind(this));
    }

    filterPosts(event) {
        const typedTerm = event.target.value.toLowerCase();
        const currentPosts = document.querySelectorAll('.post');
        currentPosts.forEach(post => {
            const title = post.querySelector('.post-title').innerText.toLowerCase();
            const body = post.querySelector('.post-body').innerText;
            if (title.indexOf(typedTerm) > -1 || body.indexOf(typedTerm) > -1) {
                post.style.display = 'flex';
            }
            else {
                post.style.display = 'none';
            }
        })
    }

    fetchNewPosts() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            this.loader.classList.add('show');
            this.pageNumber += 1;
            this.url = `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.pageNumber}`;
            this.scroll();
            this.loader.classList.remove('show');
        }
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

    async scroll() {
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
i.scroll()