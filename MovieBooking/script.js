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
    }

    movieChangeHandler(event) {
        this.ticketPrice = +event.target.value;
        this.updateSelectedCount();
    }

    seatSelectHandler(event) {
        if (event.target.classList.contains('seat') &&
            !event.target.classList.contains('occupied')) {
            event.target.classList.toggle('selected');
            this.updateSelectedCount();
        }
    }

    updateSelectedCount() {
        this.selectedSeats = document.querySelectorAll('.row .seat.selected');
        this.seatNumbers = [...this.selectedSeats].map(seat => {
            return [...this.allSeats].indexOf(seat)
        });
        console.log(this.selectedSeats)
        this.updateCountAndPrice()
    }

    updateCountAndPrice() {
        this.calculate.count.innerText = this.selectedSeats.length;
        this.calculate.totalCost.innerText = this.selectedSeats.length * this.ticketPrice
    }

}

const c = new Calculate();
new Movie(c);