let foodAllergensRecord = JSON.parse(localStorage.getItem('foodAllergensRecord')) || [];
let foodIntoleranceRecord = JSON.parse(localStorage.getItem('foodIntoleranceRecord')) || [];

savePersonalData(
  'js-add-button-food-allergens',
  'js-food-allergen-input',
  foodAllergensRecord,
  'foodAllergensRecord',
  'js-display-food-allergens'
);

savePersonalData(
  'js-add-button-food-intolerance',
  'js-food-intolerance-input',
  foodIntoleranceRecord,
  'foodIntoleranceRecord',
  'js-display-food-intolerance'
);

renderData (foodAllergensRecord, 'js-display-food-allergens', 'foodAllergensRecord');
renderData(foodIntoleranceRecord, 'js-display-food-intolerance', 'foodIntoleranceRecord');

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