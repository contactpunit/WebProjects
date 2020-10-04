class Calculate {
    constructor(movie, seat) {
        this.count = document.getElementById('count');
        this.totalCost = document.getElementById('total');
    }
}

class Movie {
    constructor(calculate) {
        this.calculate = calculate;
        this.movie = document.getElementById('movie');
        this.ticketPrice = +movie.value;
        this.container = document.querySelector('.container');
        this.seats = document.querySelectorAll('.row .seat:not(.occupied)');
        this.allSeats = document.querySelectorAll('.row .seat');
        this.selectedSeats = [];
        this.seatNumbers = [];
        this.movie.addEventListener('change', this.movieChangeHandler.bind(this))
        this.container.addEventListener('click', this.seatSelectHandler.bind(this));
        this.initializeMovieData();
    }

    initializeMovieData() {
        const moviePrice = localStorage.getItem('moviePrice');
        const movieId = localStorage.getItem('movieId');
        if (!movieId) {
            localStorage.setItem('movieId', 0);
            localStorage.setItem('moviePrice', +this.movie.value)
        }
        else {
            const movieIndex = localStorage.getItem('movieId');
            this.movie.selectedIndex = +movieIndex;
            this.ticketPrice = localStorage.getItem('moviePrice');
            this.seatNumbers = JSON.parse(localStorage.getItem('selectedSeatsIndex'));
            if (this.seatNumbers) {
                this.allSeats.forEach((seat, index) => {
                    if (this.seatNumbers.includes(index)) {
                        seat.classList.add('selected')
                    }
                });
                this.updateCountAndPrice();
            }
        }
    }

    movieChangeHandler(event) {
        this.ticketPrice = +event.target.value;
        this.updateMovieDetails(event);
        this.updateSelectedCount();
    }

    seatSelectHandler(event) {
        if (event.target.classList.contains('seat') &&
            !event.target.classList.contains('occupied')) {
            event.target.classList.toggle('selected');
            this.updateSelectedCount();
        }
    }

    updateMovieDetails(event) {
        this.ticketPrice = +event.target.value;
        localStorage.setItem('moviePrice', event.target.value);
        localStorage.setItem('movieId', event.target.selectedIndex);
    }

    updateSelectedCount() {
        this.selectedSeats = document.querySelectorAll('.row .seat.selected');
        this.seatNumbers = [...this.selectedSeats].map(seat => {
            return [...this.allSeats].indexOf(seat)
        });
        localStorage.setItem('selectedSeatsIndex', JSON.stringify(this.seatNumbers));
        this.updateCountAndPrice()
    }

    updateCountAndPrice() {
        this.calculate.count.innerText = this.seatNumbers.length;
        this.calculate.totalCost.innerText = this.seatNumbers.length * this.ticketPrice;
    }

}

const c = new Calculate();
new Movie(c);