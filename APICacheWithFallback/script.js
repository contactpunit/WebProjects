const elem = document.querySelector('.all-articles');
const dataSource = document.querySelector('.datasource');
const dataType = {
    text: '',
    source: ''
};

const getEndpoint = function () {
    var endpoint = 'https://vanillajsacademy.com/api/';
    var random = Math.random();
    if (random < 0.5) return endpoint + 'pirates.json';
    return endpoint + 'fail.json';
};

function loadData() {
    const storageKey = 'newsData';
    const expiryTime = 1000 * 6;
    const url = getEndpoint();

    const cacheData = getCachedData(storageKey);
    if (cacheData && isDataValid(cacheData.timestamp, expiryTime)) {
        dataType.text = 'Cache Data';
        dataType.source = 'cache';
        renderData(cacheData.data, dataType);
    }
    else {
        dataType.text = 'Live Data';
        dataType.source = 'live';
        fetch(url)
            .then(res => res.json())
            .then(data => data.articles)
            .then((articles) => {
                updateLocalStorage(articles, storageKey);
                renderData(articles, dataType);
            })
            .catch(err => {
                if (cacheData) {
                    dataType.text = 'Stale Data';
                    dataType.source = 'stale';
                    renderData(cacheData.data, dataType);
                }
                else {
                    console.log('even cache has no data. Cant load any data')
                }
            })
    }
}

function getCachedData(storageKey) {
    const newsData = localStorage.getItem(storageKey);
    if (!newsData) return false;
    const data = JSON.parse(newsData);
    if (!data.data || !data.timestamp) return false;
    return data;
}

// check localstorage if data there
function isDataValid(timestamp, expiryTime) {
    const difference = new Date().getTime() - timestamp;
    if (difference > expiryTime) return false;
    return true;
}

function updateLocalStorage(data, storageKey) {
    localStorage.setItem([storageKey],
        JSON.stringify({
            data,
            timestamp: new Date().getTime()
        }))
}

function renderData(data, dataType) {
    if (dataType.source === 'stale') {
        dataSource.classList.add('red');
    }
    else {
        dataSource.classList.remove('red');
    }
    dataSource.innerHTML = dataType.text;
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

