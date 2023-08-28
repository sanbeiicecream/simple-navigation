import labelFactory from './labelFactory';
import utils from './utils';

const addBtn = $('.add-button')
const editWindow = $('.edit-window')
const cancelBtn = $('.cancelBtn')
const confirmBtn = $('.confirmBtn')
const changeBtn = $('.changeBtn')
const searchFrame = $('.search-frame')
const inputs = editWindow.children().find('input')

// 保存编辑的Label实例
let currentEditInstance = null

// 添加animate.css动画统一的类名
editWindow.addClass('animate__animated')

const resetInputsValue = () => {
  inputs.each((index, item) => {
    item.value = ''
  })
}

function windowOfEditLeave() {
  addBtn.show()
  editWindow.removeClass("animate__backInLeft").addClass("animate__backOutLeft");
}

addBtn.on('click', () => {
  addBtn.hide()
  confirmBtn.show()
  changeBtn.hide()
  resetInputsValue()
  editWindow.removeClass("animate__backOutLeft").addClass("animate__backInLeft");
  // if (editWindow.hasClass("animate__backInLeft")) {
  //   editWindow.removeClass("animate__backInLeft").addClass("animate__backOutLeft");
  // } else if (editWindow.hasClass("animate__backOutLeft")) {
  //   editWindow.removeClass("animate__backOutLeft").addClass("animate__backInLeft");
  // } else {
  //   editWindow.addClass("animate__backInLeft");
  // }
})

cancelBtn.on('click', () => {
  windowOfEditLeave()
})

confirmBtn.on('click', () => {
  windowOfEditLeave()
  const inputsValue = { delete: 0, id: parseInt(utils.findMaxId()) + 1 + '' }
  labelFactory.Label.listCount++
  inputs.each((index, item) => {
    inputsValue[item.name] = item.value
  })
  if (!inputsValue.name || !inputsValue.url) {
    return
  }
  inputsValue.url = utils.addProtocolToURL(inputsValue.url)
  if (!utils.validateUrl(inputsValue.icon)) {
    inputsValue.icon = ''
  }
  utils.addData(inputsValue)
  labelFactory.create({
    data: inputsValue
  });
})

changeBtn.on('click', () => {
  windowOfEditLeave()
  const inputsValue = {}
  inputs.each((index, item) => {
    inputsValue[item.name] = item.value
  })
  inputsValue.url = utils.addProtocolToURL(inputsValue.url)
  const updateData = { ...(currentEditInstance?.data), ...inputsValue }
  currentEditInstance?.update?.(updateData)
  utils.updateData(updateData)
  resetInputsValue()
})


// 自定义事件
document.addEventListener('globalEvent', function (event) {
  event.stopPropagation()
  currentEditInstance = event.detail.instance
  if (event.detail.showWindow) {
    inputs.each((index, item) => {
      item.value = event.detail.instance.data?.[item.name] || ''
    })
    confirmBtn.hide()
    changeBtn.show()
    editWindow.removeClass("animate__backOutLeft").addClass("animate__backInLeft");
  } else {
    if (editWindow.hasClass('animate__backInLeft')) {
      cancelBtn.click()
    }
  }
});

// 回车事件
window.addEventListener('keyup', (ev) => {
  ev.preventDefault()
  ev.stopPropagation()
  if (ev.code === 'Enter' && searchFrame.val()) {
    window.location.href = `https://www.baidu.com/s?&wd=${searchFrame.val()}`
  }
})