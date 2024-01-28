let bookUrl = document.getElementById("bookUrl");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(400)
        $("body").css("overflow", "visible")
    })
})

function openSideNav() {
    $(".menuNav").animate({
        left: 0
    }, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for ( i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        },(i + 5) * 100) 
    }
}

function closeSideNav() {
    let boxWidth = $(".menuNav .nav-tab").outerWidth()
    $(".menuNav").animate({
        left: -boxWidth
    }, 400)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 300
    }, 400)
}
closeSideNav()
$(".menuNav i.open-close-icon").click(() => {
    if ($(".menuNav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

function displayMeals(srr) {
    let cartoona = "";
    for ( i = 0; i < srr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${srr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${srr[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${srr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    bookUrl.innerHTML = cartoona
}

async function getCategories() {
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut
}

function displayCategories(srr) {
    let cartoona = "";
    for ( i = 0; i < srr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${srr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${srr[i].strCategoryThumb}" alt="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${srr[i].strCategory}</h3>
                        <p>${srr[i].strCategoryDescription.split().slice(0,22).join()}</p>
                    </div>
                </div>
        </div>
        `
    }
    bookUrl.innerHTML = cartoona
}

async function getArea() {
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut
}

function displayArea(srr) {
    let cartoona = "";
    for ( i = 0; i < srr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${srr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${srr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    bookUrl.innerHTML = cartoona
}

async function getIngredients() {
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 22))
    $(".inner-loading-screen").fadeOut
}

function displayIngredients(srr) {
    let cartoona = "";
    for ( i = 0; i < srr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${srr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${srr[i].strIngredient}</h3>
                        <p>${srr[i].strDescription.split(" ").slice(0,22).join(" ")}</p>
                </div>
        </div>
        `
    }
    bookUrl.innerHTML = cartoona
}

async function searchByName(term) {
    closeSideNav()
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut
}
async function getCategoryMeals(category) {
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 22))
    $(".inner-loading-screen").fadeOut
}
async function getAreaMeals(area) {
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 22))
    $(".inner-loading-screen").fadeOut
}
async function getIngredientsMeals(ingredients) {
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 22))
    $(".inner-loading-screen").fadeOut
}
async function getMealDetails(mealID) {
    closeSideNav()
    bookUrl.innerHTML = ""
    $(".inner-loading-screen").fadeIn
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut
}

function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    let ingredients = ``
    for ( i = 1; i <= 22; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    bookUrl.innerHTML = cartoona
}

function getSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    bookUrl.innerHTML = ""
}

function getContacts() {
    bookUrl.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
}