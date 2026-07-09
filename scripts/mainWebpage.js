let totalCalories = JSON.parse(localStorage.getItem('totalCalories')) || 0;
let caloriesRecord = JSON.parse(localStorage.getItem('caloriesRecord')) || [];

const calorieGoal = Number(JSON.parse(localStorage.getItem('calorieGoal')) || 0);
const calorieRange = Number(JSON.parse(localStorage.getItem('calorieRange')) || 0);

/* Display total consumption upon opening the website */
document.querySelector('.js-display-message')
  .innerHTML = `Total calories consumption: ${totalCalories} calories`;
renderCaloriesRecord();

function calculateTotalCalories() {
  const carbIntakeElement = document.querySelector('.js-carb');
  const carbIntake = carbIntakeElement.value;
  const proteinIntakeElement = document.querySelector('.js-protein');
  const proteinIntake = proteinIntakeElement.value;
  const fatIntakeElement = document.querySelector('.js-fat');
  const fatIntake = fatIntakeElement.value;
  const caloriesIntakElement = document.querySelector('.js-calories-intake');
  const caloriesIntake = caloriesIntakElement.value;

  totalCalories = totalCalories + Number(carbIntake) * 4 + Number(proteinIntake) * 4 + Number(fatIntake) * 9 + Number(caloriesIntake);
  document.querySelector('.js-display-message').innerHTML = `Total calories consumption is ${totalCalories} calories.`;

  localStorage.setItem('totalCalories', JSON.stringify(totalCalories));

  // Reset all input boxes
  carbIntakeElement.value = '';
  fatIntakeElement.value = '';
  proteinIntakeElement.value = '';
  caloriesIntakElement.value = '';
}

// Calculate total calories by pressing the Enter key
document.querySelector('.js-calories-intake')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      calculateTotalCalories();
    }
  })

document.querySelector('.js-calculate-button')
  .addEventListener('click', () => {
    calculateTotalCalories();
  })

function renderCaloriesRecord () {
  let caloriesRecordHTML = '';
  const lowerCalorieRange = calorieGoal - (calorieGoal * calorieRange * 0.01);
  const upperCalorieRange = calorieGoal + (calorieGoal * calorieRange * 0.01);

  for (let i = 0; i < caloriesRecord.length; i++) {
    const caloriesRecordObject = caloriesRecord[i];
    const { calories, date } = caloriesRecordObject;
    let message = '';

    if (calories >= lowerCalorieRange && calories <= upperCalorieRange) {
      message = 'Congrats! Your calories goal is achieved for today!'
    } else if (calories < lowerCalorieRange) {
      message = `You need ${lowerCalorieRange - calories} to ${upperCalorieRange - calories} calories to achieve today's goal`;
    } else if (calories > upperCalorieRange) {
      message = `Stop eating bro!`;
      }

    const html = `
      <div>${calories}</div>
      <div>${date}</div>
      <div>${message}</div> 
      <button class="js-delete-button delete-button" data-index="${i}">Delete</button>
    `;

    caloriesRecordHTML += html;
  }

  document.querySelector('.js-nutrition-record')
    .innerHTML = caloriesRecordHTML;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const index = Number(deleteButton.dataset.index);
        caloriesRecord.splice(index, 1);
        renderCaloriesRecord();
        localStorage.setItem('caloriesRecord', JSON.stringify(caloriesRecord));
      })
    })
}

function addCaloriesRecords () {
  const calories = totalCalories;

  const dateElement = document.querySelector('.js-date-input');
  const date = dateElement.value;

  // for loop that adds calories to existing date (if any); otherwise, create a new object inside the array
  let foundSameDate = false;

  for (let i = 0; i < caloriesRecord.length; i++) {
    if (date === caloriesRecord[i].date) {
      caloriesRecord[i].calories += calories;
      foundSameDate = true;
      break;
    }
  }

  if (foundSameDate === false ) {
    caloriesRecord.push({
      calories,
      date
    })
  }
     
  localStorage.setItem('caloriesRecord', JSON.stringify(caloriesRecord))

  renderCaloriesRecord();

  totalCalories = 0;
  localStorage.setItem('totalCalories', JSON.stringify(totalCalories));
  document.querySelector('.js-display-message').
    innerHTML = `Calories consumption has been updated to the below table. Calories consumption is now reset to ${totalCalories} kcal.`
}

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addCaloriesRecords();
  })

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    totalCalories = 0;
    localStorage.setItem('totalCalories', JSON.stringify(totalCalories));
    document.querySelector('.js-display-message').innerHTML = `Total calories consumption: ${totalCalories} calories.`
  })
