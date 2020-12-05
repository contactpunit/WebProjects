const elem = document.querySelector('.all-articles');

function loadData() {
    const storageKey = 'newsData';
    const expiryTime = 1000 * 6;
    const url = 'https://vanillajsacademy.com/api/pirates.json';

    const cacheData = isDataValid(storageKey, expiryTime);
    if (cacheData) {
        console.log('getting from cache');
        renderData(cacheData);
    }
    else {
        console.log('getting from fetch call');
        fetch(url)
            .then(res => res.json())
            .then(data => data.articles)
            .then((articles) => {
                updateLocalStorage(articles, storageKey);
                renderData(articles);
            })
            .catch(err => {
                console.log(`Error in fetching data: ${err}`);
            })
    }
}

// check localstorage if data there
function isDataValid(storageKey, expiryTime) {
    const newsData = localStorage.getItem(storageKey);
    if (!newsData) return false;
    const data = JSON.parse(newsData);
    if (!data.data || !data.timestamp) return false;
    const difference = new Date().getTime() - data.timestamp;
    if (difference > expiryTime) return false;
    return data.data;
}

function updateLocalStorage(data, storageKey) {
    localStorage.setItem([storageKey],
        JSON.stringify({
            data,
            timestamp: new Date().getTime()
        }))
}

function renderData(data) {
    const elements = data.map(element => {
        return `
        <div class="article">
        <h2>${element.title}</h2>
        <h4>Written by ${element.author}</h4>
        <p class="post-body">${element.article}<p>
        </div>
    `
    }).join('');
    elem.innerHTML = elements

}

loadData()

