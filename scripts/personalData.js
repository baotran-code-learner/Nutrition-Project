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