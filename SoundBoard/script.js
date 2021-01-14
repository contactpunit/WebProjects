const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];
let currentSong;
sounds.forEach(sound => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = sound;
    button.addEventListener('click', () => {
        if (currentSong) {
            const song = document.getElementById(currentSong);
            song.pause()
            song.currentTime = 0;
        }
        currentSong = sound;
        document.getElementById(sound).play()
    })

    document.getElementById('buttons').appendChild(button)
})
