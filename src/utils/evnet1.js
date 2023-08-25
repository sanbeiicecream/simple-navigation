const addBtn = $('.add-button')
const editWindow = $('.edit-window')
const cancelBtn = $('.cancelBtn')
const confirmBtn = $('.confirmBtn')


editWindow.addClass('animate__animated')


addBtn.bind('click', () => {
  if (editWindow.hasClass("animate__backInLeft")) {
    editWindow.removeClass("animate__backInLeft").addClass("animate__backOutLeft");
  } else if (editWindow.hasClass("animate__backOutLeft")) {
    editWindow.removeClass("animate__backOutLeft").addClass("animate__backInLeft");
  } else {
    editWindow.addClass("animate__backInLeft");
  }
})

