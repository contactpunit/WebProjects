const appEl = document.querySelector('#app');

const allCategories = ['arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot'];
const numCategories = 3;
const numPostsPerCategory = 5;
const allPosts = [];
const apiKey = '3AHTQEKnKZa4Sqq5QsW7lL6vVnTd7feR';
const categories = allCategories.splice(0, numCategories);

// create a promise array from fetch requests
const promises = categories.map(category => {
    return fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`)
})

// parse promises and render results
Promise.all(promises)
    .then(responses => {
        return Promise.all(
            responses.map(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(res.statusText);
                }
            })
        )
    })
    .then(results => {
        for (const result of results) {
            allPosts.push(gatherResults(result));
        }
        return allPosts;
    })
    .then(() => appEl.innerHTML = allPosts.join(''))
    .catch(error => console.log('error value is ' + error));

function gatherResults(data) {
    return `<h2>${data.section}</h2>` +
        '<div class="post"><ul>' + data.results.map(entry => {
            return `<li><a href="${entry.url}">${entry.title}</a></li>`
        }).splice(0, numPostsPerCategory).join('') + '</ul></div>'
}
