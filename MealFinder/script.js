class MealFinder {
    constructor() {
        this.search = document.querySelector('#search');
        this.form = document.querySelector('#submit');
        this.random = document.querySelector('#random');
        this.mealsEl = document.querySelector('#meals');
        this.apiBaseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        this.mealByIdUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
        this.search.value = '';
        this.resultHeading = document.querySelector('#result-heading');
        this.singleMealEl = document.querySelector('#single-meal');
        this.form.addEventListener('submit', this.searchMealAndRender.bind(this));
        this.mealsEl.addEventListener('click', this.showRecipe.bind(this));
    }

    showRecipe(event) {
        let mealid = ''
        if ([...event.target.classList].includes('meal-info')) {
            console.log(event.target.dataset.mealid)
            mealid = event.target.dataset.mealid
            this.getMealById(mealid)
        }
        else if ([...event.target.parentNode.classList].includes('meal-info')) {
            console.log(event.target.parentNode.dataset.mealid)
            mealid = event.target.parentNode.dataset.mealid
            this.getMealById(mealid)
        }
    }

    getMealById(mealid) {
        const mealByIdUrl = this.getMealByIdUrl(mealid);
        const result = fetch(mealByIdUrl)
            .then(response => response.json())
            .then(data => {
                const ingredients = [];
                const mealDetails = data.meals[0];
                const results = Object.keys(mealDetails).filter(
                    value => /strIngredient*/.test(value));
                for (const key of results) {
                    const index = key.match(/strIngredient(\d+)/) || []
                    if (index && index[1]) {
                        let measure = mealDetails['strMeasure' + index[1]];
                        if (measure) {
                            ingredients.push(`${mealDetails[key]} - ${measure}`)
                        }
                    }
                }
                console.log(ingredients);
                // console.log(results)
                if (ingredients) {
                    this.addMealToDom(ingredients, mealDetails);
                }
            }
            )
    }

    addMealToDom(ingredients, mealDetails) {
        this.singleMealEl.innerHTML = `
            <div class="single-meal">
                <h1>${mealDetails.strMeal}</h1>
                <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" />
                <div class="single-meal-info"></div>
                <div class="main">
                    <p>${mealDetails.strInstructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>`;
    }

    searchMealAndRender(event) {
        event.preventDefault();
        const searchString = this.search.value;
        const apiUrl = this.getApiUrl(searchString);
        this.searchMeal(apiUrl, searchString.trim());
    }

    searchMeal(apiUrl, searchString) {
        const result = fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.meals === null) {
                    this.resultHeading.innerHTML = `<p>There are 0 search results for '${searchString}'</p>`
                }
                else {
                    console.log(data)
                    this.resultHeading.innerHTML = `<h2>Search results for '${searchString}'</h2>`
                    this.mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealId="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('');

                    this.search.value = '';
                }
            })
    }

    getApiUrl(searchString) {
        if (!searchString.trim()) {
            alert('No search string provided to search a meal')
        }
        else {
            return `${this.apiBaseUrl}${searchString}`
        }
    }

    getMealByIdUrl(id) {
        return `${this.mealByIdUrl}${id}`
    }

}

new MealFinder()