class MusicPlayer {
    constructor() {
        this.musicContainer = document.querySelector('#music-container');
        this.title = document.querySelector('#title');
        this.prevBtn = document.querySelector('#prev');
        this.playBtn = document.querySelector('#play');
        this.nextBtn = document.querySelector('#nxt');
        this.progress = document.querySelector('#progress');
        this.playingImage = document.querySelector('#cover');
        this.selectedAudio = document.querySelector('#audio')
        this.progressContainer = document.querySelector('#progress-container');
        this.playList = ['hey.mp3', 'summer.mp3', 'ukulele.mp3'];
        this.currentSong = 0;
        this.setSong();
        this.playBtn.addEventListener('click', this.togglePlay.bind(this));
        this.nextBtn.addEventListener('click', this.nextMusic.bind(this));
        this.prevBtn.addEventListener('click', this.previousMusic.bind(this));
        audio.addEventListener('timeupdate', this.updateProgress.bind(this));
        audio.addEventListener('ended', this.nextMusic.bind(this));
        this.progressContainer.addEventListener('click', this.setProgressOnClicked.bind(this));
    }

    setProgressOnClicked(event) {
        const width = event.target.clientWidth;
        const pointOfClick = event.offsetX;
        const duration = audio.duration;
        audio.currentTime = (pointOfClick / width) * duration;
    }

    updateProgress(event) {
        const { currentTime, duration } = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        this.progress.style.width = `${progressPercent}%`
    }

    setSong() {
        const song = this.playList[this.currentSong].split('.')[0];
        this.title.innerText = song;
        this.selectedAudio.src = `music/${song}.mp3`;
        this.playingImage.src = `images/${song}.jpg`;
    }

    pauseSong() {
        this.musicContainer.classList.remove('play');
        this.playBtn.querySelector('i.fas').classList.remove('fa-play');
        this.playBtn.querySelector('i.fas').classList.add('fa-pause');
        audio.pause();
    }

    playSong() {
        this.musicContainer.classList.add('play');
        this.playBtn.querySelector('i.fas').classList.add('fa-play');
        this.playBtn.querySelector('i.fas').classList.remove('fa-pause');
        audio.play();
    }

    togglePlay() {
        if (this.musicContainer.classList.contains('play')) {
            this.pauseSong();
        } else {
            this.playSong();
        }
    }

    nextMusic() {
        const currentSong = this.currentSong + 1;
        if (currentSong > this.playList.length - 1) {
            this.currentSong = 0;
            this.setSong();
            this.playSong();
        } else {
            this.currentSong = currentSong;
            this.setSong();
            this.playSong();
        }

    }

    previousMusic() {
        const currentSong = this.currentSong - 1;
        if (currentSong < 0) {
            this.currentSong = this.playList.length - 1;
            this.setSong();
            this.playSong();
        } else {
            this.currentSong = currentSong;
            this.setSong();
            this.playSong();
        }
    }
}

new MusicPlayer();