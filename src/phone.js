import {
  addFormat,
  addSiteFormat,
  addSiteAnimation,
  editSite,
  changeSite,
  addLocalStorage,
  getSiteIndexByName,
  removeLocalStorage,
  getValueAndNameById
} from './utils'

export default function phoneJs() {
  let $search_frame = $('.search-frame')
  let $add = $('.add')
  let $addSite = $('#add-window')
  let $cancelButton = $('.cancelButton')
  let $siteList = $('.site-list')
  let $addWindow = $('#add-window')
  let deleteList = []
  let isDispatch = true
  let localSiteData = JSON.parse(localStorage.getItem('siteData')) || {}
  document.ontouchstart = (() => {
    isDispatch = true
    if ($addSite.css('visibility') === 'hidden') {
      $('ul > li').removeClass()
      addFormat()
      if (deleteList.length > 0) {
        removeLocalStorage(deleteList)
        deleteList.length = 0
      }
    } else if ($('ul>li').hasClass('edit')) {
      $search_frame.blur()
    }
    
  })
  
  function loadSite() {
    $('.add-container').siblings().remove()
    if (localSiteData.length > 0) {
      append_site(JSON.parse(localStorage.getItem('siteData')))
    }
  }
  
  $(function ($) {
    loadSite()
  })
  
  $addSite.on('touchstart', (e) => {
    e.stopPropagation()
  })
  
  $search_frame.focus((e) => {
    if ($addSite.hasClass('add-window-animation-display')) {
      $search_frame.blur()
    } else {
      $('.searchButton').attr('style', 'visibility: visible')
      $('#headStyle').attr('style', 'margin-top: 130px')
    }
    
  })
  $search_frame.blur((e) => {
    if (e.target.value !== '') {
      $('#headStyle').attr('style', 'margin-top: 165px')
    } else {
      $('#headStyle').attr('style', 'margin-top: 165px')
      $('.searchButton').attr('style', 'visibility: hidden')
    }
    
  })

// TODO 使用location指定 不用表单提交
  $('.searchButton').on('touchstart', (e) => {
    let val = $search_frame.val()
    if (val === '') {
      $search_frame.blur()
    } else if (val.substr(0, 4) === 'http') {
      location.href = val
    } else if (val.substr(0, 3) === 'www') {
      location.href = 'https://' + val
    } else {
      location.href = 'https://www.baidu.com/s?wd=' + val
    }
    $search_frame.val('')
    $('#headStyle').attr('style', 'margin-top: 165px')
    return false
  })
  
  $add.on('touchstart', ((e) => {
    e.stopPropagation()
    if ($add.css('opacity') === '0.3') {
      $add.attr('style', 'opacity: 1;')
      addSiteAnimation()
    }
  }))
  
  
  $cancelButton.on('touchstart', ((e) => {
    $('ul > li').removeClass()
    addFormat()
    $addSite.removeClass()
    addSiteFormat()
    addFormat()
    if ($('.changeButton') !== undefined) {
      setTimeout(() => {
        $('.changeButton').text('添加').addClass('confirmButton').removeClass('changeButton')
      }, 150)
      
    }
  }))
  
  function removeSite(e) {
    deleteList.push(parseInt($(e.target.children[0]).data('id')))
    $(e.target).remove()
    if ($siteList.children('li').length === 0) {
      addFormat()
      removeLocalStorage(deleteList)
      deleteList.length = 0
    }
  }
  
  function longPress() {
    if ($('ul > li').length > 0) {
      $('ul>li').addClass('selected-site')
      $('ul>li').addClass('unselected-site delete edit')
      $add.css('visibility', 'hidden')
    }
    
  }
  
  $siteList.on('touchstart', (e) => {
    if ($('.delete')[0] !== null && $('.delete')[0] !== undefined) {
      let deleteScope = {}
      let editScope = {}
      let basePosition = e.target.getBoundingClientRect()
      if (e.target.tagName === 'SPAN') {
        basePosition = e.target.parentNode.getBoundingClientRect()
      }
      deleteScope.top = basePosition.y - 10
      deleteScope.bottom = deleteScope.top + 20
      deleteScope.left = basePosition.x - 10
      deleteScope.right = deleteScope.left + 20
      editScope.top = basePosition.y
      editScope.bottom = basePosition.y + 50
      editScope.left = basePosition.x
      editScope.right = basePosition.x + 50
      if (e.touches[0].pageX >= deleteScope.left && e.touches[0].pageX <= deleteScope.right && e.touches[0].pageY >= deleteScope.top && e.touches[0].pageY <= deleteScope.bottom) {
        e.stopPropagation()
        if ($addWindow.hasClass('') || $addWindow.hasClass('add-window-animation-hidden')) {
          removeSite(e)
          // setTimeout(()=>{$add.css("visibility","visible")},100)
          addSiteFormat()
        }
      } else if (e.touches[0].pageX >= editScope.left && e.touches[0].pageX <= editScope.right && e.touches[0].pageY >= editScope.top && e.touches[0].pageY <= editScope.bottom) {
        e.stopPropagation()
        if (e.target.tagName === 'LI') {
          editSite($(e.target.children[0]).data('id'))
        } else if (e.target.tagName === 'SPAN') {
          editSite($(e.target).data('id'))
        }
      }
    }
    
  })
  
  $addSite.on('touchstart', (e) => {
    if ($(e.target).text() === '添加') {
      let site_name = $('.name').val()
      let site_url = $('.url').val()
      if (site_name && site_url) {
        addSite()
        addSiteFormat()
      }
      
    }
    if ($(e.target).text() === '修改') {
      changeSite()
      loadSite()
      $('.changeButton').text('添加').addClass('confirmButton').removeClass('changeButton')
      addSiteFormat()
    }
    
  })
  let custom_handle_event = {
    time: null,
    handleEvent: function (e) {
      if (e.type === 'touchstart') {
        this.customStart(e)
      }
      if (e.type === 'touchend') {
        this.customEnd(e)
      }
    },
    customStart: function (e) {
      this.time = setTimeout(function () {
        isDispatch = false
        longPress()
      }, 300)
    },
    customEnd: function (e) {
      if (isDispatch) {
        clearTimeout(this.time)
        location.href = getValueAndNameById($(e.target).data('id'))[1]
      }
      isDispatch = !$('ul>li').hasClass('edit')
      
    }
  }
  
  function append_site(siteObjects) {
    for (let i = 0; i < siteObjects.length; i += 2) {
      let $newLi = $(`
                <li>
                    <span>${siteObjects[i].slice(1, 1)}</span>
                    <span data-id=${getSiteIndexByName(siteObjects[i])}> ${siteObjects[i]}
                    </span>
                </li>
            `)
      $newLi.insertBefore($('.add-container'))
      $newLi[0].addEventListener('touchstart', custom_handle_event)
      $newLi[0].addEventListener('touchend', custom_handle_event)
    }
  }
  
  function addSite() {
    let site_name = $('.name').val()
    let site_url = $('.url').val()
    if (site_name && site_url) {
      let siteArray = []
      if ($('.url').val().indexOf('http') === -1) {
        siteArray = [$('.name').val(), 'https://' + $('.url').val()]
      } else {
        siteArray = [$('.name').val(), $('.url').val()]
      }
      addLocalStorage(siteArray)
      append_site(siteArray)
      addFormat()
      $('.name').val('')
      $('.url').val('')
      
    }
  }
}