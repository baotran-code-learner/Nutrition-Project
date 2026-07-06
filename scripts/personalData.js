import { updateCalorieSetting } from "./personalDataOtherCode/updateCalorieSetting.js";

let foodAllergensRecord = JSON.parse(localStorage.getItem('foodAllergensRecord')) || [];
let foodIntoleranceRecord = JSON.parse(localStorage.getItem('foodIntoleranceRecord')) || [];

setupFoodList({
  buttonClass: 'js-add-button-food-allergens',
  inputClass: 'js-food-allergen-input',
  displayClass: 'js-display-food-allergens',
  storageKey: 'foodAllergensRecord'
});

setupFoodList({
  buttonClass: 'js-add-button-food-intolerance',
  inputClass: 'js-food-intolerance-input',
  displayClass: 'js-display-food-intolerance',
  storageKey: 'foodIntoleranceRecord'
});

// A better version
function setupFoodList({ buttonClass, inputClass, displayClass, storageKey}) {
  let foodDataArray = JSON.parse(localStorage.getItem(storageKey)) || [];

  renderData();

  document.querySelector(`.${buttonClass}`)
    .addEventListener('click', () => {
      const inputElement = document.querySelector(`.${inputClass}`);
      const foodData = inputElement.value;

      foodDataArray.push(foodData);

      localStorage.setItem(storageKey, JSON.stringify(foodDataArray));

      inputElement.value = '';

      renderData ();
    });

  function renderData() {
    let recordHTML = '';

    foodDataArray.forEach((data, index) => {
      recordHTML += `
        <div class="food-record">
          <span>${data}</span>
          <button class="js-remove-button" data-index=${index}>Remove</button>
        </div
      `;
    });

    document.querySelector(`.${displayClass}`)
      .innerHTML = recordHTML;

    document.querySelectorAll('.js-remove-button')
      .forEach((removeButton) => {
        removeButton.addEventListener('click', () => {
          const index = removeButton.dataset.index;
          foodDataArray.splice(index, 1);

          localStorage.setItem(storageKey, JSON.stringify(foodDataArray));

          renderData ();
        });
      });
  }
}


// Save calorie setting
let calorieGoal = JSON.parse(localStorage.getItem('calorieGoal')) || 0;
let calorieRange = JSON.parse(localStorage.getItem('calorieRange')) || 0;

setupCalorieSetting();

function setupCalorieSetting() {
  document.querySelector('.js-calorie-save-setting-button')
    .addEventListener('click', () => {
      const calorieElement = document.querySelector('.js-calorie-goal')
      const calorie = Number(calorieElement.value);

      const rangeElement = document.querySelector('.js-calorie-range')
      const range = Number(rangeElement.value);

      rangeElement.value = '';
      calorieElement.value = '';

      if (
        Number.isNaN(calorie) || 
        Number.isNaN(range) || 
        range < 0 ||
        range > 100 ||
        calorie <= 0
      ) {
        alert("This is not a valid number/range.");
        return;
      }

      calorieGoal = calorie;
      calorieRange = range;
      
      //calorieRangeWithPercentage = `${calorieRange} %`
      //console.log(calorieRangeWithPercentage);

      localStorage.setItem('calorieGoal', JSON.stringify(calorieGoal));
      localStorage.setItem('calorieRange', JSON.stringify(calorieRange));

      document.querySelector('.js-display-calorie-goal')
        .innerHTML = calorieGoal;
      document.querySelector('.js-display-calorie-range')
        .innerHTML = `${calorieRange} %`;

      // Make the "save" button disappear and "update" button appear after clicking it
      document
        .querySelectorAll('.js-calorie-save-setting-button, .js-calorie-goal, .js-calorie-range')
        .forEach((element) => {
          element.classList.add('hidden-display');
        })

      document
        .querySelectorAll('.js-calorie-setting-update-button, .js-display-calorie-goal, .js-display-calorie-range')
        .forEach((element) => {
          element.classList.remove('hidden-display');
        })
    })
}

updateCalorieSetting();

document.querySelector('.js-display-calorie-goal')
  .innerHTML = calorieGoal;
document.querySelector('.js-display-calorie-range')
  .innerHTML = `${calorieRange} %`;

// Save/load Celiac disease (radio: yes/no)
let celiacDisease = localStorage.getItem('celiacDisease') || '';

document.querySelectorAll('input[name="celiac-disease"]').forEach((radio) => {
  if (radio.value === celiacDisease) {
    radio.checked = true;
  };

  radio.addEventListener('change', () => {
    if (radio.checked) {
      localStorage.setItem('celiacDisease', radio.value);
    }
  });
});

/* 
function savePersonalData (buttonLink, inputLink, foodDataArray, storageKey, displayLink) {
  document.querySelector(`.${buttonLink}`)
    .addEventListener('click', () => {
      const foodAdverseReactionElement = document.querySelector(`.${inputLink}`);
      const foodAdverseReaction = foodAdverseReactionElement.value;

      foodDataArray.push(foodAdverseReaction);

      localStorage.setItem(storageKey, JSON.stringify(foodDataArray));

      foodAdverseReactionElement.value = '';

      renderData (foodDataArray, displayLink, storageKey);
    });
}


function renderData (foodDataArray, displayLink, storageKey) {
  let recordHTML = '';

  foodDataArray.forEach((data, index) => {
    const html = `
      <div class="food-record">
        <span>${data}</span>
        <button class="js-remove-button" data-index=${index}>Remove</button>
      </div
    `;

    recordHTML += html;
  });

  document.querySelector(`.${displayLink}`)
    .innerHTML = recordHTML;

  document.querySelectorAll('.js-remove-button')
    .forEach((removeButton) => {
      removeButton.addEventListener('click', () => {
        const index = removeButton.dataset.index;
        foodDataArray.splice(index, 1);

        localStorage.setItem(storageKey, JSON.stringify(foodDataArray));

        renderData (foodDataArray, displayLink, storageKey);
      });
    });
}
*/