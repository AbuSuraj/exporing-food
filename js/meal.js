const loadMeals = (search) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};
const displayMeals = (meals) => {
  console.log(meals);
  const mealContainer = document.getElementById("food-container");
  mealContainer.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
  <div class="card">
  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">'${meal.strMeal}'</h5>
    <p class="card-text">
      '${meal.strInstructions.slice(0, 200)}'
    </p>
    <button data-bs-toggle="modal" data-bs-target="#exampleModal"   onclick="mealDetail(${
      meal.idMeal
    })" class="btn btn-warning">Details</button>
  </div>
</div>
  `;
    mealContainer.appendChild(mealDiv);
  });
};
// loadMeals("rice");

const searchFood = () => {
  const inputField = document.getElementById("input-field");
  const item = inputField.value;
  inputField.value = "";
  //   console.log(item);
  loadMeals(item);
};

const mealDetail = (id) => {
  //   console.log(id);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => mealDetailDisplay(data.meals[0]));
};

const mealDetailDisplay = (meal) => {
  //   console.log(meal);
  const foodDetail = document.getElementById("meal-detail");
  foodDetail.innerHTML = "";
  const foodDiv = document.createElement("div");
  foodDiv.classList.add("modal-content");
  foodDiv.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title" id="exampleModalLabel">'${meal.strMeal}'</h2>
      </div>
      <div class="modal-body">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
      
         <p class="card-text">
        '${meal.strInstructions.slice(0, 200)}'
     </p>
      <h4>Region: '${meal.strArea}'</h4>
       <h4>Category: '${meal.strCategory}'</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        
      </div>
    
  
  `;
  //   foodDiv.innerHTML = `
  //   <div class="card">
  //     <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
  //     <div class="card-body">
  //       <h3 class="card-title">'${meal.strMeal}'</h3>
  //       <p class="card-text">
  //      '${meal.strInstructions.slice(0, 200)}'
  //      </p>
  //     <h4>Region: '${meal.strArea}'</h4>
  //     <h4>Category: '${meal.strCategory}'</h4>

  //    </div>
  // </div>
  //     `;
  foodDetail.appendChild(foodDiv);
};
