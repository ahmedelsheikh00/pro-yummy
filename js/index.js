let rowData=document.getElementById('cartona')
let search=document.getElementById('search')
let btnSubmit;

$(document).ready(function () {
  home().then(()=>{
     $('.loading').fadeOut(500,function(){
    
    $('body').css({'overflow':'auto'})
  });
  })
});


// open-close aside
function closeAside() {
    let widthAside=$('.aside-body').outerWidth();
  $('aside').animate({left:-widthAside},500)   
  $('.open').css('display', 'block');
  $('.close').css('display', 'none');  
  for (let i = 0; i < 6; i++) {
    
    $('.list ul li').eq(i).animate({top:300},(i+5)*100)
  }
}
function openAside() {
    
    $('aside').animate({left:'0px'},500)  
    $('.open').css('display', 'none');
    $('.close').css('display', 'block');   
   
 for (let i = 0; i < 6; i++) {
    
    $('.list ul li').eq(i).animate({top:0},(i+5)*100)
  }
}
closeAside()
$('.open-close-aside').click(function () { 
if ($('aside').css('left') == '0px' ) {
closeAside();
}else{
openAside();
}
});

// click active link
$('.list li').click((e)=>{
  let name=e.target.getAttribute('name')
    $(e.target).addClass("active")
    $('.list li').not(e.target).removeClass('active');

    if (name === 'category') {
      search.innerHTML=''
      getCategory();
      closeAside()
    }else if (name === 'area') {
      search.innerHTML=''
      getArea();
      closeAside()
    }else if (name === 'ingredients') {
     search.innerHTML='' 
     getIngredients();
      closeAside()
      
    }else if (name === 'home') {
      search.innerHTML=''
      home()
      closeAside()

    }else if (name === 'search') {
         
      showpageSearch()
      closeAside()

    }else{
      search.innerHTML=''
      closeAside()
      showpageContact()

    }
})


// home

async function home(){
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`,{method:"Get"})
response=await response.json();
let data=response.meals
displayMeals(data) 
}

function displayMeals(arr) {
  $('.loading').fadeIn(500)

  let cartona=``
arr.forEach(meal => {
cartona+=`
<div class="offset-2 col-10 offset-md-0 col-md-3" onclick="getMealDetails('${meal.idMeal}')">
            <div class="meal position-relative overflow-hidden rounded-4">
              <img src="${meal.strMealThumb}" alt="" class="img-fluid h-100 w-100 ">
              <div class="text-meal d-flex flex-column justify-content-center align-items-center  bg-dark bg-opacity-50 position-absolute   w-100  h-100 ">
                <h3 class='text-white'>${meal.strMeal}</h3>
              </div>
            </div>
        </div>
`


  rowData.innerHTML=cartona
  $('.loading').fadeOut(500)

});
}

// category

async function getCategory() {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()
  let data=response.categories
  // id , name , img , desc
  displayCategory(data)
}
function displayCategory(arr) {
  $('.loading').fadeIn(500)

  let cartona=``
  arr.forEach(meal => {
  cartona+=`
  <div   class="offset-2 col-10 offset-md-0 col-md-3" onclick="findCategory('${meal.strCategory}')">
              <div class="meal position-relative overflow-hidden rounded-4" >
                <img src="${meal.strCategoryThumb}" alt="" class="img-fluid h-100 w-100 ">
                <div class="text-meal overflow-auto p-2 bg-dark bg-opacity-50 position-absolute w-100  h-100">
                  <h3 class='text-white text-center'>${meal.strCategory}</h3>
                  <p class="lead text-opacity-75 text-light text-center">${meal.strCategoryDescription}</p>
                </div>
              </div>
          </div>
  `
  
  
    rowData.innerHTML=cartona
    $('.loading').fadeOut(500)

    
  });
}

// area

async function getArea() {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json()
  let data=response.meals
  
  displayArea(data)
 
}
function displayArea(arr) {
  $('.loading').fadeIn(500)

  let cartona=``
  arr.forEach(meal => {
  cartona+=`
  <div class="offset-2 col-10 offset-md-0 col-md-3" onclick="findArea('${meal.strArea}')">
              <div class="meal text-center">
              <i class="fa-solid fa-house-laptop text-white fa-8x"></i>
              <h1 class='text-white mt-3'>${meal.strArea}</h1>
              </div>
          </div>
  `  
    rowData.innerHTML=cartona
    $('.loading').fadeOut(500)

    
  });
}


// Ingredients

async function getIngredients() {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()
  let data=response.meals.splice(0,20)
  displayIngredients(data)
 
}
function displayIngredients(arr) {
  $('.loading').fadeIn(500)

  let cartona=``
  arr.forEach(meal => {
    

  cartona+=`
  <div class="offset-2 col-10 offset-md-0 col-md-3 p-2" onclick="findIngredients('${meal.strIngredient}')">
              <div class="meal text-center">
              <i class="fa-solid fa-drumstick-bite  text-white fa-4x"></i>
              <h3 class='text-white my-3'>${meal.strIngredient}</h3>
              <p class='text-white lead text-opacity-50 m-0 p-0'>${meal.strDescription.split(' ').splice(0,15).join(' ')}</p>
              </div>
          </div>
  `  
    rowData.innerHTML=cartona
    $('.loading').fadeOut(500)

    
  });
}



//click category
async function findCategory(term) {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`)
  response = await response.json()
  let data=response.meals
 displayMeals(data)
}


//click Area
async function findArea(term) {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`)
  response = await response.json()
  let data=response.meals.splice(0,20)
  displayMeals(data)
}

//click Ingredients
async function findIngredients(term) {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
  response = await response.json()
  let data=response.meals.splice(0,20)
  displayMeals(data)
}

// click Details
async function getMealDetails(mealID){
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
response=await response.json()
let data=response.meals
displayMealDetails(data)
}

function displayMealDetails(meal) {
  $('.loading').fadeIn(500)

  let cartona=`
  <div class="offset-2 offset-md-0 col-10 col-md-4 text-white">
  <img src="${meal[0].strMealThumb}" alt="" class="img-fluid rounded-2">
  <h1 class="mt-3 text-center text-md-start h4">${meal[0].strMeal}</h1>
</div>
<div class="offset-2 offset-md-0 col-10 col-md-8 text-white">
  <h1>Instructions</h1>
  <p>${meal[0].strInstructions}</p>
  <h2>Area : ${meal[0].strArea}</h2>
  <h2>Category : ${meal[0].strCategory}</h2> 

  <div class="my-3">
    <button class="btn btn-danger">
    <a href="${meal[0].strYoutube}" target="_blank" class="text-white">
    youtube
    </a>
    </button>
    <button class="btn btn-success">
    <a href="${meal[0].strSource}" target="_blank" class="text-white">
    source
    </a>
    </button>
  </div>
</div>
  
  `
  
  rowData.innerHTML=cartona
  $('.loading').fadeOut(700)


}

// Search

function showpageSearch(){
  search.innerHTML=`
  <div class="offset-2 offset-md-0 col-10 col-md-6">
      <input type="search" class="form-control" placeholder="Search by name" oninput="searchByName(this.value)">

    </div>
    <div class="offset-2 offset-md-0 col-10 col-md-6">
      <input type="search" maxlength="1" class="form-control" placeholder="Search by first litter" oninput="searchByFristLitter(this.value)">

    </div>
  `
  rowData.innerHTML=''
}
async function searchByName(term){
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`,{method:"Get"})
  response=await response.json();
  if (response.meals) {
    displayMeals(response.meals)
  }else{
    rowData.innerHTML=''
  }
  }
async function searchByFristLitter(term){
  term == '' ? term='a' : ''
 let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`,{method:"Get"})
  response=await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([])
  
  }


// contacts
function showpageContact(){
  rowData.innerHTML=`
  <div class="row m-0 g-3">
  <div class="col-10 offset-2 offset-md-0 col-md-6">
    <input oninput="inputsValidition()" id="nameInput" type="text" class="form-control is-invalid" placeholder="Name">
    <div class="alert alert-danger w-100 mt-2 d-none" id="nameAlert">
      A simple danger alert—check it out!
     </div>

  </div>
  <div class="col-10 offset-2 offset-md-0 col-md-6">
    <input oninput="inputsValidition()" id="emailInput" type="email" class="form-control is-invalid" placeholder="Email">
  
    <div class="alert alert-danger w-100 mt-2 d-none" id="emailAlert">
      Email not valid *example@yyy.zzz
     </div>
  
  </div>
  <div class="col-10 offset-2 offset-md-0 col-md-6">
    <input oninput="inputsValidition()" id="phoneInput" type="number" class="form-control is-invalid" placeholder="Phone">
    <div class="alert alert-danger w-100 mt-2 d-none" id="phoneAlert">
     enter  valid Phone Number
     </div>
  </div>
  <div class="col-10 offset-2 offset-md-0 col-md-6">
    <input oninput="inputsValidition()" id="ageInput" type="number" class="form-control is-invalid" placeholder="Age">
    <div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">
    enter  valid age
    </div>
  </div>
  <div class="col-10 offset-2 offset-md-0 col-md-6">
    <input oninput="inputsValidition()" id="passwordInput" type="password" class="form-control is-invalid" placeholder="password">
    <div class="alert alert-danger w-100 mt-2 d-none" id="passAlert">
    enter  valid password *minimum eight characters,at least one letter and one number :*
    </div>
  </div>
  <div class="col-10 offset-2 offset-md-0 col-md-6">
    <input oninput="inputsValidition()" id="repasswordInput" type="password" class="form-control is-invalid" placeholder="repassword">
    <div class="alert alert-danger w-100 mt-2 d-none" id="repassAlert">
    enter  valid repassword match password
    </div>
  </div>
  <div class="col-10 offset-2 offset-md-0 col-md-12 text-center">
    <button id="submit" disabled class="btn btn-danger ">
      submit
    </button>

  </div>

</div>
`

btnSubmit=document.getElementById('submit')

document.getElementById('nameInput').addEventListener('focus',()=>{
  nameInputTouched=true
})
document.getElementById('phoneInput').addEventListener('focus',()=>{
  phoneInputTouched=true
})
document.getElementById('ageInput').addEventListener('focus',()=>{
  ageInputTouched=true
})
document.getElementById('passwordInput').addEventListener('focus',()=>{
  passInputTouched=true
})
document.getElementById('repasswordInput').addEventListener('focus',()=>{
  repassInputTouched=true
})
document.getElementById('emailInput').addEventListener('focus',()=>{
  emailInputTouched=true
})


}

// كل input ليه func .1, inputالي عملتهم لكل func كبيره تشيل ال6 func .2
let nameInputTouched=false;
let emailInputTouched=false;
let ageInputTouched=false;
let passInputTouched=false;
let repassInputTouched=false;
let phoneInputTouched=false;

function inputsValidition(){
if (nameInputTouched) {
  if (nameValidition()) {
    document.getElementById('nameAlert').classList.replace('d-block','d-none')
    document.getElementById('nameInput').classList.replace('is-invalid','is-valid')
  }
  else{
    document.getElementById('nameAlert').classList.replace('d-none','d-block')
    document.getElementById('nameInput').classList.replace('is-valid','is-invalid')

  
  }
}

if (emailInputTouched) {
  if (emailValidition()) {
    document.getElementById('emailAlert').classList.replace('d-block','d-none')
    document.getElementById('emailInput').classList.replace('is-invalid','is-valid')

  }
  else{
    document.getElementById('emailAlert').classList.replace('d-none','d-block')
    document.getElementById('emailInput').classList.replace('is-valid','is-invalid')

  
  }
}
if (phoneInputTouched) {
  if (phoneValidition()) {
    document.getElementById('phoneAlert').classList.replace('d-block','d-none')
    document.getElementById('phoneInput').classList.replace('is-invalid','is-valid')

  }
  else{
    document.getElementById('phoneAlert').classList.replace('d-none','d-block')
    document.getElementById('phoneInput').classList.replace('is-valid','is-invalid')

  
  }
}
if (ageInputTouched) {
  if (ageValidition()) {
    document.getElementById('ageAlert').classList.replace('d-block','d-none')
    document.getElementById('ageInput').classList.replace('is-invalid','is-valid')

  }
  else{
    document.getElementById('ageAlert').classList.replace('d-none','d-block')
    document.getElementById('ageInput').classList.replace('is-valid','is-invalid')

  
  }
}
if (passInputTouched) {
  if (passwordValidition()) {
    document.getElementById('passAlert').classList.replace('d-block','d-none')
    document.getElementById('passwordInput').classList.replace('is-invalid','is-valid')

  }
  else{
    document.getElementById('passAlert').classList.replace('d-none','d-block')
    document.getElementById('passwordInput').classList.replace('is-valid','is-invalid')

  
  }
}
if (repassInputTouched) {
  if (repasswordValidition()) {
    document.getElementById('repassAlert').classList.replace('d-block','d-none')
    document.getElementById('repasswordInput').classList.replace('is-invalid','is-valid')

  }
  else{
    document.getElementById('repassAlert').classList.replace('d-none','d-block')
    document.getElementById('repasswordInput').classList.replace('is-valid','is-invalid')

  
  }
}
if ( nameValidition() && emailValidition() && phoneValidition() && ageValidition() && passwordValidition() && repasswordValidition() ) {
    btnSubmit.removeAttribute('disabled')
}else{
   btnSubmit.setAttribute('disabled',true)

    }
  

}
function nameValidition(){
  let valueName=document.getElementById('nameInput').value
  let regax=/^[a-zA-z ]+$/.test(valueName)
  return regax
}
function emailValidition(){
  let valueEmail=document.getElementById('emailInput').value
  let regax= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valueEmail)

  return regax
}
function ageValidition(){
  let valueAge=document.getElementById('ageInput').value
  let regax= /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(valueAge)

  return regax

}
function passwordValidition(){
  let valuePass=document.getElementById('passwordInput').value
  let regax=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(valuePass)
  return regax
}
function repasswordValidition(){
  let valueRepass=document.getElementById('repasswordInput').value
  let valuePass=document.getElementById('passwordInput').value
return valuePass == valueRepass
}
function phoneValidition(){
  let valuePhone=document.getElementById('phoneInput').value
  let regax= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(valuePhone)

  return regax

}