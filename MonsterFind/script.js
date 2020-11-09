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

const row = document.querySelector('.row');
const monsterUrl = 'https://gist.githubusercontent.com/cferdinandi/b216c6c06685a381ec5bd547410d76c1/raw/ea404869e2c3b02738b36ccb9d82921f80cbf2bd/';
let found = 0;
const totalElem = monsters.length;

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

const shuffled = shuffle(monsters.slice(0));
const sockIndex = shuffled.findIndex(elem => elem === 'sock');

row.innerHTML = shuffled.map(monster => {
    return `
      <div class="grid"><button id=${shuffled.indexOf(monster)}> <img src="${monsterUrl}door.svg" alt="${monsterUrl}${monster}.svg" /></button></div>
    `
}).join('');

document.addEventListener('click', event => {
    gridElem = event.target.closest('.grid');
    if (!gridElem) {
        return
    }
    const elemIndex = +gridElem.children[0].getAttribute('id');
    found += 1;
    if (elemIndex === sockIndex) {
        if(found < totalElem) {
            
            alert('You lost');
        }
        else {
            alert('You won!!!')
        }
    }
    gridElem.innerHTML = `
      <button id=${elemIndex}><img src="${monsterUrl}${shuffled[elemIndex]}.svg" alt="${monsterUrl}door.svg" /></button>
    `
})



