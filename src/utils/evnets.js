import labelFactory from './labelFactory';
import utils from './utils';
import $ from 'jquery'

const addBtn = $('.add-button')
const modal = $('.modal')
const cancelBtn = $('.cancelBtn')
const confirmBtn = $('.confirmBtn')
const changeBtn = $('.changeBtn')
const searchFrame = $('.search-frame')
const inputs = modal.children().find('input')

// 保存编辑的Label实例
let currentEditInstance = null

// 添加animate.css动画统一的类名
// modal.addClass('animate__animated')

const resetInputsValue = () => {
  inputs.each((index, item) => {
    item.value = ''
  })
}

function windowOfEditLeave() {
  addBtn.show()
  modal.hide()
  // modal.removeClass("animate__backInLeft").addClass("animate__backOutLeft");
}

addBtn.on('click', () => {
  addBtn.hide()
  confirmBtn.show()
  changeBtn.hide()
  resetInputsValue()
  modal.show()
  // modal.removeClass("animate__backOutLeft").addClass("animate__backInLeft");
  // if (modal.hasClass("animate__backInLeft")) {
  //   modal.removeClass("animate__backInLeft").addClass("animate__backOutLeft");
  // } else if (modal.hasClass("animate__backOutLeft")) {
  //   modal.removeClass("animate__backOutLeft").addClass("animate__backInLeft");
  // } else {
  //   modal.addClass("animate__backInLeft");
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
    modal.show()
    // modal.removeClass("animate__backOutLeft").addClass("animate__backInLeft");
  } else {
    if (modal.is(":visible")) {
      cancelBtn.trigger("click")
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