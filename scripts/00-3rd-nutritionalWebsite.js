let totalCalories = JSON.parse(localStorage.getItem('totalCalories')) || 0;
const caloriesRecord = JSON.parse(localStorage.getItem('caloriesRecord')) || [];

/* Display total consumption upon opening the website */
document.querySelector('.js-display-message')
  .innerHTML = `Total calories consumption: ${totalCalories} calories`;
renderCaloriesRecord();

function calculateTotalCalories() {
  const carbIntakeElement = document.querySelector('.js-carb')
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

  /*
  
  }
  */

  carbIntakeElement.value = '';
  fatIntakeElement.value = '';
  proteinIntakeElement.value = '';
  caloriesIntakElement.value = '';
}

function renderCaloriesRecord () {
  let caloriesRecordHTML = '';

  for (let i = 0; i < caloriesRecord.length; i++) {
    const caloriesRecordObject = caloriesRecord[i];
    const { calories, date } = caloriesRecordObject;
    let message = '';

    if (calories >= 2800 && calories <= 3000) {
      message = 'Congrats! Your calories goal is achieved for today!'
    } else if (calories < 2800) {
      message = `You need ${2800 - calories} to ${3000 - calories} calories to achieve today's goal`;
    } else if (calories > 3000) {
      message = `Stop eating bro!`;
      }

    const html = `
      <div>${calories}</div>
      <div>${date}</div>
      <div>${message}</div> 
      <button onclick="
        caloriesRecord.splice(${i}, 1);
        renderCaloriesRecord();
        localStorage.setItem('caloriesRecord', JSON.stringify(caloriesRecord));
      " class="delete-button">Delete</button>
        
    `;

    caloriesRecordHTML += html;
  }

  document.querySelector('.js-nutrition-record')
    .innerHTML = caloriesRecordHTML;
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
  console.log(caloriesRecord);

  renderCaloriesRecord();

  totalCalories = 0;
  localStorage.setItem('totalCalories', JSON.stringify(totalCalories));
  document.querySelector('.js-display-message').
    innerHTML = `Calories consumption has been updated to the below table. Calories consumption is now reset to ${totalCalories} kcal.`
}


// function that caculate total calories by pressing the Enter key
function handleEnterKey (event) {
  if (event.key === 'Enter') {
    calculateTotalCalories ();
  }
}