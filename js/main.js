function openMenu() {
  document.getElementById("navbar").style.transform = "translateX(5%)";
  console.log(document.getElementsByClassName("nav-link"));
  document.getElementById("closeIcon").style.display = "inline";
  document.getElementById("openIcon").style.display = "none";

  var menuAnchors = document.getElementsByClassName("nav-link").length;

  for (i = 0; i < menuAnchors; i++) {
    document.getElementsByClassName("nav-link")[i].style.transform =
      "translateY(0%)";
  }
}

document.getElementById("closeIcon").addEventListener("click", closeMenu);

function closeMenu() {
  document.getElementById("navbar").style.transform = "translateX(-80%)";

  document.getElementById("closeIcon").style.display = "none";
  document.getElementById("openIcon").style.display = "inline";

  var menuAnchors = document.getElementsByClassName("nav-link").length;

  for (i = 0; i < menuAnchors; i++) {
    document.getElementsByClassName("nav-link")[i].style.transform =
      "translateY(500%)";
  }
}

var mealsList = [];
async function getData() {
  let myResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let myData = await myResponse.json();
  mealsList = myData.meals;
  display();
}
getData();

function display() {
  var temp = "";
  for (var i = 0; i < mealsList.length; i++) {
    temp +=
      `
      <div class="col-md-3">
      <a onclick="mealDetails(` +
      mealsList[i].idMeal +
      `)">
      <div class="item">
      <img src="` +
      mealsList[i].strMealThumb +
      `" class="w-100 rounded" alt="" />
      <div class="layer d-flex align-items-center">
        <p class="ms-3">` +
      mealsList[i].strMeal +
      `</p>
      </div>
    </div>
      </a>
    </div>
    `;
  }
  document.getElementById("myRow").innerHTML = temp;
}

function displaySearch() {
  document.getElementById("myRow").innerHTML = "";
  var temp = `    <div class="container" id="mySearch">

    <div class="row mt-5 text-center">
      <div class="col-lg-6">
      <input type="email" class="form search col-lg-12 text-center" id="searchMeal_Name" onkeyup="searchMealName()" placeholder="Search by name" aria-describedby="emailHelp">
      </div>
   
      <div class="col-lg-6">
      <input type="email" maxlength="1" class="form search col-lg-12 text-center" onkeyup="searchMeal_firstLetter()" id="searchMeal_FirstLetter" placeholder="Search by first letter" aria-describedby="emailHelp">
      </div>
    </div>
  
  
    </div>`;

  document.getElementById("mySearch").innerHTML = temp;
}

//  www.themealdb.com/api/json/v1/1/search.php?f=a
function searchMeal_firstLetter() {
  var userInput = document.getElementById("searchMeal_FirstLetter").value;
  var searchResuts_nameList = [];
  var searchResults_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
  async function getData() {
    let myResponse = await fetch(searchResults_URL);
    let myData = await myResponse.json();
    searchResuts_nameList = myData.meals;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < searchResuts_nameList.length; i++) {
      temp +=
        `
      <div class="col-md-3">
      <a onclick="mealDetails('` +
        searchResuts_nameList[i].idMeal +
        `')">
      <div class="item">
      <img src="` +
        searchResuts_nameList[i].strMealThumb +
        `" class="w-100 rounded" alt="" />
      <div class="layer d-flex align-items-center">
        <p class="ms-3">` +
        searchResuts_nameList[i].strMeal +
        `</p>
      </div>
    </div>
      </a>

      </div>
    `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function searchMealName() {
  var userInput = document.getElementById("searchMeal_Name").value;
  var searchResuts_nameList = [];
  var searchResults_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
  async function getData() {
    let myResponse = await fetch(searchResults_URL);
    let myData = await myResponse.json();
    searchResuts_nameList = myData.meals;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < searchResuts_nameList.length; i++) {
      temp +=
        `
      <div class="col-md-3">
      <a onclick="mealDetails('` +
        searchResuts_nameList[i].idMeal +
        `')">
      <div class="item">
      <img src="` +
        searchResuts_nameList[i].strMealThumb +
        `" class="w-100 rounded" alt="" />
      <div class="layer d-flex align-items-center">
        <p class="ms-3">` +
        searchResuts_nameList[i].strMeal +
        `</p>
      </div>
    </div>
      </a>

      </div>
    `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function mealDetails(mealID) {
  document.getElementById("mySearch").innerHTML = "";
  var mealDetailsList = "";
  var mealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  async function getData() {
    let myResponse = await fetch(mealURL);
    let myData = await myResponse.json();
    mealDetailsList = myData.meals;
    display();
  }
  getData();

  async function display() {
    var temp = "";
    var recipes = "";

    for (var i = 0; i < mealDetailsList.length; i++) {
      for (var x = 1; x <= 20; x++) {
        var Measure = eval(`mealDetailsList[${i}].strMeasure${x}`);
        var Ingredient = eval(`mealDetailsList[${i}].strIngredient${x}`);

        if (Ingredient) {
          recipes +=
            `<span class="badge text-bg-primary">` +
            Measure +
            " " +
            Ingredient +
            `</span>`;
        }
      }

      temp +=
        `
      <div class="col-lg-4">
      <img src="` +
        mealDetailsList[i].strMealThumb +
        `" class="w-100" alt="" />
      <h2 class="text-center text-white">` +
        mealDetailsList[i].strMeal +
        `</h2>
    </div>

    <div class="col-lg-8 text-white">
      <h5>Insturctions:</h5>
      <p>` +
        mealDetailsList[i].strInstructions +
        `</p>

      <p><b>Area: </b>` +
        mealDetailsList[i].strArea +
        `</p>
      <p><b>Category: </b>` +
        mealDetailsList[i].strCategory +
        `</p>

      <p>Recipes:</p>` +
        recipes +
        `
      <p>Tags:</p>
      <span class="badge text-bg-warning mb-4 px-3 py-2">` +
        mealDetailsList[i].strCategory +
        `</span>
      <br>

      <a href="` +
        mealDetailsList[i].strSource +
        `" target="_blank" class="btn btn-success">Source</a>
      <a href="` +
        mealDetailsList[i].strYoutube +
        `" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
  </div>`;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function displayCategories() {
  document.getElementById("mySearch").innerHTML = "";
  var categoriesList = [];
  async function getData() {
    let myResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let myData = await myResponse.json();
    categoriesList = myData.categories;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < categoriesList.length; i++) {
      var categoryName = categoriesList[i].strCategory;
      temp +=
        `
      <div class="col-md-3">
      <a onclick="categoryDetails('` +
        categoryName +
        `')">
      <div class="item">
      <img src="` +
        categoriesList[i].strCategoryThumb +
        `" class="w-100 rounded" alt="" />
      <div class="layer d-flex align-items-center">
        <p class="ms-3">` +
        categoriesList[i].strCategory +
        `</p>
      </div>
    </div>
      </a>

      </div>
    `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function categoryDetails(categoryName) {
  document.getElementById("mySearch").innerHTML = "";
  var categoriesDetailsList = [];
  var categoryURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
  async function getData() {
    let myResponse = await fetch(categoryURL);
    let myData = await myResponse.json();
    categoriesDetailsList = myData.meals;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < categoriesDetailsList.length; i++) {
      temp +=
        `
      <div class="col-md-3">
      <a onclick="mealDetails('` +
        categoriesDetailsList[i].idMeal +
        `')">
      <div class="item">
      <img src="` +
        categoriesDetailsList[i].strMealThumb +
        `" class="w-100 rounded" alt="" />
      <div class="layer d-flex align-items-center">
        <p class="ms-3">` +
        categoriesDetailsList[i].strMeal +
        `</p>
      </div>
    </div>
      </a>

      </div>
    `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function displayArea() {
  document.getElementById("mySearch").innerHTML = "";
  var areaList = [];
  async function getData() {
    let myResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let myData = await myResponse.json();
    areaList = myData.meals;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < areaList.length; i++) {
      var areaName = areaList[i].strArea;
      temp +=
        `
      <div class="col-md-3">
      <a onclick="areaDetails('` +
        areaName +
        `')">
      <div class="item text-center p-2 shadow-lg" id="itemArea">
        <i class="fa-solid fa-city fa-3x d-block"></i>
        <a)">` +
        areaList[i].strArea +
        `</a>
      </div>
      </a>
    </div>
    `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function areaDetails(areaName) {
  document.getElementById("mySearch").innerHTML = "";
  var areaURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`;

  var areaDetailsList = [];
  async function getData() {
    let myResponse = await fetch(areaURL);
    let myData = await myResponse.json();
    areaDetailsList = myData.meals;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < areaDetailsList.length; i++) {
      temp +=
        `
        <div class="col-md-3">
        <a onclick="mealDetails(` +
        areaDetailsList[i].idMeal +
        `)">
        <div class="item">
        <img src="` +
        areaDetailsList[i].strMealThumb +
        `" class="w-100 rounded" alt="" />
        <div class="layer d-flex align-items-center">
          <p class="ms-3">` +
        areaDetailsList[i].strMeal +
        `</p>
        </div>
      </div>
        </a>

      </div>
      `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function displayIngredients() {
  document.getElementById("mySearch").innerHTML = "";
  var ingredientsList = [];
  async function getData() {
    let myResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    let myData = await myResponse.json();
    ingredientsList = myData.meals;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < 20; i++) {
      ingredientsName = ingredientsList[i].strIngredient;
      temp +=
        `
      <div class="col-md-3">
      
      <a onclick="ingredientDetails('` +
        ingredientsName +
        `')">
      <div class="item shadow-lg" id="itemIngredients">
      <i class="fa-solid fa-bowl-food fa-3x"></i>
      <p>` +
        ingredientsList[i].strIngredient +
        `</p>
      <p>` +
        ingredientsList[i].strDescription +
        `</p>
    </div>
      </a>
      </div>
    `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function ingredientDetails(ingredientName) {
  ingredientName = ingredientName.split(" ").join("_");

  var ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

  var ingredientDetailsList = [];
  async function getData() {
    let myResponse = await fetch(ingredientURL);
    let myData = await myResponse.json();
    ingredientDetailsList = myData.meals;
    display();
  }
  getData();

  function display() {
    var temp = "";
    for (var i = 0; i < ingredientDetailsList.length; i++) {
      temp +=
        `
      <div class="col-md-3">
      <a onclick="mealDetails(` +
        ingredientDetailsList[i].idMeal +
        `)">
      <div class="item">
      <img src="` +
        ingredientDetailsList[i].strMealThumb +
        `" class="w-100 rounded" alt="" />
      <div class="layer d-flex align-items-center">
        <p class="ms-3">` +
        ingredientDetailsList[i].strMeal +
        `</p>
      </div>
    </div>
      </a>
      </div>
    `;
    }
    document.getElementById("myRow").innerHTML = temp;
  }
}

function displayContact() {
  document.getElementById("mySearch").innerHTML = "";

  temp = `<h2 class="text-center text-white">Contact US</h2>            <div class="col-lg-6">
  <input type="text" class="form-control contact w-100 my-1 d-inline-block text-center" id="name_input" onkeyup="validateName(); showButton()" placeholder="Enter name">
  <div class="alert alert-danger" id="name_wrongValidation" role="alert">
    Special Characters and Numbers not allowed, and must be more than 1 character
  </div>
</div>

<div class="col-lg-6">
  <input type="email" class="form-control contact w-100 my-1 d-inline-block text-center" id="email_input" onkeyup="validateEmail(); showButton()" placeholder="Enter email" aria-describedby="emailHelp">
  <div class="alert alert-danger" id="email_wrongValidation" role="alert">
    Enter valid email. *Ex: xxx@yyy.zzz
  </div>
</div>

<div class="col-lg-6">
  <input type="text" class="form-control contact w-100 my-1 d-inline-block text-center" id="phone_input" onkeyup="validatePhone(); showButton()" placeholder="Enter phone">
  <div class="alert alert-danger" id="phone_wrongValidation" role="alert">
    Enter valid Phone Number
  </div>
</div>

<div class="col-lg-6">
  <input type="text" class="form-control contact w-100 my-1 d-inline-block text-center" id="age_input" onkeyup="validateAge(); showButton()" placeholder="Enter age">
  <div class="alert alert-danger" id="age_wrongValidation" role="alert">
    Enter valid Age
  </div>
</div>

<div class="col-lg-6">
  <input type="password" class="form-control contact w-100 my-1 d-inline-block text-center" id="password_input" onkeyup="validatePassword(); showButton()" placeholder="Enter password">
  <div class="alert alert-danger" id="password_wrongValidation" role="alert">
    Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
  </div>
</div>

<div class="col-lg-6">
  <input type="password" class="form-control contact w-100 my-1 d-inline-block text-center" id="rePassword_input" onkeyup="validateRePassword(); showButton()" placeholder="Enter password">
  <div class="alert alert-danger" id="rePassword_wrongValidation" role="alert">
    Password does not match!
  </div>
</div>

<div id="submitButtonContainer" class="text-center w-25 m-auto mt-3">
<button type="button" id="submitButton" class="btn btn-outline-danger" disabled>Submit</button>
</div>
`;

  document.getElementById("myRow").innerHTML = temp;
}

var isEmailValid;
var isNameValid;
var isPhoneValid;
var isAgeValid;
var isPasswordValid;
var isRePasswordValid;

function showButton() {
  if (
    isEmailValid &&
    isNameValid &&
    isPhoneValid &&
    isAgeValid &&
    isPasswordValid &&
    isRePasswordValid
  ) {
    document.getElementById(
      "submitButtonContainer"
    ).innerHTML = `<button type="button" class="btn btn-outline-danger">Submit</button>`;
  } else {
    document.getElementById(
      "submitButtonContainer"
    ).innerHTML = `<button type="button" class="btn btn-outline-danger" disabled>Submit</button>`;
  }
}

function validateEmail() {
  var emailInput = document.getElementById("email_input").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailInput.match(mailformat)) {
    isEmailValid = true;
    document.getElementById("email_wrongValidation").style.display = "none";
    document.getElementById("email_input").classList.add("is-valid");
    document.getElementById("email_input").classList.remove("is-invalid");
    return true;
  } else {
    isEmailValid = false;
    document.getElementById("email_wrongValidation").style.display = "block";
    document.getElementById("email_input").classList.remove("is-valid");
    document.getElementById("email_input").classList.add("is-invalid");
    return false;
  }
}

function validateName() {
  var nameInput = document.getElementById("name_input").value;
  var nameFormat = /^[a-zA-Z ]{2,30}$/;

  if (nameInput.match(nameFormat)) {
    isNameValid = true;
    document.getElementById("name_wrongValidation").style.display = "none";
    document.getElementById("name_input").classList.add("is-valid");
    document.getElementById("name_input").classList.remove("is-invalid");
    return true;
  } else {
    isNameValid = false;
    document.getElementById("name_wrongValidation").style.display = "block";
    document.getElementById("name_input").classList.remove("is-valid");
    document.getElementById("name_input").classList.add("is-invalid");
    return false;
  }
}

function validatePhone() {
  var phoneInput = document.getElementById("phone_input").value;
  var phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (phoneInput.match(phoneFormat)) {
    isPhoneValid = true;
    document.getElementById("phone_wrongValidation").style.display = "none";
    document.getElementById("phone_input").classList.add("is-valid");
    document.getElementById("phone_input").classList.remove("is-invalid");
    return true;
  } else {
    isPhoneValid = false;
    document.getElementById("phone_wrongValidation").style.display = "block";
    document.getElementById("phone_input").classList.add("is-invalid");
    document.getElementById("phone_input").classList.remove("is-valid");
    return false;
  }
}

function validateAge() {
  var ageInput = document.getElementById("age_input").value;
  var ageFormat = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;

  if (ageInput.match(ageFormat)) {
    isAgeValid = true;
    document.getElementById("age_wrongValidation").style.display = "none";
    document.getElementById("age_input").classList.add("is-valid");
    document.getElementById("age_input").classList.remove("is-invalid");
    return true;
  } else {
    isAgeValid = false;
    document.getElementById("age_wrongValidation").style.display = "block";
    document.getElementById("age_input").classList.add("is-invalid");
    document.getElementById("age_input").classList.remove("is-valid");
    return false;
  }
}

function validatePassword() {
  var passwordInput = document.getElementById("password_input").value;
  var passwordFormat =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  if (passwordInput.match(passwordFormat)) {
    isPasswordValid = true;
    document.getElementById("password_wrongValidation").style.display = "none";
    document.getElementById("password_input").classList.add("is-valid");
    document.getElementById("password_input").classList.remove("is-invalid");
    return true;
  } else {
    isPasswordValid = false;
    document.getElementById("password_wrongValidation").style.display = "block";
    document.getElementById("password_input").classList.add("is-invalid");
    document.getElementById("password_input").classList.remove("is-valid");
    return false;
  }
}

function validateRePassword() {
  var passwordInput = document.getElementById("password_input").value;
  var rePasswordInput = document.getElementById("rePassword_input").value;

  if (passwordInput == rePasswordInput) {
    isRePasswordValid = true;
    document.getElementById("rePassword_wrongValidation").style.display =
      "none";
    document.getElementById("rePassword_input").classList.add("is-valid");
    document.getElementById("rePassword_input").classList.remove("is-invalid");
    return true;
  } else {
    isRePasswordValid = false;
    document.getElementById("rePassword_wrongValidation").style.display =
      "block";
    document.getElementById("rePassword_input").classList.add("is-invalid");
    document.getElementById("rePassword_input").classList.remove("is-valid");
    return false;
  }
}
