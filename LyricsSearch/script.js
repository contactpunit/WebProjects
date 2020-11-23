class LyricsSearch {
    static proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    constructor() {
        this.apiUrl = 'https://api.lyrics.ovh/';
        this.url = LyricsSearch.proxyUrl + this.apiUrl;
        this.formEl = document.querySelector('form');
        this.searchEl = document.querySelector('#search');
        this.searchBtn = document.querySelector('#search-btn');
        this.resultsEl = document.querySelector('#result');
        this.moreEl = document.querySelector('#more');
        this.formEl.addEventListener('submit', async (event) => {
            event.preventDefault();
            const searchText = this.searchEl.value;
            if (!searchText.trim()) {
                alert('Please type search text');
            }
            else {
                try {
                    const data = await this.searchSongs(searchText);
                    await this.renderData(data);
                }
                catch (err) {
                    console.log(err)
                }
            }
        })
        this.resultsEl.addEventListener('click', async (event) => {
            if (event.target.tagName === 'BUTTON') {
                let artist = event.target.getAttribute('data-artist');
                let title = event.target.getAttribute('data-songtitle');
                const lyricsData = await fetch(`${this.apiUrl}/v1/${artist}/${title}`)
                    .then(res => res.json())
                    .then(data => data)
                const lyrics = lyricsData.lyrics.replace(/\r\n|\r|\n/g, '<br>');
                this.resultsEl.innerHTML = `<h2><strong>${artist}<\strong> - ${title}<\h2>
                <span>${lyrics}<\span>`
                this.moreEl.innerHTML = '';
            }
        })
    }

    async renderData(data) {
        this.resultsEl.innerHTML = `
            <ul class="songs">
                ${data.data.map(song => {
            return `<li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>`
        }).join('')}         
            </ul>
            `
        if (data.prev || data.next) {
            this.moreEl.innerHTML = `
              ${data.prev ? `<button class="prev btn">Prev</button>` : ''}
              ${data.next ? `<button class="nxt btn">Next</button>` : ''}
            `
            let prevBtn = document.querySelector('.prev');
            let nxtBtn = document.querySelector('.nxt');
            if (nxtBtn) nxtBtn.addEventListener('click', async (e) => {
                await this.getIndexedSongs(data.next);
            })
            if (prevBtn) prevBtn.addEventListener('click', async (e) => {
                await this.getIndexedSongs(data.prev);
            })
        }
    }

    async searchSongs(searchText) {
        return await fetch(`${this.url}suggest/${searchText}`)
            .then(res => res.json())
            .then(data => data)
    }

    async getIndexedSongs(url) {
        let newurl = LyricsSearch.proxyUrl + url;
        const songs = await fetch(newurl)
            .then(res => {
                result = res.json();
                return result
            })
            .then(data => data)
        this.renderData(songs);
    }
}

new LyricsSearch()