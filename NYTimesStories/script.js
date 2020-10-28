//Get all top stories from NewYork Times API and sort them by Date

const appEl = document.querySelector('#app');
const apiKey = '3AHTQEKnKZa4Sqq5QsW7lL6vVnTd7feR';
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;
try {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'OK') {
                if (!data.results) {
                    appEl.innerHTML = '<ul></ul>';
                    return;
                }
                const results = data.results.map(entry => {
                    return {
                        [entry.created_date]: `<li><a href="${entry.url}">${entry.title}</a><span> Created On${new Date(Date.parse(entry.created_date))}</span></li>`
                    };
                }).sort((a, b) => {
                    bDate = new Date(Date.parse(Object.keys(b)[0]));
                    aDate = new Date(Date.parse(Object.keys(a)[0]));
                    return bDate - aDate;
                }).map(
                    entry => Object.values(entry)[0]
                )
                appEl.innerHTML = '<ul>' + results.join('') + '</ul>';
            }
        })
}
catch (error) {
    console.log(error);
}
