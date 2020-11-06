const app = document.querySelector('#app');
const basePath = 'https://gist.githubusercontent.com/cferdinandi/b216c6c06685a381ec5bd547410d76c1/raw/ea404869e2c3b02738b36ccb9d82921f80cbf2bd/';

var monsters = [
    'monster1',
    'monster2',
    'monster3',
    'monster4',
    'monster5',
    'monster6',
    'monster7',
    'monster8',
    'monster9',
    'monster10',
    'monster11',
    'sock'
];

var shuffle = function (array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

const shuffledArray = shuffle(monsters.slice());
let trackArray = shuffledArray.slice();

shuffledArray.forEach(monster => {
    const divEl = document.createElement('div');
    divEl.classList.add('grid');
    divEl.setAttribute('id', monster);
    divEl.innerHTML = `
      <img src="${basePath}door.svg" alt=${basePath}${monster}.svg />
      `
    divEl.addEventListener('click', showImage);
    app.appendChild(divEl);
})

function showImage(event) {
    const element = event.target.closest('.grid');
    if (!event.target.alt.includes('door.svg')) {
        [event.target.alt, event.target.src] = [event.target.src, event.target.alt]
        if (trackArray.indexOf(element.id) > -1) {
            trackArray.splice(trackArray.indexOf(element.id), 1);
            if (element.id === 'sock' && (trackArray.length === 0)) {
                alert('You won');
                return;
            }
            if (element.id === 'sock') {
                alert('You Lost');
                return;
            }
        }
    }
}