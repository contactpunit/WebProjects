class VedioPlayer {
    constructor() {
        this.video = document.getElementById('video');
        this.play = document.getElementById('play');
        this.stop = document.getElementById('stop');
        this.progress = document.getElementById('progress');
        this.timestamp = document.getElementById('timestamp');
        this.video.addEventListener('click', this.toggleVideoStatus.bind(this));
        this.video.addEventListener('play', this.updatePlayIcon.bind(this));
        this.video.addEventListener('pause', this.updatePlayIcon.bind(this));
        this.video.addEventListener('timeupdate', this.updateProgress.bind(this));
        this.play.addEventListener('click', this.toggleVideoStatus.bind(this));
        this.stop.addEventListener('click', this.stopVideo.bind(this));
        this.progress.addEventListener('change', this.setVideoProgress.bind(this));

    }

    toggleVideoStatus() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    updatePlayIcon() {
        if (this.video.paused) {
            this.play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
        } else {
            this.play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
        }
    }

    updateProgress() {
        this.progress.value = (this.video.currentTime / this.video.duration) * 100;
        let min = Math.floor(this.video.currentTime / 60);
        let sec = Math.floor(this.video.currentTime % 60);
        min = min < 10 ? '0' + String(min) : min;
        sec = sec < 10 ? '0' + String(sec) : sec;
        this.timestamp.innerHTML = `${min}:${sec}`;

    }

    setVideoProgress() {
        this.video.currentTime = (+this.progress.value * this.video.duration) / 100;
    }

    stopVideo() {
        this.video.currentTime = 0;
        this.video.pause();
    }

}

new VedioPlayer();