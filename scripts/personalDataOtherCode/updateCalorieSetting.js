export function updateCalorieSetting () {
  document.querySelector('.js-calorie-setting-update-button')
    .addEventListener('click', () => {
      document
        .querySelectorAll('.js-calorie-save-setting-button, .js-calorie-goal, .js-calorie-range')
        .forEach((element) => {
          element.classList.remove('hidden-display');
        })

      document
        .querySelectorAll('.js-calorie-setting-update-button, .js-display-calorie-goal, .js-display-calorie-range')
        .forEach((element) => {
          element.classList.add('hidden-display');
        })
    })
}