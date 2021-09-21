function addFormat() {
  $('.add').css('visibility', 'visible')
  $('.add').attr('style', 'opacity: .3;')
}

function addSiteFormat() {
  setTimeout(() => {
    $('.url').val('')
    $('.name').val('')
  }, 150)
  $('.add').removeClass('add-window-animation-display')
  $('#add-window').addClass('add-window-animation-hidden')
}

function addSiteAnimation() {
  $('#add-window').css('visibility', 'visible')
  $('#add-window').removeClass()
  $('#add-window').removeClass('add-window-animation-hidden')
  $('#add-window').addClass('add-window-animation-display')
  // TODO 添加蒙版效果
}

function createId() {
  const maxId = JSON.parse(localStorage.getItem('maxId') || '-1') + 1
  localStorage.setItem('maxId', maxId + '')
  return maxId
}

function editSite(dataIndex) {
  let siteObj = getValueAndNameById(dataIndex)
  $('.name').val(siteObj.name)
  $('.url').val(siteObj.url)
  $('.confirmButton').text('修改').addClass('changeButton').removeClass('confirmButton')
  addSiteAnimation()
  $('#add-window').attr('data-id', dataIndex)
}

function changeSite() {
  let siteName = $('.name').val()
  let siteUrl = $('.url').val()
  let siteObj = {}
  if ($('.url').val().indexOf('http') === -1) {
    siteObj['url'] = 'https://' + $('.url').val()
  } else {
    siteObj['url'] = $('.url').val()
  }
  siteObj['name'] = siteName
  siteObj['id'] = $('#add-window').data('id')
  addFormat()
  $('.name').val('')
  $('.url').val('')
  editLocalStorage(siteObj)
}

function getValueAndNameById(id) {
  let siteData = JSON.parse(localStorage.getItem('siteData'))
  return siteData.find(item => item.id === id)
}


function addLocalStorage(siteObj) {
  const siteData = JSON.parse(localStorage.getItem('siteData') || '[]')
  siteData.push(siteObj)
  localStorage.setItem('siteData', JSON.stringify(siteData))
}

function getSiteIndexByName(name) {
  let siteData = JSON.parse(localStorage.getItem('siteData'))
  return siteData.lastIndexOf(name)
}

function editLocalStorage(siteObj) {
  let siteData = JSON.parse(localStorage.getItem('siteData') || '[]')
  const index = siteData.findIndex(item => item.id === siteObj.id)
  siteData.splice(index, 1, siteObj)
  localStorage.setItem('siteData', JSON.stringify(siteData))
}

function removeLocalStorage(id) {
  let siteData = JSON.parse(localStorage.getItem('siteData') || '[]')
  const index = siteData.findIndex(item => item.id === id)
  siteData.splice(index, 1)
  localStorage.setItem('siteData', JSON.stringify(siteData))
}

export {
  addFormat,
  addSiteFormat,
  addSiteAnimation,
  editSite,
  changeSite,
  addLocalStorage,
  getSiteIndexByName,
  editLocalStorage,
  removeLocalStorage,
  getValueAndNameById,
  createId
}